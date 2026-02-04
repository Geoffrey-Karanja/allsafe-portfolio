const hb=document.querySelector('.hamburger');
const nav=document.querySelector('.nav-links');
hb?.addEventListener('click',()=>{const expanded=hb.getAttribute('aria-expanded')==='true';hb.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('open')});

const threatCards=document.querySelectorAll('.threat-card');
threatCards.forEach(card=>{card.addEventListener('click',()=>{const info=card.querySelector('.more-info');if(info.style.display==='block'){info.style.display='none'}else{info.style.display='block'}})});

const timelineSteps=document.querySelectorAll('.timeline-step');
timelineSteps.forEach(step=>{step.style.opacity='0';step.style.transform='translateX(-30px)'});
function revealTimeline(){const wh=window.innerHeight;timelineSteps.forEach((step,index)=>{const rect=step.getBoundingClientRect();if(rect.top<wh-100){step.style.transform='translateX(0)';step.style.opacity='1';step.style.transition=`all 0.5s ease ${index*0.2}s`}})}
window.addEventListener('scroll',revealTimeline);
window.addEventListener('load',revealTimeline);

const statsCards=document.querySelectorAll('.stats-card');
statsCards.forEach(card=>{card.style.opacity='0';card.style.transform='translateY(30px)'});
function revealStats(){const wh=window.innerHeight;statsCards.forEach((card,index)=>{const rect=card.getBoundingClientRect();if(rect.top<wh-100){card.style.transform='translateY(0)';card.style.opacity='1';card.style.transition=`all 0.5s ease ${index*0.15}s`}})}
window.addEventListener('scroll',revealStats);
window.addEventListener('load',revealStats);

const terminalLines=["Scanning all threats...","No active anomalies detected.","SOC v3.2 online.","Threat intelligence loaded.","Monitoring active (24/7)"];
const terminal=document.getElementById('terminal');let lineIndex=0,charIndex=0;
function typeTerminal(){if(lineIndex<terminalLines.length){if(charIndex<terminalLines[lineIndex].length){terminal.textContent+=terminalLines[lineIndex][charIndex];charIndex++;setTimeout(typeTerminal,35)}else{terminal.textContent+='\n';lineIndex++;charIndex=0;setTimeout(typeTerminal,300)}}else{setTimeout(()=>{terminal.textContent='';lineIndex=0;charIndex=0;typeTerminal()},2000)}}typeTerminal();

document.getElementById('year').textContent=new Date().getFullYear();
