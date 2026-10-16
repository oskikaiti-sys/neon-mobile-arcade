/* Yukari Yakumo boundary skin + small central devices for Reimu and Flandre.
 * Canvas artwork only: collision radii, shooting physics and score timing stay untouched.
 * Original fan-made shapes, no character/game sprites.
 */
(function(){
'use strict';
const TAU=Math.PI*2;
function ellipse(g,x,y,rx,ry,fill,stroke='',width=1){
 g.beginPath();g.ellipse(x,y,rx,ry,0,0,TAU);
 if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=width;g.stroke()}
}
function background(g,t){
 g.save();g.globalAlpha=.24;
 // Thin parallel boundary lines in the negative space around the bricks.
 for(let j=0;j<7;j++){
  const y=90+j*62,x=180+Math.sin(t*.3+j)*12;
  g.strokeStyle=j%2?'#c4a1ff':'#edce89';g.lineWidth=j%2?1.3:.8;
  g.beginPath();g.moveTo(x-210,y-22);g.bezierCurveTo(x-92,y-39,x+70,y+19,x+210,y-13);g.stroke();
 }
 for(let i=0;i<15;i++){
  const x=14+(i*61)%332,y=65+(i*91)%360,a=t*.65+i*.78;
  g.fillStyle='#f4d49d';g.save();g.translate(x,y);g.rotate(a);
  g.beginPath();g.moveTo(0,-3);g.quadraticCurveTo(6,-6,7,0);g.quadraticCurveTo(3,5,0,2);g.quadraticCurveTo(-3,5,-7,0);g.quadraticCurveTo(-6,-6,0,-3);g.fill();g.restore();
 }
 g.restore();
}
function boundaryBrick(g,b){
 const x=b.x+b.w/2,y=b.y+b.h/2,w=b.w,h=b.h;
 g.save();g.translate(x,y);
 let gr=g.createLinearGradient(-w/2,-h/2,w/2,h/2);
 gr.addColorStop(0,'#9472b3');gr.addColorStop(.52,'#49285f');gr.addColorStop(1,'#1d153b');
 g.shadowColor='#9f6dd2';g.shadowBlur=6;
 g.fillStyle=gr;g.beginPath();g.roundRect(-w*.48,-h*.46,w*.96,h*.92,3);g.fill();
 g.shadowBlur=0;g.strokeStyle='#e2bd81';g.lineWidth=1;g.stroke();
 g.strokeStyle='#bc94d5';g.lineWidth=.7;
 g.beginPath();g.moveTo(-w*.36,0);g.lineTo(-7,0);g.moveTo(7,0);g.lineTo(w*.36,0);
 g.moveTo(0,-h*.37);g.lineTo(0,-4);g.moveTo(0,4);g.lineTo(0,h*.37);g.stroke();
 g.strokeStyle='#eccf9f';g.lineWidth=1.15;g.beginPath();g.arc(0,0,4.6,0,TAU);g.stroke();
 g.fillStyle=b.type==='bomb'?'#ff96bc':b.type==='power'?'#f6dc91':'#f0d3ac';
 g.beginPath();g.arc(0,0,b.type==='bomb'?3.2:2.1,0,TAU);g.fill();
 if(b.type==='armor'){g.strokeStyle='#f7e8c6';g.lineWidth=2;g.strokeRect(-w*.4,-h*.37,w*.8,h*.74)}
 g.restore();
}
function butterfly(g,x,y,scale,t,accent='#ecd2ff'){
 g.save();g.translate(x,y);g.scale(scale,scale);g.shadowColor=accent;g.shadowBlur=8;
 for(const side of [-1,1]){
  const flap=.93+.13*Math.sin(t);
  g.save();g.scale(side*flap,1);
  g.fillStyle='#d2a5e8';g.strokeStyle='#f4d699';g.lineWidth=.9;
  g.beginPath();g.moveTo(0,-2);g.bezierCurveTo(4,-17,16,-17,17,-5);g.quadraticCurveTo(14,1,2,1);g.closePath();g.fill();g.stroke();
  g.fillStyle='#7951a3';g.beginPath();g.moveTo(1,0);g.bezierCurveTo(9,2,14,10,7,13);g.quadraticCurveTo(1,14,0,3);g.fill();
  ellipse(g,10,-8,2.2,2,'#ffedbc');
  ellipse(g,7,7,1.3,1.6,'#ebc6ff');
  g.restore();
 }
 g.shadowBlur=0;ellipse(g,0,1,1.9,7,'#f5dba5');
 g.strokeStyle='#ffe8c3';g.lineWidth=.7;g.beginPath();g.moveTo(-.6,-5);g.lineTo(-4,-9);g.moveTo(.6,-5);g.lineTo(4,-9);g.stroke();g.restore();
}
function drone(g,s,i,t){butterfly(g,s.x,s.y+Math.sin(t*5+i)*1.6,.67,t*7+i)}
function projectile(g,s){
 g.save();g.translate(s.x,s.y-5);
 g.shadowColor='#d8a4ff';g.shadowBlur=9;g.fillStyle='#f2d59b';
 g.beginPath();g.moveTo(0,-12);g.lineTo(4,0);g.lineTo(0,9);g.lineTo(-4,0);g.closePath();g.fill();
 g.shadowBlur=0;g.strokeStyle='#9257b2';g.lineWidth=1;g.beginPath();g.moveTo(0,-10);g.lineTo(0,8);g.stroke();
 ellipse(g,0,0,2.2,3,'#a863d0');g.restore();
}
function boundaryGate(g,gate,t,charge,label){
 g.save();g.translate(gate.x,gate.y);
 const pulse=1.1*Math.sin(t*3);
 g.shadowColor=charge>0?'#f9d790':'#b88be9';g.shadowBlur=20;
 g.fillStyle='#563276';g.beginPath();
 g.moveTo(-43,-3);g.bezierCurveTo(-30,-25,22,-26,44,-3);
 g.bezierCurveTo(25,0,-20,0,-43,-3);g.fill();
 g.fillStyle='#b38acf';g.beginPath();g.moveTo(-43,4);g.bezierCurveTo(-14,25,25,24,44,0);g.bezierCurveTo(17,6,-25,10,-43,4);g.fill();
 g.fillStyle='#0c071d';g.beginPath();g.moveTo(-38,0);g.bezierCurveTo(-17,-12-pulse,21,-13-pulse,38,0);g.bezierCurveTo(18,15+pulse,-20,14+pulse,-38,0);g.fill();
 g.shadowBlur=0;g.strokeStyle='#f5d694';g.lineWidth=2.2;g.beginPath();
 g.moveTo(-40,0);g.bezierCurveTo(-18,-14-pulse,18,-15-pulse,40,0);
 g.bezierCurveTo(20,16+pulse,-19,16+pulse,-40,0);g.stroke();
 for(let i=0;i<5;i++){
  let x=-27+i*13,y=Math.sin(t*2+i)*2+(i%2?2:-1);
  ellipse(g,x,y,4.2,2.5,'#ffedbf');
  ellipse(g,x+Math.sin(t+i)*.8,y,1.1,2,'#8d4487');
 }
 g.restore();g.textAlign='center';g.fillStyle='#f6dfa7';g.font='bold 11px system-ui';
 g.fillText(label,gate.x,gate.y+48);
}
function reimuDonationBox(g,gate,t,charge,label){
 g.save();g.translate(gate.x,gate.y+2);
 g.shadowColor=charge>0?'#ffe4a0':'#faadbb';g.shadowBlur=charge>0?20:7;
 // Lacquered saisen-bako: upper rim/slit are deliberately unmistakable.
 g.fillStyle='#542c30';g.beginPath();g.moveTo(-35,-18);g.lineTo(35,-18);g.lineTo(29,-10);g.lineTo(-29,-10);g.closePath();g.fill();
 g.fillStyle='#b36a49';g.beginPath();g.moveTo(-29,-10);g.lineTo(29,-10);g.lineTo(27,20);g.lineTo(-27,20);g.closePath();g.fill();
 g.shadowBlur=0;g.fillStyle='#f0bf80';g.fillRect(-25,-7,50,4);
 g.fillStyle='#261b21';g.beginPath();g.roundRect(-22,-16,44,4,2);g.fill();
 g.strokeStyle='#e7b37a';g.lineWidth=2.2;for(let x=-19;x<=19;x+=9){g.beginPath();g.moveTo(x,-5);g.lineTo(x,16);g.stroke()}
 g.strokeStyle='#642b32';g.lineWidth=1.3;g.strokeRect(-26,-8,52,27);
 g.fillStyle='#f8e8cb';g.font='900 12px serif';g.textAlign='center';g.fillText('賽',0,10);
 if(charge>0){g.fillStyle='#ffecac';ellipse(g,0,-25,3,5,'#ffedab');}
 g.restore();g.textAlign='center';g.fillStyle='#ffe5d6';g.font='bold 11px system-ui';
 g.fillText(label,gate.x,gate.y+47);
}
function forbiddenGate(g,gate,t,charge,label){
 // Flandre's sealed Scarlet Devil Mansion basement gate.
 // Pure Canvas skin: no change to the existing portal's physics or hitbox.
 const active=charge>0,opening=active?Math.min(1,charge*2.3):0;
 const separation=opening*10,glow=active?21:7;
 g.save();g.translate(gate.x,gate.y);
 g.shadowColor=active?'#ff728b':'#8d324b';g.shadowBlur=glow;
 // Pointed gothic arch, black-iron outer frame and aged gold inner edging.
 g.fillStyle='#150d17';g.beginPath();
 g.moveTo(-32,29);g.lineTo(-32,-18);g.quadraticCurveTo(-32,-31,0,-41);
 g.quadraticCurveTo(32,-31,32,-18);g.lineTo(32,29);g.closePath();g.fill();
 g.shadowBlur=0;g.strokeStyle='#aa7657';g.lineWidth=3;g.stroke();
 g.strokeStyle='#4e3540';g.lineWidth=2;g.beginPath();
 g.moveTo(-27,24);g.lineTo(-27,-17);g.quadraticCurveTo(-27,-27,0,-35);
 g.quadraticCurveTo(27,-27,27,-17);g.lineTo(27,24);g.stroke();
 // Magical light lives *behind* the doors; opening the doors reveals it.
 const light=g.createLinearGradient(-23,-16,23,20);
 light.addColorStop(0,'#a43963');light.addColorStop(.19,'#f69ab4');
 light.addColorStop(.37,'#ffd99b');light.addColorStop(.53,'#94e2d1');
 light.addColorStop(.7,'#9abafa');light.addColorStop(.87,'#e2a5fa');
 light.addColorStop(1,'#b84781');
 g.save();g.globalAlpha=active?.94:.34;g.fillStyle=light;
 g.beginPath();g.moveTo(0,-30);g.lineTo(24,-17);g.lineTo(24,24);
 g.lineTo(-24,24);g.lineTo(-24,-17);g.closePath();g.fill();g.restore();
 // Black-red double leaves slide open slightly when the teleport is activated.
 for(const side of [-1,1]){
  g.save();g.translate(side*separation,0);
  const panel=g.createLinearGradient(side*-27,-20,side*1,25);
  panel.addColorStop(0,'#190f1b');panel.addColorStop(.6,'#481c2b');panel.addColorStop(1,'#741f36');
  g.fillStyle=panel;g.beginPath();
  g.moveTo(0,-29);g.quadraticCurveTo(side*18,-27,side*25,-17);
  g.lineTo(side*25,23);g.lineTo(0,23);g.closePath();g.fill();
  g.strokeStyle='#b18a60';g.lineWidth=1.55;g.stroke();
  // A small iron cross-brace and antique brass hinge studs.
  g.strokeStyle='#683e47';g.lineWidth=2;
  g.beginPath();g.moveTo(side*6,-14);g.lineTo(side*20,15);
  g.moveTo(side*20,-13);g.lineTo(side*7,16);g.stroke();
  g.strokeStyle='#b48a5b';g.lineWidth=1;
  g.beginPath();g.moveTo(side*4,-22);g.lineTo(side*4,18);g.stroke();
  for(const y of [-14,12]){
   g.fillStyle='#ddb57a';g.beginPath();g.arc(side*21,y,1.5,0,TAU);g.fill();
  }
  g.fillStyle='#e0b77b';g.beginPath();g.arc(side*5,3,1.7,0,TAU);g.fill();
  g.restore();
 }
 // Broken golden seal suspended at the seam. Its split reveals the taboo.
 for(const side of [-1,1]){
  g.save();g.translate(side*separation,0);
  g.strokeStyle=active?'#ffd5ad':'#c5a16c';g.lineWidth=1.6;
  g.beginPath();g.arc(0,-6,9,side<0?Math.PI/2:-Math.PI/2,side<0?Math.PI*1.5:Math.PI*.5,side<0);g.stroke();
  g.strokeStyle='#d2a06c';g.lineWidth=1;
  g.beginPath();g.moveTo(0,-15);g.lineTo(side*7,-6);g.lineTo(0,3);g.stroke();
  g.restore();
 }
 // Restrained multicolor shine at the seam, rather than a giant crystal core.
 g.save();g.globalAlpha=active?.91:.38;
 g.strokeStyle=active?'#ffe9bc':'#bf798f';g.lineWidth=active?2.6:1;
 g.shadowColor='#ff7fb3';g.shadowBlur=active?16:3;
 g.beginPath();g.moveTo(0,-23);g.lineTo(0,20);g.stroke();g.restore();
 // Teleport flare: tiny crimson embers and rainbow motes, no permanent clutter.
 if(active){
  const sparks=['#ff658d','#ffc47e','#f3eaa2','#8be7ce','#a7b4ff','#d8a0f2'];
  for(let i=0;i<12;i++){
   const ang=i*TAU/12+t*.9,dist=22+(1-opening)*7+(i%3)*4;
   const x=Math.cos(ang)*dist,y=Math.sin(ang)*dist*.9;
   g.globalAlpha=.5+.4*opening;g.fillStyle=sparks[i%sparks.length];
   g.beginPath();g.arc(x,y,i%3===0?2.1:1.3,0,TAU);g.fill();
  }
  g.globalAlpha=1;
 }
 // Iron keystone + discreet side flourishes frame the gate.
 g.fillStyle='#d4ae79';g.beginPath();g.moveTo(-5,-39);g.lineTo(5,-39);
 g.lineTo(4,-31);g.lineTo(0,-28);g.lineTo(-4,-31);g.closePath();g.fill();
 g.strokeStyle='#9e6d63';g.lineWidth=1.5;
 for(const side of [-1,1]){
  g.beginPath();g.moveTo(side*32,-15);g.lineTo(side*37,-20);
  g.moveTo(side*32,14);g.lineTo(side*37,19);g.stroke();
 }
 g.restore();
 g.save();g.textAlign='center';g.fillStyle='#ffe1d0';
 g.font='bold 11px system-ui';g.fillText(label,gate.x,gate.y+48);g.restore();
}

window.YukariArt={background,brick:boundaryBrick,drone,shot:projectile,gate:boundaryGate,reimuBox:reimuDonationBox,forbiddenGate,butterfly};
})();
