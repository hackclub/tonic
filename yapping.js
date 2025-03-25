const yap_sounds = {
    // these sounds and most of the yapping code are adapted from https://github.com/equalo-official/animalese-generator
    a: new Howl({ src: 'assets/audio/yap/a.wav' }),
    b: new Howl({ src: 'assets/audio/yap/b.wav' }),
    c: new Howl({ src: 'assets/audio/yap/c.wav' }),
    d: new Howl({ src: 'assets/audio/yap/d.wav' }),
    e: new Howl({ src: 'assets/audio/yap/e.wav' }),
    f: new Howl({ src: 'assets/audio/yap/f.wav' }),
    g: new Howl({ src: 'assets/audio/yap/g.wav' }),
    h: new Howl({ src: 'assets/audio/yap/h.wav' }),
    i: new Howl({ src: 'assets/audio/yap/i.wav' }),
    j: new Howl({ src: 'assets/audio/yap/j.wav' }),
    k: new Howl({ src: 'assets/audio/yap/k.wav' }),
    l: new Howl({ src: 'assets/audio/yap/l.wav' }),
    m: new Howl({ src: 'assets/audio/yap/m.wav' }),
    n: new Howl({ src: 'assets/audio/yap/n.wav' }),
    o: new Howl({ src: 'assets/audio/yap/o.wav' }),
    p: new Howl({ src: 'assets/audio/yap/p.wav' }),
    q: new Howl({ src: 'assets/audio/yap/q.wav' }),
    r: new Howl({ src: 'assets/audio/yap/r.wav' }),
    s: new Howl({ src: 'assets/audio/yap/s.wav' }),
    t: new Howl({ src: 'assets/audio/yap/t.wav' }),
    u: new Howl({ src: 'assets/audio/yap/u.wav' }),
    v: new Howl({ src: 'assets/audio/yap/v.wav' }),
    w: new Howl({ src: 'assets/audio/yap/w.wav' }),
    x: new Howl({ src: 'assets/audio/yap/x.wav' }),
    y: new Howl({ src: 'assets/audio/yap/y.wav' }),
    z: new Howl({ src: 'assets/audio/yap/z.wav' }),
    th: new Howl({ src: 'assets/audio/yap/th.wav' }),
    sh: new Howl({ src: 'assets/audio/yap/sh.wav' }),
    _: new Howl({ src: 'assets/audio/yap/space.wav' })
  }

async function yap(text, {
  letterCallback = () => {},
  endCallback = () => {},
  baseRate = 3.2,
  rateVariance = 1,
} = {}) {

  const yap_queue = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const lowerChar = char?.toLowerCase()
    const prevChar = text[i - 1]
    const prevLowerChar = prevChar?.toLowerCase()
    const nextChar = text[i + 1]
    const nextLowerChar = nextChar?.toLowerCase()

    if (lowerChar === 's' && nextLowerChar === 'h') { // test for 'sh' sound
      yap_queue.push({letter: char, sound: yap_sounds['sh']});
      continue;
    } else if (lowerChar === 't' && nextLowerChar === 'h') { // test for 'th' sound
      yap_queue.push({letter: char, sound: yap_sounds['th']});
      continue;
    } else if (lowerChar === 'h' && (prevLowerChar === 's' || prevLowerChar === 't')) { // test if previous letter was 's' or 't' and current letter is 'h'
      yap_queue.push({letter: char, sound: yap_sounds['_']});
      continue;
    } else if (',?. '.includes(char)) {
      yap_queue.push({letter: char, sound: yap_sounds['_']});
      continue;
    } else if (lowerChar === prevLowerChar) { // skip repeat letters
      yap_queue.push({letter: char, sound: yap_sounds['_']});
      continue;
    }

    if (lowerChar.match(/[a-z.]/)) {
      yap_queue.push({letter: char, sound: yap_sounds[lowerChar]})
      continue; // skip characters that are not letters or periods
    }

    yap_queue.push({letter: char, sound: yap_sounds['_']})
  }

  function next_yap() {
    if (yap_queue.length === 0) {
      endCallback()
      return
    }
    let {sound, letter} = yap_queue.shift()
    sound.rate(Math.random() * rateVariance + baseRate)
    sound.volume(0.035)
    sound.once('end', next_yap)
    sound.play()
    sound.once('play', () => {
      letterCallback({sound, letter, length: yap_queue.length})
    })
  }

  next_yap();
}