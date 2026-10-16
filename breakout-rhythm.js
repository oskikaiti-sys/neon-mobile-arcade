/* NEON ARCADE · Rhythm Strike, optional one-lane rhythm combat.
   Visual notes follow the same 137 BPM clock as the generated soundtrack. */
(function(){
'use strict';
const BPM=137, BEAT=60/BPM, GAP=BEAT*2, LEAD=1.65, WINDOW=.205;
const TRACK_X=337, TOP=295, TARGET=462;
let time=0,next=2.0,notes=[],chain=0,best=0,pulse=0,feedback='',feedbackTimer=0;
let fireBonus=null,isPlaying=()=>false,audioMode=()=>0,sound=null;
const $=id=>document.getElementById(id);
function tr(en,zh,ja){const l=window.ArcadeLang?.get?.()||'en';return l==='zh-CN'?zh:l==='ja'?ja:en}
function reset(){
 time=0;next=2.0;notes=[];chain=0;best=0;pulse=0;feedback='';feedbackTimer=0;paintButton();
}
function bind({fire,playing,mode,sfx}){
 fireBonus=fire;isPlaying=playing;audioMode=mode;sound=sfx;
}
function miss(){chain=0;feedback=tr('MISS','未命中','ミス');feedbackTimer=.38;paintButton();}
function tick(dt){
 if(!isPlaying())return;
 time+=dt;pulse=Math.max(0,pulse-dt*2.8);feedbackTimer=Math.max(0,feedbackTimer-dt);
 while(next<time+LEAD&&notes.length<6){notes.push({at:next});next+=GAP}
 for(let i=notes.length-1;i>=0;i--)if(time-notes[i].at>WINDOW){
  notes.splice(i,1);if(chain>0)miss();
 }
 paintButton();
}
function paintButton(){
 const b=$('beatTap'),c=$('beatCombo');
 if(!b||!c)return;
 b.classList.toggle('ready',notes.some(n=>Math.abs(n.at-time)<=WINDOW));
 b.classList.toggle('onbeat',pulse>.15);
 const label=chain?tr(chain+' CHAIN',chain+' 连击',chain+' コンボ'):tr('TAP TO FIRE','跟随节拍','リズムで発射');
 if(c.textContent!==label)c.textContent=label;
}
function press(){
 if(!isPlaying())return;
 const eligible=notes.map((n,i)=>({i,delta:Math.abs(n.at-time)})).sort((a,b)=>a.delta-b.delta)[0];
 if(!eligible||eligible.delta>WINDOW){miss();return}
 notes.splice(eligible.i,1);chain=Math.min(99,chain+1);best=Math.max(best,chain);
 const grade=eligible.delta<.072?'PERFECT':eligible.delta<.135?'GREAT':'GOOD';
 feedback=grade;feedbackTimer=.54;pulse=1;
 const extra=1+Math.min(3,Math.floor(chain/5));
 if(typeof fireBonus==='function')fireBonus(extra,chain,grade);
 if(typeof sound==='function')sound(grade);
 paintButton();
}
function draw(ctx){
 if(!isPlaying())return;
 ctx.save();
 const x=TRACK_X;const h=TARGET-TOP;
 ctx.fillStyle='rgba(14,20,49,.58)';ctx.beginPath();ctx.roundRect(x-17,TOP,34,h+22,11);ctx.fill();
 ctx.strokeStyle='#a877ff66';ctx.lineWidth=1.2;ctx.stroke();
 ctx.strokeStyle='rgba(135,210,255,.12)';ctx.lineWidth=1;
 for(let i=0;i<4;i++){let y=TOP+30+i*34;ctx.beginPath();ctx.moveTo(x-14,y);ctx.lineTo(x+14,y);ctx.stroke()}
 const close=notes.some(n=>Math.abs(n.at-time)<=WINDOW);
 ctx.save();ctx.shadowColor=close?'#fff2a6':'#74d8ff';ctx.shadowBlur=close?22:12;
 ctx.strokeStyle=close?'#fff2a6':'#73dfff';ctx.lineWidth=close?4:2.5;
 ctx.beginPath();ctx.moveTo(x-15,TARGET);ctx.lineTo(x+15,TARGET);ctx.stroke();ctx.restore();
 for(const note of notes){
  const remain=note.at-time;
  const y=TARGET-remain/LEAD*h;if(y<TOP-10||y>TARGET+13)continue;
  const near=Math.abs(remain)<WINDOW;ctx.save();ctx.globalAlpha=Math.max(.4,1-Math.max(0,remain-1)*.4);
  ctx.shadowColor=near?'#fff1b6':'#aa9cff';ctx.shadowBlur=near?25:15;
  ctx.fillStyle=near?'#ffe0a3':'#bda2ff';
  ctx.beginPath();ctx.arc(x,y,near?11:9,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle='#252040';ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText('♪',x,y+4);ctx.restore();
 }
 if(pulse>0){
  ctx.globalAlpha=pulse*.85;ctx.strokeStyle='#8bf9ff';ctx.lineWidth=2.6;ctx.beginPath();ctx.arc(x,TARGET,16+(1-pulse)*30,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;
 }
 if(feedbackTimer>0){ctx.save();ctx.globalAlpha=Math.min(1,feedbackTimer*3);ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.shadowColor='#95eeff';ctx.shadowBlur=10;ctx.fillStyle='#e2faff';ctx.fillText(feedback,x-22,TARGET-26);ctx.restore()}
 ctx.restore();
}
function audioSync(){return time}
const beat=$('beatTap');
if(beat){beat.addEventListener('click',e=>{e.preventDefault();press()});}
document.addEventListener('keydown',e=>{
 if(e.repeat||e.target?.tagName==='BUTTON'||e.target?.tagName==='SELECT'||e.target?.tagName==='INPUT')return;
 if(e.code==='KeyB'||e.code==='KeyJ'){e.preventDefault();press()}
});
window.NeonRhythm={bind,reset,tick,draw,audioSync,press,getState:()=>({chain,notes:notes.length,time,feedback})};
reset();
})();