/* NEON ARCADE Songbook · public-domain melodies, original synthesized performances. */
(function(){
'use strict';
const n=(m,b=1)=>[m,b];
const songs=[
 {id:'twinkle',names:['Twinkle, Twinkle, Little Star','小星星','きらきら星'],composer:'Traditional · public domain',bpm:126,root:60,bars:[
 [n(72),n(72),n(79),n(79)],[n(81),n(81),n(79,2)],
 [n(77),n(77),n(76),n(76)],[n(74),n(74),n(72,2)],
 [n(79),n(79),n(77),n(77)],[n(76),n(76),n(74,2)],
 [n(79),n(79),n(77),n(77)],[n(76),n(76),n(74,2)],
 [n(72),n(72),n(79),n(79)],[n(81),n(81),n(79,2)],
 [n(77),n(77),n(76),n(76)],[n(74),n(74),n(72,2)]]},
 {id:'frere',names:['Frère Jacques','两只老虎','フレール・ジャック'],composer:'Traditional · public domain',bpm:128,root:60,bars:[
 [n(72),n(74),n(76),n(72)],[n(72),n(74),n(76),n(72)],
 [n(76),n(77),n(79,2)],[n(76),n(77),n(79,2)],
 [n(79,.5),n(81,.5),n(79,.5),n(77,.5),n(76),n(72)],
 [n(79,.5),n(81,.5),n(79,.5),n(77,.5),n(76),n(72)],
 [n(72),n(67),n(72,2)],[n(72),n(67),n(72,2)]]},
 {id:'ode',names:['Ode to Joy (Theme)','欢乐颂（主题）','歓喜の歌（テーマ）'],composer:'L. van Beethoven · 1824',bpm:132,root:60,bars:[
 [n(76),n(76),n(77),n(79)],[n(79),n(77),n(76),n(74)],
 [n(72),n(72),n(74),n(76)],[n(76,1.5),n(74,.5),n(74,2)],
 [n(76),n(76),n(77),n(79)],[n(79),n(77),n(76),n(74)],
 [n(72),n(72),n(74),n(76)],[n(74,1.5),n(72,.5),n(72,2)],
 [n(74),n(74),n(76),n(72)],[n(74),n(76,.5),n(77,.5),n(76),n(72)],
 [n(74),n(76,.5),n(77,.5),n(76),n(74)],[n(72),n(74),n(67,2)],
 [n(76),n(76),n(77),n(79)],[n(79),n(77),n(76),n(74)],
 [n(72),n(72),n(74),n(76)],[n(74,2),n(72,2)]]}
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
 let selected=0,bar=0,note=0,completed=0;
 try{const v=localStorage.getItem('neon-song-id');const at=songs.findIndex(s=>s.id===v);if(at>=0)selected=at}catch(_){}
 function render(){
  const song=songs[selected];if(!song)return;
  if(select){
   for(let i=0;i<songs.length;i++){const op=select.options[i];if(op)op.textContent=name(songs[i])}
   select.value=song.id;
  }
  if(progress)progress.textContent=(bar+1)+'/'+song.bars.length;
  if(track)track.textContent=name(song);
  if(hint)hint.textContent=loc('♪ Collect notes in order · each bar powers your fleet','♪ 按顺序接音符 · 每完成一小节强化舰队','♪ 音符を順番に集める · 小節完成で火力強化');
 }
 function choose(id){
  const next=songs.findIndex(s=>s.id===id);if(next<0)return;
  selected=next;bar=0;note=0;
  try{localStorage.setItem('neon-song-id',id)}catch(_){}
  callbacks.onChange?.();render();
 }
 if(select)select.addEventListener('change',e=>choose(e.target.value));
 window.addEventListener('arcade-language-change',render);
 function current(){
  const song=songs[selected],row=song.bars[bar],entry=row[note];
  return {song:song.id,bar,note,midi:entry[0],beats:entry[1],label:pitch(entry[0]),color:color[(bar+note)%color.length]};
 }
 function pitch(midi){const a=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];return a[midi%12]+(Math.floor(midi/12)-1)}
 function catchNote(drop){
  const now=current();
  if(!drop||drop.song!==now.song||drop.bar!==now.bar||drop.note!==now.note){miss();return {ok:false}}
  audio.pickupNote?.(now.midi);
  const finishedRow=songs[selected].bars[bar];
  note++;
  let measure=false,finale=false;
  if(note>=finishedRow.length){
   measure=true;const completedBar=bar;
   bar++;note=0;
   if(bar>=songs[selected].bars.length){finale=true;completed++;bar=0}
   callbacks.onBar?.(completedBar,songs[selected]);
   if(finale){audio.playFullSong?.(songs[selected]);callbacks.onSong?.(songs[selected])}
   else audio.playBar?.(finishedRow,songs[selected].bpm,songs[selected].root);
  }
  render();
  return {ok:true,measure,finale,note:now};
 }
 function miss(){if(note){note=0;callbacks.onMiss?.()}render()}
 function reset(){bar=0;note=0;render()}
 render();
 return {songs,current,catchNote,miss,reset,choose,render,getState:()=>({song:songs[selected].id,bar,note,completed,barCount:songs[selected].bars.length})};
}
window.NeonSongbook={songs,create};
})();