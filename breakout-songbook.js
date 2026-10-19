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
 {id:'furelise',names:['Für Elise · Complete Piano Score','致爱丽丝（完整钢琴谱）','エリーゼのために（全曲）'],composer:'Ludwig van Beethoven · WoO 59 · public domain',bpm:72,root:57,barBeats:1.5,lead:window.FurEliseScore?.lead||[],bars:[],source:window.FurEliseScore?.source},
 {"id":"septette","names":["Septette for the Dead Princess (Full MML)","亡き王女の為のセプテット（完整编曲）","亡き王女の為のセプテット（全曲MML）"],"composer":"ZUN (original) · Yoji Suzuki / SUZUKI PLAN (MML arrangement)","bpm":146,"root":63,"bars":[[[58,1],[70,1],[78,1],[77,0.5],[68,0.5]],[[58,1],[70,1],[78,1],[77,0.5],[68,0.5]],[[58,1],[70,1],[78,1],[77,0.5],[68,0.5]],[[58,1],[70,1.5],[78,1.5]],[[58,1],[70,1],[78,1],[77,0.5],[68,0.5]],[[58,1],[70,1],[78,1],[77,0.5],[68,0.5]],[[58,1],[70,1],[78,1],[77,0.5],[68,0.5]],[[70,2],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[78,0.5]],[[75,2],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[85,0.5]],[[82,2],[82,0.5],[85,0.5],[87,0.5]],[[80,1],[80,1],[80,0.5],[82,0.5],[85,0.5]],[[78,1],[78,1],[75,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[74,0.5]],[[75,2],[77,2]],[[78,3],[77,0.25],[73,0.25],[70,0.25],[71,0.25]],[[72,4]],[],[],[],[],[[90,2.5],[89,0.25],[87,0.25],[85,0.25],[83,0.25],[82,0.25],[80,0.25]],[[84,2],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[78,0.5]],[[75,2],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[85,0.5]],[[82,2],[82,0.5],[85,0.5],[87,0.5]],[[80,1],[80,1],[80,0.5],[82,0.5],[85,0.5]],[[78,1],[78,1],[75,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[74,0.5]],[[75,2],[77,0.5],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[78,0.5]],[[75,2],[70,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[85,0.5]],[[82,2],[82,0.5],[85,0.5],[87,0.5]],[[80,1],[80,1],[80,0.5],[82,0.5],[85,0.5]],[[78,1],[78,1],[75,0.5],[75,0.5],[77,0.5]],[[78,1.5],[80,0.5],[77,1.5],[74,0.5]],[[75,2],[77,1],[73,0.5],[76,0.5]],[[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[81,0.75],[80,0.5]],[[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[85,0.75],[83,0.5]],[[81,0.75],[80,0.75],[78,0.5],[77,0.75],[73,0.75],[71,0.5]],[[73,3],[73,0.5],[76,0.5]],[[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[81,0.75],[80,0.5]],[[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[85,0.75],[83,0.5]],[[81,0.75],[80,0.75],[78,0.5],[80,0.75],[81,0.75],[83,0.5]],[[85,1],[85,1],[85,1]],[[70,0.5],[77,0.5],[75,1.5],[73,0.5]],[[72,0.75],[68,0.75],[70,3]],[[70,0.5],[77,0.5],[75,1.5],[73,0.5]],[[72,0.5],[73,0.0625],[75,0.0625],[77,0.0625],[78,0.0625],[80,0.75],[77,3]],[[70,0.5],[77,0.5],[75,1.5],[73,0.5]],[[72,0.75],[68,0.75],[70,3]],[[70,0.5],[72,0.5],[73,0.5],[72,0.5],[68,0.5],[70,2.125]],[[75,0.0625],[77,0.0625],[78,0.0625],[80,0.0625],[82,0.0625],[84,0.0625],[85,3]],[[82,0.5],[89,0.5],[87,1.5],[85,0.5]],[[84,0.75],[80,0.75],[82,3]],[[82,0.5],[89,0.5],[87,1.5],[85,0.5]],[[84,0.5],[85,0.0625],[87,0.0625],[89,0.0625],[90,0.0625],[92,0.75],[89,3]],[[82,0.5],[89,0.5],[87,1.5],[85,0.5]],[[84,0.75],[80,0.75],[82,3]],[[82,0.5],[84,0.5],[85,0.5],[84,0.5],[80,0.5],[82,2.5]],[[89,2]],[[70,0.25],[73,0.25],[75,0.25],[77,0.25],[72,0.25],[70,0.25],[68,0.25],[70,0.25],[68,0.5],[70,0.5],[72,0.5]],[[70,0.25],[75,0.25],[73,0.25],[75,0.25],[72,0.25],[75,0.25],[70,0.25],[73,0.25],[70,0.375],[77,0.375],[75,0.25],[70,0.375],[77,0.375],[75,0.25]],[[72,0.25],[73,0.25],[70,0.25],[72,0.125],[70,0.125],[73,0.25],[68,0.25],[70,0.25],[65,0.25],[65,0.125],[70,0.125],[65,0.125],[70,0.125],[65,0.125],[63,0.125],[65,0.125],[68,0.125],[70,0.25],[63,0.25],[65,0.25],[61,0.25]],[[63,0.375],[60,0.375],[61,0.25],[58,0.375],[60,0.375],[56,0.25],[58,0.25],[56,0.25],[53,0.25],[56,0.25],[58,0.5],[65,0.5]],[[63,0.25],[61,0.25],[60,0.25],[56,0.25],[58,0.5],[58,0.25],[60,0.25],[58,0.25],[60,0.25],[61,0.25],[63,0.25],[65,0.25],[68,0.25],[70,0.25],[65,0.25]],[[72,0.25],[65,0.25],[73,0.25],[75,0.25],[73,0.125],[72,0.125],[70,0.125],[72,0.125],[68,0.25],[67,0.25],[63,0.25],[61,0.25],[54,0.125],[58,0.125],[60,0.125],[61,0.125],[63,0.25],[61,0.25],[63,0.25],[67,0.25]],[[68,0.125],[70,0.125],[72,0.25],[73,0.25],[75,0.25],[73,0.25],[72,0.25],[70,0.25],[68,0.25],[70,0.25],[68,0.25],[65,0.25],[70,0.25],[68,0.25],[65,0.25],[70,0.5]],[[77,0.25],[75,0.25],[73,0.25],[77,0.25],[75,0.5],[72,0.5],[65,0.25],[61,0.25],[60,0.25],[58,0.25],[53,0.25],[49,0.25],[48,0.25],[46,0.25]],[[41,0.25],[46,0.25],[48,0.25],[49,0.25],[53,0.25],[58,0.25],[60,0.25],[61,0.25],[80,0.5],[82,0.5],[84,0.5]],[[82,0.25],[87,0.25],[85,0.25],[87,0.25],[84,0.25],[87,0.25],[82,0.25],[85,0.25],[82,0.375],[89,0.375],[87,0.25],[82,0.375],[89,0.375],[87,0.25]],[[84,0.25],[85,0.25],[82,0.25],[84,0.125],[82,0.125],[85,0.25],[80,0.25],[82,0.25],[77,0.25],[77,0.125],[82,0.125],[77,0.125],[82,0.125],[77,0.125],[75,0.125],[77,0.125],[80,0.125],[82,0.25],[75,0.25],[77,0.25],[73,0.25]],[[75,0.375],[72,0.375],[73,0.25],[70,0.375],[72,0.375],[68,0.25],[70,0.25],[68,0.25],[65,0.25],[68,0.25],[70,0.5],[77,0.5]],[[75,0.25],[73,0.25],[72,0.25],[68,0.25],[70,0.5],[70,0.25],[72,0.25],[70,0.25],[72,0.25],[73,0.25],[75,0.25],[77,0.25],[80,0.25],[82,0.25],[77,0.25]],[[84,0.25],[77,0.25],[85,0.25],[87,0.25],[85,0.125],[84,0.125],[82,0.125],[84,0.125],[80,0.25],[79,0.25],[75,0.25],[73,0.25],[66,0.125],[70,0.125],[72,0.125],[73,0.125],[75,0.25],[73,0.25],[75,0.25],[79,0.25]],[[80,0.125],[82,0.125],[84,0.25],[85,0.25],[87,0.25],[85,0.25],[84,0.25],[82,0.25],[80,0.25],[82,0.25],[80,0.25],[77,0.25],[82,0.25],[80,0.25],[77,0.25],[82,0.5]],[[89,0.25],[87,0.25],[85,0.25],[89,0.25],[87,0.5],[84,0.5],[70,0.25],[72,0.25],[73,0.25],[75,0.25],[77,0.25],[72,0.25],[73,0.25],[75,0.25]],[[77,0.25],[80,0.25],[77,0.25],[75,0.25],[73,0.25],[72,0.25],[70,0.25],[68,0.25]]],"lead":[[58,1],[70,1],[78,1],[77,0.5],[68,0.5],[58,1],[70,1],[78,1],[77,0.5],[68,0.5],[58,1],[70,1],[78,1],[77,0.5],[68,0.5],[58,1],[70,1.5],[78,1.5],[58,1],[70,1],[78,1],[77,0.5],[68,0.5],[58,1],[70,1],[78,1],[77,0.5],[68,0.5],[58,1],[70,1],[78,1],[77,0.5],[68,0.5],[70,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[78,0.5],[75,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[85,0.5],[82,2],[null,0.5],[82,0.5],[85,0.5],[87,0.5],[80,1],[80,1],[null,0.5],[80,0.5],[82,0.5],[85,0.5],[78,1],[78,1],[null,0.5],[75,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[74,0.5],[75,2],[77,2],[78,3],[77,0.25],[73,0.25],[70,0.25],[71,0.25],[72,4],[null,4],[null,4],[null,4],[null,4],[90,2.5],[89,0.25],[87,0.25],[85,0.25],[83,0.25],[82,0.25],[80,0.25],[84,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[78,0.5],[75,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[85,0.5],[82,2],[null,0.5],[82,0.5],[85,0.5],[87,0.5],[80,1],[80,1],[null,0.5],[80,0.5],[82,0.5],[85,0.5],[78,1],[78,1],[null,0.5],[75,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[74,0.5],[75,2],[77,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[78,0.5],[75,2],[null,0.5],[70,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[85,0.5],[82,2],[null,0.5],[82,0.5],[85,0.5],[87,0.5],[80,1],[80,1],[null,0.5],[80,0.5],[82,0.5],[85,0.5],[78,1],[78,1],[null,0.5],[75,0.5],[75,0.5],[77,0.5],[78,1.5],[80,0.5],[77,1.5],[74,0.5],[75,2],[77,1],[73,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[81,0.75],[80,0.5],[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[85,0.75],[83,0.5],[81,0.75],[80,0.75],[78,0.5],[77,0.75],[73,0.75],[71,0.5],[73,3],[73,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[81,0.75],[80,0.5],[78,0.5],[76,0.5],[78,0.5],[76,0.5],[78,0.75],[85,0.75],[83,0.5],[81,0.75],[80,0.75],[78,0.5],[80,0.75],[81,0.75],[83,0.5],[85,1],[null,0.5],[85,1],[null,0.5],[85,1],[null,1],[70,0.5],[77,0.5],[75,1.5],[73,0.5],[72,0.75],[68,0.75],[70,3],[null,0.5],[70,0.5],[77,0.5],[75,1.5],[73,0.5],[72,0.5],[73,0.0625],[75,0.0625],[77,0.0625],[78,0.0625],[80,0.75],[77,3],[null,0.5],[70,0.5],[77,0.5],[75,1.5],[73,0.5],[72,0.75],[68,0.75],[70,3],[null,0.5],[70,0.5],[72,0.5],[73,0.5],[72,0.5],[68,0.5],[70,2.125],[75,0.0625],[77,0.0625],[78,0.0625],[80,0.0625],[82,0.0625],[84,0.0625],[85,3],[82,0.5],[89,0.5],[87,1.5],[85,0.5],[84,0.75],[80,0.75],[82,3],[null,0.5],[82,0.5],[89,0.5],[87,1.5],[85,0.5],[84,0.5],[85,0.0625],[87,0.0625],[89,0.0625],[90,0.0625],[92,0.75],[89,3],[null,0.5],[82,0.5],[89,0.5],[87,1.5],[85,0.5],[84,0.75],[80,0.75],[82,3],[null,0.5],[82,0.5],[84,0.5],[85,0.5],[84,0.5],[80,0.5],[82,2.5],[89,2],[70,0.25],[73,0.25],[75,0.25],[77,0.25],[72,0.25],[70,0.25],[68,0.25],[70,0.25],[null,0.5],[68,0.5],[70,0.5],[72,0.5],[70,0.25],[75,0.25],[73,0.25],[75,0.25],[72,0.25],[75,0.25],[70,0.25],[73,0.25],[70,0.375],[77,0.375],[75,0.25],[70,0.375],[77,0.375],[75,0.25],[72,0.25],[73,0.25],[70,0.25],[72,0.125],[70,0.125],[73,0.25],[68,0.25],[70,0.25],[65,0.25],[65,0.125],[70,0.125],[65,0.125],[70,0.125],[65,0.125],[63,0.125],[65,0.125],[68,0.125],[70,0.25],[63,0.25],[65,0.25],[61,0.25],[63,0.375],[60,0.375],[61,0.25],[58,0.375],[60,0.375],[56,0.25],[58,0.25],[56,0.25],[53,0.25],[56,0.25],[58,0.5],[65,0.5],[63,0.25],[61,0.25],[60,0.25],[56,0.25],[58,0.5],[58,0.25],[60,0.25],[58,0.25],[60,0.25],[61,0.25],[63,0.25],[65,0.25],[68,0.25],[70,0.25],[65,0.25],[72,0.25],[65,0.25],[73,0.25],[75,0.25],[73,0.125],[72,0.125],[70,0.125],[72,0.125],[68,0.25],[67,0.25],[63,0.25],[61,0.25],[54,0.125],[58,0.125],[60,0.125],[61,0.125],[63,0.25],[61,0.25],[63,0.25],[67,0.25],[68,0.125],[70,0.125],[72,0.25],[73,0.25],[75,0.25],[73,0.25],[72,0.25],[70,0.25],[68,0.25],[70,0.25],[68,0.25],[65,0.25],[70,0.25],[68,0.25],[65,0.25],[70,0.5],[77,0.25],[75,0.25],[73,0.25],[77,0.25],[75,0.5],[72,0.5],[65,0.25],[61,0.25],[60,0.25],[58,0.25],[53,0.25],[49,0.25],[48,0.25],[46,0.25],[41,0.25],[46,0.25],[48,0.25],[49,0.25],[53,0.25],[58,0.25],[60,0.25],[61,0.25],[null,0.5],[80,0.5],[82,0.5],[84,0.5],[82,0.25],[87,0.25],[85,0.25],[87,0.25],[84,0.25],[87,0.25],[82,0.25],[85,0.25],[82,0.375],[89,0.375],[87,0.25],[82,0.375],[89,0.375],[87,0.25],[84,0.25],[85,0.25],[82,0.25],[84,0.125],[82,0.125],[85,0.25],[80,0.25],[82,0.25],[77,0.25],[77,0.125],[82,0.125],[77,0.125],[82,0.125],[77,0.125],[75,0.125],[77,0.125],[80,0.125],[82,0.25],[75,0.25],[77,0.25],[73,0.25],[75,0.375],[72,0.375],[73,0.25],[70,0.375],[72,0.375],[68,0.25],[70,0.25],[68,0.25],[65,0.25],[68,0.25],[70,0.5],[77,0.5],[75,0.25],[73,0.25],[72,0.25],[68,0.25],[70,0.5],[70,0.25],[72,0.25],[70,0.25],[72,0.25],[73,0.25],[75,0.25],[77,0.25],[80,0.25],[82,0.25],[77,0.25],[84,0.25],[77,0.25],[85,0.25],[87,0.25],[85,0.125],[84,0.125],[82,0.125],[84,0.125],[80,0.25],[79,0.25],[75,0.25],[73,0.25],[66,0.125],[70,0.125],[72,0.125],[73,0.125],[75,0.25],[73,0.25],[75,0.25],[79,0.25],[80,0.125],[82,0.125],[84,0.25],[85,0.25],[87,0.25],[85,0.25],[84,0.25],[82,0.25],[80,0.25],[82,0.25],[80,0.25],[77,0.25],[82,0.25],[80,0.25],[77,0.25],[82,0.5],[89,0.25],[87,0.25],[85,0.25],[89,0.25],[87,0.5],[84,0.5],[70,0.25],[72,0.25],[73,0.25],[75,0.25],[77,0.25],[72,0.25],[73,0.25],[75,0.25],[77,0.25],[80,0.25],[77,0.25],[75,0.25],[73,0.25],[72,0.25],[70,0.25],[68,0.25]],"source":"https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT012.mml","originalLeadChannel":1,"fullScoreBeats":322},
 {id:'unowen',names:['U.N. Owen Was Her? (Full MML)','U.N.オーエンは彼女なのか？（完整编曲）','U.N.オーエンは彼女なのか？（全曲MML）'],composer:'ZUN (original) · Yoji Suzuki / SUZUKI PLAN (MML arrangement)',bpm:155,root:62,bars:[],lead:window.FlandreScore?.lead||[],source:'https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT014.mml'},
 {id:'dreambattle',names:['Maiden’s Capriccio ～ Dream Battle','少女绮想曲 ～ Dream Battle','少女綺想曲 ～ Dream Battle'],composer:'ZUN (original) · Yoji Suzuki / SUZUKI PLAN (MML arrangement)',bpm:160,root:60,bars:[],lead:window.DreamBattleScore?.lead||[],source:'https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT046.mml'},
 {id:'lunadial',names:['Lunar Clock ～ Luna Dial','月时计 ～ Luna Dial','月時計 ～ ルナ・ダイアル'],composer:'ZUN (original) · Yoji Suzuki / SUZUKI PLAN (MML arrangement)',bpm:148,root:61,bars:[],lead:window.LunaDialScore?.lead||[],source:'https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT010.mml'},
 {id:'necrofantasia',names:['Necrofantasia · Yukari Yakumo','妖怪幻想曲 ～ 八云紫','ネクロファンタジア ～ 八雲紫'],composer:'ZUN (original) · Yoji Suzuki / SUZUKI PLAN (MML arrangement)',bpm:164,root:63,bars:[],lead:window.NecrofantasiaScore?.lead||[],source:'https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT034.mml'}
];
// These three traditional/classical melodies have original score-aligned arrangements.
for(const song of songs.filter(s=>['twinkle','frere','ode'].includes(s.id))){
 song.scoreBacking=window.ClassicSongAccompaniment?.build?.(song.id,song.bars)||[];
 song.totalBeats=song.bars.length*4;
 song.totalSeconds=song.totalBeats*60/song.bpm;
}
// Full source-based scores: every sounding Für Elise lead tone, including fast
// ornaments and three grace notes, remains player-catchable.
// Piano chord tones are bound to the same catchable drop; only the left hand is automatic.
for(const song of songs.filter(s=>Array.isArray(s.lead)&&s.lead.length)){
 let offset=0,laneX=180,lastStart=null;
 const clip=(v,min,max)=>Math.max(min,Math.min(max,v));
 const playable=[];
 for(let i=0;i<song.lead.length;i++){
  const [midi,duration]=song.lead[i],start=offset;offset+=duration;
  if(midi===null)continue;
  const piano=song.id==='furelise';
  const gap=lastStart===null?1:Math.max(piano?.04:.125,start-lastStart);
  const drift=clip((midi-80)*1.15,-25,25);
  // Keep dense piano runs clustered: no note deletion or automatic lead.
  // All other songs preserve their existing falling-note lanes.
  const target=piano
   ?180+Math.sin(start*.19)*36+Math.sin(start*.06+1.4)*14+clip((midi-75)*.7,-13,13)
   :180+Math.sin(start*.27)*44+Math.sin(start*.09+1.4)*19+drift;
  const limit=piano?clip(gap*40,1.2,18):clip(gap*28,3.5,38);
  laneX=clip(laneX+clip(target-laneX,-limit,limit),piano?143:115,piano?217:245);
  const bar=song.id==='furelise'?(start<.5?0:Math.floor((start-.5+1e-6)/1.5)+1):Math.floor(start/4);
  playable.push({midi,beats:duration,start,bar,leadIndex:i,laneX:Math.round(laneX)});
  lastStart=start;
 }
 song.playable=playable;
 song.playableIndices=new Set(playable.map(e=>e.leadIndex));
 song.totalBeats=offset;
 song.playableBarCount=new Set(playable.map(e=>e.bar)).size;
 song.bars=Array.from({length:song.id==='furelise'?Math.ceil((Math.max(.5,offset)-.5)/1.5)+1:Math.ceil(offset/4)},()=>[]);
 for(const e of playable){e.note=song.bars[e.bar].length;song.bars[e.bar].push([e.midi,e.beats])}
 const score=({furelise:window.FurEliseScore,septette:window.TouhouScoreAccompaniment,unowen:window.FlandreScore,dreambattle:window.DreamBattleScore,lunadial:window.LunaDialScore,necrofantasia:window.NecrofantasiaScore})[song.id];
 song.scoreBacking=score?.events||[];
 if(song.id==='furelise'){
  const chordMap=new Map((score?.leadChords||[]).map(([beat,tones])=>[Math.round(beat*100000),tones]));
  let assigned=0;
  for(const note of playable){
   const chord=chordMap.get(Math.round(note.start*100000));
   if(chord){note.chordTones=chord;assigned++}
  }
  if(assigned!==chordMap.size)throw new Error('Für Elise chord onsets lack matching playable drops');
 }
 if(song.id==='dreambattle'&&score?.tempo){
  song.timeAt=beat=>{
   let t=score.tempo[0];for(const x of score.tempo){if(x[0]>beat)break;t=x}
   return t[2]+(beat-t[0])*60/t[1];
  };
 }
 song.totalSeconds=song.timeAt?.(song.totalBeats)??song.totalBeats*60/song.bpm;
}
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
  if(hint)hint.textContent=song.id==='furelise'?
   loc('♪ Original piano score · catch the lead, accompaniment plays automatically','♪ 原谱钢琴双手声部 · 接主旋律，左手伴奏自动演奏','♪ 原譜ピアノ · 主旋律をキャッチ、伴奏は自動演奏'):
   song.playable?
   loc('♪ Full MML · catch all lead notes · gently drifting lanes','♪ 完整曲谱 · 接全部主旋律音符 · 落点轻微左右变化','♪ MML全曲 · 主旋律を演奏 · 落点が緩やかに移動'):
   song.scoreBacking?.length?
   loc('♪ Backing plays automatically · catch notes for the lead · missed notes stay silent','♪ 伴奏自动演奏 · 接住音符弹奏主旋律 · 漏接则缺音','♪ 伴奏は自動演奏 · キャッチして主旋律を奏でる · ミスは無音'):
   loc('♪ Catch notes to play the melody · missed notes stay silent','♪ 用挡板接音符来弹奏旋律 · 漏接就会缺音','♪ 音符をキャッチして演奏 · 逃すと無音');
  if(touhouNotice){touhouNotice.hidden=!song.playable||song.id==='furelise';touhouNotice.textContent=loc(
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
  return {song:song.id,generation,seq,when,bar:entry.bar,note:entry.note,midi:entry.midi,beats:entry.beats,chordTones:entry.chordTones||[],
   bpm:song.timeAt?entry.beats*60/Math.max(.001,song.timeAt(entry.start+entry.beats)-song.timeAt(entry.start)):song.bpm,
   label:pitch(entry.midi),color:song.id==='necrofantasia'?['#f5d69c','#cfaff6','#f7dfb0','#b691dc'][(entry.bar+entry.note)%4]:song.id==='lunadial'?['#e8f4ff','#c2e2ff','#fce6d7','#c6c4f6'][(entry.bar+entry.note)%4]:song.id==='dreambattle'?['#ffe5dd','#ff7f96','#f8f3df','#f6c2d1'][(entry.bar+entry.note)%4]:color[(entry.bar+entry.note)%color.length],laneX:entry.laneX};
 }
 function update(dt,spawn){
  clock+=dt;const song=songs[selected];
  // Always schedule the backing independently of whether the player catches notes.
  if(song.scoreBacking?.length){
    let n=0;
    while(n++<70){
     const cycle=Math.floor(backingIndex/song.scoreBacking.length);
     const note=song.scoreBacking[backingIndex%song.scoreBacking.length];
     const due=INTRO+cycle*(song.totalSeconds+1.3)+(song.timeAt?.(note[0])??note[0]*60/song.bpm);
     const ahead=due-clock;
     if(ahead>.35)break;
     const durationSeconds=song.timeAt?Math.max(.001,song.timeAt(note[0]+note[2])-song.timeAt(note[0])):note[2]*60/song.bpm;
     audio.playScoreBacking?.(note[1],note[2],note[2]*60/durationSeconds,note[3],note[4],Math.max(0,ahead),note[0]);
     backingIndex++;
    }
  }
  if(song.playable){
   // Drums remain soft; no artificial bass stabs.
   // Rapid notes copied from the source melody add quiet automatic flourishes.
   let flourishes=0;
   while(!song.timeAt&&melodyDue<=clock+.015&&flourishes++<15){
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
    const due=INTRO+cycle*(song.totalSeconds+1.3)+(song.timeAt?.(entry.start)??entry.start*60/song.bpm);
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
  if(hit){if(songs[selected].playable)audio.playLeadNote?.(drop.midi,drop.beats,drop.bpm,drop.chordTones);else audio.pickupNote?.(drop.midi,drop.beats,drop.bpm)}
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
    if(perfectBars===(songs[selected].playableBarCount??songs[selected].bars.length)){finale=true;callbacks.onSong?.(songs[selected])}
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