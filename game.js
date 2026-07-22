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
const percentBox=document.getElementById("percent");
const result=document.getElementById("result");
const bar=document.getElementById("bar");

const owl=document.getElementById("owl");

const bgMusic=document.getElementById("bgMusic");

const correctSound=new Audio("correct.mp3");
const wrongSound=new Audio("wrong.mp3");

<audio id="bgMusic" src="background.mp3" loop></audio>
startBtn.onclick=startGame;

function speak(text){

message.className="correct";
message.innerHTML="🦉 "+text;
message.style.display="block";

}

function owlHappy(){

owl.classList.remove("owlSad");
owl.classList.add("owlHappy");

setTimeout(function(){

owl.classList.remove("owlHappy");

},700);

}

function owlSad(){

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

alert("شما امروز یک بار در آزمون شرکت کرده‌اید.");

return;

}

i=0;
score=0;
secondChance=false;

scoreBox.textContent="0";
percentBox.textContent="0%";

bar.style.width="0%";

message.style.display="none";

startPage.classList.add("hide");
finishPage.classList.add("hide");
quizPage.classList.remove("hide");

bgMusic.volume=0.3;

bgMusic.play().catch(()=>{});

speak("سلام دوست من، آماده‌ای مأموریت امروز را شروع کنیم؟");

setTimeout(function(){

message.style.display="none";

showQuestion();

},1800);

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

percentBox.textContent=
Math.round((score/(questions.length*5))*100)+"%";

correctSound.currentTime=0;
correctSound.play().catch(()=>{});

owlHappy();

message.className="correct";
message.innerHTML="🦉 آفرین! پاسخ درست بود.";
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
wrongSound.play().catch(()=>{});

owlSad();

if(!secondChance){

secondChance=true;

message.className="wrong";

message.innerHTML="🦉 اشکالی ندارد.<br>یک بار دیگر فکر کن.";

message.style.display="block";

setTimeout(function(){

message.style.display="none";

showQuestion();

},1800);

}else{

secondChance=false;

/* پیدا کردن متن پاسخ صحیح */

const correctAnswer=q.a[q.c];

message.className="wrong";

message.innerHTML=

"❌ پاسخ صحیح:<br><br><b>"+correctAnswer+"</b><br><br>📚 "+q.e;

message.style.display="block";

setTimeout(function(){

message.style.display="none";

i++;

if(i>=questions.length){

endGame();

}else{

showQuestion();

}

},3500);

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

const percent=Math.round((score/(questions.length*5))*100);

let medal="🥉 مدال برنز";

if(score>=90){
medal="🥇 مدال طلا";
}else if(score>=70){
medal="🥈 مدال نقره";
}

owlHappy();

let finalMessage="👏 تلاش خوبی کردی.";

if(score==100){

finalMessage="🌟 فوق‌العاده! همه سؤال‌ها را درست پاسخ دادی.";

}else if(score>=80){

finalMessage="👏 عالی بود! عملکرد بسیار خوبی داشتی.";

}else if(score>=60){

finalMessage="👍 خوب بود. با کمی تمرین بهتر هم می‌شوی.";

}

result.innerHTML=

"🏆 گواهی پایان مأموریت<br><br>"+

"👤 <b>"+playerName.value+"</b><br><br>"+

"🆔 "+code+"<br><br>"+

"⭐ امتیاز: "+score+" از "+(questions.length*5)+
"<br><br>"+

"📊 درصد موفقیت: "+percent+"٪<br><br>"+

medal+

"<br><br>"+

finalMessage+

"<br><br>"+

"📅 "+today+

"<br><br>"+

"👩‍🏫 آموزگار: پونه سلامی";

document.getElementById("shotBtn").onclick=function(){

alert("📸 لطفاً از این صفحه اسکرین‌شات بگیرید و برای آموزگار ارسال کنید.");

};

if(score>=70){

const fw=document.getElementById("fireworks");

fw.innerHTML="🎆 🎇 ✨ 🎆 🎇 ✨ 🎆";

setInterval(function(){

fw.innerHTML=

Math.random()>0.5 ?

"🎆 🎇 ✨ 🎆 🎇 ✨ 🎆"

:

"✨ 🎆 🎇 ✨ 🎇 🎆 ✨";

},600);

}

}
