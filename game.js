let i=0;
let score=0;
let life=3;

const startPage=document.getElementById("startPage");
const quizPage=document.getElementById("quizPage");
const finishPage=document.getElementById("finishPage");

const startBtn=document.getElementById("startBtn");
const playerName=document.getElementById("playerName");

const question=document.getElementById("question");
const answers=document.getElementById("answers");
const message=document.getElementById("message");

const scoreBox=document.getElementById("score");
const lifeBox=document.getElementById("life");
const result=document.getElementById("result");
const bar=document.getElementById("bar");

const correctSound=new Audio("correct.m4a");
const wrongSound=new Audio("wrong.m4a");

startBtn.onclick=startGame;
function startGame(){

if(playerName.value.trim()==""){
alert("نام خود را وارد کنید.");
return;
}

i=0;
score=0;
life=3;

scoreBox.textContent=score;
lifeBox.textContent=life;

result.innerHTML="";
message.style.display="none";

bar.style.width="0%";

startPage.classList.add("hide");
finishPage.classList.add("hide");
quizPage.classList.remove("hide");

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

message.className="correct";
message.textContent="✅ آفرین! پاسخ درست بود.";

}else{

life--;
lifeBox.textContent=life;

wrongSound.currentTime=0;
wrongSound.play().catch(()=>{});

message.className="wrong";
message.textContent="❌ پاسخ نادرست بود.";

}

message.style.display="block";

setTimeout(function(){

message.style.display="none";

i++;

if(life<=0){

endGame(false);
return;

}

if(i>=questions.length){

endGame(true);

}else{

showQuestion();

}

},1200);

}
function endGame(win){

quizPage.classList.add("hide");
finishPage.classList.remove("hide");

bar.style.width="100%";

let medal="🥉 مدال برنز";

if(score>=90){
medal="🥇 مدال طلا";
}else if(score>=70){
medal="🥈 مدال نقره";
}

if(win){

result.innerHTML=
"🎉 آفرین <b>"+playerName.value+
"</b><br><br>"+
"⭐ امتیاز: "+score+
"<br>"+medal+
"<br><br>👩‍🏫 آموزگار: پونه سلامی";

}else{

result.innerHTML=
"😔 جان‌های شما تمام شد."+
"<br><br>⭐ امتیاز: "+score+
"<br><br>🌹 دوباره تلاش کن.";

}

}
