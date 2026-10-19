/* NEON ARCADE · original score-aligned accompaniment for public-domain melodies.
 * Notes are generated locally by WebAudio; no audio recordings or outside services.
 * [beat, MIDI pitch / percussion type, duration in beats, voice, velocity]
 * Voice 0 = bass, 2 = warm chord, 3 = arpeggio, 4 = countermelody, 5 = drums.
 */
(function () {
  'use strict';
  const triads = {
    C:  [48, 60, 64, 67],
    F:  [53, 60, 65, 69],
    G:  [55, 59, 62, 67],
    Am: [57, 60, 64, 69],
    Dm: [50, 62, 65, 69]
  };
  // One chord per two beats; every original four-beat melody bar is retained.
  const harmony = {
    twinkle: [
      ['C','G'],['F','C'],['F','C'],['G','C'],
      ['G','F'],['C','G'],['G','F'],['C','G'],
      ['C','G'],['F','C'],['F','C'],['G','C']
    ],
    frere: [
      ['C','C'],['C','C'],['C','G'],['C','G'],
      ['G','C'],['G','C'],['C','G'],['G','C']
    ],
    ode: [
      ['C','G'],['G','G'],['C','C'],['C','G'],
      ['C','G'],['G','G'],['C','F'],['G','C'],
      ['G','C'],['G','C'],['G','C'],['C','G'],
      ['C','G'],['G','G'],['C','F'],['G','C']
    ]
  };
  function build(id, bars) {
    const events = [];
    const progression = harmony[id];
    if (!progression || progression.length !== bars.length) return [];
    let cursor = 0;
    const add = (beat, note, length, voice, velocity) => events.push([
      Number(beat.toFixed(4)), note, length, voice, velocity
    ]);
    for (let bar = 0; bar < bars.length; bar++) {
      const barBeats = bars[bar].reduce((sum, [,len]) => sum + len, 0);
      if (Math.abs(barBeats - 4) > .0001) return [];
      for (let half = 0; half < 2; half++) {
        const beat = cursor + half * 2;
        const [bass, ...chord] = triads[progression[bar][half]];
        // Independent low bass and sustained harmonic voices; never play the lead.
        add(beat, bass, id === 'ode' ? 1.45 : 1.65, 0, id === 'ode' ? 11 : 9);
        if (id === 'ode') add(beat + 1, bass + 7, .65, 0, 6);
        for (const pitch of chord) add(beat, pitch, 1.76, 2, id === 'ode' ? 8 : 6);
        if (id === 'twinkle') {
          const figure = [chord[0] + 12, chord[1] + 12, chord[2] + 12];
          for (let i = 0; i < 3; i++) add(beat + .5 + i * .5, figure[i], .37, 3, 7);
        } else if (id === 'frere') {
          add(beat + .5, chord[1] + 12, .48, 3, 5);
          add(beat + 1.5, chord[2] + 12, .42, 3, 5);
        } else {
          for (let i = 0; i < 4; i++) {
            const pitch = chord[[0,1,2,1][i]] + (i % 2 ? 12 : 0);
            add(beat + i * .5, pitch, .39, 3, 6);
          }
        }
      }
      if (id === 'ode') {
        // Soft orchestral-style pulse; the percussion stays well under the melody.
        add(cursor, 0, .10, 5, 5);
        add(cursor + 1, 1, .10, 5, 4);
        add(cursor + 2, 0, .10, 5, 4);
        add(cursor + 3, 1, .10, 5, 4);
      }
      cursor += barBeats;
    }
    if (id === 'frere') {
      // A traditional round: the second voice enters two measures later.
      // No shadow lead starts in the intro; the player's own melody stays dominant.
      let sourceBeat = 0;
      for (const row of bars) for (const [pitch, length] of row) {
        if (sourceBeat + 8 < cursor) add(sourceBeat + 8, pitch - 12, length * .88, 4, 7);
        sourceBeat += length;
      }
    }
    // Sort once; the live scheduler expects chronological note-on positions.
    events.sort((a,b) => a[0] - b[0] || a[3] - b[3] || a[1] - b[1]);
    return events;
  }
  window.ClassicSongAccompaniment = { build };
})();
