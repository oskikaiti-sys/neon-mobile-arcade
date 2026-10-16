/* Neon Arcade: lightweight Canvas skill-card animations (no timers / sound). */
(function(){
'use strict';
const tau=Math.PI*2,lim=(x,a,b)=>Math.max(a,Math.min(b,x));
const palettes={seal:['#ff779a','#fff7dc'],barrier:['#ac83ff','#ffe3ff'],binding:['#da96ff','#fff0fa'],heaven:['#ffe49f','#ff91c7'],orb:['#ff93ae','#fff8e8'],sonic:['#73e8ff','#fff4bf'],fever:['#ff8dca','#ffeab4'],bomb:['#ffae76','#fff3d7']};
class ArcadeSkillVFX{
 constructor(){this.effects=[]}
 clear(){this.effects.length=0}
 cast(kind,x,y,touhou,label='',flandre=false,remilia=false,sakuya=false,yukari=false){
  const life=kind==='heaven'||kind==='sonic'?1.38:kind==='bomb'?.56:kind==='orb'?.83:1.04;
  this.effects.push({kind,x,y,touhou,label,age:0,life,colors:yukari?['#c69aef','#f4d39b']:sakuya?['#c1dfff','#f2d5a9']:remilia?['#f74d74','#ffd5b2']:flandre?['#ff80c4','#ffe4a0']:(palettes[kind]||palettes.sonic),flandre,remilia,sakuya,yukari});
  if(this.effects.length>6)this.effects.splice(0,this.effects.length-6);
 }
 update(dt){for(let i=this.effects.length-1;i>=0;i--){const e=this.effects[i];e.age+=dt;if(e.age>=e.life)this.effects.splice(i,1)}}
 draw(c){
  for(const e of this.effects){
   const p=lim(e.age/e.life,0,1),a=lim(e.age*10,0,1)*(1-p),type=e.kind;
   const r=type==='heaven'||type==='sonic'?89:type==='barrier'?61:type==='binding'?74:type==='orb'?47:55;
   c.save();c.translate(e.x,e.y);c.globalAlpha=a*.69;c.shadowColor=e.colors[0];c.shadowBlur=9;c.strokeStyle=e.colors[0];c.lineWidth=2;
   for(let j=0;j<2;j++){c.beginPath();c.arc(0,0,r*(.45+j*.22)+p*20,0,tau);c.stroke()}
   c.shadowBlur=0;c.rotate((type==='barrier'?-1:1)*(.23+p*1.65));
   for(let i=0;i<12;i++){
    const ang=i*tau/12,inner=r*.53,outer=r*(.87+.22*p);
    c.strokeStyle=e.colors[i%2];c.lineWidth=i%3===0?2.3:1.1;
    c.beginPath();c.moveTo(Math.cos(ang)*inner,Math.sin(ang)*inner);c.lineTo(Math.cos(ang)*outer,Math.sin(ang)*outer);c.stroke();
   }
   if(e.yukari&&type!=='bomb'){
    // Yukari's original boundary-butterfly spell visuals stay separate from shrine ofuda.
    const n=type==='heaven'||type==='sonic'?18:12;
    for(let i=0;i<n;i++){
     const angle=i*tau/n+p*(i%2?-.5:.5),dist=(r*.53+p*31)*(i%2?1:.86);
     const x=Math.cos(angle)*dist,y=Math.sin(angle)*dist*.72;
     if(i%3===0&&window.YukariArt?.butterfly)window.YukariArt.butterfly(c,x,y,.33+p*.13,p*14+i);
     else{c.fillStyle=e.colors[i%2];c.beginPath();c.ellipse(x,y,2.8,5.5,angle,0,tau);c.fill()}
    }
    c.strokeStyle=e.colors[1];c.lineWidth=2;
    c.beginPath();c.ellipse(0,0,r*.75+p*12,r*.34+p*6,p*1.6,0,tau);c.stroke();
   }else if(['seal','sonic','heaven','fever'].includes(type)){
    const n=type==='heaven'||type==='sonic'?30:18;
    for(let i=0;i<n;i++){
     const ang=i*tau/n+p*(i%2?-.27:.27),dist=15+p*(r+31)+(i%3)*5;
     c.save();c.translate(Math.cos(ang)*dist,Math.sin(ang)*dist*.75);c.rotate(ang+Math.PI/2);
     c.fillStyle=e.colors[i%2];
     if(type==='seal'&&i%3===0){c.fillRect(-2.4,-7,4.8,14);c.fillStyle='#c84b6f';c.fillRect(-.65,-4,1.3,8)}
     else{c.beginPath();c.ellipse(0,0,3,5,0,0,tau);c.fill()}
     c.restore();
    }
   }else if(type==='barrier'){
    c.strokeStyle=e.colors[1];c.lineWidth=4;c.beginPath();c.ellipse(0,0,r*.81,r*.26,p*1.8,0,tau);c.stroke();
    for(let i=0;i<5;i++){
     const ang=i*tau/5+p*1.6,x=Math.cos(ang)*r*.6,y=Math.sin(ang)*r*.31;
     c.fillStyle='#fff3dc';c.beginPath();c.ellipse(x,y,5,2.6,ang,0,tau);c.fill();
     c.fillStyle='#a44c75';c.beginPath();c.arc(x,y,1.5,0,tau);c.fill();
    }
   }else if(type==='binding'){
    for(let i=-4;i<=4;i++){
     const x=i*30;c.lineWidth=2;c.strokeStyle=e.colors[i%2===0?0:1];
     c.beginPath();c.moveTo(x,-17-p*10);c.lineTo(x+9,0);c.lineTo(x,17+p*10);c.lineTo(x-9,0);c.closePath();c.stroke();
    }
    c.fillStyle=e.colors[1];c.fillRect(-180,-1.5,360,3);
   }else if(type==='orb'){
    for(let i=0;i<2;i++){
     const ang=p*tau*1.5+i*Math.PI,x=Math.cos(ang)*(21+p*31),y=Math.sin(ang)*(14+p*21);
     c.fillStyle=e.colors[i];c.beginPath();c.arc(x,y,10,0,tau);c.fill();
     c.fillStyle=e.colors[1-i];c.beginPath();c.arc(x+2,y-2,3,0,tau);c.fill();
    }
   }else if(type==='bomb'){
    for(let i=0;i<12;i++){
     const ang=i*tau/12,dist=12+p*65;c.lineWidth=2.6;c.strokeStyle=e.colors[i%2];
     c.beginPath();c.moveTo(Math.cos(ang)*dist*.2,Math.sin(ang)*dist*.2);
     c.lineTo(Math.cos(ang)*dist,Math.sin(ang)*dist);c.stroke();
    }
   }
   c.restore();
  }
 }
 drawBanners(c){
  for(const e of this.effects){
   if(!e.label||e.age>.91)continue;
   // Truly fixed HUD strip: first bricks y=65, Sukima center y=275.
   const opacity=lim(e.age*11,0,1)*Math.max(0,1-e.age/.91);
   const bannerTop=33,bannerHeight=26,textY=51;
   c.save();c.globalAlpha=opacity*.95;c.textAlign='center';c.font='900 12px system-ui';
   const width=lim(c.measureText(e.label).width+30,140,316);
   c.fillStyle=e.touhou?'#270b31e8':'#0b2941e8';
   c.beginPath();c.roundRect(180-width/2,bannerTop,width,bannerHeight,7);c.fill();
   c.lineWidth=1.25;c.strokeStyle=e.colors[0];c.stroke();
   c.shadowColor=e.colors[0];c.shadowBlur=5;c.fillStyle=e.colors[1];
   c.fillText(e.label,180,textY,width-16);
   c.restore();
  }
 }
}
window.ArcadeSkillVFX=ArcadeSkillVFX;
})();