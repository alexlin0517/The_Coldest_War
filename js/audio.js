/* ====================================================
   WEB AUDIO SYNTHESIZER MODULE (HUD Sound Effects)
   ==================================================== */

// ==========================================
    // 3. Web Audio API 科幻音效模組
    // ==========================================
    let audioEnabled = true;
    let audioCtx = null;

    function initAudio() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playBlip(freq = 880, duration = 0.06, type = 'sine', volume = 0.05) {
      if (!audioEnabled) return;
      try {
        initAudio();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {}
    }

    function toggleAudio() {
      audioEnabled = !audioEnabled;
      const btn = document.getElementById('btn-toggle-audio');
      if (audioEnabled) {
        initAudio();
        btn.innerHTML = '<span>🔊 音效: 開</span>';
        btn.style.color = '#cbd5e1';
      } else {
        btn.innerHTML = '<span>🔇 音效: 關</span>';
        btn.style.color = '#64748b';
      }
    }
