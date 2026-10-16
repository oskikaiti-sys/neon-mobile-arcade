/* Remilia Scarlet visual theme for the Septette (unofficial Touhou fanwork).
 * Self-contained Canvas routines; no gameplay collision or audio changes.
 */
(function(){
const TAU=Math.PI*2;
function brick(g,b){
 const w=b.w,h=b.h;g.save();g.translate(b.x+w/2,b.y+h/2);
 g.shadowColor='#b93662';g.shadowBlur=7;
 const grad=g.createLinearGradient(-w/2,-h/2,w/2,h/2);
 grad.addColorStop(0,b.type==='bomb'?'#fc9885':'#bd456d');grad.addColorStop(.6,'#622444');grad.addColorStop(1,'#260d2b');
 g.fillStyle=grad;g.beginPath();g.roundRect(-w*.46,-h*.45,w*.92,h*.9,3);g.fill();
 g.shadowBlur=0;g.lineWidth=1;g.strokeStyle='#ffd8d7a2';g.stroke();
 g.fillStyle='#ffbbca';g.beginPath();g.moveTo(0,-2);
 g.quadraticCurveTo(-8,-9,-w*.3,-3);g.lineTo(-w*.25,3);g.lineTo(-w*.14,1);g.lineTo(-w*.1,5);
 g.lineTo(0,2);g.lineTo(w*.1,5);g.lineTo(w*.14,1);g.lineTo(w*.25,3);g.lineTo(w*.3,-3);
 g.quadraticCurveTo(8,-9,0,-2);g.fill();
 if(b.type==='armor'){g.strokeStyle='#ffe5d6';g.lineWidth=1.5;g.strokeRect(-w*.4,-h*.38,w*.8,h*.76)}
 g.restore();
}
function bat(g,s,i,time){
 const flap=Math.sin(time*12+i*2)*4;
 g.save();g.translate(s.x,s.y+Math.sin(time*6+i)*1.5);
 g.shadowBlur=10;g.shadowColor='#e6477e';g.fillStyle='#4c102d';g.strokeStyle='#ffa3b2';g.lineWidth=1.1;
 g.beginPath();g.moveTo(0,2);g.quadraticCurveTo(-7,-10-flap,-16,-5-flap);
 g.lineTo(-13,2);g.lineTo(-10,0);g.lineTo(-6,7);g.lineTo(0,2);
 g.quadraticCurveTo(7,-10-flap,16,-5-flap);g.lineTo(13,2);g.lineTo(10,0);g.lineTo(6,7);g.closePath();g.fill();g.stroke();
 g.shadowBlur=0;g.fillStyle='#b23060';g.beginPath();g.ellipse(0,1,4,5.5,0,0,TAU);g.fill();
 g.fillStyle='#fff3db';g.fillRect(-2,-1,1.2,1.6);g.fillRect(.8,-1,1.2,1.6);g.restore();
}
function shot(g,s){
 g.save();g.translate(s.x,s.y-7);g.shadowColor='#ec4070';g.shadowBlur=9;
 g.fillStyle='#be2457';g.beginPath();g.moveTo(0,-11);g.lineTo(3.8,-1);g.lineTo(0,9);g.lineTo(-3.8,-1);g.closePath();g.fill();
 g.fillStyle='#fff4de';g.beginPath();g.moveTo(0,-10);g.lineTo(0,6);g.lineTo(-1.9,-1);g.closePath();g.fill();g.restore();
}
function gate(g,gates,time,portalClock,label){
 const p=Math.sin(time*3)*1.7;g.save();g.translate(gates.x,gates.y);
 g.shadowBlur=16;g.shadowColor='#ef3e70';g.strokeStyle=portalClock>0?'#ffc0b3':'#ae3259';g.lineWidth=6;
 g.beginPath();g.ellipse(0,0,36,21,0,0,TAU);g.stroke();
 g.shadowBlur=0;g.fillStyle='#100919';g.beginPath();g.ellipse(0,0,30,16,0,0,TAU);g.fill();
 g.strokeStyle='#ffadac';g.lineWidth=1.4;g.beginPath();g.ellipse(0,0,30+p,15.8,0,0,TAU);g.stroke();
 for(let i=0;i<8;i++){const a=i*Math.PI/4+time*.2;g.fillStyle=i%2?'#d73a65':'#fcae99';
  g.beginPath();g.moveTo(Math.cos(a)*27,Math.sin(a)*13);
  g.lineTo(Math.cos(a+.15)*41,Math.sin(a+.15)*25);
  g.lineTo(Math.cos(a-.15)*41,Math.sin(a-.15)*25);g.closePath();g.fill()}
 g.restore();g.textAlign='center';g.fillStyle='#ffcbd2';g.font='bold 12px system-ui';
 g.fillText(label,gates.x,gates.y+46);
}
function moon(g){g.save();g.globalAlpha=.31;g.shadowBlur=29;g.shadowColor='#f03d68';
 g.fillStyle='#c84068';g.beginPath();g.arc(284,157,52,0,TAU);g.fill();
 g.globalAlpha=.23;g.shadowBlur=0;g.fillStyle='#14081b';g.beginPath();g.arc(305,146,48,0,TAU);g.fill();g.restore()}
window.RemiliaArt={brick,bat,shot,gate,moon};
})();