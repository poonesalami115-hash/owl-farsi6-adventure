let i = 0;
let score = 0;
let secondChance = false;

const startPage = document.getElementById("startPage");
const quizPage = document.getElementById("quizPage");
const finishPage = document.getElementById("finishPage");

const startBtn = document.getElementById("startBtn");

const playerName = document.getElementById("playerName");
const playerCode = document.getElementById("playerCode");

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const message = document.getElementById("message");

const scoreBox = document.getElementById("score");
const percentBox = document.getElementById("percent");
const result = document.getElementById("result");
const bar = document.getElementById("bar");

const owl = document.getElementById("owl");
const bgMusic = document.getElementById("bgMusic");

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

startBtn.onclick = startGame;

function speak(text){

message.className = "correct";
message.innerHTML = "🦉 " + text;
message.style.display = "block";

}

function owlHappy(){

if(!owl) return;

owl.classList.remove("owlSad");
owl.classList.add("owlHappy");

setTimeout(function(){

owl.classList.remove("owlHappy");

},700);

}

function owlSad(){

if(!owl) return;

owl.classList.remove("owlHappy");
owl.classList.add("owlSad");

setTimeout(function(){

owl.classList.remove("owlSad");

},700);

}
function startGame(){

const name=playerName.value.trim();
const code=playerCode.value.trim();

if(name==""){
alert("نام دانش‌آموز را وارد کنید.");
return;
}

if(code==""){
alert("کد ملی یا شماره دانش‌آموزی را وارد کنید.");
return;
}

const today=new Date().toLocaleDateString("fa-IR");
const key="quiz_"+code;

if(localStorage.getItem(key)==today){
alert("شما امروز این آزمون را انجام داده‌اید.");
return;
}

i=0;
score=0;
secondChance=false;

scoreBox.textContent="0";

if(percentBox){
percentBox.textContent="0%";
}

bar.style.width="0%";

message.style.display="none";

startPage.classList.add("hide");
finishPage.classList.add("hide");
quizPage.classList.remove("hide");

if(bgMusic){
bgMusic.volume=0.25;
bgMusic.play().catch(function(){});
}

speak("سلام دوست من، آماده‌ای؟");

setTimeout(function(){

message.style.display="none";

showQuestion();

},1500);

}

function showQuestion(){

const q=questions[i];

bar.style.width=((i/questions.length)*100)+"%";

question.textContent=(i+1)+". "+q.q;

answers.innerHTML="";

message.style.display="none";

q.a.forEach(function(answer,index){

const btn=document.createElement("button");

btn.className="answer";

btn.textContent=answer;

btn.onclick=function(){

checkAnswer(index);

};

answers.appendChild(btn);

});

}
function checkAnswer(index){

const q=questions[i];

const buttons=document.querySelectorAll(".answer");

buttons.forEach(function(btn){
btn.disabled=true;
});

if(index===q.c){

score+=5;

scoreBox.textContent=score;

if(percentBox){
percentBox.textContent=
Math.round((score/(questions.length*5))*100)+"%";
}

correctSound.currentTime=0;
correctSound.play().catch(function(){});

owlHappy();

message.className="correct";
message.innerHTML="🦉 آفرین، درست گفتی.";
message.style.display="block";

secondChance=false;

setTimeout(function(){

message.style.display="none";

i++;

if(i>=questions.length){
endGame();
}else{
showQuestion();
}

},1500);

}else{

wrongSound.currentTime=0;
wrongSound.play().catch(function(){});

owlSad();

if(!secondChance){

secondChance=true;

message.className="wrong";
message.innerHTML="🦉 اشکالی ندارد، یک بار دیگر فکر کن.";
message.style.display="block";

setTimeout(function(){

message.style.display="none";
showQuestion();

},1800);

}else{

secondChance=false;

const correctAnswer=q.a[q.c];

message.className="wrong";
message.innerHTML="✅ پاسخ صحیح:<br><br><b>"+correctAnswer+"</b>";
message.style.display="block";

setTimeout(function(){

message.style.display="none";

i++;

if(i>=questions.length){
endGame();
}else{
showQuestion();
}

},2500);

}

}

}

function endGame(){

if(bgMusic){
bgMusic.pause();
bgMusic.currentTime=0;
}

const today=new Date().toLocaleDateString("fa-IR");
const code=playerCode.value.trim();

localStorage.setItem("quiz_"+code,today);

quizPage.classList.add("hide");
finishPage.classList.remove("hide");

bar.style.width="100%";

const percent=Math.round((score/(questions.length*5))*100);

let medal="🥉 مدال برنز";

if(score>=90){
medal="🥇 مدال طلا";
}else if(score>=70){
medal="🥈 مدال نقره";
}

result.innerHTML=

"🏆 پایان آزمون<br><br>"+

"👤 <b>"+playerName.value+"</b><br><br>"+

"⭐ امتیاز: "+score+" از "+(questions.length*5)+

"<br><br>"+

"📊 درصد موفقیت: "+percent+"٪<br><br>"+

medal+

"<br><br>"+

"👩‍🏫 آموزگار: پونه سلامی";

const fw=document.getElementById("fireworks");

if(fw && score>=70){

fw.innerHTML="🎆 🎇 ✨ 🎆 🎇 ✨";

setInterval(function(){

fw.innerHTML=Math.random()>0.5
?"🎆 🎇 ✨ 🎆 🎇 ✨"
:"✨ 🎆 🎇 ✨ 🎇 🎆";

},600);

}

}
