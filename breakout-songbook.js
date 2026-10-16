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
 {"id":"septette","names":["Septette for the Dead Princess (Verified Theme Excerpt)","亡き王女の為のセプテット（准确乐谱节选）","亡き王女の為のセプテット（採譜抜粋）"],"composer":"ZUN (original) · Yoji Suzuki / SUZUKI PLAN (MML arrangement)","bpm":146,"root":63,"bars":[[[78,1.5],[80,0.5],[77,1.5],[78,0.5]],[[75,2],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[85,0.5]],[[82,2],[82,0.5],[85,0.5],[87,0.5]],[[80,1],[80,1],[80,0.5],[82,0.5],[85,0.5]],[[78,1],[78,1],[75,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[74,0.5]],[[75,2],[77,2]],[[78,1.5],[80,0.5],[77,1.5],[78,0.5]],[[75,2],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[85,0.5]],[[82,2],[82,0.5],[85,0.5],[87,0.5]],[[80,1],[80,1],[80,0.5],[82,0.5],[85,0.5]],[[78,1],[78,1],[75,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[74,0.5]],[[75,2],[77,0.5],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[78,0.5]],[[75,2],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[85,0.5]],[[82,2],[82,0.5],[85,0.5],[87,0.5]],[[80,1],[80,1],[80,0.5],[82,0.5],[85,0.5]],[[78,1],[78,1],[75,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[74,0.5]],[[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[81,0.75],[80,0.5]],[[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[85,0.75],[83,0.5]],[[81,0.75],[80,0.75],[78,0.5],[77,0.75],[73,0.75],[71,0.5]],[[73,3],[73,0.5],[76,0.5]],[[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[81,0.75],[80,0.5]],[[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[85,0.75],[83,0.5]],[[81,0.75],[80,0.75],[78,0.5],[80,0.75],[81,0.75],[83,0.5]]],"lead":[[78,1.5],[80,0.5],[77,1.5],[78,0.5],[75,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[85,0.5],[82,2],[null,0.5],[82,0.5],[85,0.5],[87,0.5],[80,1],[80,1],[null,0.5],[80,0.5],[82,0.5],[85,0.5],[78,1],[78,1],[null,0.5],[75,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[74,0.5],[75,2],[77,2],[78,1.5],[80,0.5],[77,1.5],[78,0.5],[75,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[85,0.5],[82,2],[null,0.5],[82,0.5],[85,0.5],[87,0.5],[80,1],[80,1],[null,0.5],[80,0.5],[82,0.5],[85,0.5],[78,1],[78,1],[null,0.5],[75,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[74,0.5],[75,2],[77,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[78,0.5],[75,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[85,0.5],[82,2],[null,0.5],[82,0.5],[85,0.5],[87,0.5],[80,1],[80,1],[null,0.5],[80,0.5],[82,0.5],[85,0.5],[78,1],[78,1],[null,0.5],[75,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[74,0.5],[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[81,0.75],[80,0.5],[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[85,0.75],[83,0.5],[81,0.75],[80,0.75],[78,0.5],[77,0.75],[73,0.75],[71,0.5],[73,3],[73,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[81,0.75],[80,0.5],[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[85,0.75],[83,0.5],[81,0.75],[80,0.75],[78,0.5],[80,0.75],[81,0.75],[83,0.5]],"source":"https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT012.mml","originalLeadChannel":1}
];
// Accurately sourced MML: significant melody tones are playable, rapid ornaments automatic.
const touhouSong=songs.find(s=>s.id==='septette');
if(touhouSong?.lead){
 let offset=0;const primary=[];
 for(let i=0;i<touhouSong.lead.length;i++){
  const [midi,duration]=touhouSong.lead[i],start=offset;offset+=duration;
  if(midi===null)continue;
  primary.push({midi,beats:duration,start,bar:Math.floor(start/4),leadIndex:i});
 }
 // Tightly spaced notes share a landing lane; move lanes only between phrases.
 let group=0,lastStart=-Infinity;
 for(const event of primary){
  if(event.start-lastStart>1.25)group++;
  event.laneX=180+Math.round(Math.sin(group*1.45)*64);
  lastStart=event.start;
 }
 touhouSong.playable=primary;
 touhouSong.playableIndices=new Set(primary.map(x=>x.leadIndex));
 touhouSong.totalBeats=offset;
 touhouSong.bars=Array.from({length:Math.ceil(offset/4)},()=>[]);
 for(const event of primary){event.note=touhouSong.bars[event.bar].length;touhouSong.bars[event.bar].push([event.midi,event.beats])}
}
// Original five MML accompaniment channels loaded before the songbook.
if(touhouSong)touhouSong.scoreBacking=window.TouhouScoreAccompaniment?.events||[];
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
 let pending=new Map(),generation=0,melodyDue=INTRO,melodyIndex=0,backingIndex=0;
 try{const v=localStorage.getItem('neon-song-id');const at=songs.findIndex(s=>s.id===v);if(at>=0)selected=at}catch(_){}
 function pitch(midi){const a=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];return a[midi%12]+(Math.floor(midi/12)-1)}
 function entries(){const song=songs[selected];return song.playable||song.bars.flatMap((row,bar)=>row.map(([midi,beats],note)=>({bar,note,midi,beats})))}
 let notes=entries();
 function render(){
  const song=songs[selected];
  if(select){for(let i=0;i<songs.length;i++){const op=select.options[i];if(op)op.textContent=name(songs[i])}select.value=song.id}
  const index=resolved%notes.length;
  if(progress)progress.textContent=(notes[index].bar+1)+'/'+song.bars.length;
  if(track)track.textContent=name(song);
  if(hint)hint.textContent=song.playable?
   loc('♪ Play every melody note · rapid notes share the same landing lane','♪ 主旋律音符全部保留 · 连续音符会落在相近的位置','♪ 主旋律は全音符を演奏 · 速い連続音は同じ場所に落下'):
   loc('♪ Catch notes to play the melody · missed notes stay silent','♪ 用挡板接音符来弹奏旋律 · 漏接就会缺音','♪ 音符をキャッチして演奏 · 逃すと無音');
  if(touhouNotice){touhouNotice.hidden=song.id!=='septette';touhouNotice.textContent=loc(
   'Touhou fan work · Original: ZUN / Team Shanghai Alice · MML: Yoji Suzuki / SUZUKI PLAN · unofficial',
   '东方同人二创 · 原曲：ZUN／上海爱丽丝幻乐团 · MML 编配：Yoji Suzuki／SUZUKI PLAN · 非官方',
   '東方二次創作 · 原曲：ZUN／上海アリス幻樂団 · MML編曲：Yoji Suzuki／SUZUKI PLAN · 非公式');}
 }
 function resetTiming(){
  clock=0;nextDue=INTRO;melodyDue=INTRO;melodyIndex=0;backingIndex=0;planned=0;resolved=0;perfectBars=0;barHits=0;barMisses=0;pending.clear();generation++;
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
   bpm:song.bpm,label:pitch(entry.midi),color:color[(entry.bar+entry.note)%color.length],laneX:entry.laneX};
 }
 function update(dt,spawn){
  clock+=dt;const song=songs[selected];
  if(song.playable){
   // Schedule each written note/rest timeline from the five non-lead MML channels.
   if(song.scoreBacking?.length){
    let n=0;
    while(n++<70){
     const cycle=Math.floor(backingIndex/song.scoreBacking.length);
     const note=song.scoreBacking[backingIndex%song.scoreBacking.length];
     const due=INTRO+cycle*(song.totalBeats*60/song.bpm+1.3)+note[0]*60/song.bpm;
     const ahead=due-clock;
     if(ahead>.35)break;
     audio.playScoreBacking?.(note[1],note[2],song.bpm,note[3],note[4],Math.max(0,ahead));
     backingIndex++;
    }
   }
   // Drums remain soft; no artificial bass stabs.
   // Rapid notes copied from the source melody add quiet automatic flourishes.
   let flourishes=0;
   while(melodyDue<=clock+.015&&flourishes++<15){
    const [midi,duration]=song.lead[melodyIndex];
    if(midi!==null&&!song.playableIndices.has(melodyIndex))
     audio.playAutoFlourish?.(midi,duration,song.bpm);
    melodyDue+=duration*60/song.bpm;melodyIndex++;
    if(melodyIndex>=song.lead.length){melodyIndex=0;melodyDue+=1.3}
   }
   // Falling playable notes preserve the exact onset time of the score.
   let count=0;
   while(count++<12){
    const entry=notes[planned%notes.length],cycle=Math.floor(planned/notes.length);
    const due=INTRO+cycle*(song.totalBeats*60/song.bpm+1.3)+entry.start*60/song.bpm;
    if(due>clock+LEAD)break;
    spawn(makeEntry(planned,due));planned++;
   }
   return;
  }
  let count=0;
  while(nextDue<=clock+LEAD&&count++<9){
   const entry=makeEntry(planned,nextDue);spawn(entry);planned++;
   nextDue+=entry.beats*(60/song.bpm);
   if(planned%notes.length===0)nextDue+=1.3;
  }
 }
 function resolve(drop,hit){
  if(!drop||drop.song!==songs[selected].id||drop.generation!==generation||drop.seq<resolved||pending.has(drop.seq))return {ok:false};
  pending.set(drop.seq,hit);
  if(hit){if(songs[selected].playable)audio.playLeadNote?.(drop.midi,drop.beats,drop.bpm);else audio.pickupNote?.(drop.midi,drop.beats,drop.bpm)}
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