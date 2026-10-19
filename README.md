# NEON ARCADE

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

## Public-domain classics — synchronized arrangements

The three original public-domain tunes now have **independent, score-aligned multi-voice accompaniment** while keeping the core mechanic intact: the player catches notes to perform the lead, and missed lead notes remain silent. The backing instruments play automatically. This replaces the generic drum click; it does **not** use a fixed recording that includes the melody.

- **Twinkle, Twinkle, Little Star / 小星星:** 12 measures, 48 beats at 98 BPM, 168 accompaniment note events; bass, soft sustained harmonies, and an upper arpeggio.
- **Frère Jacques / 两只老虎:** 8 measures, 32 beats at 96 BPM, 122 accompaniment note events; bass, harmony, gently plucked notes and a delayed lower-register canon voice.
- **Ode to Joy (Theme) / 欢乐颂:** 16 measures, 64 beats at 100 BPM, 352 accompaniment note/percussion events; flowing arpeggios, bass, orchestral-style harmony and restrained rhythm.

Implementation: `breakout-classic-accompaniment.js` composes the score events in memory, `breakout-songbook.js` schedules both classic and Touhou backing parts on the matching beat timeline, and `breakout.html` uses its existing WebAudio synthesizer. The classic arrangements here were made for this game from public-domain melodic material; they are **not** licensed copies of third-party recordings or MIDI arrangements. Music and SFX settings, mobile controls, melody drops, song looping, and all five Touhou scores are preserved.

## U.N. Owen Was Her? — Flandre Scarlet fan-game mode

Original composition: **ZUN / Team Shanghai Alice**. MML transcription and arrangement: **Yoji Suzuki / SUZUKI PLAN**. This game uses the full original **314-beat** MML source at **155 BPM** (approximately 2 minutes 2 seconds), from the [required fork of BSLOT014.mml](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT014.mml). The **506** sounding Ch1 notes are catchable by the player; rests stay silent. The **2,249** original Ch0/2/3/4/5 note and drum events play automatically. WebAudio synthesizes approximately similar timbres, not the original game recordings.

Flandre mode has rainbow crystal bricks, prismatic-wing support units, a central gothic **Forbidden Gate** (禁忌之门) with a black-iron frame, crimson double doors, golden sealing marks and subtle rainbow light, and its own spell-card labels/effects. The other Touhou modes now have separate character art and titles; the three public-domain tracks retain their usual gameplay.

## Reimu Hakurei — 少女綺想曲 ～ Dream Battle

Original composition: **ZUN / Team Shanghai Alice**. Full-score MML arrangement/transcription: **Yoji Suzuki / SUZUKI PLAN**, from [BSLOT046.mml in the required user fork](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT046.mml). The playable Ch1 contains **518 pitched melody notes** over **400 beats**. The other MML channels supply **4,487** automated note/percussion events. The original tempo progression **160 → 159 → 152 → 146 → 139 → 160 BPM** is reflected in both the catchable notes and the backing-sound schedule, including the transition segment at beats 64–79. The browser synthesizer adapts instruments but preserves notes and timing.

Reimu mode uses the original **Kedama brick enemies**, **Yin-Yang Orb wingmen**, **red-white ofuda bullets**, a central **shrine offering box** (赛钱箱 / 賽銭箱), and the **Fantasy Seal / Evil-Sealing Circle** spell visuals.

## Remilia Scarlet — 亡き王女の為のセプテット

The existing [BSLOT012.mml](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT012.mml) melody and tuned score-aligned multi-channel music remain unchanged. Remilia now has her own **crimson blood-moon sky**, **bat-emblem gothic red bricks**, **small vampire-bat wingmen**, **scarlet spear bullets**, **Scarlet Gate**, and red vampire-themed spell cards. These replace the earlier Reimu imagery that had been shared with Septette.

All Touhou tracks remain unofficial fan adaptations. Original music: **ZUN / Team Shanghai Alice**; MML fan transcriptions: **Yoji Suzuki / SUZUKI PLAN**.

## 月時計 ～ ルナ・ダイアル (Sakuya Izayoi / Lunar Clock)

Added the full Touhou Project fan MML transcription [BSLOT010.mml](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT010.mml) from the user's fork of **Yoji Suzuki / SUZUKI PLAN**. Original composition **ZUN / Team Shanghai Alice**, soundtrack **東方紅魔郷 / Embodiment of Scarlet Devil**.

The playable Ch1 lead includes **420** pitched notes, exactly as scored, across **192 beats at 148 BPM** (about **77.84 seconds**). The other five source voices (Ch0,2,3,4,5) contain **2,239** synchronized auto-play notes and drum events. The 501 events from Ch5 are synthesized percussion. All original pitches, rests and note-on times are preserved; browser synthesis adapts instrument timbres, not original recordings.

Sakuya's exclusive visuals: silver-blue gothic clockwork backdrop, small pocket-watch wingmen, visible silver knife projectiles (not Reimu's ofuda), gear-etched bricks, clock portal and silver spell-card effects/names. All character themes share physics and do not alter note hitboxes. This is an unofficial, noncommercial fan work.

## 八雲紫 — ネクロファンタジア / Necrofantasia

Original music: **ZUN / Team Shanghai Alice**. Full MML transcription/arrangement: **Yoji Suzuki / SUZUKI PLAN**, using **BSLOT034.mml** from [the owner's fork](https://github.com/oskikaiti-sys/Touhou-VGS-MML-data/blob/master/data/BSLOT034.mml).

- **Complete 453.25-beat cycle at 164 BPM** (approximately **2 min 46 sec**), without cutting or simplifying the lead.
- **Ch1:** 378 audible player-catchable lead notes, with silent notes/rests and tied durations kept on the original timeline.
- **Ch0, Ch2, Ch3, Ch4, Ch5:** 5,921 individually timed automatic backing and percussion events. Playback retains every sounding note's beat onset, duration, pitch/percussion group, channel and dynamic level. Sound synthesis approximates MML instrument timbres rather than distributing original game recordings.
- Dedicated purple-and-gold **Boundary Gap**, engraved **boundary bricks**, small **butterfly familiars**, golden-violet projectiles, and boundary/butterfly-themed spell cards.
- Reimu's Dream Battle displays a shrine offering box (赛钱箱), while Flandre's U.N. Owen displays a gothic sealed basement gate (禁忌之门). Both retain the original central teleportation collision behavior.
- Changing songs clears pending melody notes, resets the score and backing index, and promptly silences already-scheduled score voices so the old theme does not keep playing over the new one.
- **Regression checks:** all eight titles remain in the playlist, the six Necrofantasia tracks retain their source beat timeline, and existing Remilia/Sakuya/other score assets are unmodified.

The browser game is a free, unofficial fan work. No original game recording or sprite is hosted. Varying the musical timbres and visual style is not a claim that the arrangement or original composition is public domain.
