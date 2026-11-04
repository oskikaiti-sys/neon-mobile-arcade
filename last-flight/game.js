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
let selected={captain:"sully",fo:"skiles"},running=false,flightCount=0,activeToken=0,sound=true,context=null,warningIssued=false;
function avatar(p,large=false){
 const s=p.skin,h=p.hair,e=p.eye;
 // Visual-only individual portrait parameters; not historical likeness claims.
 const individual={
  sully:{face:39,chin:120,glasses:true,freckles:false,mustache:false},
  skiles:{face:43,chin:127,glasses:false,freckles:true,mustache:false},
  haynes:{face:45,chin:129,glasses:true,freckles:false,mustache:false},
  fitch:{face:38,chin:118,glasses:false,freckles:false,mustache:true},
  shults:{face:40,chin:125,glasses:false,freckles:true,mustache:false},
  piche:{face:44,chin:128,glasses:false,freckles:false,mustache:true},
  dejager:{face:41,chin:123,glasses:true,freckles:false,mustache:false},
  atchison:{face:38,chin:124,glasses:false,freckles:false,mustache:false},
  lubitz:{face:40,chin:121,glasses:false,freckles:false,mustache:false},
  records:{face:45,chin:126,glasses:true,freckles:false,mustache:false}
 }[p.id]||{face:41,chin:125,glasses:false,freckles:false,mustache:false};
 const fLeft=76-individual.face,fRight=76+individual.face;
 const faceContour='M'+fLeft+' 75 Q'+fLeft+' 31 76 30 Q'+fRight+' 29 '+fRight+' 75 L'+(fRight-2)+' 99 Q'+(fRight-4)+' '+(individual.chin-5)+' 76 '+(individual.chin+4)+' Q'+(fLeft+4)+' '+(individual.chin-5)+' '+(fLeft+2)+' 99Z';
 const glasses=individual.glasses?'<path d="M44 79Q56 75 69 79L70 93Q59 100 47 92Z M84 79Q96 75 107 79L108 93Q97 100 85 92Z M70 82Q77 77 84 82" fill="#c8edfb33" stroke="#20344b" stroke-width="3.3" stroke-linejoin="round"/>':'';
 const freckles=individual.freckles?'<circle cx="46" cy="100" r="2" fill="#b27e71"/><circle cx="52" cy="103" r="1.6" fill="#b27e71"/><circle cx="102" cy="100" r="2" fill="#b27e71"/>':'';
 const facialHair=individual.mustache?'<path d="M64 106Q71 101 76 107Q84 101 91 106" stroke="'+h+'" stroke-width="3.6" stroke-linecap="round" fill="none"/>':'';
 const line="#142640",bg=p.unsafe?"#ef9c99":p.unknown?"#e0b881":"#77c4e8";
 const hairs=[
  '<path d="M30 58Q28 19 73 19Q122 20 123 57L110 51Q87 35 69 42L38 61Z" fill="'+h+'"/>',
  '<path d="M30 61Q29 26 67 22Q116 13 123 59L110 51L105 41Q91 40 79 43Q62 48 45 56L37 69Z" fill="'+h+'"/>',
  '<path d="M29 63Q26 27 57 23Q80 11 111 28L123 47L112 57L102 43L80 47L63 41L44 58Z" fill="'+h+'"/>',
  '<path d="M31 63Q28 32 56 25L77 22Q108 17 119 51L117 65Q102 49 93 47L70 52L48 48L36 68Z" fill="'+h+'"/>',
  '<path d="M29 63Q25 22 66 20Q100 18 119 48L119 123L106 116L105 61Q85 45 67 51L42 60L41 126L28 121Z" fill="'+h+'"/>'
 ];
 // Long hair has a back layer behind the face; a short top fringe never covers the eyes.
 const hairBack=p.style===4?'<path d="M28 73Q22 25 62 18Q112 14 123 62L128 133Q121 144 109 134L107 78Q94 48 76 47Q55 48 43 76L43 131Q31 143 25 130Z" fill="'+h+'" stroke="'+line+'" stroke-width="3"/>':'';
 const hairFront=p.style===4?'<path d="M32 69Q37 30 65 30Q100 23 113 61L107 67Q91 47 76 50Q54 55 42 73Z" fill="'+h+'"/>':hairs[p.style];
 const eyebrow=p.unsafe?'<path d="M48 68L64 75M90 75L105 68" stroke="'+line+'" stroke-width="5" stroke-linecap="round"/>':
 '<path d="M47 70Q57 65 65 69M90 69Q101 65 108 70" stroke="'+line+'" stroke-width="4.5" stroke-linecap="round" fill="none"/>';
 const mouth=p.unsafe?'<path d="M62 116Q78 111 96 114" stroke="'+line+'" stroke-width="3.5" stroke-linecap="round" fill="none"/>':
 '<path d="M62 109Q78 126 98 109" stroke="'+line+'" stroke-width="3.5" stroke-linecap="round" fill="none"/>';
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 164" preserveAspectRatio="xMidYMax meet" role="img" aria-label="原创美式二维卡通人物示意 '+escapeHtml(p.name)+'">'+
 (large?'':'<rect x="0" y="0" width="150" height="164" rx="10" fill="'+bg+'"/><path d="M0 125L44 91L150 32V164H0Z" fill="#ffffff42"/>')+
 '<circle cx="77" cy="65" r="63" fill="#fff8d3" stroke="'+line+'" stroke-width="3" opacity=".9"/>'+
 '<path d="M6 164Q7 121 43 118L107 118Q144 125 145 164Z" fill="#fcf6df" stroke="'+line+'" stroke-width="6" stroke-linejoin="round"/>'+
 '<path d="M26 157L39 117L59 117L62 164H20Z" fill="#254a73" stroke="'+line+'" stroke-width="4"/>'+
 '<path d="M127 157L114 117L94 117L91 164H132Z" fill="#254a73" stroke="'+line+'" stroke-width="4"/>'+
 '<path d="M57 106L57 121L76 135L94 121L93 106" fill="'+s+'" stroke="'+line+'" stroke-width="4" stroke-linejoin="round"/>'+
 '<path d="M70 131L82 131L87 164H64Z" fill="#ea665a" stroke="'+line+'" stroke-width="3"/>'+
 '<path d="M40 78Q27 69 29 84Q32 100 41 100M111 78Q128 68 125 85Q124 100 111 101" fill="'+s+'" stroke="'+line+'" stroke-width="4"/>'+
 hairBack+
 '<path d="'+faceContour+'" fill="'+s+'" stroke="'+line+'" stroke-width="5"/>'+
 hairFront+
 eyebrow+
 '<path d="M49 84Q58 79 67 85M86 85Q97 80 105 84" stroke="#fffdfa" stroke-width="12" stroke-linecap="round" fill="none"/>'+
 '<ellipse cx="58" cy="85" rx="5" ry="6" fill="'+e+'" stroke="'+line+'" stroke-width="1.2"/><circle cx="59" cy="83" r="1.6" fill="#fff"/><ellipse cx="97" cy="85" rx="5" ry="6" fill="'+e+'" stroke="'+line+'" stroke-width="1.2"/><circle cx="98" cy="83" r="1.6" fill="#fff"/>'+glasses+freckles+
 '<path d="M77 84L73 99L84 100" stroke="#8f685b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'+
 mouth+facialHair+
 '<path d="M19 135L46 126M105 126L132 135" stroke="#eabf52" stroke-width="8"/>'+
 '<path d="M22 135L44 128M107 128L129 135" stroke="'+line+'" stroke-width="2"/>'+
 '<path d="M14 150L40 147M110 147L137 150" stroke="#ffffff" stroke-width="2" opacity=".7"/>'+
 (large?'<path d="M0 164L13 123Q1 130 0 144Z" fill="#173451" stroke="'+line+'" stroke-width="4"/>':'')+
 '</svg>';
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
  $(side+"MiniName").textContent=pilot.cn;
  $(side+"MiniFlight").textContent=miniFlight(pilot.flight);
  const chooser=document.querySelector('.crew-current[data-side="'+side+'"]');
  if(chooser)chooser.setAttribute("aria-label","当前"+(side==="captain"?"机长":"副驾驶")+pilot.cn+"，点击更换");
 }
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
function callLater(token,fn,delay){setTimeout(()=>{if(token===activeToken)fn()},delay);}
function startFlight(){
 if(running)return;
 const a=BY_ID[selected.captain],b=BY_ID[selected.fo];
 flightCount++;const result=simulate(a,b,pickCase(a,b,flightCount),flightCount);
 const c=result.case;
 activeToken++;const token=activeToken;
 running=true;warningIssued=false;runStarted=Date.now();
 $('startBtn').disabled=true;$('startBtn').textContent="✈ 飞行进行中";
 $('cockpit').classList.remove("impact","crashing");$('warning').hidden=true;$('phase').hidden=false;$('scenarioBadge').hidden=false;
 $('inlineResult').hidden=true;$("realEventDetails").classList.remove("is-open");$("resultExpand").setAttribute("aria-expanded","false");document.body.classList.remove("has-result");
 $('radioLog').innerHTML="";
 $('radioPanel').classList.remove("is-open");$('logBtn').setAttribute("aria-expanded","false");
 $('scenarioBadge').textContent="模拟航班 · 飞行准备";
 // Unlock audio / speech in the real click gesture for browsers that require interaction.
 if(sound){systemTone(520,.08,.12);if("speechSynthesis" in window){try{const u=new SpeechSynthesisUtterance(" ");u.volume=0;window.speechSynthesis.speak(u);}catch(_){}}}
 log("虚构机组成立："+a.cn+"（机长）与"+b.cn+"（副驾驶）。");
 log("提示：模拟结果不代表真实人物在其他航班上的行为。","muted");
 const plot=PLOTS[result.scenario];
 narrate("旁白 · NX-001","一段不可能的历史组合开始了。两位飞行员正准备将飞机带离地面。");
 updatePanel({phase:"推出 / 起飞准备",alt:0,spd:0});
 const sequence=[
 [850,()=>{log("起飞，保持爬升。");narrate("塔台 · TAKEOFF","跑道尽头越来越近。两位飞行员完成最后检查，飞机离地，爬升开始。","good");updatePanel({phase:"起飞 · TAKEOFF",alt:1600,spd:180,vsi:1900});systemTone(700,.1);}],
 [2250,()=>{log("爬升至巡航高度，仪表显示正常。");narrate("旁白 · CRUISE",plot.intro);updatePanel({phase:"巡航 · CRUISE",alt:24000,spd:310,vsi:0});$('scenarioBadge').textContent="航班开始 · 自动模拟";}],
 [3850,()=>{log(c.step,"alert");narrate("驾驶舱 · 突发事件",plot.twist,"alert");$('scenarioBadge').textContent=c.title;updatePanel({phase:"事件 · "+c.title,alt:18000,spd:290,vsi:-650,storm:result.scenario==="weather",failedEngines:result.scenario==="fuel"||result.scenario==="birds"?2:result.scenario==="engine"?1:0,tilt:result.scenario==="hydraulic"?9:2});systemTone(500,.2,.1,"triangle");}],
 [5650,()=>{log("机长 "+a.cn+"："+a.action, a.unsafe?"alert":"");narrate("机长 · "+a.cn,a.action,a.unsafe?"alert":"");}],
 [7050,()=>{log("副驾驶 "+b.cn+"："+b.action,b.unsafe?"alert":"");narrate("副驾驶 · "+b.cn,b.action,b.unsafe?"alert":"");}],
 [8400,()=>{narrate("旁白 · 关键抉择",plot.stakes,"alert");log(plot.stakes,"alert");if(result.safetyConflict)log("机组出现危险行为与安全职责冲突。后续为架空互动结果。","alert");else if(a.unknown||b.unknown)log("MH370相关人物的未知行为未参与风险推断。","muted");else log("机组协调完成初步检查，准备下一阶段。","good");
 updatePanel({phase:"处置 · EMERGENCY RESPONSE",alt:6500,spd:230,vsi:-1500,storm:["weather","hydraulic"].includes(result.scenario),failedEngines:["birds","fuel"].includes(result.scenario)?2:result.scenario==="engine"?1:0,tilt:result.outcome==="crash"?16:4,terrainScale:1.15});}],
 [10050,()=>{narrate("最后进近 · FINAL APPROACH",result.outcome==="safe"?"地平线渐渐稳定，目的地就在前方。此刻最重要的是把最后的检查做完。":result.outcome==="divert"?"地面越来越近，机组准备执行不同于原计划的紧急着陆。":"高度持续降低，警告越来越密集。机组正面对最后的严峻挑战。",result.outcome==="crash"?"alert":"");if(result.outcome==="safe")log("飞机接近目标机场，状态逐步稳定。","good");else if(result.outcome==="divert")log("机组采取备降／迫降方案，接近预定着陆区。","alert");else log("机组未能恢复稳定飞行，接近地面。","alert");updatePanel({phase:"最后进近 · FINAL APPROACH",alt:result.outcome==="crash"?850:1800,spd:result.outcome==="crash"?245:175,vsi:result.outcome==="crash"?-4500:-700,storm:result.scenario==="weather",failedEngines:["birds","fuel"].includes(result.scenario)?2:result.scenario==="engine"?1:0,tilt:result.outcome==="crash"?24:2,terrainScale:1.45});}],
 [11550,()=>{if(result.outcome==="crash"){log("⚠ 地形接近警告：PULL UP! PULL UP!","alert");narrate("系统警报 · TERRAIN","PULL UP! 地形迅速逼近，飞机仍未恢复稳定！","alert");$('warning').hidden=false;$('cockpit').classList.add("crashing");announcePullUp();updatePanel({phase:"⚠ TERRAIN WARNING",alt:120,spd:260,vsi:-5600,alert:true,terrainScale:2.5,tilt:30,storm:true,failedEngines:["birds","fuel"].includes(result.scenario)?2:0});}else{log("即将接地，完成最后检查。","good");narrate("机组 · LANDING","最后几秒。速度、姿态、跑道……一切决定都将在接地时接受检验。","good");updatePanel({phase:"着陆 · LANDING",alt:120,spd:result.outcome==="safe"?135:150,vsi:-300,terrainScale:1.75});}}],
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
 $('scenarioBadge').hidden=true;$('phase').hidden=true;
 log(r.outcome==="crash"?"本局结局：坠毁。":r.outcome==="divert"?"本局结局：紧急迫降／备降。":"本局结局：安全到达。",r.outcome==="crash"?"alert":"good");
 narrate("旁白 · 终章",r.outcome==="crash"?"窗外只剩一片寂静。":r.outcome==="divert"?"长久的紧绷之后，终于能松一口气。":"这趟航班，终于平安落幕。",r.outcome==="crash"?"alert":"good");
 running=false;$('startBtn').disabled=false;$('startBtn').textContent="✈ 再次飞行";
 showResult(a,b,r);
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
 $("inlineSimulation").textContent="这次"+a.cn+"任机长，"+b.cn+"任副驾驶。"+sceneName+"后，"+
   (r.outcome==="crash"?"模拟航班发生事故。":r.outcome==="divert"?"机组完成紧急着陆。":"机组完成了本次飞行。");
 $("inlineCompare").textContent=b.id==="haynes"?ROLE_NOTE:
   "两人历史上："+(ROLE_SUMMARY[a.id]||a.hint)+"；"+(ROLE_SUMMARY[b.id]||b.hint)+"。";
 $("inlineSources").innerHTML=[...new Set([a.source,b.source])].map(k=>sourceCard(SOURCES[k])).join("");
 $("inlineDisclaimer").textContent=a.source===b.source?"本局是虚构模拟，不是对真实航班的重演，也不能预测飞行员行为。":"两者不是同一航班，结果不代表真实人物的必然选择。";
 $("realEventDetails").classList.remove("is-open");$("resultExpand").setAttribute("aria-expanded","false");
 $("inlineResult").hidden=false;
 $("resultOverlay").hidden=true;
 document.body.classList.add("has-result");
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
 $('resultOverlay').hidden=true;$('pickerOverlay').hidden=true;$('inlineResult').hidden=true;document.body.classList.remove("has-result");$('warning').hidden=true;$('cockpit').classList.remove("crashing","impact");
 $('startBtn').disabled=false;$('startBtn').textContent="✈ 开始飞行";
 $('radioLog').innerHTML='';log("请选择机组并开始飞行。","muted");
 $('scenarioBadge').hidden=false;$('phase').hidden=false;$('scenarioBadge').textContent="等待航班启动";updatePanel({phase:"机组待命 · STANDBY",alt:0,spd:0});
 $('metricAltitude').textContent="—";$('metricSpeed').textContent="—";$('metricStatus').textContent="READY";narrate("塔台 · FLIGHT CONTROL","选择机长与副驾驶，准备开始一次架空航班。");render();
}
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
$('closePicker').addEventListener("click",closePicker);
$('startBtn').addEventListener("click",startFlight);
$('soundBtn').addEventListener("click",()=>{sound=!sound;$('soundBtn').textContent=sound?"♫ 音效开":"♫ 静音";$('soundBtn').setAttribute("aria-pressed",String(sound));if(!sound&&"speechSynthesis" in window)try{window.speechSynthesis.cancel()}catch(_){}});
$('archiveBtn').addEventListener("click",showArchive);
$('closePilotInfo').addEventListener("click",closePilotInfo);
$('pilotInfoOverlay').addEventListener("click",e=>{if(e.target===$('pilotInfoOverlay'))closePilotInfo();});
$('closeArchive').addEventListener("click",()=>{$('archiveOverlay').hidden=true;$('archiveBtn').focus();});
$('closeModal').addEventListener("click",closeResult);
$('againBtn').addEventListener("click",()=>{$('resultOverlay').hidden=true;startFlight();});
$('changeBtn').addEventListener("click",()=>{resetView();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(!$("pilotInfoOverlay").hidden){closePilotInfo();return;}if(!$("pickerOverlay").hidden){closePicker();return;}if($("radioPanel").classList.contains("is-open")){$("radioPanel").classList.remove("is-open");$("logBtn").setAttribute("aria-expanded","false");return;}if(!$('archiveOverlay').hidden){$('archiveOverlay').hidden=true;$('archiveBtn').focus();}else if(!$('resultOverlay').hidden)closeResult();}});
$('pickerOverlay').addEventListener("click",e=>{if(e.target===$('pickerOverlay'))closePicker();});
for(const id of ["resultOverlay","archiveOverlay"]){$(id).addEventListener("click",e=>{if(e.target===$(id)){if(id==="resultOverlay")closeResult();else{$(id).hidden=true;$('archiveBtn').focus();}}});}
render();
$('metricAltitude').textContent="—";$('metricSpeed').textContent="—";
})();