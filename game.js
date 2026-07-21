let i=0;
let score=0;
let secondChance=false;

const startPage=document.getElementById("startPage");
const quizPage=document.getElementById("quizPage");
const finishPage=document.getElementById("finishPage");

const startBtn=document.getElementById("startBtn");

const playerName=document.getElementById("playerName");
const playerCode=document.getElementById("playerCode");

const question=document.getElementById("question");
const answers=document.getElementById("answers");
const message=document.getElementById("message");

const scoreBox=document.getElementById("score");
const result=document.getElementById("result");
const bar=document.getElementById("bar");

const owl=document.getElementById("owl");
const bgMusic=document.getElementById("bgMusic");

const correctSound=new Audio("correct.m4a");
const wrongSound=new Audio("wrong.m4a");

startBtn.onclick=startGame;

function speak(text){

if("speechSynthesis" in window){

speechSynthesis.cancel();

const msg=new SpeechSynthesisUtterance(text);

msg.lang="fa-IR";

speechSynthesis.speak(msg);

}

}

function startGame(){

const name=playerName.value.trim();

const code=playerCode.value.trim();

if(name==""){

alert("نام خود را وارد کنید.");

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

scoreBox.textContent=0;

result.innerHTML="";

message.style.display="none";

bar.style.width="0%";

startPage.classList.add("hide");

finishPage.classList.add("hide");

quizPage.classList.remove("hide");

bgMusic.volume=0.15;

bgMusic.play().catch(()=>{});

speak("سلام. آماده ای مأموریت امروز را شروع کنیم؟");

showQuestion();

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

const correct=(index===questions[i].c);

const buttons=document.querySelectorAll(".answer");

buttons.forEach(function(btn){

btn.disabled=true;

});
if(correct){

score+=5;

scoreBox.textContent=score;

correctSound.currentTime=0;

correctSound.play().catch(()=>{});

owl.className="owlHappy";

message.className="correct";

message.textContent="✅ آفرین، درست گفتی.";

message.style.display="block";

speak("آفرین. پاسخ درست بود.");

secondChance=false;

setTimeout(function(){

owl.className="";

message.style.display="none";

i++;

if(i>=questions.length){

endGame();

}else{

showQuestion();

}

},1500);

}else{

owl.className="owlSad";

if(!secondChance){

secondChance=true;

wrongSound.currentTime=0;

wrongSound.play().catch(()=>{});

message.className="wrong";

message.textContent="❌ اشکالی ندارد، یک بار دیگر فکر کن.";

message.style.display="block";

speak("اشکالی ندارد. یک بار دیگر فکر کن.");

setTimeout(function(){

owl.className="";

message.style.display="none";

showQuestion();

},1800);

}else{

secondChance=false;

message.style.display="none";

owl.className="";

i++;

if(i>=questions.length){

endGame();

}else{

showQuestion();

}

}

}

}

function endGame(){

bgMusic.pause();

bgMusic.currentTime=0;

const today=new Date().toLocaleDateString("fa-IR");

const code=playerCode.value.trim();

localStorage.setItem("quiz_"+code,today);

quizPage.classList.add("hide");

finishPage.classList.remove("hide");

bar.style.width="100%";

if(score>=70){

confetti({

particleCount:250,

spread:180,

origin:{y:.6}

});

}

let medal="🥉 مدال برنز";

if(score>=90){

medal="🥇 مدال طلا";

}else if(score>=70){

medal="🥈 مدال نقره";

}

result.innerHTML=

"🏆 گواهی پایان مأموریت<br><br>"+

"👤 <b>"+playerName.value+"</b><br><br>"+

"🆔 "+code+"<br><br>"+

"⭐ امتیاز: <b>"+score+" از "+(questions.length*5)+"</b><br><br>"+

medal+

"<br><br>"+
  
