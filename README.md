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

## Touhou fan arrangement / music credits

Original composition: **ZUN / Team Shanghai Alice**. MML fan arrangement and
transcription: **Yoji Suzuki / SUZUKI PLAN**. The playable Septette track is a
~49-second verified **theme excerpt loop**, not the full original.
Each original non-lead MML track (Ch0 bass, Ch2 lower counterline, Ch3 and Ch4 harmony, Ch5 percussion) is played note by note with its original timing and durations. Synthetic chord pads and the generic arcade drum loop are disabled in this mode. Browser audio approximates timbres but does not replace the written notes; all 136 lead notes are player-triggered. Every pitched melody event from the excerpt is playable (136 notes); only true score rests are silent. Rapid passages are grouped into close horizontal landing lanes.

- Original usage terms: https://github.com/suzukiplan/Touhou-VGS-MML-data
- User's required fork: https://github.com/oskikaiti-sys/Touhou-VGS-MML-data
- Referenced source score: https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT012.mml

No original game audio or sprites are redistributed.

## Lead-channel correction

The source MML Ch1 is the main high melodic voice, while Ch2 supplies a lower counterline for two of the three excerpts. The playable notes now come from Ch1 in full, with Ch2 moved to the score-derived accompaniment. The first excerpt starts at beat 32.0 (rather than 32.25) to preserve Ch1's proper first-note onset; the selected passages total 120 beats. The prior Ch2-based lead was pitch-accurate to that channel but was the wrong voice.
