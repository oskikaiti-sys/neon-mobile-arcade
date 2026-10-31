# 月下疑云 / Moonlit Village

### 音效延迟修复（2026-10-30）

以前每种音效首次触发时才通过 `new Audio(path)` 建立播放器，并在后续每次触发时执行 `pause() → currentTime=0 → play()`，在移动 Safari 上容易出现明显的解码或音频管线启动延迟。

现在页面加载时通过 `fetch() + AudioContext.decodeAudioData()` 预取、解码六个音效，常规点击直接用 `AudioBufferSourceNode.start(0)` 播放。首次触摸时尝试解锁 iOS AudioContext；音效尚未准备好时跳过当次，不在玩家进入下一步之后补播。对 cursor、confirm、cancel、damage 做轻量前置静音检测和处理（最多扫描 280ms），避免原始音效里的开头静音造成“慢一拍”。没有修改音效的艺术内容。

右上角开关依旧同时控制 BGM 和 SFX，并立即停止当前正在发声的节点。浏览器缺少 AudioContext 时使用预加载的 HTML Audio 作为兼容回退。实际触屏响应速度仍受设备、浏览器与系统音频输出延迟影响。

## 游戏音效（Conte de Fées / こんとどぅふぇ）

已将以下音效作为游戏素材托管在 `assets/audio/sfx/`，并在 `index.html` 的展示层使用。作品内的 MP3 不得作为独立音效素材另行发布或出售。

| 事件 | 文件 | 原始素材 |
|---|---|---|
| 菜单光标、目标切换 | `cursor.mp3` | `cursor_04.mp3` · https://conte-de-fees.com/se/cursor |
| 确认、选项提交、投票 | `confirm.mp3` | `confirm_01.mp3` · https://conte-de-fees.com/se/confirm |
| 返回、取消 | `cancel.mp3` | `cancel_01.mp3` · https://conte-de-fees.com/se/cancel |
| 玩家出局 | `damage.mp3` | `damage_01.mp3` · https://conte-de-fees.com/se/damage |
| 天亮、夜晚提示、胜利 | `chime.mp3` | `chime_04.mp3` · https://conte-de-fees.com/se/chime |
| 失败结算 | `gameover.mp3` | `gameover_07.mp3` · https://conte-de-fees.com/se/gameover |

官方素材使用条款：https://conte-de-fees.com/how-to-use 。网站声明可用于商业游戏且无需强制署名，本项目仍列明素材作者与来源。现有 BGM《不思議な村》保持不变。

声音由用户第一次交互触发浏览器播放。右上角音乐按钮同时控制 BGM 和音效；关闭时会停止正在播放的音效。事件音量低于默认背景音乐以避免干扰，重复点击有简短的防抖。音效逻辑仅对界面操作与收到的公开游戏状态作响应，**未修改角色分配、电脑策略、结算和同步协议**。

## 背景音乐：不思議な村 / The Mysterious Village

- 曲名：**不思議な村**（Track No.0016，约 1 分 30 秒）
- 作者：**HiLi-ひぃ- / こんとどぅふぇ (Conte de Fées)**
- 来源：https://conte-de-fees.com/bgm/238
- 使用条款：https://conte-de-fees.com/how-to-use
- 实际游戏文件：`assets/audio/contedefees_0016.mp3`，随游戏同源托管；禁止将音乐文件另行作为素材分发、销售或声称为原创。音源不经外链直接引用作者服务器。
- 使用方式：在 `index.html` 中由 `<audio id="bgmPlayer" loop>` 播放。首次用户点击后尝试播放，右上角音乐开关控制暂停/恢复。
- 原来的程序合成 BGM 已移除；声音循环为浏览器音频文件自然循环。手机静音模式、Safari 用户手势规则和设备音量可能影响实际播放。
- 根据官方条款，该曲可以免费嵌入公开及商用游戏，无需强制署名；本项目自愿标注来源。

轻量六人狼人杀。静态 HTML + CSS + JavaScript；房主通过 PeerJS 与加入的好友同步公开选项、行动阶段和结果。无账户、无构建步骤。原有游戏规则与 AI 逻辑不因界面改动而调整。

## 第一阶段：日系 RPG 窗口与对话（2026-10-30）

本阶段修改 `moonlit-village/index.html` 的展示层，新增：

- `.window`：通用 RPG 蓝色渐变窗口、双层描边和阴影。
- `.rpg-narrator` / `.rpg-dialogue` / `.rpg-nameplate`：系统旁白与角色对话分开显示。
- `.rpg-portrait`：144 × 144 内联 SVG 人像占位，经 CSS 缩放到适合手机的尺寸；阶段二才制作可替换 PNG 脸图。
- `.rpg-spoken` / `.rpg-next`：仅最新的角色发言有逐字显示与 ▼ 提示。点击正在播放的对话可立即显示全部内容。
- `.rpg-menu` / `.cursor`：公开发言改为带 ▶ 光标的纵向菜单，支持方向键与回车。
- `.rpg-selectable` / `.rpg-selected`：怀疑与信任操作在上方居民栏选目标，支持点选、方向键、回车及返回。

浏览器开启 `prefers-reduced-motion: reduce` 后关闭光标闪烁、打字机和其他 CSS 动画。

### 渲染与规则代码边界

当前全部页面位于单文件 `index.html` 中；游戏运行逻辑和展示仍然耦合，因此采用 **叠加视觉样式 + 独立 UI 辅助函数** 的改造方式，暂不搬动底层状态机。

- `render()`：主 UI，绘制房间信息、居民、身份、公告、行动菜单。
- `button()`：普通操作按钮 HTML。
- `rpgRenderMessages()`：公告与对话的单独渲染。
- `rpgActivateMenu()`、`rpgSelectTarget()`、`rpgHighlightTargets()`：光标菜单及居民选择。
- `showRoleDeal()`：现有开局抽身份牌视觉呈现。
- `handleTimeScene()`：现有昼夜场景的展示层动画。
- `startGame()`、`beginNight()`、`stepBots()`、`botNight()`、`finishNight()`、`botSpeech()`、`botVote()`、`finishVote()`、`winCheck()`、`accept()`、`snapshot()`：规则、玩家状态与 AI，第一阶段未修改。

### 在手机上验收

1. iPhone Safari 打开 [月下疑云](https://oskikaiti-sys.github.io/neon-mobile-arcade/moonlit-village/)，创建单人局。
2. 抽取身份牌，检查公告是否使用 RPG 对话窗口、系统消息是否居中。
3. 发言阶段检查四个纵向选项是否完整可点；点击「我怀疑某人」再点存活居民，确认上方选中状态与「确认选中的居民」。
4. 投票、下一夜和结算；滚动公告，确认旧消息没有消失。
5. 用桌面键盘测试上下箭头、回车和返回；在系统设置中开启减少动态效果，确认无打字机和闪烁。
6. 在两台设备中创建房间、加入、公开发言并核对同步。

### 字体与许可证说明

- **Zpix**（SolidZORO）：其 [官方说明](https://github.com/SolidZORO/zpix-pixel-font) 规定个人/教育用途免费，商业用途按产品付费授权；在未取得适用授权前，不将其字库复制进本参赛项目。
- **DotGothic16**（Fontworks / DotGothic16 Project Authors）：根据 [上游仓库](https://github.com/fontworks-fonts/DotGothic16)，采用 **SIL Open Font License 1.1**，版权归原作者。此阶段 CSS 列出了 DotGothic16 作为优先字体，但字体**尚未作为本地文件打包**，缺失时退回设备的等宽字体。未引入外链字体 CDN。这是字体交付项尚未完成的部分，不能宣称字体文件已经入库。
- 若后续嵌入 DotGothic16 本地字体文件，应同时附带上游的完整 `OFL.txt` 授权文本；不得把 Zpix 无授权文件混入仓库。

## 先做阶段 1

阶段 2 的头像 PNG、死亡标签、队伍状态栏和阶段 3 的新音效均 **未提前实施**。本项目既有昼夜过场及合成背景音乐继续保留，不作为本阶段新增功能。
