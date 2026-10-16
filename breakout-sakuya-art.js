/* Sakuya Izayoi / Luna Dial visual skin. Original Canvas art; unofficial Touhou fanwork.
 * Draw methods affect appearance only: original game physics, timing, and collision
 * boxes remain unchanged.
 */
(function(){
'use strict';
const TAU=Math.PI*2;
function watch(g,x,y,r,angle){
 g.save();g.translate(x,y);
 g.shadowColor='#b9d5ff';g.shadowBlur=9;
 g.strokeStyle='#a4bcd9';g.lineWidth=3;g.fillStyle='#1d263e';
 g.beginPath();g.arc(0,0,r,0,TAU);g.fill();g.stroke();
 g.shadowBlur=0;g.strokeStyle='#f6dfb3';g.lineWidth=.85;
 for(let i=0;i<12;i++){let a=i*TAU/12,r1=r*.7,r2=r*.86;g.beginPath();g.moveTo(Math.sin(a)*r1,-Math.cos(a)*r1);g.lineTo(Math.sin(a)*r2,-Math.cos(a)*r2);g.stroke()}
 g.strokeStyle='#e5edfc';g.lineWidth=1.6;g.beginPath();
 g.moveTo(0,0);g.lineTo(Math.sin(angle)*r*.6,-Math.cos(angle)*r*.6);
 g.moveTo(0,0);g.lineTo(Math.sin(angle*.13+1.6)*r*.38,-Math.cos(angle*.13+1.6)*r*.38);g.stroke();
 g.fillStyle='#f8e7c0';g.beginPath();g.arc(0,0,1.8,0,TAU);g.fill();g.restore();
}
function clockwork(g,b){
 const x=b.x+b.w/2,y=b.y+b.h/2,w=b.w,h=b.h;
 g.save();g.translate(x,y);g.shadowColor='#a8ceeb';g.shadowBlur=4;
 let grad=g.createLinearGradient(-w*.5,-h*.5,w*.5,h*.5);
 grad.addColorStop(0,'#829fbe');grad.addColorStop(.42,'#344962');grad.addColorStop(1,'#14263d');
 g.fillStyle=grad;g.beginPath();g.roundRect(-w*.46,-h*.45,w*.92,h*.9,3);g.fill();g.shadowBlur=0;
 g.lineWidth=1;g.strokeStyle='#e6d5af';g.stroke();
 g.lineWidth=.8;g.strokeStyle='#b0d7ed';
 const angle=((b.c+b.r*3)%8)*Math.PI/4;
 g.beginPath();g.arc(0,0,5.4,0,TAU);g.stroke();
 for(let k=0;k<8;k++){let a=k*TAU/8+angle;g.beginPath();g.moveTo(Math.cos(a)*5.6,Math.sin(a)*5.6);g.lineTo(Math.cos(a)*8.6,Math.sin(a)*8.6);g.stroke()}
 g.fillStyle='#f5d4a1';g.beginPath();g.arc(0,0,1.5,0,TAU);g.fill();
 if(b.type==='bomb'){g.fillStyle='#ff9cb6';g.beginPath();g.arc(w*.32,0,2.5,0,TAU);g.fill()}
 if(b.type==='armor'){g.strokeStyle='#fff9e5';g.lineWidth=1.8;g.strokeRect(-w*.39,-h*.36,w*.78,h*.72)}
 g.restore();
}
function drone(g,s,i,time){
 const bob=Math.sin(time*6+i*1.2)*1.1;
 // Compact pocket-watch familiars, approx. 25 px across.
 watch(g,s.x,s.y+bob,9,time*2.3+i*.65);
 g.save();g.translate(s.x,s.y+bob);
 g.strokeStyle='#eff7ff';g.lineWidth=1.2;
 g.beginPath();g.moveTo(-4,-10);g.lineTo(-5,-13);g.lineTo(5,-13);g.lineTo(4,-10);g.stroke();
 g.shadowColor='#cce9ff';g.shadowBlur=8;
 g.fillStyle='#e7f3ff';g.beginPath();g.moveTo(12,-13);g.lineTo(14,-8);g.lineTo(13,8);g.lineTo(11,13);g.lineTo(9,8);g.lineTo(10,-8);g.closePath();g.fill();
 g.restore();
}
function knife(g,s){
 g.save();g.translate(s.x,s.y-6);
 g.shadowColor='#bce4ff';g.shadowBlur=10;
 // Blade tip points upward; dark grip and tiny golden guard distinguish from ofuda.
 g.fillStyle='#dcecff';g.beginPath();g.moveTo(0,-12);g.lineTo(3.5,2);g.lineTo(0,6);g.lineTo(-3.5,2);g.closePath();g.fill();
 g.shadowBlur=0;g.fillStyle='#ffffffc8';g.beginPath();g.moveTo(0,-11);g.lineTo(0,5);g.lineTo(-2.5,1);g.closePath();g.fill();
 g.strokeStyle='#ffd9a7';g.lineWidth=2;g.beginPath();g.moveTo(-4,5.5);g.lineTo(4,5.5);g.stroke();
 g.fillStyle='#3b2d51';g.fillRect(-1.5,6,3,5);g.restore();
}
function portal(g,gates,time,portalClock,label){
 g.save();g.translate(gates.x,gates.y);
 const glow=portalClock>0?12:6;
 g.shadowColor='#d4eaff';g.shadowBlur=glow;
 g.strokeStyle='#e7d4b1';g.lineWidth=4;g.fillStyle='#101d37';
 g.beginPath();g.arc(0,0,26,0,TAU);g.fill();g.stroke();g.shadowBlur=0;
 for(let i=0;i<12;i++){let a=i*TAU/12,rad=31;g.strokeStyle=i%2?'#e7d3b0':'#a8c5dc';g.lineWidth=2.3;
 g.beginPath();g.moveTo(Math.cos(a)*rad*.82,Math.sin(a)*rad*.82);g.lineTo(Math.cos(a)*rad,Math.sin(a)*rad);g.stroke()}
 const angle=time*2+(portalClock>0?time*3:0);
 g.strokeStyle='#e9f3ff';g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(angle)*17,-Math.cos(angle)*17);g.stroke();
 g.strokeStyle='#e6c18e';g.lineWidth=1.6;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(angle*.35)*11,-Math.cos(angle*.35)*11);g.stroke();
 g.fillStyle='#ffebc7';g.beginPath();g.arc(0,0,2.5,0,TAU);g.fill();g.restore();
 g.textAlign='center';g.fillStyle='#ecf6ff';g.font='bold 11px system-ui';g.fillText(label,gates.x,gates.y+47);
}
function background(g,time){
 // Decorative clock behind the first rows. Low opacity retains brick/ball readability.
 g.save();g.globalAlpha=.2;
 const x=282,y=151,r=63;
 g.strokeStyle='#aabdd7';g.lineWidth=3;g.beginPath();g.arc(x,y,r,0,TAU);g.stroke();
 g.lineWidth=1.2;for(let j=0;j<12;j++){
 const a=j*TAU/12;g.beginPath();g.moveTo(x+Math.sin(a)*r*.79,y-Math.cos(a)*r*.79);
 g.lineTo(x+Math.sin(a)*r*.92,y-Math.cos(a)*r*.92);g.stroke()}
 g.strokeStyle='#e4cda9';g.lineWidth=3;g.beginPath();g.moveTo(x,y);
 g.lineTo(x+Math.sin(time*.3)*r*.62,y-Math.cos(time*.3)*r*.62);g.stroke();
 g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.sin(time*1.1)*r*.82,y-Math.cos(time*1.1)*r*.82);g.stroke();
 g.restore();
}
window.SakuyaArt={brick:clockwork,drone,shot:knife,gate:portal,background};
})();