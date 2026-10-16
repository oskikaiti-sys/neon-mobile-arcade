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

## U.N. Owen Was Her? — Flandre Scarlet fan-game mode

Original composition: **ZUN / Team Shanghai Alice**. MML transcription and arrangement: **Yoji Suzuki / SUZUKI PLAN**. This game uses the full original **314-beat** MML source at **155 BPM** (approximately 2 minutes 2 seconds), from the [required fork of BSLOT014.mml](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT014.mml). The **506** sounding Ch1 notes are catchable by the player; rests stay silent. The **2,249** original Ch0/2/3/4/5 note and drum events play automatically. WebAudio synthesizes approximately similar timbres, not the original game recordings.

Flandre mode has rainbow crystal bricks, prismatic-wing support units and its own spell-card labels/effects. The other Touhou modes now have separate character art and titles; the three public-domain tracks retain their usual gameplay.

## Reimu Hakurei — 少女綺想曲 ～ Dream Battle

Original composition: **ZUN / Team Shanghai Alice**. Full-score MML arrangement/transcription: **Yoji Suzuki / SUZUKI PLAN**, from [BSLOT046.mml in the required user fork](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT046.mml). The playable Ch1 contains **518 pitched melody notes** over **400 beats**. The other MML channels supply **4,487** automated note/percussion events. The original tempo progression **160 → 159 → 152 → 146 → 139 → 160 BPM** is reflected in both the catchable notes and the backing-sound schedule, including the transition segment at beats 64–79. The browser synthesizer adapts instruments but preserves notes and timing.

Reimu mode uses the original **Kedama brick enemies**, **Yin-Yang Orb wingmen**, **red-white ofuda bullets**, **Sukima**, and the **Fantasy Seal / Evil-Sealing Circle** spell visuals.

## Remilia Scarlet — 亡き王女の為のセプテット

The existing [BSLOT012.mml](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT012.mml) melody and tuned score-aligned multi-channel music remain unchanged. Remilia now has her own **crimson blood-moon sky**, **bat-emblem gothic red bricks**, **small vampire-bat wingmen**, **scarlet spear bullets**, **Scarlet Gate**, and red vampire-themed spell cards. These replace the earlier Reimu imagery that had been shared with Septette.

All Touhou tracks remain unofficial fan adaptations. Original music: **ZUN / Team Shanghai Alice**; MML fan transcriptions: **Yoji Suzuki / SUZUKI PLAN**.

## 月時計 ～ ルナ・ダイアル (Sakuya Izayoi / Lunar Clock)

Added the full Touhou Project fan MML transcription [BSLOT010.mml](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT010.mml) from the user's fork of **Yoji Suzuki / SUZUKI PLAN**. Original composition **ZUN / Team Shanghai Alice**, soundtrack **東方紅魔郷 / Embodiment of Scarlet Devil**.

The playable Ch1 lead includes **420** pitched notes, exactly as scored, across **192 beats at 148 BPM** (about **77.84 seconds**). The other five source voices (Ch0,2,3,4,5) contain **2,239** synchronized auto-play notes and drum events. The 501 events from Ch5 are synthesized percussion. All original pitches, rests and note-on times are preserved; browser synthesis adapts instrument timbres, not original recordings.

Sakuya's exclusive visuals: silver-blue gothic clockwork backdrop, small pocket-watch wingmen, visible silver knife projectiles (not Reimu's ofuda), gear-etched bricks, clock portal and silver spell-card effects/names. All character themes share physics and do not alter note hitboxes. This is an unofficial, noncommercial fan work.
