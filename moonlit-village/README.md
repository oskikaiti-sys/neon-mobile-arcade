# 月下疑云 / Moonlit Village

### 音效延迟修复（2026-10-30）

以前每种音效首次触发时才通过 `new Audio(path)` 建立播放器，并在后续每次触发时执行 `pause() → currentTime=0 → play()`，在移动 Safari 上容易出现明显的解码或音频管线启动延迟。

现在页面加载时通过 `fetch() + AudioContext.decodeAudioData()` 预取、解码六个音效，常规点击直接用 `AudioBufferSourceNode.start(0)` 播放。首次触摸时尝试解锁 iOS AudioContext；音效尚未准备好时跳过当次，不在玩家进入下一步之后补播。对 cursor、confirm、cancel、damage 做轻量前置静音检测和处理（最多扫描 280ms），避免原始音效里的开头静音造成“慢一拍”。没有修改音效的艺术内容。

右上角开关依旧同时控制 BGM 和 SFX，并立即停止当前正在发声的节点。浏览器缺少 AudioContext 时使用预加载的 HTML Audio 作为兼容回退。实际触屏响应速度仍受设备、浏览器与系统音频输出延迟影响。

## 多语言支持 / Localization (English · 简体中文 · 日本語)

游戏首次访问默认 **English**。顶栏左侧可以切换 **EN / 中文 / 日本語**；选择保存在浏览器 `localStorage` 的 `moonlit-language` 中。清空网站存储或首次在新浏览器打开时恢复英语默认值。设置只保存在本设备，不会修改好友的语言。

翻译词库位于 `moonlit-village/index.html` 的 `translations.en / translations.zh / translations.ja`，涉及首页、角色与能力、抽牌、昼夜动画、系统公告、发言、投票、结算、错误提示和可访问性标签；代码中的 `applyStaticLanguage()`、`render()`、`localizeLog()`、`localizeSpeech()` 以及 `updateLanguageOverlays()` 负责显示更新。用户自己输入的昵称不会自动翻译。

**多人模式兼容：** 房主仍以原有规范化的消息和角色 ID 传输游戏状态。客户端收到状态后自行翻译显示，不会因语言不同修改角色分配、AI 策略、投票或秘密身份。六名预设电脑玩家的名字可显示为本地化名称，但内部名字仍保持原来的唯一标识。若系统出现无法识别的新增公告，暂时回退原始消息以避免误译。

### 验证步骤

1. 新浏览器打开游戏，确认标题、首页、按钮和默认昵称均为英语。
2. 分别切换中文、日语，确认菜单、身份牌、夜间行动、公告与结算均改用相应语言。
3. 游戏中途切换，确认已经归档的对话和正在展示的发言随语言立即更新。
4. 在一台设备用英语创建好友房，另一台用日语或中文加入；确认两人看到相同阶段、投票和结果，但文字不同。
5. 在手机上检查顶部语言菜单及较长的英文、日文按钮是否完整显示。

## 六人双侧站位与中央发言（2026-10-30）

`moonlit-village/index.html` 已取消需要横向滑动才能看见所有居民的卡条。现在 `#players.player-layout` 固定采用三列：左侧 `#leftPlayers.character-rail` 放 1–3 号、中间 `.story-column` 显示文字历史、右侧 `#rightPlayers.character-rail` 放 4–6 号。所有六名居民（包括出局者）始终保留座位。原来的居民点击选目标及键盘方向键/回车操作保持不变。

- **`#speakerOverlay` / `.speaker-card`**：新的公开发言先居中显示头像、姓名和内容；展示结束后自动写入 `#feed`，也可以点击「继续」跳过这条发言。
- **`rpgRenderMessages()` / `stageAdvanceQueue()` / `stageFinishSpeech()`**：只消费已公开的 `snapshot().messages`，将新发言按先后顺序展示，其他公告保持与发言一致的历史顺序；不改变角色、策略、投票和同步协议。
- **`stageHighlightSpeaker()`**：金色呼吸光圈跟随中央正在展示的发言者，显示完成后取消该高亮。
- 开启 **减少动态效果** 时不播放独立发言动画，发言直接进入历史。
- 手机屏高很低时头像与内边距会缩小，避免必须滑动六人座位；公告和行动菜单仍可分别纵向滚动。

### 验证

在约 390px 宽的 iPhone Safari 中检查六名居民是否同时可见，并完成：单人开局、身份翻牌、夜晚行动、天亮、中央公开发言、发言自动/手动归档、怀疑/信任目标选择、投票、下一夜和胜负结算。再打开两台设备验证公开记录同步，确保不同设备只展示各自的秘密身份。

## UI 3–7 优化（2026-10-30）

改动集中在 `moonlit-village/index.html`，原有 `startGame()` / `stepBots()` / `finishNight()` / `finishVote()` / `winCheck()`、联机状态同步和 BGM 均保持不变。

- **3：** 将可滚动的日志作为弹性主区域，行动菜单设置独立滚动与最大高度，避免选项过多时挤掉公告；身份信息位于居民标题行。
- **4：** `#ambientSky`、`.moon-glow`、`.ambient-stars`、`.ambient-star` 提供 26 个固定层光点与月光晕，昼夜颜色 1.2 秒切换，`prefers-reduced-motion` 时不执行漂浮动效。
- **5：** 使用 `faceConfig`、`faceMarkup()` 和 `.face-frame` 统一居民、公告及目标卡头像。PNG 缺失时仍显示内联 SVG 剪影。
- **6：** `#players` 改成横向滚动队伍卡，`.player-you` 表示自己，`.rpg-speaking` 表示**最近一次公开发言**的居民（当前规则没有轮流发言的固定发言者），出局者显示红斜线。
- **7：** 顶栏 `#musicToggle` 的可见圆形是 40px，但保留 48px 触控区域。

### 添加头像 PNG

可将 512×512 方形 PNG 放入 `moonlit-village/assets/faces/`，使用 `{玩家id}_{表情}.png` 命名。支持 `normal`、`suspect`、`out`。具体 ID 是内部玩家标识，可从运行时数据确认；离线电脑玩家的 ID 可能因每局而变化，建议在未来做正式脸图包时为座位配置稳定资产键，不能假设本轮 ID 永久不变。

当前代码会请求对应的 PNG；文件缺失或无法加载时自动隐藏图片，继续显示剪影。六种头像色环是**公开座位配色，不代表隐藏职业、阵营或好坏**，避免泄露狼人身份。若添加了此前缺失的图片，请刷新页面以清除本次页面会话中的缺图记录。

### 验收建议

在 iPhone 390px 竖屏测试完整路径：单人开局、翻身份牌、夜晚行动、天亮、发言及居民选目标、投票、下一夜、结算；再在两台设备上创建和加入好友房。检查横向滚动是否能显示第六张卡、公告可独立滑动、夜晚与白天渐变和静音开关。

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
