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
 {id:"sully",name:"Chesley Sullenberger",cn:"萨伦伯格",flight:"US Airways 1549 · 2009",brief:"两台发动机失去动力 · 哈德逊河迫降",source:"1549",strength:4,team:3,action:"迅速评估备降选项，优先保持飞机可控，并寻找可用的迫降地点。",hint:"两台发动机同时失去动力后，他选择在哈德逊河迫降。",skin:"#e7b99b",hair:"#c6d0d4",eye:"#385d73",style:1},
 {id:"skiles",name:"Jeffrey Skiles",cn:"杰弗里·斯凯尔斯",flight:"US Airways 1549 · 2009",brief:"协助发动机处置与检查程序",source:"1549",strength:3,team:4,action:"协助判断发动机状态，执行检查与沟通工作。",hint:"历史行动：配合机长执行紧急程序。",skin:"#e9bc9f",hair:"#674f45",eye:"#334862",style:2},
 {id:"haynes",name:"Alfred C. Haynes",cn:"阿尔弗雷德·海恩斯",flight:"United 232 · 1989",brief:"严重液压失效 · 协同保持控制",source:"232",strength:4,team:4,action:"组织机组持续沟通，在严重操纵受限时尽力维持飞行。",hint:"历史行动：在液压失效中组织机组合作，最终尝试迫降。",skin:"#d8a285",hair:"#b5b5ba",eye:"#384e67",style:0},
 {id:"fitch",name:"Dennis Fitch",cn:"丹尼斯·菲奇",flight:"United 232 · 1989",brief:"乘客机长／DC-10培训机长 · 协助者",source:"232",strength:4,team:4,action:"主动提供协助，并配合其他机组人员寻找有限的控制方案。",hint:"历史行动：作为搭乘本班机的培训机长自愿协助；当班副驾驶是 William R. Records。",skin:"#deb195",hair:"#8e8580",eye:"#3c5268",style:3},
 {id:"shults",name:"Tammie Jo Shults",cn:"塔米·乔·舒尔茨",flight:"Southwest 1380 · 2018",brief:"发动机故障与失压 · 紧急备降",source:"1380",strength:4,team:4,action:"与副驾驶配合判断异常，联系管制并协调尽快备降。",hint:"历史行动：发动机故障及机舱失压后成功备降费城。",skin:"#ecc4a3",hair:"#655447",eye:"#496276",style:4},
 {id:"piche",name:"Robert Piché",cn:"罗伯特·皮谢",flight:"Air Transat 236 · 2001",brief:"燃油耗尽 · 两台发动机停转后着陆",source:"236",strength:3,team:3,action:"在失去动力的极端情况下寻求滑翔至机场的机会。",hint:"历史行动：与副驾驶一起完成无动力着陆；调查也指出机组处置问题。",skin:"#e6bb9b",hair:"#403d40",eye:"#46536d",style:0},
 {id:"dejager",name:"Dirk de Jager",cn:"德克·德雅格",flight:"Air Transat 236 · 2001",brief:"协助失去动力后的备降",source:"236",strength:3,team:3,action:"协助监视系统与航路，配合机长完成紧急备降。",hint:"历史行动：作为副驾驶参与了Air Transat 236无动力着陆。",skin:"#e5ba98",hair:"#89634c",eye:"#46506a",style:2},
 {id:"atchison",name:"Alastair Atchison",cn:"阿拉斯泰尔·艾奇逊",flight:"British Airways 5390 · 1990",brief:"风挡失效 · 接管飞机安全降落",source:"5390",strength:4,team:4,action:"在另一名机组成员失去正常操纵能力时接管飞行，并协调支援。",hint:"历史行动：风挡失效后操纵飞机成功降落。",skin:"#e3b998",hair:"#544c43",eye:"#495873",style:3},
 {id:"lubitz",name:"Andreas Lubitz",cn:"安德烈亚斯·卢比茨",flight:"Germanwings 9525 · 2015",brief:"BEA认定故意导致撞山",source:"9525",strength:0,team:-3,action:"出现与飞行安全相冲突的危险行为；架空机组能否识别并制止，取决于本局模拟规则。",hint:"历史结论：BEA认定他故意造成9525航班撞山。模拟不复现具体伤害方法。",skin:"#dfb097",hair:"#78503c",eye:"#3b526c",style:2,unsafe:true},
 {id:"records",name:"William R. Records",cn:"威廉·雷科德斯",flight:"United 232 · 1989",brief:"当班副驾驶 · 液压失效应急处置",source:"232",strength:4,team:4,action:"与机长及协助人员持续交叉检查，在操纵受限时合作完成应急程序。",hint:"历史行动：当班副驾驶，参与联合航空232航班液压失效后的集体应对。",skin:"#d6a48a",hair:"#58483c",eye:"#42506d",style:1}
];
/* Display-only microcopy. These summaries never enter flight outcome calculations. */
const SHORT_HISTORY={
 "1549":"2009年，鸟群撞击让两台发动机同时失去动力。机组在哈德逊河迫降，155人全部生还。",
 "232":"1989年，UA232发动机严重损坏，飞机很难控制。机组尝试迫降，飞机坠毁，多数人幸存。",
 "1380":"2018年，西南航空1380航班发动机损坏、客舱失压。飞机备降费城，一名乘客遇难。",
 "236":"2001年，越洋航空236航班漏油，两台发动机停转。机组滑翔至机场，成功降落。",
 "5390":"1990年，英国航空5390航班风挡脱落，机长无法操纵。副驾驶接手，成功降落。",
 "9525":"2015年，德国之翼9525航班坠毁。官方调查认定副驾驶故意导致了事故。"
};
/* Concise, role-specific historical text for the ending UI only. */
const PERSON_HISTORY={
 sully:"2009年，1549航班两台发动机失去动力。萨伦伯格机长在哈德逊河迫降，155人全部生还。",
 skiles:"2009年，1549航班两台发动机失去动力。斯凯尔斯副驾驶协助检查，机组在哈德逊河迫降，全员生还。",
 haynes:"1989年，UA232发动机严重受损，飞机难以控制。海恩斯机长组织迫降，多数乘员幸存。",
 fitch:"1989年，UA232难以控制。作为乘客的培训机长菲奇主动协助机组，多数乘员幸存。",
 shults:"2018年，1380航班发动机损坏、客舱失压。舒尔茨机长备降费城，一名乘客遇难，其余人员获救。",
 piche:"2001年，236航班漏油，两台发动机停转。皮谢机长操纵飞机滑翔着陆，机上人员全部生还。",
 dejager:"2001年，236航班两台发动机停转。副驾驶德雅格协助机长滑翔降落，机上人员全部生还。",
 atchison:"1990年，5390航班驾驶舱风挡脱落，机长无法操纵。副驾驶艾奇逊接手，最终安全降落。",
 lubitz:"2015年，德国之翼9525航班坠毁。法国调查机构认定副驾驶卢比茨故意导致了事故。",
 records:"1989年，UA232发动机严重受损。副驾驶雷科德斯协助机组处置，飞机坠毁，多数人幸存。"
};

const HISTORICAL_ACTION={
 sully:"萨伦伯格决定在哈德逊河降落，和副驾驶协作救回全机人员。",
 skiles:"斯凯尔斯协助检查发动机状态，配合机长完成哈德逊河迫降。",
 haynes:"海恩斯是UA232的机长，组织机组尽力控制受损飞机。",
 fitch:"菲奇是搭乘UA232的培训机长，自愿进驾驶舱协助，并非当班副驾驶。",
 shults:"舒尔茨与副驾驶协调下降和备降，最终在费城着陆。",
 piche:"皮谢与副驾驶在飞机没了发动机动力后，滑翔降落在亚速尔群岛。",
 dejager:"德雅格担任副驾驶，配合机长完成无动力着陆。",
 atchison:"艾奇逊在驾驶舱风挡脱落后接管操纵，最终安全着陆。",
 lubitz:"调查认定卢比茨故意导致9525航班撞山，机上人员全部遇难。",
 records:"雷科德斯是UA232当班副驾驶，与机长及其他人员共同处置危机。"
};
/* Short captions keep both selected people's documented roles visible. */
const ROLE_SUMMARY={
 sully:"萨伦伯格机长选择河面迫降",
 skiles:"斯凯尔斯副驾驶协助检查",
 haynes:"海恩斯机长组织应急迫降",
 fitch:"菲奇是乘客培训机长，主动协助",
 shults:"舒尔茨机长驾驶飞机备降费城",
 piche:"皮谢机长操纵滑翔着陆",
 dejager:"德雅格副驾驶配合机长",
 atchison:"艾奇逊副驾驶接管飞行",
 lubitz:"调查认定卢比茨故意导致事故",
 records:"雷科德斯副驾驶协助处置"
};

const ROLE_NOTE="本次模拟让他担任副驾驶，历史上他是UA 232的机长。";
function uiHistoricalText(p,side){
 return (HISTORICAL_ACTION[p.id]||p.hint)+(side==="fo"&&p.id==="haynes"?" "+ROLE_NOTE:"");
}
function miniFlight(flight){
 const match=flight.match(/(?:^|\s)(\d{2,4})\s*·\s*(\d{4})$/);
 return match?match[1]+"航班 · "+match[2]:flight;
}


/* Display-only history metadata, separate from the game scoring and scenario model. */
const CREW_PROFILE={
 sully:{flight:"US 1549",role:"机长",note:"发动机停转，选择河面迫降。"},
 skiles:{flight:"US 1549",role:"副驾驶",note:"协助检查，完成河面迫降。"},
 haynes:{flight:"UA 232",role:"机长",note:"飞机失控时，组织机组应对。"},
 fitch:{flight:"UA 232",role:"乘客培训机长",note:"主动加入机组协助处置。"},
 shults:{flight:"WN 1380",role:"机长",note:"发动机损坏后，驾机备降。"},
 piche:{flight:"TS 236",role:"机长",note:"发动机停转，滑翔迫降。"},
 dejager:{flight:"TS 236",role:"副驾驶",note:"协助机长，滑翔着陆。"},
 atchison:{flight:"BA 5390",role:"副驾驶",note:"风挡脱落，接管飞机着陆。"},
 lubitz:{flight:"4U 9525",role:"副驾驶",note:"调查认定其故意导致坠毁。"},
 records:{flight:"UA 232",role:"副驾驶",note:"协助机长，应对操纵故障。"}
};
/* UI-only overflow cue for the scrollable middle region. */
function refreshStandbyOverflow(){
 const el=document.querySelector(".story-stage");
 if(!el)return;
 const moreBelow=el.scrollHeight>el.clientHeight+3 &&
   el.scrollTop+el.clientHeight<el.scrollHeight-3;
 el.classList.toggle("has-more-below",moreBelow);
}
function queueStandbyOverflow(){
 if(typeof window.requestAnimationFrame==="function"){
  window.requestAnimationFrame(refreshStandbyOverflow);
 }else refreshStandbyOverflow();
}
function renderCrewDossier(a,b){
 for(const [side,pilot] of [["Captain",a],["Fo",b]]){
  const history=CREW_PROFILE[pilot.id];
  $("dossier"+side+"Name").textContent=pilot.cn;
  $("dossier"+side+"Action").textContent=history.note;
 }
 const sameEvent=a.source===b.source;
 $("pairingTag").textContent=sameEvent?"真实搭档":"跨时空组合";
 $("pairingTag").setAttribute("aria-label",sameEvent?"两人参加过同一真实航空事件，并不一定是历史上的机长与副驾驶":"两人来自不同的真实航空事件");
 $("pairingTag").classList.toggle("cross-era",!sameEvent);
}

const BY_ID=Object.fromEntries(PILOTS.map(p=>[p.id,p]));
const CASES={
 birds:{title:"鸟击 · 两台发动机失去动力",severe:5,step:"模拟事件：起飞后遭遇鸟群，两台发动机推力骤降。",why:"鸟击造成双发推力不足时，需要在有限时间内评估迫降区域。哈德逊河事件有真实历史依据，但当前机组及条件是虚构的。",tip:"现实科普：两台发动机同时失去动力，飞机仍能短时间滑翔，并不会马上直线坠下。"},
 fuel:{title:"燃油系统异常",severe:5,step:"模拟事件：燃油状态异常，两台发动机先后失去动力。",why:"失去发动机推力时，飞机仍具备一定滑翔能力，但能否抵达机场受高度、距离和天气影响。",tip:"现实科普：Air Transat 236最终安全着陆，然而调查指出不止一个导致事件升级的因素。"},
 hydraulic:{title:"飞行控制受限",severe:6,step:"模拟事件：严重机械故障，多个液压系统失效。",why:"液压系统故障可能大幅削弱大型客机操纵能力。United 232的机组曾在控制严重受限时持续努力。",tip:"现实科普：联合航空232航班最终坠毁，但多数乘员生还，不能简单将其归入『飞行员失败』。"},
 engine:{title:"发动机故障 · 机舱失压",severe:4,step:"模拟事件：一台发动机故障，同时出现客舱失压。",why:"紧急下降和寻找合适备降机场属于机组需要协同完成的任务。",tip:"现实科普：发动机失效并不一定意味着无法继续飞行，关键还取决于其他系统状态。"},
 window:{title:"驾驶舱风挡失效",severe:4,step:"模拟事件：驾驶舱风挡异常，机组成员一度无法正常操纵。",why:"驾驶舱风挡故障可能迅速增加机组负担。另一名飞行员的持续操纵和支援协调十分关键。",tip:"现实科普：英国航空5390航班的事故调查重点涉及维护工作和风挡固定螺栓。"},
 unsafe:{title:"机组安全冲突",severe:8,step:"模拟事件：一名机组成员出现与安全飞行相冲突的危险行为。",why:"这是虚构的机组安全冲突情景；游戏不会描写真实事件中具体的实施方式。",tip:"现实科普：飞行安全不仅依赖个人技术，也依赖程序、沟通和组织层面的保障措施。"},
 weather:{title:"恶劣天气进近",severe:3,step:"模拟事件：目的地附近出现强降雨和低能见度。",why:"复杂天气下，需要评估是否复飞或备降，以及机组能否保持清晰沟通。",tip:"现实科普：复飞并不是失败，而是一项正常、重要的安全选择。"},
 normal:{title:"常规航班",severe:1,step:"模拟事件：航路平稳，进行标准进近准备。",why:"常规飞行中仍然需要检查程序、职责分工和有效沟通。",tip:"现实科普：PF负责操纵，PM负责监控；机长与副驾驶可以交换这两个分工。"}
};

/* The historical summaries describe documented events, not general character traits.
   Scenario scripts below are explicitly fictional; no invented pilot quotes. */
const BIOS={
 sully:"2009年1月15日，他担任全美航空1549航班机长。飞机起飞不久撞上鸟群，两台发动机几乎同时失去动力。机组选择在哈德逊河迫降，机上155人全部生还。",
 skiles:"2009年全美航空1549航班的副驾驶。鸟击发生后，他协助执行紧急检查程序，与机长共同处置失去推力的紧急情况。",
 haynes:"1989年联合航空232航班机长。飞机尾部发动机故障引发严重液压系统失效，他与其他机组人员竭力保持控制，并尝试在苏城紧急着陆；飞机坠毁，但多数乘员幸存。",
 fitch:"1989年联合航空232航班上的乘客机长、DC-10培训机长。事故中他主动进入驾驶舱协助机组处理严重液压故障。当时的当班副驾驶是威廉·雷科德斯，而非菲奇。",
 shults:"2018年西南航空1380航班机长。飞机一台发动机故障并发生客舱失压，机组协调紧急下降和备降，最终在费城落地；事件造成一名乘客遇难。",
 piche:"2001年越洋航空236航班机长。飞机发生燃油泄漏并最终双发失去动力，机组将飞机滑翔至亚速尔群岛机场降落。调查也记录了维护与机组处置方面的复杂因素。",
 dejager:"2001年越洋航空236航班副驾驶。他与机长在客机失去发动机动力后参与了滑翔与紧急着陆。调查涉及燃油系统及机组应对等多方面因素。",
 atchison:"1990年英国航空5390航班副驾驶。飞行中驾驶舱风挡失效，机长失去正常操纵能力，他接管飞行并在其他人员协助下安全降落。",
 lubitz:"2015年德国之翼9525航班副驾驶。法国BEA的事故调查认定，他故意导致飞机撞山。游戏将该历史调查结论与虚构的跨时代角色组合严格区分。",
 records:"1989年联合航空232航班的当班副驾驶。飞机发生灾难性的液压系统失效后，他与机长阿尔弗雷德·海恩斯、飞行工程师和自愿协助的培训机长丹尼斯·菲奇共同处置紧急情况。飞机最终在苏城坠毁，但多数乘员生还。"
};
const PLOTS={
 birds:{intro:"起飞后的城市还在窗下缓缓缩小。忽然，挡风玻璃前出现一群飞鸟。",twist:"连续的撞击与剧烈震动！发动机推力几乎同时消失，原本熟悉的噪音瞬间变得不对劲。",stakes:"高度正一寸寸减少。返回机场还是寻找另一片可控的着陆区域？"},
 fuel:{intro:"漫长的巡航进入深夜，驾驶舱里只有仪表柔和的光。",twist:"燃油警告接连响起，发动机状态急剧恶化。最糟糕的情况出现了：推力正在消失。",stakes:"没有发动机推力也不意味着立刻坠落，但留给判断航程和高度的余地越来越小。"},
 hydraulic:{intro:"一声沉闷巨响打破平静，飞机猛地抖动，机组下意识看向警告灯。",twist:"多个液压系统先后告警，常规操纵不再听使唤；每一次修正都变得困难。",stakes:"这次不是寻找完美着陆，而是想办法在几乎无法正常操纵的情况下接近地面。"},
 engine:{intro:"旅客正准备迎接目的地。驾驶舱的下降简令刚刚完成。",twist:"引擎发出异常震动，随即响起失压告警！机组必须同时处理多个问题。",stakes:"航路、客舱、发动机和备降机场，每个决定都在和时间赛跑。"},
 window:{intro:"高空阳光照在仪表板上，飞行看似平常。",twist:"突然一声巨响！风挡异常失效，气流和噪音瞬间冲进驾驶舱。",stakes:"一名飞行员暂时无法正常操纵，另一人必须稳住飞机并协调救援。"},
 unsafe:{intro:"航班开始时一切如常，但驾驶舱里的气氛逐渐变得微妙。",twist:"一名机组成员出现与安全职责冲突的危险行为。另一人必须尽快识别异常并作出反应。",stakes:"这是一段虚构的机组冲突剧情。危险来自协作和安全屏障失效，不对应真实历史中的具体实施步骤。"},
 weather:{intro:"目的地机场的灯光终于出现，云层却比预报中更厚。",twist:"雨幕扑向挡风玻璃，能见度骤降，跑道灯忽隐忽现。",stakes:"继续进近还是复飞？有时候最重要的判断，是承认此刻不适合着陆。"},
 normal:{intro:"客舱安静，天气晴好，机组完成了又一项例行检查。",twist:"接近目的地时，塔台给出新的进近指令。两名飞行员开始交叉核对高度与航向。",stakes:"没有惊天动地的事故，但一次平稳飞行仍然依赖扎实的程序与配合。"}
};
function narrate(who,line,tone=""){
 $("storySpeaker").textContent=who;
 $("storyText").textContent=line;
 $("storyBubble").className="story-bubble"+(tone?" "+tone:"");
}
function showPilotInfo(id,anchor){
 const p=BY_ID[id];if(!p)return;
 const box=$("pilotInfoOverlay");
 $("pilotInfoTitle").textContent=p.cn+" · "+p.name;
 $("pilotInfoBody").innerHTML='<span class="popover-flight">'+escapeHtml(p.flight)+'</span><p class="popover-summary">'+escapeHtml(BIOS[p.id]+(selected.fo===p.id&&p.id==="haynes"?" "+ROLE_NOTE:""))+'</p>';
 box.hidden=false;
 const rect=anchor&&typeof anchor.getBoundingClientRect==="function"?anchor.getBoundingClientRect():null;
 const vw=window.innerWidth||document.documentElement.clientWidth||390;
 const vh=window.innerHeight||document.documentElement.clientHeight||750;
 const w=Math.min(288,vw-20),h=Math.min(205,vh*.34);
 const left=rect?Math.min(Math.max(10,rect.left+rect.width/2-w/2),vw-w-10):Math.max(10,(vw-w)/2);
 let top=rect?(rect.bottom+10+h>vh-10?rect.top-h-10:rect.bottom+10):Math.max(10,(vh-h)/2);
 top=Math.max(10,Math.min(top,vh-h-10));
 box.style.left=Math.round(left)+"px";box.style.top=Math.round(top)+"px";
}
function closePilotInfo(){$("pilotInfoOverlay").hidden=true;}

/* FLIGHT PRESENTATION ONLY.
 * These optional player acknowledgements never feed pickCase, simulate,
 * scenario timing, crew statistics, or finish(). The flight remains automatic.
 */
const DISPLAY_STEPS=[
 {name:"出发检查",choices:["核对当前高度","检查航路信息","联系塔台"]},
 {name:"异常识别",choices:["检查仪表告警","确认可用系统","呼叫机组协助"]},
 {name:"机组协作",choices:["分配机组任务","复查应急程序","通报客舱情况"]},
 {name:"备降评估",choices:["请求备降许可","评估附近机场","核对剩余高度"]},
 {name:"最后进近",choices:["完成着陆检查","确认速度姿态","提醒机组准备"]}
];
const SITUATION_CHOICES={
 birds:["检查两台发动机","确认滑翔高度","寻找迫降区域"],
 fuel:["核对燃油读数","检查发动机状态","寻找最近机场"],
 hydraulic:["检查液压系统","核对操纵响应","请求机组支援"],
 engine:["检查发动机参数","执行下降检查","联系备降机场"],
 window:["确认风挡情况","检查驾驶舱状态","请求紧急支援"],
 unsafe:["核对安全程序","提醒另一位机组成员","请求安全支援"],
 weather:["查看气象雷达","核对进近条件","准备复飞方案"],
 normal:["核对飞行计划","检查下降高度","确认进近程序"]
};
const FLIGHT_SCENE_LINES={
 birds:["刚起飞，前方突然出现鸟群。","撞击后，两台发动机动力骤降。","没有足够高度，机组正在寻找安全区域。"],
 fuel:["巡航中，燃油警告突然亮起。","两台发动机先后停转。","机组必须判断还能滑翔多远。"],
 hydraulic:["机身传来巨响，警告灯接连亮起。","液压系统失效，操纵变得困难。","机组需要协作，尽量保持飞机可控。"],
 engine:["飞机开始下降，客舱还很平静。","发动机故障，客舱失压警报响起。","机组正评估紧急下降和备降机场。"],
 window:["航班原本平稳，机组准备进近。","驾驶舱风挡突然失效，气流涌入。","一位飞行员必须立即接管操纵。"],
 unsafe:["一次平常的飞行出现异常气氛。","机组出现了违反安全职责的行动。","另一位飞行员必须识别并应对风险。"],
 weather:["目的地云层加厚，机场灯光隐约可见。","暴雨降临，能见度快速下降。","继续进近还是复飞？机组必须选择。"],
 normal:["航班平稳，机组完成巡航检查。","塔台下达新的进近指令。","机组正核对航向、高度和着陆程序。"]
};
let decisionIndex=0,decisionSituation="normal",pressureTicker=null,uiFlightStart=0,decisionLocked=false;
function flightOptionConsequence(label){
 if(label.includes("塔台")||label.includes("联系")||label.includes("请求"))return "通讯请求已记录，机组继续核对方案。";
 if(label.includes("机场")||label.includes("迫降")||label.includes("航路"))return "相关位置已核对，机组继续评估距离。";
 if(label.includes("机组")||label.includes("客舱"))return "协作步骤已记录，机组保持沟通。";
 if(label.includes("高度")||label.includes("速度")||label.includes("姿态"))return "飞行参数已核对，进近风险仍需监控。";
 return "检查行动已记录，当前飞行继续推进。";
}
function paintFlightChoices(){
 const stage=Math.min(decisionIndex,4);
 $("decisionCounter").textContent=(stage+1)+" / 5";
 const options=stage===1?(SITUATION_CHOICES[decisionSituation]||DISPLAY_STEPS[stage].choices):DISPLAY_STEPS[stage].choices;
 $("decisionActions").innerHTML=options.map((label,index)=>
 '<button type="button" class="decision-option" data-choice="'+index+'" '+(decisionLocked?'disabled':'')+' aria-label="记录处置行动：'+escapeHtml(label)+'">'+escapeHtml(label)+'</button>').join("");
 if(decisionLocked)$("decisionCounter").textContent="5 / 5 · 已记录";
}
function recordFlightChoice(index){
 if(!running||decisionLocked||!Number.isInteger(index))return;
 const stage=Math.min(decisionIndex,4);
 const options=stage===1?(SITUATION_CHOICES[decisionSituation]||DISPLAY_STEPS[stage].choices):DISPLAY_STEPS[stage].choices;
 if(index<0||index>=options.length)return;
 const label=options[index];
 $("decisionConsequence").hidden=false;
 $("decisionConsequence").textContent="上一步后果："+flightOptionConsequence(label);
 log("剧情选择："+label+"（不影响预设结局）","muted");
 if(decisionIndex<4)decisionIndex++;
 else decisionLocked=true;
 paintFlightChoices();
 const panel=$("flightDecisions");
 if(panel)panel.scrollTop=0;
}
function refreshFlightPressure(){
 if(!running||$("flightDecisions").hidden)return;
 const left=Math.max(0,13450-(Date.now()-uiFlightStart));
 const percent=Math.max(0,Math.min(100,left/13450*100));
 $("pressureTime").textContent=(left/1000).toFixed(1)+"秒";
 $("pressureFill").style.width=percent.toFixed(2)+"%";
 const track=$("pressureTrack");
 track.setAttribute("aria-valuenow",String(Math.round(percent)));
 track.classList.toggle("warn",percent<65&&percent>=30);
 track.classList.toggle("critical",percent<30);
}
function clearFlightPresentation(){
 if(pressureTicker!==null){clearInterval(pressureTicker);pressureTicker=null;}
}
function startFlightPresentation(situation){
 clearFlightPresentation();
 decisionSituation=situation;decisionIndex=0;decisionLocked=false;uiFlightStart=Date.now();
 $("decisionConsequence").textContent="";$("decisionConsequence").hidden=true;
 $("pressureFill").style.width="100%";
 $("pressureTrack").classList.remove("warn","critical");
 $("pressureTrack").setAttribute("aria-valuenow","100");
 $("pressureTime").textContent="13.5秒";
 paintFlightChoices();
 refreshFlightPressure();
 pressureTicker=setInterval(refreshFlightPressure,180);
}

let selected={captain:"sully",fo:"skiles"},running=false,flightCount=0,activeToken=0,sound=true,context=null,warningIssued=false;
// Stage is the sole source of truth for visibility; running is still used by the original flight simulator.
let gamePhase="idle"; // idle | playing | ended
const flightTimers=new Set();
const activeOscillators=new Set();
function stopFlightEffects(){
 for(const id of flightTimers)clearTimeout(id);
 flightTimers.clear();
 clearFlightPresentation();
 for(const osc of activeOscillators){try{osc.stop()}catch(_){}}
 activeOscillators.clear();
 if("speechSynthesis" in window)try{window.speechSynthesis.cancel()}catch(_){}
}
function renderStage(){
 const idle=gamePhase==="idle",playing=gamePhase==="playing",ended=gamePhase==="ended";
 document.body.classList.toggle("is-flying",playing);
 document.body.classList.toggle("has-result",ended);
 document.body.classList.toggle("flight-decision-mode",playing);
 $("crewDossier").hidden=!idle;
 $("flightDecisions").hidden=!playing;
 $("inlineResult").hidden=!ended;
 $("phase").hidden=ended;
 $("scenarioBadge").hidden=true;
 const btn=$("startBtn");
 btn.disabled=playing;
 btn.textContent=idle?"✈ 开始飞行":playing?"✈ 飞行进行中":"✈ 再次飞行";
}

const PILOT_SPRITES={
 sully:[0,0],skiles:[1,0],haynes:[2,0],fitch:[3,0],shults:[4,0],
 piche:[0,1],dejager:[1,1],atchison:[2,1],lubitz:[3,1],records:[4,1]
};
function avatar(p,large=false){
 // Ten original generated PNG portraits live in one lightweight GitHub asset.
 // The CSS sprite selects a cell; no expression or face parts are synthesized.
 const cell=PILOT_SPRITES[p.id]||[0,0];
 return '<span class="pilot-art'+(large?' pilot-art--large':'')+
  '" role="img" aria-label="'+escapeHtml(p.cn)+'的插画人物形象" '+
  'style="background-position:'+cell[0]*25+'% '+cell[1]*100+'%"></span>';
}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function card(p,side){
 const current=selected[side]===p.id,blocked=selected[side==="captain"?"fo":"captain"]===p.id;
 // Adjacent buttons rather than invalid nested buttons: both actions stay tappable.
 return '<div class="crew-card-row"><button class="crew-card '+(current?'selected ':'')+(p.unknown?'unresolved':'')+'" type="button" data-side="'+side+'" data-id="'+p.id+'" aria-pressed="'+current+'" '+(blocked?'disabled aria-label="另一席位已选择此人"':'')+'>'+
 '<span class="portrait">'+avatar(p)+'</span><span class="person-main"><span class="person-name">'+escapeHtml(p.name)+'</span><span class="event">'+escapeHtml(p.flight)+'</span><span class="detail">'+escapeHtml(p.brief)+'</span></span>'+(current?'<span class="picked" aria-hidden="true">✓</span>':'')+'</button>'+
 '<button class="pilot-info-btn" type="button" data-info="'+p.id+'" aria-label="查看'+escapeHtml(p.cn)+'经历">i</button></div>';
}
function render(){
 $('captainList').innerHTML=PILOTS.map(p=>card(p,"captain")).join("");
 $('foList').innerHTML=PILOTS.map(p=>card(p,"fo")).join("");
 const a=BY_ID[selected.captain], b=BY_ID[selected.fo];
 $('captainName').textContent=a.name; $('foName').textContent=b.name;
 $('bigCaptain').innerHTML=avatar(a,true);$('bigFirstOfficer').innerHTML=avatar(b,true);
 $('seatCaptain').textContent=a.cn;$('seatFirstOfficer').textContent=b.cn;
 for(const [side,pilot] of [["captain",a],["fo",b]]){
  $(side+"MiniPortrait").innerHTML=avatar(pilot);
  $(side+"FlightAvatar").innerHTML=avatar(pilot);
  $(side+"FlightName").textContent=pilot.cn;
  $(side+"MiniName").textContent=pilot.cn;
  const historic=CREW_PROFILE[pilot.id];
  $(side+"MiniFlight").textContent=historic.flight+" · "+historic.role;
  const chooser=document.querySelector('.crew-current[data-side="'+side+'"]');
  if(chooser)chooser.setAttribute("aria-label","当前"+(side==="captain"?"机长":"副驾驶")+pilot.cn+"，历史职务"+historic.role+"，点击更换");
 }
 renderCrewDossier(a,b);
 renderStage();
 queueStandbyOverflow();
}
let pickerSide="captain";
function setPilot(side,id){
 if(running||!["captain","fo"].includes(side)||!BY_ID[id]||selected[side==="captain"?"fo":"captain"]===id)return;
 selected[side]=id;render();
 $('pickerOverlay').hidden=true;
 log("机组变更："+BY_ID[selected.captain].cn+" / "+BY_ID[selected.fo].cn,"muted");
}
function stepPilot(side,delta){
 if(running)return;
 const i=PILOTS.findIndex(p=>p.id===selected[side]);
 for(let n=1;n<=PILOTS.length;n++){
   const candidate=PILOTS[(i+delta*n+PILOTS.length*10)%PILOTS.length];
   if(candidate.id!==selected[side==="captain"?"fo":"captain"]){setPilot(side,candidate.id);return;}
 }
}
function openPicker(side){
 if(running)return;
 pickerSide=side;
 $('pickerTitle').textContent="选择"+(side==="captain"?"机长 CAPTAIN":"副驾驶 FIRST OFFICER");
 $('pickerItems').innerHTML=PILOTS.map(p=>card(p,side)).join("");
 $('pickerOverlay').hidden=false;$('closePicker').focus();
}
function closePicker(){
 $('pickerOverlay').hidden=true;
 const button=document.querySelector('.crew-current[data-side="'+pickerSide+'"]');
 if(button)button.focus();
}
document.addEventListener("click",e=>{
 const choice=e.target.closest(".decision-option");
 if(choice){recordFlightChoice(Number(choice.dataset.choice));return;}
 const info=e.target.closest(".pilot-info-btn");
 if(info){showPilotInfo(info.dataset.info,info);return;}
 const current=e.target.closest(".mobile-info");
 if(current){showPilotInfo(selected[current.dataset.infoCurrent],current);return;}
 if(!$("pilotInfoOverlay").hidden&&!e.target.closest("#pilotInfoOverlay"))closePilotInfo();
 const btn=e.target.closest(".crew-card");
 if(btn){setPilot(btn.dataset.side,btn.dataset.id);return;}
 const step=e.target.closest(".crew-step");
 if(step){stepPilot(step.dataset.side,Number(step.dataset.shift));return;}
 const picker=e.target.closest(".crew-current");
 if(picker){openPicker(picker.dataset.side);return;}
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
 osc.connect(gain).connect(context.destination);activeOscillators.add(osc);
 osc.onended=()=>activeOscillators.delete(osc);
 osc.start(now);osc.stop(now+duration+.03);
 }catch(_){}
}
function announcePullUp(){
 if(warningIssued)return; warningIssued=true;
 if(!sound)return;
 [0,220,480,740].forEach((ms,i)=>callLater(activeToken,()=>{if(running)systemTone(i%2?820:650,.16,.17,"square");},ms));
 if("speechSynthesis" in window){
 try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance("Pull up! Pull up!");u.lang="en-US";u.rate=1.13;u.pitch=.72;u.volume=1;window.speechSynthesis.speak(u);}catch(_){}
 }
}
function updatePanel({alt=0,spd=0,vsi=0,phase="巡航",storm=false,alert=false,failedEngines=0,tilt=0,terrainScale=1}){
 $('phase').textContent=phase.includes("警告")||phase.includes("WARNING")?"地形警告":phase.includes("待命")?"待命":phase.includes("起飞")?"起飞":phase.includes("巡航")?"巡航":phase.includes("事件")?"突发状况":phase.includes("处置")?"应急处置":phase.includes("进近")?"进近":phase.includes("着陆")?"着陆":phase.includes("安全抵达")?"安全抵达":phase.includes("航班中止")?"航班中止":"飞行中";
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
function callLater(token,fn,delay){
 const timer=setTimeout(()=>{
  flightTimers.delete(timer);
  if(token===activeToken)fn();
 },delay);
 flightTimers.add(timer);
}
function startFlight(){
 if(gamePhase!=="idle"||running)return;
 // A fresh run always starts from a completely cleared idle presentation.
 resetToIdle();
 const a=BY_ID[selected.captain],b=BY_ID[selected.fo];
 flightCount++;const result=simulate(a,b,pickCase(a,b,flightCount),flightCount);
 const c=result.case;
 activeToken++;const token=activeToken;
 running=true;warningIssued=false;runStarted=Date.now();gamePhase="playing";
 render(); // the same render path owns all stage visibility
 startFlightPresentation(result.scenario);
 $('radioLog').innerHTML="";
 $('radioPanel').classList.remove("is-open");$('logBtn').setAttribute("aria-expanded","false");
 $('scenarioBadge').textContent="模拟航班 · 飞行准备";
 // Unlock audio / speech in the real click gesture for browsers that require interaction.
 if(sound){systemTone(520,.08,.12);if("speechSynthesis" in window){try{const u=new SpeechSynthesisUtterance(" ");u.volume=0;window.speechSynthesis.speak(u);}catch(_){}}}
 log("虚构机组成立："+a.cn+"（机长）与"+b.cn+"（副驾驶）。");
 log("提示：模拟结果不代表真实人物在其他航班上的行为。","muted");
 const plot=PLOTS[result.scenario];
 narrate("旁白","机组完成准备，飞机即将起飞。");
 updatePanel({phase:"推出 / 起飞准备",alt:0,spd:0});
 const sequence=[
 [850,()=>{log("起飞，保持爬升。");narrate("塔台","飞机已经离地，开始爬升。","good");updatePanel({phase:"起飞 · TAKEOFF",alt:1600,spd:180,vsi:1900});systemTone(700,.1);}],
 [2250,()=>{log("爬升至巡航高度，仪表显示正常。");narrate("旁白",FLIGHT_SCENE_LINES[result.scenario][0]);updatePanel({phase:"巡航 · CRUISE",alt:24000,spd:310,vsi:0});$('scenarioBadge').textContent="航班开始 · 自动模拟";}],
 [3850,()=>{log(c.step,"alert");narrate("突发状况",FLIGHT_SCENE_LINES[result.scenario][1],"alert");$('scenarioBadge').textContent=c.title;updatePanel({phase:"事件 · "+c.title,alt:18000,spd:290,vsi:-650,storm:result.scenario==="weather",failedEngines:result.scenario==="fuel"||result.scenario==="birds"?2:result.scenario==="engine"?1:0,tilt:result.scenario==="hydraulic"?9:2});systemTone(500,.2,.1,"triangle");}],
 [5650,()=>{log("机长 "+a.cn+"："+a.action, a.unsafe?"alert":"");narrate("机长 · "+a.cn,a.unsafe?"机组察觉到危险行为，需要立即应对。":"机长正在核对状态，准备应急处置。",a.unsafe?"alert":"");}],
 [7050,()=>{log("副驾驶 "+b.cn+"："+b.action,b.unsafe?"alert":"");narrate("副驾驶 · "+b.cn,b.unsafe?"机组正在识别异常，保持安全监控。":"副驾驶协助核对仪表和备降方案。",b.unsafe?"alert":"");}],
 [8400,()=>{narrate("关键时刻",FLIGHT_SCENE_LINES[result.scenario][2],"alert");log(plot.stakes,"alert");if(result.safetyConflict)log("机组出现危险行为与安全职责冲突。后续为架空互动结果。","alert");else if(a.unknown||b.unknown)log("MH370相关人物的未知行为未参与风险推断。","muted");else log("机组协调完成初步检查，准备下一阶段。","good");
 updatePanel({phase:"处置 · EMERGENCY RESPONSE",alt:6500,spd:230,vsi:-1500,storm:["weather","hydraulic"].includes(result.scenario),failedEngines:["birds","fuel"].includes(result.scenario)?2:result.scenario==="engine"?1:0,tilt:result.outcome==="crash"?16:4,terrainScale:1.15});}],
 [10050,()=>{narrate("最后进近",result.outcome==="safe"?"航线趋于稳定，准备最后进近。":result.outcome==="divert"?"地面越来越近，准备紧急着陆。":"高度持续下降，系统警告越来越急。",result.outcome==="crash"?"alert":"");if(result.outcome==="safe")log("飞机接近目标机场，状态逐步稳定。","good");else if(result.outcome==="divert")log("机组采取备降／迫降方案，接近预定着陆区。","alert");else log("机组未能恢复稳定飞行，接近地面。","alert");updatePanel({phase:"最后进近 · FINAL APPROACH",alt:result.outcome==="crash"?850:1800,spd:result.outcome==="crash"?245:175,vsi:result.outcome==="crash"?-4500:-700,storm:result.scenario==="weather",failedEngines:["birds","fuel"].includes(result.scenario)?2:result.scenario==="engine"?1:0,tilt:result.outcome==="crash"?24:2,terrainScale:1.45});}],
 [11550,()=>{if(result.outcome==="crash"){log("⚠ 地形接近警告：PULL UP! PULL UP!","alert");narrate("系统警报","PULL UP! 地形迅速逼近！","alert");$('warning').hidden=false;$('cockpit').classList.add("crashing");announcePullUp();updatePanel({phase:"⚠ TERRAIN WARNING",alt:120,spd:260,vsi:-5600,alert:true,terrainScale:2.5,tilt:30,storm:true,failedEngines:["birds","fuel"].includes(result.scenario)?2:0});}else{log("即将接地，完成最后检查。","good");narrate("机组","准备接地，核对速度和姿态。","good");updatePanel({phase:"着陆 · LANDING",alt:120,spd:result.outcome==="safe"?135:150,vsi:-300,terrainScale:1.75});}}],
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
 log(r.outcome==="crash"?"本局结局：坠毁。":r.outcome==="divert"?"本局结局：紧急迫降／备降。":"本局结局：安全到达。",r.outcome==="crash"?"alert":"good");
 narrate("旁白 · 终章",r.outcome==="crash"?"窗外只剩一片寂静。":r.outcome==="divert"?"长久的紧绷之后，终于能松一口气。":"这趟航班，终于平安落幕。",r.outcome==="crash"?"alert":"good");
 running=false;clearFlightPresentation();
 showResult(a,b,r); // populates result data, never changes stage visibility
 gamePhase="ended";
 render();
}
function showResult(a,b,r){
 // This function only formats the existing outcome. It never modifies selection, event, score or outcome.
 const outcome={crash:"坠毁",divert:"紧急迫降",safe:"安全到达"}[r.outcome];
 const caseSource={birds:"1549",fuel:"236",hydraulic:"232",engine:"1380",window:"5390",unsafe:"9525"}[r.scenario];
 const historySource=[a.source,b.source].includes(caseSource)?caseSource:a.source;
 $("inlineResultTitle").textContent="终章";
 $("inlineResultOutcome").textContent=outcome;
 const historyPilot=a.source===historySource?a:b.source===historySource?b:a;
 $("inlineHistory").textContent=PERSON_HISTORY[historyPilot.id]||SHORT_HISTORY[historySource]||SOURCES[historySource].summary;
 const sceneName={birds:"鸟击",fuel:"燃油异常",hydraulic:"操纵失灵",engine:"发动机故障",window:"风挡破损",unsafe:"机组安全冲突",weather:"暴雨进近",normal:"常规进近"}[r.scenario]||"航班事件";
 $("inlineSimulation").textContent=a.cn+"和"+b.cn+"遭遇"+sceneName+"，"+
   (r.outcome==="crash"?"模拟航班发生事故。":r.outcome==="divert"?"机组紧急着陆。":"完成了本次飞行。");
 $("inlineCompare").textContent=b.id==="haynes"?ROLE_NOTE:
   "两人历史上："+(ROLE_SUMMARY[a.id]||a.hint)+"；"+(ROLE_SUMMARY[b.id]||b.hint)+"。";
 $("inlineSources").innerHTML=[...new Set([a.source,b.source])].map(k=>sourceCard(SOURCES[k])).join("");
 $("inlineDisclaimer").textContent=a.source===b.source?"本局是虚构模拟，不是对真实航班的重演，也不能预测飞行员行为。":"两者不是同一航班，结果不代表真实人物的必然选择。";
 $("realEventDetails").classList.remove("is-open");$("resultExpand").setAttribute("aria-expanded","false");
}
function sourceCard(s){return '<div class="reference"><strong>'+escapeHtml(s.title)+'</strong><span>'+escapeHtml(s.summary)+'</span><a target="_blank" rel="noopener noreferrer" href="'+s.url+'">查看调查资料 ↗</a></div>';}
function showArchive(){
 $('archiveContent').innerHTML=PILOTS.map(p=>'<section class="archive-row"><strong>'+escapeHtml(p.name)+" · "+escapeHtml(p.cn)+'</strong><p>'+escapeHtml(p.flight+" — "+p.hint)+'</p><a target="_blank" rel="noopener noreferrer" href="'+SOURCES[p.source].url+'">查看相应调查报告 ↗</a></section>').join("");
 $('archiveOverlay').hidden=false;
 $('closeArchive').focus();
}
function closeResult(){$('resultOverlay').hidden=true;$('startBtn').focus();}
function resetToIdle(){
 // Invalidate and cancel callbacks before touching the DOM. Retain 'selected'
 // and 'flightCount' so game selection and outcome sequencing are unchanged.
 activeToken++;running=false;warningIssued=false;runStarted=0;
 stopFlightEffects();
 gamePhase="idle";
 decisionIndex=0;decisionSituation="normal";decisionLocked=false;uiFlightStart=0;
 $("decisionCounter").textContent="0 / 5";
 $("decisionActions").innerHTML="";
 $("decisionConsequence").textContent="";$("decisionConsequence").hidden=true;
 $("pressureTime").textContent="0.0秒";
 $("pressureFill").style.width="0%";
 $("pressureTrack").setAttribute("aria-valuenow","0");
 $("pressureTrack").classList.remove("warn","critical");
 $("realEventDetails").classList.remove("is-open");
 $("resultExpand").setAttribute("aria-expanded","false");
 $("inlineHistory").textContent="";
 $("inlineSimulation").textContent="";
 $("inlineCompare").textContent="";
 $("inlineSources").innerHTML="";
 $("inlineResultTitle").textContent="";
 $("inlineResultOutcome").textContent="";
 $("inlineDisclaimer").textContent="";
 $("resultOverlay").hidden=true;$("pickerOverlay").hidden=true;
 $("pilotInfoOverlay").hidden=true;$("archiveOverlay").hidden=true;
 $("radioPanel").classList.remove("is-open");
 $("logBtn").setAttribute("aria-expanded","false");
 $("radioLog").innerHTML="";
 log("请选择机组并开始飞行。","muted");
 $("warning").hidden=true;
 $("cockpit").classList.remove("crashing","impact");
 $("scenarioBadge").textContent="";
 updatePanel({phase:"待命",alt:0,spd:0,vsi:0,storm:false,alert:false,failedEngines:0,tilt:0,terrainScale:1});
 $("metricAltitude").textContent="—";
 $("metricSpeed").textContent="—";
 $("metricStatus").textContent="READY";
 $("metricStatus").style.color="";
 narrate("塔台：","选好机组，点击开始飞行。");
 const stage=document.querySelector(".story-stage");
 if(stage){stage.scrollTop=0;stage.classList.remove("has-more-below");}
 render();
}
function resetView(){resetToIdle();}
$('logBtn').addEventListener("click",()=>{
 const open=!$('radioPanel').classList.contains("is-open");
 $('radioPanel').classList.toggle("is-open",open);
 $('logBtn').setAttribute("aria-expanded",String(open));
});
$('closeLog').addEventListener("click",()=>{
 $('radioPanel').classList.remove("is-open");
 $('logBtn').setAttribute("aria-expanded","false");
 $('logBtn').focus();
});
$("resultExpand").addEventListener("click",()=>{
 const expanded=$("realEventDetails").classList.toggle("is-open");
 $("resultExpand").setAttribute("aria-expanded",String(expanded));
});
const standbyScroll=document.querySelector(".story-stage");
if(standbyScroll)standbyScroll.addEventListener("scroll",refreshStandbyOverflow,{passive:true});
if(typeof window.addEventListener==="function"){
 window.addEventListener("resize",queueStandbyOverflow);
 // Avoid restoring a half-finished flight from mobile back/forward cache.
 window.addEventListener("pagehide",resetToIdle);
 window.addEventListener("pageshow",e=>{if(e.persisted)resetToIdle();});
}
$('closePicker').addEventListener("click",closePicker);
$('startBtn').addEventListener("click",()=>{
 if(gamePhase==="ended")resetToIdle();
 else if(gamePhase==="idle")startFlight();
});
$('soundBtn').addEventListener("click",()=>{sound=!sound;$('soundBtn').textContent=sound?"♫ 音效开":"♫ 静音";$('soundBtn').setAttribute("aria-pressed",String(sound));if(!sound&&"speechSynthesis" in window)try{window.speechSynthesis.cancel()}catch(_){}});
$('archiveBtn').addEventListener("click",showArchive);
$('closePilotInfo').addEventListener("click",closePilotInfo);
$('pilotInfoOverlay').addEventListener("click",e=>{if(e.target===$('pilotInfoOverlay'))closePilotInfo();});
$('closeArchive').addEventListener("click",()=>{$('archiveOverlay').hidden=true;$('archiveBtn').focus();});
$('closeModal').addEventListener("click",closeResult);
$('againBtn').addEventListener("click",resetToIdle);
$('changeBtn').addEventListener("click",resetToIdle);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(!$("pilotInfoOverlay").hidden){closePilotInfo();return;}if(!$("pickerOverlay").hidden){closePicker();return;}if($("radioPanel").classList.contains("is-open")){$("radioPanel").classList.remove("is-open");$("logBtn").setAttribute("aria-expanded","false");return;}if(!$('archiveOverlay').hidden){$('archiveOverlay').hidden=true;$('archiveBtn').focus();}else if(!$('resultOverlay').hidden)closeResult();}});
$('pickerOverlay').addEventListener("click",e=>{if(e.target===$('pickerOverlay'))closePicker();});
for(const id of ["resultOverlay","archiveOverlay"]){$(id).addEventListener("click",e=>{if(e.target===$(id)){if(id==="resultOverlay")closeResult();else{$(id).hidden=true;$('archiveBtn').focus();}}});}
resetToIdle();
})();