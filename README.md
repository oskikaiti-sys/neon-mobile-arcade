# NEON ARCADE

包含手机竖屏小游戏：

- `index.html` — 游戏选择首页
- `tetris.html` — 俄罗斯方块
- `breakout.html` — 打砖块

无依赖，纯 HTML/CSS/JS。

## GitHub Pages 部署

1. 创建公共仓库，例如 `neon-arcade`。
2. 将这三个 HTML 文件以及 `.nojekyll` 上传到仓库根目录并提交到 `main`。
3. 进入仓库 **Settings → Pages**，在 **Build and deployment** 选择 **Deploy from a branch**；选 `main` 和 `/ (root)`，保存。
4. 等 GitHub Pages 完成发布后，访问 `https://<用户名>.github.io/neon-arcade/`。

使用 Safari 打开这个 HTTPS 页面；不要在 iOS 文件 App 的 HTML 预览中运行。

## Touhou Project fan arrangement / credits

**Original composition:** ZUN / Team Shanghai Alice. **MML transcription and arrangement:** Yoji Suzuki / SUZUKI PLAN. This is an unofficial fan work.

This update uses the **full 322-beat MML score**, about **2 minutes 12 seconds** at 146 BPM, rather than a selected excerpt. All six original MML voice channels have their note pitches, note-on timing, note lengths, and rests represented in the game:

- **Ch1:** all 525 pitched melody notes are playable as catchable falling notes; rests stay silent.
- **Ch0, Ch2, Ch3, Ch4, Ch5:** all 2642 backing instrument and percussion events are played automatically with the original score's timing.
- **Ch4:** the very busy high-register passage at original MML beats **32–64** retains the previously tuned *soft sine* mix rather than an overpowering high-frequency synthesizer.
- **Catching lanes:** falling notes drift smoothly left/right with melody pitch and phrase flow. Quickly successive notes remain close together to stay catchable on a mobile paddle.
- The four Ch1-silent measures count as intended rests, not failed/skipped melody notes. The existing 1.3-second loop turnaround remains.

Browser Web Audio synthesizer timbres approximate the instruments and are not the original game audio.

- Original licensing / terms: https://github.com/suzukiplan/Touhou-VGS-MML-data
- User's fork (required by MML usage terms): https://github.com/oskikaiti-sys/Touhou-VGS-MML-data
- Transcription: https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT012.mml

No original game audio or sprites are distributed.
