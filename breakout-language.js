/* NEON ARCADE: Breakout language layer (English / Chinese / Japanese).
   Keeps the physics and existing gameplay logic unchanged. */
(function(){
'use strict';
const L=window.ArcadeLang;
if(!L)return;
const maps={"en":{"无需安装。选择游戏，在 Safari 里全屏畅玩。<br>触屏优先设计，适配 iPhone 竖屏。":"No installation needed. Pick a game and play in Safari.<br>Built for touch and portrait screens.","自动开挂方块 · 磁力补线 · 银河直条雨 · 自动激光与核爆":"Wild falling blocks · Magnetic lines · Meteor shower · Auto lasers","▶ 开始超载方块":"▶ Play Overdrive","无限弹球战场 · 自动再生砖墙 · 时空门轰炸 · 飞船逐级护航":"Endless brick arena · Regenerating walls · Portals · Upgradeable escorts","▶ 开始无限打砖块":"▶ Play Breakout","纯静态 HTML + JavaScript · 无广告 · 无账号要求<br>游戏成绩只保留在当前页面会话中":"Free browser games · No ads · No account needed<br>Progress resets when you restart a game.","自动辅助系统":"AUTO POWERS","超载":"OVERDRIVE","方块":"BLOCKS","♫ 关":"♫ OFF","♫ 音乐":"♫ MUSIC","♪ 音效":"♪ SFX","Ⅱ 暂停":"Ⅱ PAUSE","▶ 继续":"▶ RESUME","落块数量":"PIECES","自动出手":"POWERS","等级":"LEVEL","清除行数":"LINES","欢迎进入超载模式":"WELCOME TO OVERDRIVE","先自由堆叠、尝试正常消行。<br>棋盘积累至少四行（40格）方块后，外挂才会自动发动。<br>两次辅助至少间隔10次落块。":"Stack pieces and clear lines your way.<br>Auto powers awaken after 40 occupied cells.<br>There's a cooldown between activations.","⚡ 开始超载":"⚡ START OVERDRIVE","×10 超载倍率":"OVERDRIVE","⚡ 自动外挂系统":"⚡ AUTO POWERS","累计堆积四行后自动启动":"PASSIVE ABILITIES","🧲 磁力补线":"🧲 MAGNETIC LINE","🛰️ 轨道激光":"🛰️ ORBITAL LASER","☄️ 银河核爆":"☄️ STARBURST","堆积 ≥40格后自动触发":"AUTO","需堆积 ≥40格":"AUTO","周期自动触发":"AUTO","暂存 HOLD":"HOLD","↻ 旋转":"↻ ROTATE","⇓ 砸下去":"⇓ DROP","◀ 左移":"◀ LEFT","▼ 加速":"▼ DOWN","右移 ▶":"RIGHT ▶","手指<b>左右滑动</b> · 轻点旋转 · 下滑硬降 · <b>外挂自动工作</b>":"<b>Swipe</b> to move · Tap to rotate · Flick down to drop","👑 完美清屏！":"👑 PERFECT CLEAR!","⚡ 自动超载暴走！":"⚡ FEVER MODE!","☄️ 全屏星际核爆！":"☄️ STARBURST!","🛰️ 轨道激光横扫":"🛰️ ORBITAL STRIKE","🧲 磁力补齐 · 自动消行":"🧲 MAGNETIC CLEAR","🌠 银河直条雨 · 三连直条":"🌠 TRIPLE I-PIECE!","🪐 空间折叠 · 半场重整！":"🪐 SPACE FOLD!","✨ 自动外挂已启动！":"✨ POWERS ONLINE!","超载暂停":"GAME PAUSED","自动辅助已暂停，继续后恢复。":"Your game is safe. Resume when ready.","▶ 继续超载":"▶ RESUME GAME","⏳ 充能中":"◆ CHARGING","✨ 超载就绪":"◆ READY","⚡ 自动 FEVER":"⚡ FEVER","🔥 连锁清行":"🔥 LINE COMBO","🌟 天降四消":"🌟 TETRIS!","暴击消除":"BONUS CLEAR","音乐切换":"Toggle sound","触摸棋盘左右滑动移动方块，轻点旋转，下滑硬降":"Swipe left or right to move, tap to rotate, flick down to drop","自动辅助状态":"Auto abilities","触摸操控按钮":"Touch controls","已击碎":"DESTROYED","护航等级":"FLEET","小球":"BALLS","生命":"LIVES","星际弹球战场":"BREAKOUT INFINITY","没有分离关卡，砖块会持续再生。<br>瞄准中央时空门：传送弹球 + 导弹轰炸。<br>击碎砖块后，逐级解锁护航飞船！":"No separate levels: bricks keep respawning.<br>Hit the center portal for a missile barrage.<br>Destroy bricks to unlock your escort fleet!","▶ 开始无限狂欢":"▶ START GAME","🛸 飞船尚未解锁":"🛸 ESCORT LOCKED","🌀 入门自动轰炸":"🌀 PORTAL BARRAGE","↻ 重开":"↻ RESTART","📱 在场地任意高度左右滑动 · 小球自动发射<br>12 / 28 / 52 / 80 块升级：单僚机 → 双机 → 导弹 → 轨道炮":"📱 Drag anywhere to move your paddle · Auto-launch balls<br>Unlocks: Escort → Twin ships → Missiles → Orbital cannon","连续弹球打砖块战场，横向拖动控制挡板。中央时空门可传送弹球并发射追踪轰炸。":"Endless brick arena. Drag horizontally to steer the paddle. Aim for the center portal.","🛸 下一解锁：侦察机":"🛸 NEXT: SCOUT SHIP","🛸 单僚机 · 即将双机":"🛸 ESCORT → TWIN SHIPS","🚀 双僚机 · 即将导弹":"🚀 TWIN SHIPS → MISSILES","☄️ 导弹 · 即将轨道炮":"☄️ MISSILES → ORBITAL","🌌 舰队满编！":"🌌 FULL FLEET!","⚡ 自动狂暴":"⚡ AUTO FEVER","游戏暂停":"GAME PAUSED","你的舰队、砖墙与弹球位置都保留。":"Your fleet, bricks and balls will be right here.","暂时休整":"MISSION ENDED","↻ 再次出击":"↻ PLAY AGAIN","🛸 侦察僚机入队！":"🛸 SCOUT JOINED!","🛸 双舰护航！":"🛸 TWIN ESCORTS!","🚀 追踪导弹解锁！":"🚀 HOMING MISSILES!","☄️ 轨道主炮已上线！":"☄️ ORBITAL CANNON!","多球分裂!":"MULTIBALL!","超级挡板!":"MEGA PADDLE!","激光炮!":"LASER!","护盾补给!":"SHIELD!","🌀 时空门：全域轰炸！":"🌀 PORTAL BARRAGE!","☄️ 轨道主炮扫射！":"☄️ ORBITAL STRIKE!","⚡ 自动 FEVER！":"⚡ AUTO FEVER!","砖墙自动再生":"BRICKS REGENERATING","自动补球":"EXTRA BALL!","🌀 时空门":"🌀 PORTAL","累计击碎":"TOTAL DESTROYED","块砖":"BRICKS","舰队进化至":"FLEET LEVEL","没有分离关卡，砖块会持续再生。":"Bricks respawn endlessly.","瞄准中央时空门：传送弹球 + 导弹轰炸。":"Aim for the portal to unleash missiles.","击碎砖块后，逐级解锁护航飞船！":"Destroy bricks to unlock new ships!","📱 在场地任意高度左右滑动 · 小球自动发射":"📱 Drag anywhere to steer · Automatic launch","12 / 28 / 52 / 80 块升级：单僚机 → 双机 → 导弹 → 轨道炮":"Destroy bricks to upgrade your fleet."},"ja":{"无需安装。选择游戏，在 Safari 里全屏畅玩。<br>触屏优先设计，适配 iPhone 竖屏。":"インストール不要。Safari ですぐに遊べます。<br>タッチ操作・縦画面に対応。","自动开挂方块 · 磁力补线 · 银河直条雨 · 自动激光与核爆":"超強化ブロック · 磁力補助 · Iミノの雨 · 自動レーザー","▶ 开始超载方块":"▶ オーバードライブを遊ぶ","无限弹球战场 · 自动再生砖墙 · 时空门轰炸 · 飞船逐级护航":"無限ブロックアリーナ · 自動再生 · ワープゲート · 護衛機の進化","▶ 开始无限打砖块":"▶ ブロック崩しを遊ぶ","纯静态 HTML + JavaScript · 无广告 · 无账号要求<br>游戏成绩只保留在当前页面会话中":"ブラウザーで遊べる無料ゲーム · 広告・登録なし<br>ゲームを再開すると進行状況がリセットされます。","自动辅助系统":"自動スキル","超载":"オーバードライブ","方块":"ブロック","♫ 关":"♫ オフ","♫ 音乐":"♫ 音楽","♪ 音效":"♪ 効果音","Ⅱ 暂停":"Ⅱ 一時停止","▶ 继续":"▶ 再開","落块数量":"設置数","自动出手":"スキル","等级":"レベル","清除行数":"消去ライン","欢迎进入超载模式":"オーバードライブへようこそ","先自由堆叠、尝试正常消行。<br>棋盘积累至少四行（40格）方块后，外挂才会自动发动。<br>两次辅助至少间隔10次落块。":"まずは自分で積んでラインを消そう。<br>40マス埋まると自動スキルが解放。<br>連続発動にはクールダウンがあります。","⚡ 开始超载":"⚡ スタート","×10 超载倍率":"オーバードライブ","⚡ 自动外挂系统":"⚡ 自動スキル","累计堆积四行后自动启动":"パッシブ能力","🧲 磁力补线":"🧲 マグネット補完","🛰️ 轨道激光":"🛰️ 軌道レーザー","☄️ 银河核爆":"☄️ スターバースト","堆积 ≥40格后自动触发":"自動","需堆积 ≥40格":"自動","周期自动触发":"自動","暂存 HOLD":"ホールド","↻ 旋转":"↻ 回転","⇓ 砸下去":"⇓ 落下","◀ 左移":"◀ 左へ","▼ 加速":"▼ 下へ","右移 ▶":"右へ ▶","手指<b>左右滑动</b> · 轻点旋转 · 下滑硬降 · <b>外挂自动工作</b>":"<b>スワイプ</b>で移動 · タップで回転 · 下フリックで落下","👑 完美清屏！":"👑 パーフェクトクリア！","⚡ 自动超载暴走！":"⚡ フィーバー！","☄️ 全屏星际核爆！":"☄️ スターバースト！","🛰️ 轨道激光横扫":"🛰️ 軌道レーザー！","🧲 磁力补齐 · 自动消行":"🧲 マグネット消去","🌠 银河直条雨 · 三连直条":"🌠 Iミノ3連続！","🪐 空间折叠 · 半场重整！":"🪐 空間折りたたみ！","✨ 自动外挂已启动！":"✨ 自動スキル起動！","超载暂停":"一時停止","自动辅助已暂停，继续后恢复。":"進行状況は保存中。いつでも再開できます。","▶ 继续超载":"▶ 再開","⏳ 充能中":"◆ 充填中","✨ 超载就绪":"◆ 準備完了","⚡ 自动 FEVER":"⚡ フィーバー","🔥 连锁清行":"🔥 ラインコンボ","🌟 天降四消":"🌟 4ライン消去！","暴击消除":"ボーナス消去","音乐切换":"サウンド切替","触摸棋盘左右滑动移动方块，轻点旋转，下滑硬降":"左右スワイプで移動、タップで回転、下フリックで落下","自动辅助状态":"自動スキル","触摸操控按钮":"タッチ操作","已击碎":"破壊数","护航等级":"護衛レベル","小球":"ボール","生命":"ライフ","星际弹球战场":"ブレイクアウト・インフィニティ","没有分离关卡，砖块会持续再生。<br>瞄准中央时空门：传送弹球 + 导弹轰炸。<br>击碎砖块后，逐级解锁护航飞船！":"ステージ区切りなし、ブロックは自動再生。<br>中央ゲートに入るとミサイルの嵐！<br>ブロックを壊して護衛機を解放！","▶ 开始无限狂欢":"▶ ゲーム開始","🛸 飞船尚未解锁":"🛸 護衛機は未解放","🌀 入门自动轰炸":"🌀 ゲート砲撃","↻ 重开":"↻ 最初から","📱 在场地任意高度左右滑动 · 小球自动发射<br>12 / 28 / 52 / 80 块升级：单僚机 → 双机 → 导弹 → 轨道炮":"📱 画面上を左右にドラッグ · ボールは自動発射<br>解放：護衛機 → 双機 → ミサイル → 軌道砲","连续弹球打砖块战场，横向拖动控制挡板。中央时空门可传送弹球并发射追踪轰炸。":"無限ブロックアリーナ。左右ドラッグでパドルを操作。中央ゲートを狙おう。","🛸 下一解锁：侦察机":"🛸 次：偵察機","🛸 单僚机 · 即将双机":"🛸 護衛機 → 双機","🚀 双僚机 · 即将导弹":"🚀 双機 → ミサイル","☄️ 导弹 · 即将轨道炮":"☄️ ミサイル → 軌道砲","🌌 舰队满编！":"🌌 艦隊完成！","⚡ 自动狂暴":"⚡ 自動フィーバー","游戏暂停":"一時停止","你的舰队、砖墙与弹球位置都保留。":"艦隊とブロック、ボールの状態を維持します。","暂时休整":"ミッション終了","↻ 再次出击":"↻ 再出撃","🛸 侦察僚机入队！":"🛸 偵察機が参戦！","🛸 双舰护航！":"🛸 双機で護衛！","🚀 追踪导弹解锁！":"🚀 追尾ミサイル解放！","☄️ 轨道主炮已上线！":"☄️ 軌道主砲起動！","多球分裂!":"マルチボール！","超级挡板!":"大型パドル！","激光炮!":"レーザー！","护盾补给!":"シールド！","🌀 时空门：全域轰炸！":"🌀 ゲート一斉砲撃！","☄️ 轨道主炮扫射！":"☄️ 軌道主砲掃射！","⚡ 自动 FEVER！":"⚡ 自動フィーバー！","砖墙自动再生":"ブロック再生中","自动补球":"ボール補充！","🌀 时空门":"🌀 ゲート","累计击碎":"累計破壊数","块砖":"個","舰队进化至":"艦隊レベル","没有分离关卡，砖块会持续再生。":"ブロックは何度でも再生します。","瞄准中央时空门：传送弹球 + 导弹轰炸。":"中央ゲートを狙ってミサイルを放とう。","击碎砖块后，逐级解锁护航飞船！":"破壊を重ねて護衛機を解放！","📱 在场地任意高度左右滑动 · 小球自动发射":"📱 画面を左右にドラッグ · 自動発射","12 / 28 / 52 / 80 块升级：单僚机 → 双机 → 导弹 → 轨道炮":"ブロックを壊して艦隊を強化。"},"zh-CN":{"没有分离关卡，砖块会持续再生。":"ブロック会不断再生。","瞄准中央时空门：传送弹球 + 导弹轰炸。":"瞄准时空门，发射导弹。","击碎砖块后，逐级解锁护航飞船！":"击碎砖块，逐步解锁护航飞船！","📱 在场地任意高度左右滑动 · 小球自动发射":"📱 左右滑动控制挡板 · 自动发球","12 / 28 / 52 / 80 块升级：单僚机 → 双机 → 导弹 → 轨道炮":"击碎砖块，升级舰队火力。"}};
const sourceNodes=new WeakMap();
const sourceAttrs=new WeakMap();
const perLanguageCache=new Map();
const watchKeys=Object.fromEntries(Object.entries(maps).map(([code,entries])=>[code,Object.keys(entries).filter(k=>!k.includes('<')&&k.length>1).sort((a,b)=>b.length-a.length)]));
let scheduled=false;
function translated(value){
 const original=String(value),lang=L.get();
 if(!/[\u3400-\u9fff]/.test(original))return original;
 const cacheKey=lang+'|'+original;
 if(perLanguageCache.has(cacheKey))return perLanguageCache.get(cacheKey);
 let output=original;
 const dict=maps[lang]||{};
 if(Object.hasOwn(dict,original))output=dict[original];
 else for(const key of watchKeys[lang]||[])if(output.includes(key))output=output.split(key).join(dict[key]);
 perLanguageCache.set(cacheKey,output);
 if(perLanguageCache.size>500)perLanguageCache.clear();
 return output;
}
function updateText(node,force){
 if(!node.parentElement||node.parentElement.closest('script,style,select,option'))return;
 const current=node.nodeValue;
 const previous=sourceNodes.get(node);
 if(!force&&previous&&previous.rendered===current)return;
 const source=(force&&previous)?previous.original:(previous&&previous.rendered===current?previous.original:current);
 const rendered=translated(source);
 sourceNodes.set(node,{original:source,rendered});
 if(node.nodeValue!==rendered)node.nodeValue=rendered;
}
function render(force=false){
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let node;
 while((node=walker.nextNode()))updateText(node,force);
 document.querySelectorAll('[aria-label]').forEach(el=>{
  if(el.id==='arcade-language')return;
  const current=el.getAttribute('aria-label');
  const previous=sourceAttrs.get(el);
  const src=force&&previous?previous.original:(previous&&previous.rendered===current?previous.original:current);
  const rendered=translated(src);
  sourceAttrs.set(el,{original:src,rendered});
  if(current!==rendered)el.setAttribute('aria-label',rendered);
 });
 const titles={en:'BREAKOUT INFINITY',ja:'ブレイクアウト・インフィニティ','zh-CN':'无限星际弹球'};
 document.title=titles[L.get()]||titles.en;
}
function queueRender(){
 if(scheduled)return;scheduled=true;
 requestAnimationFrame(()=>{scheduled=false;render(false)});
}
const mobileCss=document.createElement('style');mobileCss.textContent='#app .header{gap:5px}#app .header>div:first-child{min-width:0;flex:1}#app .header .title{font-size:clamp(14px,4.1vw,22px);letter-spacing:.2px;white-space:nowrap}#app .header #pause{flex-shrink:0;min-width:48px;padding:7px 6px;font-size:10px}';document.head.appendChild(mobileCss);
const header=document.querySelector('.header');
if(header){
 const sel=document.createElement('select');sel.id='arcade-language';sel.setAttribute('aria-label','Language');
 sel.innerHTML='<option value="en">EN</option><option value="zh-CN">中文</option><option value="ja">日本語</option>';
 sel.style.cssText='width:56px;max-width:56px;min-height:33px;border-radius:9px;border:1px solid #436688;background:#17304b;color:#e6f6ff;padding:4px 2px;font-size:11px;font-weight:750';
 const pause=document.getElementById('pause');
 if(pause)header.insertBefore(sel,pause);
 sel.value=L.get();
 sel.addEventListener('change',()=>L.set(sel.value));
}
const help=document.querySelector('.help');
if(help){help.style.maxWidth='100%';}
const originalFill=CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText=function(text,...rest){
 return originalFill.call(this,translated(text),...rest);
};
const observer=new MutationObserver(queueRender);
observer.observe(document.body,{subtree:true,childList:true,characterData:true});
window.addEventListener('arcade-language-change',()=>{
 const sel=document.getElementById('arcade-language');if(sel)sel.value=L.get();
 render(true);
});
L.attach();
render(true);
})();