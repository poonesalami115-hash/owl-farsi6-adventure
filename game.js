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

correctSound.preload = "auto";
wrongSound.preload = "auto";

if(bgMusic){

bgMusic.volume = 0.25;

}

startBtn.onclick = startGame;

function showMessage(text,type){

message.className = type;

message.innerHTML = text;

message.style.display = "block";

}

function hideMessage(){

message.style.display = "none";

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

hideMessage();

startPage.classList.add("hide");
finishPage.classList.add("hide");
quizPage.classList.remove("hide");

if(bgMusic){

bgMusic.currentTime=0;

bgMusic.play().catch(function(){});

}

showMessage("🦉 سلام دوست من! آماده‌ای مأموریت را شروع کنیم؟","correct");

setTimeout(function(){

hideMessage();

showQuestion();

},1800);

}

function showQuestion(){

const q=questions[i];

bar.style.width=((i/questions.length)*100)+"%";

question.textContent=(i+1)+"- "+q.q;

answers.innerHTML="";

hideMessage();

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

showMessage("🦉 آفرین، درست گفتی.","correct");

secondChance=false;

setTimeout(function(){

hideMessage();

i++;

if(i>=questions.length){

endGame();

}else{

showQuestion();

}

},1500);

}else{

if(secondChance){

secondChance=false;

const correctAnswer=q.a[q.c];

showMessage(
"❌ پاسخ صحیح:<br><br><b>"+correctAnswer+"</b>",
"wrong"
);

setTimeout(function(){

hideMessage();

i++;

if(i>=questions.length){

endGame();

}else{

showQuestion();

}

},3000);

}else{

secondChance=true;

wrongSound.currentTime=0;
wrongSound.play().catch(function(){});

owlSad();

showMessage(
"🦉 اشکالی ندارد، دوباره فکر کن.",
"wrong"
);

buttons.forEach(function(btn){
btn.disabled=false;
});

setTimeout(function(){

hideMessage();

},1500);

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

const shotBtn=document.getElementById("shotBtn");

if(shotBtn){

shotBtn.onclick=function(){

alert("📸 لطفاً از نتیجه اسکرین‌شات بگیرید و برای آموزگار ارسال کنید.");

};

}

}
