/* NEON ARCADE Songbook · public-domain melodies, original synthesized performances. */
(function(){
'use strict';
const n=(m,b=1)=>[m,b];
const songs=[
 {id:'twinkle',names:['Twinkle, Twinkle, Little Star','小星星','きらきら星'],composer:'Traditional · public domain',bpm:98,root:60,bars:[
 [n(72),n(72),n(79),n(79)],[n(81),n(81),n(79,2)],
 [n(77),n(77),n(76),n(76)],[n(74),n(74),n(72,2)],
 [n(79),n(79),n(77),n(77)],[n(76),n(76),n(74,2)],
 [n(79),n(79),n(77),n(77)],[n(76),n(76),n(74,2)],
 [n(72),n(72),n(79),n(79)],[n(81),n(81),n(79,2)],
 [n(77),n(77),n(76),n(76)],[n(74),n(74),n(72,2)]]},
 {id:'frere',names:['Frère Jacques','两只老虎','フレール・ジャック'],composer:'Traditional · public domain',bpm:96,root:60,bars:[
 [n(72),n(74),n(76),n(72)],[n(72),n(74),n(76),n(72)],
 [n(76),n(77),n(79,2)],[n(76),n(77),n(79,2)],
 [n(79,.5),n(81,.5),n(79,.5),n(77,.5),n(76),n(72)],
 [n(79,.5),n(81,.5),n(79,.5),n(77,.5),n(76),n(72)],
 [n(72),n(67),n(72,2)],[n(72),n(67),n(72,2)]]},
 {id:'ode',names:['Ode to Joy (Theme)','欢乐颂（主题）','歓喜の歌（テーマ）'],composer:'L. van Beethoven · 1824',bpm:100,root:60,bars:[
 [n(76),n(76),n(77),n(79)],[n(79),n(77),n(76),n(74)],
 [n(72),n(72),n(74),n(76)],[n(76,1.5),n(74,.5),n(74,2)],
 [n(76),n(76),n(77),n(79)],[n(79),n(77),n(76),n(74)],
 [n(72),n(72),n(74),n(76)],[n(74,1.5),n(72,.5),n(72,2)],
 [n(74),n(74),n(76),n(72)],[n(74),n(76,.5),n(77,.5),n(76),n(72)],
 [n(74),n(76,.5),n(77,.5),n(76),n(74)],[n(72),n(74),n(67,2)],
 [n(76),n(76),n(77),n(79)],[n(79),n(77),n(76),n(74)],
 [n(72),n(72),n(74),n(76)],[n(74,2),n(72,2)]]},
 {"id":"septette","names":["Septette for the Dead Princess (Fan Arrangement)","亡き王女の為のセプテット（同人编配）","亡き王女の為のセプテット（同人アレンジ）"],"composer":"ZUN / Team Shanghai Alice · Touhou Project fan arrangement","bpm":114,"root":63,"bars":[[[55,1],[67,1],[75,1],[74,1]],[[67,1],[75,1],[74,1],[65,1]],[[55,1],[67,1],[75,1],[74,1]],[[68,1],[74,1],[75,1],[79,1]],[[75,1],[74,1],[72,1],[74,1]],[[75,1],[77,1],[74,1],[75,1]],[[72,1],[74,1],[75,1],[77,1]],[[74,1],[82,1],[79,2]],[[79,1],[82,1],[84,1],[77,1]],[[77,2],[80,1],[82,1]],[[75,1],[75,1],[72,0.5],[72,0.5],[74,1]],[[75,1],[77,1],[74,2]],[[72,1],[74,1],[75,1],[77,1]],[[74,1],[75,1],[72,1],[79,1]],[[75,1],[74,1],[72,1],[74,1]],[[75,2],[79,2]],[[75,1],[77,1],[74,1],[72,1]],[[82,1],[79,1],[77,1],[75,1]],[[79,1],[82,1],[84,1],[86,1]],[[84,1],[82,1],[79,2]],[[72,1],[72,1],[74,1],[75,1]],[[77,1],[74,1],[75,2]],[[75,1],[77,1],[79,1],[82,1]],[[84,1],[82,1],[79,2]],[[75,1],[72,1],[74,1],[75,1]],[[77,1],[79,1],[82,2]],[[84,1],[82,1],[79,1],[77,1]],[[75,1],[74,1],[72,2]],[[75,1],[77,1],[74,1],[72,1]],[[74,1],[75,1],[79,1],[82,1]],[[79,1],[77,1],[75,1],[74,1]],[[75,4]]]}
];
const color=['#76efff','#c0a3ff','#ffe08c','#ff9fcd','#8ef5c3','#f4ab87'];
function lang(){return window.ArcadeLang?.get?.()||'en'}
function loc(en,zh,ja){return lang()==='zh-CN'?zh:lang()==='ja'?ja:en}
function name(song){return song.names[lang()==='zh-CN'?1:lang()==='ja'?2:0]}
function create(audio,callbacks={}){
 const select=document.getElementById('songSelect');
 const progress=document.getElementById('songProgress');
 const track=document.getElementById('songName');
 const hint=document.getElementById('songHint');
 const touhouNotice=document.getElementById('touhouNotice');
 const LEAD=1.5,INTRO=2.3;
 let selected=0,clock=0,nextDue=INTRO,planned=0,resolved=0,perfectBars=0,barHits=0,barMisses=0,completed=0;
 let pending=new Map(),generation=0;
 try{const v=localStorage.getItem('neon-song-id');const at=songs.findIndex(s=>s.id===v);if(at>=0)selected=at}catch(_){}
 function pitch(midi){const a=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];return a[midi%12]+(Math.floor(midi/12)-1)}
 function entries(){return songs[selected].bars.flatMap((row,bar)=>row.map(([midi,beats],note)=>({bar,note,midi,beats})))}
 let notes=entries();
 function render(){
  const song=songs[selected];
  if(select){for(let i=0;i<songs.length;i++){const op=select.options[i];if(op)op.textContent=name(songs[i])}select.value=song.id}
  const index=resolved%notes.length;
  if(progress)progress.textContent=(notes[index].bar+1)+'/'+song.bars.length;
  if(track)track.textContent=name(song);
  if(hint)hint.textContent=loc('♪ Catch notes to play the melody · missed notes stay silent','♪ 用挡板接音符来弹奏旋律 · 漏接就会缺音','♪ 音符をキャッチして演奏 · 逃すと無音');
  if(touhouNotice){touhouNotice.hidden=song.id!=='septette';touhouNotice.textContent=loc('Touhou Project fan work · Original music: ZUN / Team Shanghai Alice · Unofficial free game','东方 Project 同人二创 · 原曲：ZUN／上海爱丽丝幻乐团 · 非官方免费游戏','東方Project 二次創作 · 原曲：ZUN／上海アリス幻樂団 · 非公式無料ゲーム');}
 }
 function resetTiming(){
  clock=0;nextDue=INTRO;planned=0;resolved=0;perfectBars=0;barHits=0;barMisses=0;pending.clear();generation++;
  notes=entries();render();
 }
 function choose(id){
  const next=songs.findIndex(s=>s.id===id);if(next<0)return;
  selected=next;resetTiming();
  try{localStorage.setItem('neon-song-id',id)}catch(_){}
  callbacks.onChange?.();render();
 }
 if(select)select.addEventListener('change',e=>choose(e.target.value));
 window.addEventListener('arcade-language-change',render);
 function makeEntry(seq,when){
  const entry=notes[seq%notes.length],song=songs[selected];
  return {song:song.id,generation,seq,when,bar:entry.bar,note:entry.note,midi:entry.midi,beats:entry.beats,
   bpm:song.bpm,label:pitch(entry.midi),color:color[(entry.bar+entry.note)%color.length]};
 }
 function update(dt,spawn){
  clock+=dt;
  let count=0;
  while(nextDue<=clock+LEAD&&count++<9){
   const entry=makeEntry(planned,nextDue);
   spawn(entry);
   planned++;
   nextDue+=entry.beats*(60/songs[selected].bpm);
   if(planned%notes.length===0)nextDue+=1.3;
  }
 }
 function resolve(drop,hit){
  if(!drop||drop.song!==songs[selected].id||drop.generation!==generation||drop.seq<resolved||pending.has(drop.seq))return {ok:false};
  pending.set(drop.seq,hit);
  if(hit)audio.pickupNote?.(drop.midi,drop.beats,drop.bpm);
  let measure=false,finale=false;
  while(pending.has(resolved)){
   const success=pending.get(resolved);pending.delete(resolved);
   const entry=notes[resolved%notes.length];if(success)barHits++;else barMisses++;
   const atEnd=(resolved+1)%notes.length===0;
   const nextEntry=notes[(resolved+1)%notes.length];
   const barEnded=atEnd||nextEntry.bar!==entry.bar;
   resolved++;
   if(barEnded){
    if(barMisses===0&&barHits===songs[selected].bars[entry.bar].length){
     measure=true;perfectBars++;callbacks.onBar?.(entry.bar,songs[selected]);
    }else{perfectBars=-99;callbacks.onImperfectBar?.(entry.bar)}
    barHits=0;barMisses=0;
   }
   if(atEnd){
    completed++;
    if(perfectBars===songs[selected].bars.length){finale=true;callbacks.onSong?.(songs[selected])}
    callbacks.onCycle?.(songs[selected]);perfectBars=0;
   }
  }
  render();return {ok:hit,measure,finale};
 }
 function catchNote(drop){return resolve(drop,true)}
 function miss(drop){const r=resolve(drop,false);if(r.ok===false&&drop&&drop.seq>=resolved-1)callbacks.onMiss?.(drop);return r}
 function reset(){resetTiming()}
 function current(){return makeEntry(planned,nextDue)}
 render();
 return {songs,current,update,catchNote,miss,reset,choose,render,getTime:()=>clock,
 getState:()=>({song:songs[selected].id,bar:notes[resolved%notes.length].bar,note:notes[resolved%notes.length].note,completed,
 barCount:songs[selected].bars.length,planned,resolved,perfectBars})};
}
window.NeonSongbook={songs,create};
})();