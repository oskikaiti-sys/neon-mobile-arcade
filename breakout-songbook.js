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
 {"id":"septette","names":["Septette for the Dead Princess (Verified Theme Excerpt)","亡き王女の為のセプテット（准确乐谱节选）","亡き王女の為のセプテット（採譜抜粋）"],"composer":"ZUN (original) · Yoji Suzuki / SUZUKI PLAN (MML arrangement)","bpm":146,"root":63,"bars":[[[90,2],[84,2]],[[87,2],[82,2]],[[90,2],[84,2]],[[92,2],[92,2]],[[92,2],[89,2]],[[90,2],[82,2]],[[90,2],[84,2]],[[87,2],[84,2]],[[89,2],[77,2]],[[78,2],[75,2]],[[85,2],[80,2]],[[84,2],[85,2]],[[83,2],[84,2]],[[82,2],[75,2]],[[85,2],[72,2]],[[78,2],[75,2]],[[89,2],[77,2]],[[78,2],[75,2]],[[85,2],[80,2]],[[84,2],[85,2]],[[83,2],[84,2]],[[82,2],[75,2]],[[85,2],[72,2]],[[76,2],[75,2]],[[76,2],[78,2]],[[78,2],[66,2]],[[73,2],[71,2]],[[76,2],[75,2]],[[76,2],[78,2]],[[78,2],[78,2]]],"lead":[[78,1.5],[80,0.5],[77,1.5],[78,0.5],[75,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[85,0.5],[82,2],[null,0.5],[82,0.5],[85,0.5],[87,0.5],[80,1],[80,1],[null,0.5],[80,0.5],[82,0.5],[85,0.5],[78,1],[78,1],[null,0.5],[75,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[74,0.5],[75,2],[77,1.75],[70,1.5],[77,0.5],[68,1.5],[70,0.5],[66,2],[null,0.5],[66,1],[68,0.5],[70,1.5],[73,1],[75,0.5],[73,1],[72,2],[null,0.5],[75,0.5],[77,0.5],[78,0.5],[71,1],[71,1],[null,0.5],[71,0.5],[73,0.5],[77,0.5],[70,1],[70,1],[null,0.5],[66,0.5],[66,0.5],[68,0.5],[70,1.5],[73,0.5],[68,1.5],[65,0.5],[66,2.5],[66,1],[68,0.5],[70,1.5],[77,0.5],[68,1.5],[70,0.5],[66,2],[null,0.5],[66,1],[68,0.5],[70,1.5],[73,1],[75,0.5],[73,1],[72,2],[null,0.5],[75,0.5],[77,0.5],[78,0.5],[71,1],[71,1],[null,0.5],[71,0.5],[73,0.5],[77,0.5],[70,1],[70,1],[null,0.5],[66,0.5],[66,0.5],[68,0.5],[70,1.5],[73,0.5],[68,1.5],[65,0.5],[66,0.5],[64,0.5],[66,0.5],[64,0.5],[66,0.75],[69,0.75],[68,0.5],[66,0.5],[64,0.5],[66,0.5],[64,0.5],[66,0.75],[73,0.75],[71,0.5],[69,0.75],[68,0.75],[66,0.5],[65,0.75],[61,0.75],[59,0.5],[61,3],[61,0.5],[64,0.5],[66,0.5],[64,0.5],[66,0.5],[64,0.5],[66,0.75],[69,0.75],[68,0.5],[66,0.5],[64,0.5],[66,0.5],[64,0.5],[66,0.75],[73,0.75],[71,0.5],[69,0.75],[68,0.75],[66,0.5],[68,0.75],[69,0.75],[71,0.5],[null,0.25]],"source":"https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT012.mml"}
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
// Soft background harmonies: sampled from aligned source MML Ch0/Ch3/Ch4.
// Omit adjacent semitone clashes when sustaining instantaneous notes.
if(touhouSong)touhouSong.harmony=[{"beat":0,"tones":[51,66]},{"beat":2,"tones":[49,66]},{"beat":4,"tones":[47,66]},{"beat":6,"tones":[47,66]},{"beat":8,"tones":[51,58]},{"beat":10,"tones":[49,58,65]},{"beat":12,"tones":[48,68,65]},{"beat":14,"tones":[48,66]},{"beat":16,"tones":[44,63]},{"beat":18,"tones":[44,61]},{"beat":20,"tones":[54,72]},{"beat":22,"tones":[54,61]},{"beat":24,"tones":[47,63]},{"beat":26,"tones":[50,65,70]},{"beat":28,"tones":[51,66]},{"beat":30,"tones":[53,68]},{"beat":32,"tones":[58,63]},{"beat":34,"tones":[56,61]},{"beat":36,"tones":[66,59]},{"beat":38,"tones":[66,59]},{"beat":40,"tones":[58,63]},{"beat":42,"tones":[58,61]},{"beat":44,"tones":[56,60]},{"beat":46,"tones":[56,60]},{"beat":48,"tones":[63,68]},{"beat":50,"tones":[63,68]},{"beat":52,"tones":[61,66]},{"beat":54,"tones":[61,66]},{"beat":56,"tones":[63,68]},{"beat":58,"tones":[65,70]},{"beat":60,"tones":[66,59]},{"beat":62,"tones":[56,61]},{"beat":64,"tones":[63,58]},{"beat":66,"tones":[58,65]},{"beat":68,"tones":[59,66]},{"beat":70,"tones":[59,66]},{"beat":72,"tones":[63,58]},{"beat":74,"tones":[61,68]},{"beat":76,"tones":[66,60]},{"beat":78,"tones":[60,67]},{"beat":80,"tones":[68,63]},{"beat":82,"tones":[68,63]},{"beat":84,"tones":[61,66]},{"beat":86,"tones":[63,66]},{"beat":88,"tones":[66,70]},{"beat":90,"tones":[65,68]},{"beat":92,"tones":[62,68]},{"beat":94,"tones":[62,69]},{"beat":96,"tones":[61,64]},{"beat":98,"tones":[61,68]},{"beat":100,"tones":[57,65]},{"beat":102,"tones":[65,61]},{"beat":104,"tones":[57,66]},{"beat":106,"tones":[57,66]},{"beat":108,"tones":[62,69]},{"beat":110,"tones":[62,69]},{"beat":112,"tones":[59,66]},{"beat":114,"tones":[61,68]},{"beat":116,"tones":[65,60]},{"beat":118,"tones":[66,61]}];
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
 let pending=new Map(),generation=0,melodyDue=INTRO,melodyIndex=0,harmonyIndex=0;
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
  clock=0;nextDue=INTRO;melodyDue=INTRO;melodyIndex=0;harmonyIndex=0;planned=0;resolved=0;perfectBars=0;barHits=0;barMisses=0;pending.clear();generation++;
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
   // Background chords built from source-aligned accompaniment; soft entrances.
   if(song.harmony){
    let count=0;
    while(count++<8){
     const cycle=Math.floor(harmonyIndex/song.harmony.length);
     const chord=song.harmony[harmonyIndex%song.harmony.length];
     const due=INTRO+cycle*(song.totalBeats*60/song.bpm+1.3)+chord.beat*60/song.bpm;
     if(due>clock+.02)break;
     audio.playHarmony?.(chord.tones,2,song.bpm);
     harmonyIndex++;
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