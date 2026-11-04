/* Last Flight — fictional cross-era crew simulator.
 * Historical facts and alternate-history game rules are deliberately separate.
 * No third-party assets, tracking, or runtime requests. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const SOURCES = {
  1549:{title:"NTSB · US Airways 1549",url:"https://www.ntsb.gov/investigations/Pages/DCA09MA026.aspx/",summary:"2009年，鸟群撞击导致双发几乎失去推力，机组在哈德逊河迫降，机上人员全部生还。"},
  232:{title:"NTSB · United Airlines 232",url:"https://www.ntsb.gov/investigations/Pages/DCA89MA063.aspx",summary:"1989年，发动机灾难性故障造成三套液压系统失效，机组仍努力保持控制；迫降时飞机失事，多数乘员幸存。"},
  1380:{title:"NTSB · Southwest Airlines 1380",url:"https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR1903.pdf",summary:"2018年，左发动机故障伴随机舱失压，机组紧急下降并备降费城；事件造成一名乘客遇难。"},
  236:{title:"葡萄牙调查报告（FAA托管）· Air Transat 236",url:"https://www.faa.gov/sites/faa.gov/files/2022-11/AirTransat236_AccidentReport.pdf",summary:"2001年，客机燃油耗尽后两台发动机停止工作，机组滑翔至亚速尔群岛的拉日什机场着陆，机上人员全部生还。调查同时指出维修和飞行处置方面的多项因素。"},
  5390:{title:"英国 AAIB · British Airways 5390",url:"https://www.gov.uk/aaib-reports/1-1992-bac-one-eleven-g-bjrt-10-june-1990",summary:"1990年，驾驶舱风挡失效，机长失去正常操纵能力，副驾驶接手飞机并成功降落。调查发现错误安装的风挡螺栓。"},
  9525:{title:"法国 BEA · Germanwings 9525",url:"https://bea.aero/fileadmin/uploads/tx_elydbrapports/BEA2015-0125.en-LR.pdf",summary:"2015年，德国之翼9525航班撞山；法国BEA认定副驾驶故意导致碰撞。这一结论只适用于真实调查对应的航班。"},
  mh370:{title:"马来西亚交通部 · MH370",url:"https://www.mot.gov.my/en/aviation/reports/archived-report/mh370",summary:"2014年MH370失踪。调查未能确定真正原因，也无法证实机长个人的具体意图与操作；本游戏不对此做行为归因。"}
};
const PILOTS = [
 {id:"sully",name:"Chesley Sullenberger",cn:"萨伦伯格",flight:"US Airways 1549 · 2009",brief:"双发失去推力 · 哈德逊河迫降",source:"1549",strength:4,team:3,action:"迅速评估备降选项，优先保持飞机可控，并寻找可用的迫降地点。",hint:"历史行动：在双发推力丧失后选择哈德逊河迫降。",skin:"#e7b99b",hair:"#c6d0d4",eye:"#385d73",style:1},
 {id:"skiles",name:"Jeffrey Skiles",cn:"杰弗里·斯凯尔斯",flight:"US Airways 1549 · 2009",brief:"协助发动机处置与检查程序",source:"1549",strength:3,team:4,action:"协助判断发动机状态，执行检查与沟通工作。",hint:"历史行动：配合机长执行紧急程序。",skin:"#e9bc9f",hair:"#674f45",eye:"#334862",style:2},
 {id:"haynes",name:"Alfred C. Haynes",cn:"阿尔弗雷德·海恩斯",flight:"United 232 · 1989",brief:"严重液压失效 · 协同保持控制",source:"232",strength:4,team:4,action:"组织机组持续沟通，在严重操纵受限时尽力维持飞行。",hint:"历史行动：在液压失效中组织机组合作，最终尝试迫降。",skin:"#d8a285",hair:"#b5b5ba",eye:"#384e67",style:0},
 {id:"fitch",name:"Dennis Fitch",cn:"丹尼斯·菲奇",flight:"United 232 · 1989",brief:"机上飞行教员 · 协助应急控制",source:"232",strength:4,team:4,action:"主动提供协助，并配合其他机组人员寻找有限的控制方案。",hint:"历史行动：作为机上教员加入并协助处理液压失效；原本并非该航班副驾驶。",skin:"#deb195",hair:"#8e8580",eye:"#3c5268",style:3},
 {id:"shults",name:"Tammie Jo Shults",cn:"塔米·乔·舒尔茨",flight:"Southwest 1380 · 2018",brief:"发动机故障与失压 · 紧急备降",source:"1380",strength:4,team:4,action:"与副驾驶配合判断异常，联系管制并协调尽快备降。",hint:"历史行动：发动机故障及机舱失压后成功备降费城。",skin:"#ecc4a3",hair:"#655447",eye:"#496276",style:4},
 {id:"piche",name:"Robert Piché",cn:"罗伯特·皮谢",flight:"Air Transat 236 · 2001",brief:"燃油耗尽 · 双发停转滑翔着陆",source:"236",strength:3,team:3,action:"在失去动力的极端情况下寻求滑翔至机场的机会。",hint:"历史行动：与副驾驶一起完成无动力着陆；调查也指出机组处置问题。",skin:"#e6bb9b",hair:"#403d40",eye:"#46536d",style:0},
 {id:"dejager",name:"Dirk de Jager",cn:"德克·德雅格",flight:"Air Transat 236 · 2001",brief:"协助失去动力后的备降",source:"236",strength:3,team:3,action:"协助监视系统与航路，配合机长完成紧急备降。",hint:"历史行动：作为副驾驶参与了Air Transat 236无动力着陆。",skin:"#e5ba98",hair:"#89634c",eye:"#46506a",style:2},
 {id:"atchison",name:"Alastair Atchison",cn:"阿拉斯泰尔·艾奇逊",flight:"British Airways 5390 · 1990",brief:"风挡失效 · 接管飞机安全降落",source:"5390",strength:4,team:4,action:"在另一名机组成员失去正常操纵能力时接管飞行，并协调支援。",hint:"历史行动：风挡失效后操纵飞机成功降落。",skin:"#e3b998",hair:"#544c43",eye:"#495873",style:3},
 {id:"lubitz",name:"Andreas Lubitz",cn:"安德烈亚斯·卢比茨",flight:"Germanwings 9525 · 2015",brief:"BEA认定故意导致撞山",source:"9525",strength:0,team:-3,action:"出现与飞行安全相冲突的危险行为；架空机组能否识别并制止，取决于本局模拟规则。",hint:"历史结论：BEA认定他故意造成9525航班撞山。模拟不复现具体伤害方法。",skin:"#dfb097",hair:"#78503c",eye:"#3b526c",style:2,unsafe:true},
 {id:"zaharie",name:"Zaharie Ahmad Shah",cn:"扎哈里",flight:"Malaysia Airlines 370 · 2014",brief:"原因未定 · 不模拟未知的动机",source:"mh370",strength:3,team:3,action:"按照一般机组程序保持监控。MH370关键阶段的个人具体操作无法证实，因此不予模拟。",hint:"调查边界：MH370原因未明，不能把失踪等同于机长蓄意造成。",skin:"#bd8c69",hair:"#262a32",eye:"#303f56",style:1,unknown:true}
];
const BY_ID=Object.fromEntries(PILOTS.map(p=>[p.id,p]));
const CASES={
 birds:{title:"鸟击 · 双发推力下降",severe:5,step:"模拟事件：起飞后遭遇鸟群，两台发动机推力骤降。",why:"鸟击造成双发推力不足时，需要在有限时间内评估迫降区域。哈德逊河事件有真实历史依据，但当前机组及条件是虚构的。",tip:"现实科普：双发失去推力不等于飞机立刻垂直下坠；飞机仍能短时间滑翔。"},
 fuel:{title:"燃油系统异常",severe:5,step:"模拟事件：燃油状态异常，两台发动机先后失去动力。",why:"失去发动机推力时，飞机仍具备一定滑翔能力，但能否抵达机场受高度、距离和天气影响。",tip:"现实科普：Air Transat 236最终安全着陆，然而调查指出不止一个导致事件升级的因素。"},
 hydraulic:{title:"飞行控制受限",severe:6,step:"模拟事件：严重机械故障，多个液压系统失效。",why:"液压系统故障可能大幅削弱大型客机操纵能力。United 232的机组曾在控制严重受限时持续努力。",tip:"现实科普：联合航空232航班最终坠毁，但多数乘员生还，不能简单将其归入『飞行员失败』。"},
 engine:{title:"发动机故障 · 机舱失压",severe:4,step:"模拟事件：一台发动机故障，同时出现客舱失压。",why:"紧急下降和寻找合适备降机场属于机组需要协同完成的任务。",tip:"现实科普：发动机失效并不一定意味着无法继续飞行，关键还取决于其他系统状态。"},
 window:{title:"驾驶舱风挡失效",severe:4,step:"模拟事件：驾驶舱风挡异常，机组成员一度无法正常操纵。",why:"驾驶舱风挡故障可能迅速增加机组负担。另一名飞行员的持续操纵和支援协调十分关键。",tip:"现实科普：英国航空5390航班的事故调查重点涉及维护工作和风挡固定螺栓。"},
 unsafe:{title:"机组安全冲突",severe:8,step:"模拟事件：一名机组成员出现与安全飞行相冲突的危险行为。",why:"这是虚构的机组安全冲突情景；游戏不会描写真实事件中具体的实施方式。",tip:"现实科普：飞行安全不仅依赖个人技术，也依赖程序、沟通和组织层面的保障措施。"},
 weather:{title:"恶劣天气进近",severe:3,step:"模拟事件：目的地附近出现强降雨和低能见度。",why:"复杂天气下，需要评估是否复飞或备降，以及机组能否保持清晰沟通。",tip:"现实科普：复飞并不是失败，而是一项正常、重要的安全选择。"},
 normal:{title:"常规航班",severe:1,step:"模拟事件：航路平稳，进行标准进近准备。",why:"常规飞行中仍然需要检查程序、职责分工和有效沟通。",tip:"现实科普：PF负责操纵，PM负责监控；机长与副驾驶可以交换这两个分工。"}
};
let selected={captain:"sully",fo:"skiles"},running=false,flightCount=0,activeToken=0,sound=true,context=null,warningIssued=false;
function avatar(p,large=false){
  const s=p.skin, h=p.hair, e=p.eye,style=p.style;
  let hair=style===1?'<path d="M34 58Q38 21 72 22Q112 21 119 62L107 54Q93 45 79 42Q54 53 39 63Z" fill="'+h+'"/>':
    style===4?'<path d="M28 79Q29 18 74 24Q119 18 123 80L116 122L97 103L109 62Q88 42 49 58L45 119Z" fill="'+h+'"/>':
    style===0?'<path d="M30 64Q35 24 70 23Q112 19 118 62Q90 44 70 44Q46 51 37 64Z" fill="'+h+'"/>':
    style===3?'<path d="M34 60Q40 24 70 26Q118 22 121 62Q100 45 77 45L49 57Z" fill="'+h+'"/>':
    '<path d="M32 67Q26 30 63 25Q105 18 121 54L113 64L96 43L76 52L55 47L37 70Z" fill="'+h+'"/>';
  return '<svg viewBox="0 0 150 164" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="原创卡通飞行员示意头像 '+escapeHtml(p.name)+'">'+
  '<rect width="150" height="164" rx="11" fill="#7eb6d4"/><path d="M0 116L23 102L61 97L89 101L121 110L150 120V164H0Z" fill="#345372"/>'+
  '<path d="M19 164Q24 116 53 109L96 109Q125 119 131 164Z" fill="#f5f6f1"/>'+
  '<path d="M62 100L58 121L73 134L88 121L85 99Z" fill="'+s+'"/><path d="M70 126L78 126L84 151L77 164L69 151Z" fill="#2c405a"/>'+
  '<ellipse cx="75" cy="78" rx="42" ry="52" fill="'+s+'" stroke="#2e3640" stroke-width="2"/>'+
  hair+
  '<path d="M45 72Q55 67 66 71M84 71Q96 67 106 72" stroke="'+h+'" stroke-width="4" stroke-linecap="round" fill="none"/>'+
  '<ellipse cx="58" cy="79" rx="3.7" ry="4.5" fill="'+e+'"/><ellipse cx="95" cy="79" rx="3.7" ry="4.5" fill="'+e+'"/>'+
  '<path d="M76 81L72 97Q77 101 83 97" stroke="#946b57" stroke-width="2" fill="none"/>'+
  '<path d="M62 110Q77 119 91 109" stroke="#89574e" stroke-width="2.3" fill="none" stroke-linecap="round"/>'+
  '<path d="M18 151L43 137L66 145M132 151L105 137L85 145" fill="none" stroke="#b4c1c7" stroke-width="2"/>'+
  '<path d="M19 134L44 132M108 132L131 134" stroke="#e0b653" stroke-width="6"/>'+
  (large?'<path d="M3 164Q0 120 20 113L47 110L39 164Z" fill="#273d54"/><path d="M147 164Q153 125 132 115L104 108L113 164Z" fill="#273d54"/>':'')+
  '</svg>';
}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function card(p,side){
 const current=selected[side]===p.id,blocked=selected[side==="captain"?"fo":"captain"]===p.id;
 return '<button class="crew-card '+(current?'selected ':'')+(p.unknown?'unresolved':'')+'" type="button" data-side="'+side+'" data-id="'+p.id+'" aria-pressed="'+current+'" '+(blocked?'disabled aria-label="另一席位已选择此人"':'')+'>'+
 '<span class="portrait">'+avatar(p)+'</span><span class="person-main"><span class="person-name">'+escapeHtml(p.name)+'</span><span class="event">'+escapeHtml(p.flight)+'</span><span class="detail">'+escapeHtml(p.brief)+'</span></span>'+(current?'<span class="picked" aria-hidden="true">✓</span>':'')+'</button>';
}
function render(){
 $('captainList').innerHTML=PILOTS.map(p=>card(p,"captain")).join("");
 $('foList').innerHTML=PILOTS.map(p=>card(p,"fo")).join("");
 const a=BY_ID[selected.captain], b=BY_ID[selected.fo];
 $('captainName').textContent=a.name; $('foName').textContent=b.name;
 $('bigCaptain').innerHTML=avatar(a,true);$('bigFirstOfficer').innerHTML=avatar(b,true);
 $('seatCaptain').textContent=a.cn;$('seatFirstOfficer').textContent=b.cn;
}
document.addEventListener("click",e=>{
 const btn=e.target.closest(".crew-card");
 if(!btn||running)return;
 const side=btn.dataset.side,id=btn.dataset.id;
 if(!BY_ID[id]||Object.entries(selected).some(([key,v])=>key!==side&&v===id))return;
 selected[side]=id; render();
 log("机组变更："+BY_ID[selected.captain].cn+" / "+BY_ID[selected.fo].cn,"muted");
});
function log(text,type=""){
 const el=document.createElement("div");el.className="log-line "+type;el.textContent="["+stamp()+"] "+text;
 $('radioLog').appendChild(el);$('radioLog').scrollTop=$('radioLog').scrollHeight;
}
function stamp(){const elapsed=running?Math.max(0,Date.now()-runStarted):0;return String(Math.floor(elapsed/60000)).padStart(2,"0")+":"+String(Math.floor(elapsed%60000/1000)).padStart(2,"0");}
let runStarted=0;
function hash(str){let h=2166136261;for(const c of str){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function pickCase(a,b,iteration){
 const ids=[a.id,b.id]; if(ids.includes("lubitz"))return "unsafe";
 if(ids.includes("sully")&&ids.includes("skiles"))return "birds";
 if(ids.includes("piche")&&ids.includes("dejager"))return "fuel";
 if(ids.includes("haynes")&&ids.includes("fitch"))return "hydraulic";
 const preferred=[];
 for(const id of ids){
 if(["sully","skiles"].includes(id))preferred.push("birds");
 if(["piche","dejager"].includes(id))preferred.push("fuel");
 if(["haynes","fitch"].includes(id))preferred.push("hydraulic");
 if(id==="shults")preferred.push("engine");
 if(id==="atchison")preferred.push("window");
 }
 const options=[...new Set([...preferred,"weather","normal"])];
 return options[hash(a.id+"-"+b.id+"-"+iteration)%options.length];
}
function simulate(a,b,scenario,iteration){
 const c=CASES[scenario];
 // Gameplay score, NOT a probability or assessment of a real person.
 const crew=(a.strength+b.strength)+(a.team+b.team)*.45;
 const pairing=(a.source===b.source&&!a.unsafe&&!b.unsafe&&a.source!=="mh370")?1.6:0;
 const jitter=(hash(a.id+":"+b.id+":"+scenario+":"+iteration)%5)-2;
 const scenarioRisk=c.severe;
 const safetyConflict=a.unsafe||b.unsafe;
 // The hypothetical non-unsafe crewmate can sometimes interrupt the unsafe event.
 // This is a GAMEPLAY counterweight, not a forecast of any named person's behavior.
 const responder=safetyConflict?(a.unsafe?b:a):null;
 const safeguard=responder?responder.strength*1.5+Math.max(0,responder.team)*1.2:0;
 let score=crew+pairing+jitter+ safeguard-scenarioRisk-(safetyConflict?2:0);
 if(scenario==="normal")score+=2;
 let outcome=score<=1?"crash":score<=5.4?"divert":"safe";
 if(scenario==="hydraulic"&&outcome==="safe")outcome="divert";
 if(scenario==="fuel"&&outcome==="safe")outcome="divert";
 if(scenario==="birds"&&outcome==="safe")outcome="divert";
 if(scenario==="engine"&&outcome==="safe")outcome="divert";
 if(scenario==="window"&&outcome==="safe")outcome="divert";
 if(scenario==="unsafe"&&outcome==="safe")outcome="divert";
 return {scenario,outcome,score,crew,pairing,jitter,case:c,safetyConflict};
}
function systemTone(freq,duration=.15,volume=.11,wave="sine"){
 if(!sound)return;
 try{
 context??=new (window.AudioContext||window.webkitAudioContext)();
 if(context.state==="suspended")context.resume().catch(()=>{});
 const now=context.currentTime,osc=context.createOscillator(),gain=context.createGain();
 osc.type=wave;osc.frequency.setValueAtTime(freq,now);gain.gain.setValueAtTime(.0001,now);
 gain.gain.exponentialRampToValueAtTime(volume,now+.018);
 gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 osc.connect(gain).connect(context.destination);osc.start(now);osc.stop(now+duration+.03);
 }catch(_){}
}
function announcePullUp(){
 if(warningIssued)return; warningIssued=true;
 if(!sound)return;
 [0,220,480,740].forEach((ms,i)=>setTimeout(()=>{if(running){systemTone(i%2?820:650,.16,.17,"square");}},ms));
 if("speechSynthesis" in window){
 try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance("Pull up! Pull up!");u.lang="en-US";u.rate=1.13;u.pitch=.72;u.volume=1;window.speechSynthesis.speak(u);}catch(_){}
 }
}
function updatePanel({alt=0,spd=0,vsi=0,phase="巡航",storm=false,alert=false,failedEngines=0,tilt=0,terrainScale=1}){
 $('phase').textContent=phase;
 $('speed').textContent=String(Math.max(0,Math.round(spd))).padStart(3,"0");
 $('altitude').textContent=String(Math.max(0,Math.round(alt))).padStart(5,"0");
 $('metricAltitude').textContent=Math.round(alt).toLocaleString()+" ft";
 $('metricSpeed').textContent=Math.round(spd)+" kt";
 $('vsi').textContent="VS "+(vsi>=0?"+":"")+Math.round(vsi);
 $('metricStatus').textContent=alert?"WARNING":alt>1000?"AIRBORNE":"APPROACH";
 $('metricStatus').style.color=alert?"#ff858c":"#b3f7fa";
 $('eng1').classList.toggle("failure",failedEngines>=1);
 $('eng2').classList.toggle("failure",failedEngines>=2);
 $('sky').classList.toggle("storm",storm);
 $('sky').classList.toggle("danger",alert);
 $('horizonLine').style.transform="rotate("+tilt+"deg)";
 $('ground').style.transform="scale("+terrainScale+")";
}
function callLater(token,fn,delay){setTimeout(()=>{if(token===activeToken)fn()},delay);}
function startFlight(){
 if(running)return;
 const a=BY_ID[selected.captain],b=BY_ID[selected.fo];
 flightCount++;const result=simulate(a,b,pickCase(a,b,flightCount),flightCount);
 const c=result.case;
 activeToken++;const token=activeToken;
 running=true;warningIssued=false;runStarted=Date.now();
 $('startBtn').disabled=true;$('startBtn').innerHTML="飞行进行中 <span>FLIGHT IN PROGRESS</span>";
 $('cockpit').classList.remove("impact","crashing");$('warning').hidden=true;
 $('radioLog').innerHTML="";
 $('scenarioBadge').textContent="模拟航班 · 飞行准备";
 // Unlock audio / speech in the real click gesture for browsers that require interaction.
 if(sound){systemTone(520,.08,.12);if("speechSynthesis" in window){try{const u=new SpeechSynthesisUtterance(" ");u.volume=0;window.speechSynthesis.speak(u);}catch(_){}}}
 log("虚构机组成立："+a.cn+"（机长）与"+b.cn+"（副驾驶）。");
 log("提示：模拟结果不代表真实人物在其他航班上的行为。","muted");
 updatePanel({phase:"推出 / 起飞准备",alt:0,spd:0});
 const sequence=[
 [850,()=>{log("起飞，保持爬升。");updatePanel({phase:"起飞 · TAKEOFF",alt:1600,spd:180,vsi:1900});systemTone(700,.1);}],
 [2250,()=>{log("爬升至巡航高度，仪表显示正常。");updatePanel({phase:"巡航 · CRUISE",alt:24000,spd:310,vsi:0});$('scenarioBadge').textContent="航班开始 · 自动模拟";}],
 [3850,()=>{log(c.step,"alert");$('scenarioBadge').textContent=c.title;updatePanel({phase:"事件 · "+c.title,alt:18000,spd:290,vsi:-650,storm:result.scenario==="weather",failedEngines:result.scenario==="fuel"||result.scenario==="birds"?2:result.scenario==="engine"?1:0,tilt:result.scenario==="hydraulic"?9:2});systemTone(500,.2,.1,"triangle");}],
 [5650,()=>{log("机长 "+a.cn+"："+a.action, a.unsafe?"alert":"");}],
 [7050,()=>{log("副驾驶 "+b.cn+"："+b.action,b.unsafe?"alert":"");}],
 [8400,()=>{if(result.safetyConflict)log("机组出现危险行为与安全职责冲突。后续为架空互动结果。","alert");else if(a.unknown||b.unknown)log("MH370相关人物的未知行为未参与风险推断。","muted");else log("机组协调完成初步检查，准备下一阶段。","good");
 updatePanel({phase:"处置 · EMERGENCY RESPONSE",alt:6500,spd:230,vsi:-1500,storm:["weather","hydraulic"].includes(result.scenario),failedEngines:["birds","fuel"].includes(result.scenario)?2:result.scenario==="engine"?1:0,tilt:result.outcome==="crash"?16:4,terrainScale:1.15});}],
 [10050,()=>{if(result.outcome==="safe")log("飞机接近目标机场，状态逐步稳定。","good");else if(result.outcome==="divert")log("机组采取备降／迫降方案，接近预定着陆区。","alert");else log("机组未能恢复稳定飞行，接近地面。","alert");updatePanel({phase:"最后进近 · FINAL APPROACH",alt:result.outcome==="crash"?850:1800,spd:result.outcome==="crash"?245:175,vsi:result.outcome==="crash"?-4500:-700,storm:result.scenario==="weather",failedEngines:["birds","fuel"].includes(result.scenario)?2:result.scenario==="engine"?1:0,tilt:result.outcome==="crash"?24:2,terrainScale:1.45});}],
 [11550,()=>{if(result.outcome==="crash"){log("⚠ 地形接近警告：PULL UP! PULL UP!","alert");$('warning').hidden=false;$('cockpit').classList.add("crashing");announcePullUp();updatePanel({phase:"⚠ TERRAIN WARNING",alt:120,spd:260,vsi:-5600,alert:true,terrainScale:2.5,tilt:30,storm:true,failedEngines:["birds","fuel"].includes(result.scenario)?2:0});}else{log("即将接地，完成最后检查。","good");updatePanel({phase:"着陆 · LANDING",alt:120,spd:result.outcome==="safe"?135:150,vsi:-300,terrainScale:1.75});}}],
 [13450,()=>finish(token,a,b,result)]
 ];
 for(const [delay,fn] of sequence)callLater(token,fn,delay);
}
function finish(token,a,b,r){
 if(token!==activeToken)return;
 if("speechSynthesis" in window)try{window.speechSynthesis.cancel()}catch(_){}
 if(r.outcome==="crash"){$('cockpit').classList.add("impact");systemTone(115,.45,.18,"sawtooth");}
 $('cockpit').classList.remove("crashing");$('warning').hidden=true;
 updatePanel({phase:r.outcome==="crash"?"航班中止 · ACCIDENT":r.outcome==="safe"?"安全抵达 · ARRIVED":"紧急着陆 · LANDED",alt:0,spd:0,terrainScale:1.8});
 $('metricStatus').textContent=r.outcome==="crash"?"ACCIDENT":r.outcome==="divert"?"DIVERTED":"ARRIVED";
 $('scenarioBadge').textContent=r.outcome==="crash"?"架空事故 · 飞行结束":"模拟完成 · 航班结束";
 log(r.outcome==="crash"?"本局结局：坠毁。":r.outcome==="divert"?"本局结局：紧急迫降／备降。":"本局结局：安全到达。",r.outcome==="crash"?"alert":"good");
 running=false;$('startBtn').disabled=false;$('startBtn').innerHTML="✈ 再次飞行 <span>START ANOTHER FLIGHT</span>";
 showResult(a,b,r);
}
function showResult(a,b,r){
 const dict={crash:["坠毁 · CRASH","⚠","该虚构机组未能完成安全着陆。"],divert:["紧急迫降 · EMERGENCY LANDING","◇","飞机在异常情况下完成非正常着陆／备降。"],safe:["安全到达 · SAFE ARRIVAL","✈","飞机成功完成了本次模拟飞行。"]};
 const [title,icon,sub]=dict[r.outcome];
 $('resultTitle').textContent=title;$('resultEmblem').textContent=icon;$('resultSubtitle').textContent=sub+" 本局事件："+r.case.title;
 $('resultFactors').innerHTML='<div class="factor-row"><span>本局机长 / 副驾驶</span><strong>'+escapeHtml(a.cn+" / "+b.cn)+'</strong></div>'+
 '<div class="factor-row"><span>场景</span><strong>'+escapeHtml(r.case.title)+'</strong></div>'+
 '<div class="factor-row"><span>模拟评分（仅游戏）</span><strong>'+r.score.toFixed(1)+'</strong></div>'+
 '<div class="factor-row"><span>机组历史对应事件</span><strong>'+escapeHtml(a.flight.split(" · ")[0]+" / "+b.flight.split(" · ")[0])+'</strong></div>';
 $('resultExplain').textContent=r.case.why+" "+r.case.tip+
 " 本局按虚构规则合成了两名人物的历史行动原型、机组协作、事件严重程度及一项固定场景变化。分数不是飞行员能力测评，不是实际事故概率。"+
 ((a.unknown||b.unknown)?" MH370原因未明，相关人物在该事件中的未知行为不参与危险性评分。":"")+
 ((a.unsafe||b.unsafe)?" 德国之翼的官方调查结论不等于此人参与其他假想航班时的必然结局。":"");
 const keys=[...new Set([a.source,b.source])];
 $('references').innerHTML=keys.map(k=>sourceCard(SOURCES[k])).join("");
 $('resultOverlay').hidden=false;
 $('closeModal').focus();
}
function sourceCard(s){return '<div class="reference"><strong>'+escapeHtml(s.title)+'</strong><span>'+escapeHtml(s.summary)+'</span><a target="_blank" rel="noopener noreferrer" href="'+s.url+'">查看调查资料 ↗</a></div>';}
function showArchive(){
 $('archiveContent').innerHTML=PILOTS.map(p=>'<section class="archive-row"><strong>'+escapeHtml(p.name)+" · "+escapeHtml(p.cn)+'</strong><p>'+escapeHtml(p.flight+" — "+p.hint)+'</p><a target="_blank" rel="noopener noreferrer" href="'+SOURCES[p.source].url+'">查看相应调查报告 ↗</a></section>').join("");
 $('archiveOverlay').hidden=false;
 $('closeArchive').focus();
}
function closeResult(){$('resultOverlay').hidden=true;$('startBtn').focus();}
function resetView(){
 activeToken++;running=false;warningIssued=false;if("speechSynthesis" in window)try{window.speechSynthesis.cancel()}catch(_){}
 $('resultOverlay').hidden=true;$('warning').hidden=true;$('cockpit').classList.remove("crashing","impact");
 $('startBtn').disabled=false;$('startBtn').innerHTML="✈ 开始飞行 <span>START FLIGHT</span>";
 $('radioLog').innerHTML='';log("请选择机组并开始飞行。","muted");
 $('scenarioBadge').textContent="等待航班启动";updatePanel({phase:"机组待命 · STANDBY",alt:0,spd:0});
 $('metricAltitude').textContent="—";$('metricSpeed').textContent="—";$('metricStatus').textContent="READY";render();
}
$('startBtn').addEventListener("click",startFlight);
$('soundBtn').addEventListener("click",()=>{sound=!sound;$('soundBtn').textContent=sound?"♫ 音效开":"♫ 静音";$('soundBtn').setAttribute("aria-pressed",String(sound));if(!sound&&"speechSynthesis" in window)try{window.speechSynthesis.cancel()}catch(_){}});
$('archiveBtn').addEventListener("click",showArchive);
$('closeArchive').addEventListener("click",()=>{$('archiveOverlay').hidden=true;$('archiveBtn').focus();});
$('closeModal').addEventListener("click",closeResult);
$('againBtn').addEventListener("click",()=>{$('resultOverlay').hidden=true;startFlight();});
$('changeBtn').addEventListener("click",()=>{resetView();$('captainPanel').scrollIntoView({behavior:"smooth",block:"start"});});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(!$('archiveOverlay').hidden){$('archiveOverlay').hidden=true;$('archiveBtn').focus();}else if(!$('resultOverlay').hidden)closeResult();}});
for(const id of ["resultOverlay","archiveOverlay"]){$(id).addEventListener("click",e=>{if(e.target===$(id)){if(id==="resultOverlay")closeResult();else{$(id).hidden=true;$('archiveBtn').focus();}}});}
render();
$('metricAltitude').textContent="—";$('metricSpeed').textContent="—";
})();