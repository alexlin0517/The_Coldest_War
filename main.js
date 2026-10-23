/* ====================================================
   PROJECT CHRONOS // MAIN GLOBE APPLICATION
   Globe.gl Setup, HTML Markers, Interactions & Lifecycle
   ==================================================== */

// ==========================================
    // 4. 純向量/Shader 科幻材質 (100% 離線動態生成，無外部貼圖依賴)
    // ==========================================
    function createSciFiGlobeTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // 深藍黑底色漸層 (Dark Blue-Black Base)
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#020510');
      grad.addColorStop(0.3, '#040b1e');
      grad.addColorStop(0.5, '#06102b');
      grad.addColorStop(0.7, '#040b1e');
      grad.addColorStop(1, '#020510');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 細緻科幻經緯網格 (Holographic Lat/Long Grid)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 赤道線
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // 微光感知微粒 (Micro Sensor Particles)
      ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
      for (let i = 0; i < 220; i++) {
        const px = Math.random() * canvas.width;
        const py = Math.random() * canvas.height;
        ctx.fillRect(px, py, 1.5, 1.5);
      }

      return canvas.toDataURL('image/png');
    }

// ==========================================
    // 7. Globe.gl 初始化
    // ==========================================
    let world;
    let hoveredCountryCode = null;
    let isAutoRotating = true;

    function initGlobe() {
      const globeContainer = document.getElementById('globeViz');
      const globeTextureUrl = createSciFiGlobeTexture();

      world = Globe({ 
        rendererConfig: { 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        } 
      })(globeContainer)
        .globeImageUrl(globeTextureUrl)
        .backgroundColor('rgba(0, 0, 0, 0)')
        
        // 亮青色大氣層光暈
        .showAtmosphere(true)
        .atmosphereColor('#00f0ff')
        .atmosphereAltitude(0.24)

        // 多邊形幾何設定
        .polygonsData([])
        .polygonAltitude(d => {
          const code = getCountryCode(d);
          return (code === hoveredCountryCode) ? 0.068 : 0.015;
        })
        .polygonCapColor(d => {
          const code = getCountryCode(d);
          const faction = getFaction(code);
          const isHigh = (code === hoveredCountryCode);
          const scheme = COLOR_SCHEME[faction] || COLOR_SCHEME.NEUTRAL;
          return isHigh ? scheme.hoverFill : scheme.fill;
        })
        .polygonSideColor(d => {
          const code = getCountryCode(d);
          const faction = getFaction(code);
          const isHigh = (code === hoveredCountryCode);
          const scheme = COLOR_SCHEME[faction] || COLOR_SCHEME.NEUTRAL;
          return isHigh ? scheme.hoverFill : scheme.side;
        })
        .polygonStrokeColor(d => {
          const code = getCountryCode(d);
          // 蘇聯與美國由獨立的 pathsData 粗線層繪製，消除細線重疊與 z-fighting
          if (code === 'SOV' || code === 'USA') {
            return 'rgba(0, 0, 0, 0)';
          }
          // 南斯拉夫解體後現代國界淡化處理：
          // 內部國界設為極弱微光幽靈線（淡化），外邊界由 pathsData 以中立國正常細線自然框定，整體渾然一體
          if (code === 'YUG') {
            const isHigh = (code === hoveredCountryCode);
            return isHigh ? 'rgba(148, 163, 184, 0.15)' : 'rgba(148, 163, 184, 0.06)';
          }
          const faction = getFaction(code);
          const isHigh = (code === hoveredCountryCode);
          const scheme = COLOR_SCHEME[faction] || COLOR_SCHEME.NEUTRAL;
          return isHigh ? scheme.hoverBorder : scheme.border;
        })
        .polygonLabel(() => '')
        .polygonsTransitionDuration(260)
        .onPolygonHover(handlePolygonHover)

        // 美蘇超級大國與南斯拉夫外圍總國界光軌層 (PathsData)
        .pathsData([])
        .pathPoints(d => d.points)
        .pathPointLat(p => p[1])
        .pathPointLng(p => p[0])
        .pathPointAlt(d => {
          if (d.type === 'SOV') return (hoveredCountryCode === 'SOV' ? 0.074 : 0.020);
          if (d.type === 'USA') return (hoveredCountryCode === 'USA' ? 0.074 : 0.020);
          if (d.type === 'YUG') return (hoveredCountryCode === 'YUG' ? 0.070 : 0.018);
          return 0.018;
        })
        .pathColor(d => {
          if (d.type === 'SOV') {
            return (hoveredCountryCode === 'SOV' ? '#ffffff' : '#ff0080'); // 蘇聯霓虹粉光軌，懸停高亮白
          }
          if (d.type === 'USA') {
            return (hoveredCountryCode === 'USA' ? '#ffffff' : '#00f0ff'); // 美國亮青色光軌，懸停高亮白
          }
          if (d.type === 'YUG') {
            // 南斯拉夫不特意粗線霓虹高調，採用協調的中立國標準淡灰藍線條，懸停時亮青灰光
            return (hoveredCountryCode === 'YUG' ? '#93c5fd' : 'rgba(148, 163, 184, 0.65)');
          }
          return 'rgba(148, 163, 184, 0.5)';
        })
        .pathStroke(d => {
          if (d.type === 'SOV') {
            return (hoveredCountryCode === 'SOV' ? 4.2 : 3.2); // 蘇聯粗線強化
          }
          if (d.type === 'USA') {
            return (hoveredCountryCode === 'USA' ? 4.2 : 3.2); // 美國粗線強化 (同蘇聯超級大國規格)
          }
          if (d.type === 'YUG') {
            return (hoveredCountryCode === 'YUG' ? 2.0 : 1.4); // 南斯拉夫一般標準邊界粗細，不特意強化
          }
          return 1.4;
        })
        .pathResolution(3)
        .pathTransitionDuration(260)

        // ----------------------------------------------------
        // 冷戰核心城市 HTML 標記層與地表浮水印 (HTML Markers & Watermarks)
        // ----------------------------------------------------
        .htmlElementsData([])
        .htmlLat(d => d.lat)
        .htmlLng(d => d.lng)
        .htmlAltitude(d => {
          if (d.isWatermark) {
            return (hoveredCountryCode && d.code === hoveredCountryCode) ? 0.076 : 0.022;
          }
          return (d.tier === 1 ? 0.032 : 0.022);
        })
        .htmlElement(d => {
          if (d.isWatermark) return createWatermarkElement(d);
          return createCityMarkerElement(d);
        })
        .htmlTransitionDuration(0);

      const controls = world.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.55;
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.rotateSpeed = 0.8;
      controls.zoomSpeed = 1.0;
      controls.minDistance = 140;
      controls.maxDistance = 550;

      controls.addEventListener('change', updateCoordsHud);

      window.addEventListener('resize', () => {
        world.width(window.innerWidth);
        world.height(window.innerHeight);
      });

      world.pointOfView({ lat: 20, lng: 10, altitude: 2.3 }, 0);
    }

    // ==========================================
    // 8. 懸停與目標情報更新
    // ==========================================
    function handlePolygonHover(hoverD) {
      const code = hoverD ? getCountryCode(hoverD) : null;
      if (code !== hoveredCountryCode) {
        hoveredCountryCode = code;

        world
          .polygonAltitude(world.polygonAltitude())
          .polygonCapColor(world.polygonCapColor())
          .polygonSideColor(world.polygonSideColor())
          .polygonStrokeColor(world.polygonStrokeColor())
          .pathColor(world.pathColor())
          .pathStroke(world.pathStroke())
          .pathPointAlt(world.pathPointAlt())
          .htmlAltitude(world.htmlAltitude());

        if (code) {
          playBlip(code === 'SOV' ? 520 : code === 'USA' ? 580 : code === 'YUG' ? 680 : 760, 0.05, (code === 'SOV' || code === 'USA') ? 'sawtooth' : 'sine', 0.04);
        }
        updateTargetHud(hoverD);
      }
    }

    function updateTargetHud(countryFeature) {
      const idleState = document.getElementById('target-idle-state');
      const detailState = document.getElementById('target-detail-state');
      const badgeStatus = document.getElementById('target-badge-status');

      if (!countryFeature) {
        idleState.classList.remove('hidden');
        detailState.classList.add('hidden');
        badgeStatus.textContent = 'SCANNING';
        badgeStatus.style.background = 'rgba(0,240,255,0.15)';
        badgeStatus.style.borderColor = 'rgba(0,240,255,0.3)';
        badgeStatus.style.color = '#67e8f9';
        return;
      }

      idleState.classList.add('hidden');
      detailState.classList.remove('hidden');

      const code = getCountryCode(countryFeature);
      const faction = getFaction(code);
      const props = countryFeature.properties || {};
      const intel = COUNTRY_INTEL[code] || null;

      const rawName = props.NAME || props.ADMIN || props.name || 'UNKNOWN ENTITY';
      const displayName = intel ? intel.name : rawName;
      const subName = intel ? intel.union : (props.FORMAL_EN || props.NAME_LONG || 'Sovereign Territory');

      document.getElementById('target-iso').textContent = `[${code}]`;
      document.getElementById('target-name').textContent = displayName;
      document.getElementById('target-subname').textContent = subName;

      // 渲染 48x48 科技國徽/陣營標章
      const insigniaBox = document.getElementById('target-insignia');
      if (insigniaBox) {
        insigniaBox.className = `hud-insignia-box faction-${faction}`;
        insigniaBox.innerHTML = getInsigniaSvg(code, faction);
      }

      // 陣營標籤樣式
      const factionEl = document.getElementById('target-faction');
      if (faction === 'EAST_CORE') {
        factionEl.textContent = '東方同盟核心 (EAST CORE)';
        factionEl.style.background = 'rgba(60,8,30,0.8)';
        factionEl.style.borderColor = '#ff0080';
        factionEl.style.color = '#fbcfe8';
        badgeStatus.textContent = (code === 'SOV') ? 'U.S.S.R. BORDER SHIELD' : 'WARSAW PACT';
        badgeStatus.style.background = 'rgba(255,0,128,0.2)';
        badgeStatus.style.borderColor = '#ff0080';
        badgeStatus.style.color = '#f472b6';
      } else if (faction === 'EAST_PROXY') {
        factionEl.textContent = '東方代理/反帝同盟 (EAST PROXY)';
        factionEl.style.background = 'rgba(60,8,30,0.4)';
        factionEl.style.borderColor = 'rgba(255,80,160,0.6)';
        factionEl.style.color = '#f472b6';
        badgeStatus.textContent = 'SOVIET PROXY';
        badgeStatus.style.background = 'rgba(255,80,160,0.2)';
        badgeStatus.style.borderColor = 'rgba(255,80,160,0.6)';
        badgeStatus.style.color = '#f472b6';
      } else if (faction === 'WEST_CORE') {
        factionEl.textContent = '西方陣營核心 (WEST CORE)';
        factionEl.style.background = 'rgba(6,28,50,0.8)';
        factionEl.style.borderColor = '#00f0ff';
        factionEl.style.color = '#a5f3fc';
        badgeStatus.textContent = (code === 'USA') ? 'U.S.A. BORDER SHIELD' : 'NATO / US ALLIANCE';
        badgeStatus.style.background = (code === 'USA') ? 'rgba(0,240,255,0.25)' : 'rgba(0,240,255,0.2)';
        badgeStatus.style.borderColor = '#00f0ff';
        badgeStatus.style.color = '#67e8f9';
      } else if (faction === 'WEST_PROXY') {
        factionEl.textContent = '西方美洲/非洲防務 (WEST PROXY)';
        factionEl.style.background = 'rgba(6,28,50,0.4)';
        factionEl.style.borderColor = 'rgba(0,210,255,0.6)';
        factionEl.style.color = '#67e8f9';
        badgeStatus.textContent = 'RIO PACT / WEST ALLY';
        badgeStatus.style.background = 'rgba(0,210,255,0.2)';
        badgeStatus.style.borderColor = 'rgba(0,210,255,0.6)';
        badgeStatus.style.color = '#67e8f9';
      } else {
        factionEl.textContent = '不結盟運動 / 中立緩衝 (NEUTRAL)';
        factionEl.style.background = 'rgba(30,41,59,0.8)';
        factionEl.style.borderColor = '#64748b';
        factionEl.style.color = '#cbd5e1';
        if (code === 'YUG') {
          badgeStatus.textContent = 'NON-ALIGNED LEADER';
          badgeStatus.style.background = 'rgba(100,116,139,0.35)';
          badgeStatus.style.borderColor = '#94a3b8';
          badgeStatus.style.color = '#f1f5f9';
        } else {
          badgeStatus.textContent = 'NON-ALIGNED';
          badgeStatus.style.background = 'rgba(71,85,105,0.3)';
          badgeStatus.style.borderColor = '#64748b';
          badgeStatus.style.color = '#cbd5e1';
        }
      }

      document.getElementById('target-pact').textContent = intel ? intel.pact : (
        faction === 'WEST_CORE' ? '北大西洋公約 (NATO) / 雙邊共同防禦條約' :
        faction === 'WEST_PROXY' ? '美洲國家組織 OAS / 西方防務條約' :
        faction === 'EAST_CORE' ? '華沙公約組織 (Warsaw Pact) / 社會主義同盟條約' :
        faction === 'EAST_PROXY' ? '東方友好合作條約 / 反帝革命軍協' : '萬隆不結盟原則'
      );
      document.getElementById('target-command').textContent = intel ? intel.command : (
        faction === 'WEST_CORE' ? '北約歐洲盟軍最高司令部 (SHAPE)' :
        faction === 'WEST_PROXY' ? '美洲/海外戰略司令部' :
        faction === 'EAST_CORE' ? '華沙公約聯合作戰司令部' :
        faction === 'EAST_PROXY' ? '民族解放與國防指揮中樞' : '國防軍指管司令部'
      );

      const alertText = document.getElementById('target-alert-text');
      if (intel && intel.desc) {
        alertText.innerHTML = intel.desc;
      } else if (code === 'SOV') {
        alertText.innerHTML = '<strong style="color:#f472b6;">【全體加盟國一體化】</strong>：包含俄羅斯、烏克蘭、白俄羅斯、高加索與中亞等 15 國已消弭現代內部國界，外圍以強光粗線統一框定。';
      } else if (code === 'USA') {
        alertText.innerHTML = '<strong style="color:#67e8f9;">【自由世界統帥國一體化】</strong>：包含本土 48 州、阿拉斯加與夏威夷（1959 年正式建州），外圍以強光粗線統一框定。';
      } else if (code === 'YUG') {
        alertText.innerHTML = '<strong style="color:#93c5fd;">【不結盟倡導國一體化】</strong>：包含塞爾維亞、克羅埃西亞、斯洛維尼亞、波士尼亞等 7 個解體實體已淡化內部國界，呈現完整統一的南斯拉夫版圖。';
      } else if (faction === 'WEST_CORE') {
        alertText.innerHTML = '<strong style="color:#67e8f9;">【西方陣營核心成員】</strong>：北大西洋公約組織 (NATO) 成員國或美軍條約防禦戰略核心要塞，直面東方陣營鐵幕防線。';
      } else if (faction === 'EAST_CORE') {
        alertText.innerHTML = '<strong style="color:#f472b6;">【東方同盟核心成員】</strong>：華沙公約組織 (Warsaw Pact) 正式成員國或亞洲社會主義戰略盟邦，緊密納入莫斯科聯合作戰指揮體系。';
      } else if (faction === 'WEST_PROXY') {
        alertText.innerHTML = '<strong style="color:#67e8f9;">【西方防務代理人/公約國】</strong>：簽署美洲國家組織里約互助條約或與前宗主國維持軍事協防之戰略後方。';
      } else if (faction === 'EAST_PROXY') {
        alertText.innerHTML = '<strong style="color:#f472b6;">【東方陣營代理人】</strong>：1960 年反殖/社會主義戰略夥伴，接受蘇聯或中共軍經援助與外交掩護。';
      } else {
        alertText.innerHTML = '<strong style="color:#cbd5e1;">【不結盟/中立國家】</strong>：在美蘇兩大冷戰超強陣營間維持外交中立、戰略自主與和平共處。';
      }
    }

    function updateCoordsHud() {
      if (!world) return;
      const pov = world.pointOfView();
      const latStr = (pov.lat >= 0 ? '+' : '') + pov.lat.toFixed(1);
      const lngStr = (pov.lng >= 0 ? '+' : '') + pov.lng.toFixed(1);
      document.getElementById('hud-coords').textContent = `LAT ${latStr}° | LNG ${lngStr}°`;
    }

    // ==========================================
    // 8.5 冷戰核心城市 HTML 標記生成與點擊互動
    // ==========================================
    function createCityMarkerElement(d) {
      const el = document.createElement('div');
      el.className = `city-marker tier-${d.tier} faction-${d.faction}`;
      el.setAttribute('data-id', d.id);

      // 避免相鄰 Tier 1 首都標籤碰撞重疊 (各自分配不同象限)
      const TIER1_POSITIONS = {
        washington: 'pos-br', // 華盛頓置於右下，與右上方的紐約徹底錯開
        new_york: 'pos-tr',   // 紐約置於右上
        london: 'pos-tl',     // 倫敦置於左上
        paris: 'pos-bl',      // 巴黎置於左下
        bonn: 'pos-br',       // 波昂置於右下
        berlin: 'pos-tl',     // 柏林置於左上 (避開右側華沙)
        warsaw: 'pos-tr',     // 華沙置於右上
        kiev: 'pos-br',       // 基輔置於右下
        leningrad: 'pos-tl',  // 列寧格勒置於左上
        moscow: 'pos-tr',     // 莫斯科置於右上
        havana: 'pos-tl',     // 哈瓦那置於左上
        beijing: 'pos-tr'     // 北京置於右上
      };
      if (TIER1_POSITIONS[d.id]) {
        el.classList.add(TIER1_POSITIONS[d.id]);
      }

      // 隱形感應觸控區 (22px，確保 4px 小光點亦能精準點擊與懸停)
      const hitbox = document.createElement('div');
      hitbox.className = 'city-hitbox';
      el.appendChild(hitbox);

      // Tier 1 專屬：十字準星線、微光雷達波紋與右上指示折線
      if (d.tier === 1) {
        const crosshair = document.createElement('div');
        crosshair.className = 'city-crosshair';
        el.appendChild(crosshair);

        const ping = document.createElement('div');
        ping.className = 'city-ping';
        el.appendChild(ping);

        const leader = document.createElement('div');
        leader.className = 'city-leader';
        el.appendChild(leader);
      }

      // 中央發光核心圓點 (具備呼吸燈閃爍動畫)
      const dot = document.createElement('div');
      dot.className = 'city-dot';
      el.appendChild(dot);

      // 右上方城市科技字體名稱標籤
      const label = document.createElement('div');
      label.className = 'city-label';
      label.textContent = d.name;
      el.appendChild(label);

      // 點擊事件：1.5 秒平滑飛行至該經緯度並更新情報
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        playBlip(d.tier === 1 ? 1080 : 880, 0.1, 'triangle', 0.08);

        world.pointOfView({
          lat: d.lat,
          lng: d.lng,
          altitude: d.tier === 1 ? 1.25 : 0.95
        }, 1500);

        updateCityHud(d);
      });

      // Tier 2 懸停提示音
      if (d.tier === 2) {
        el.addEventListener('mouseenter', () => {
          playBlip(1100, 0.03, 'sine', 0.02);
        });
      }

      return el;
    }

    // ==========================================
    // 8.6 地表大國浮水印標章 HTML 元素生成
    // ==========================================
    function createWatermarkElement(d) {
      const el = document.createElement('div');
      const isSuper = (d.code === 'SOV' || d.isSuperpower);
      el.className = `surface-watermark faction-${d.faction} ${isSuper ? 'watermark-superpower-sov' : ''}`;
      el.setAttribute('data-code', d.code);

      // 外圈旋轉 HUD 雷達虛線環
      const ringSvg = `
        <svg class="watermark-hud-ring" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5,6" opacity="0.6"/>
          <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2,5" opacity="0.4"/>
          <line x1="50" y1="2" x2="50" y2="7" stroke="currentColor" stroke-width="1.8" opacity="0.9"/>
          <line x1="50" y1="93" x2="50" y2="98" stroke="currentColor" stroke-width="1.8" opacity="0.9"/>
          <line x1="2" y1="50" x2="7" y2="50" stroke="currentColor" stroke-width="1.8" opacity="0.9"/>
          <line x1="93" y1="50" x2="98" y2="50" stroke="currentColor" stroke-width="1.8" opacity="0.9"/>
        </svg>
      `;

      const emblemSvg = getInsigniaSvg(d.code, d.faction);

      el.innerHTML = `
        <div class="watermark-body">
          ${ringSvg}
          <div class="watermark-emblem">${emblemSvg}</div>
          <div class="watermark-label">${d.name}</div>
        </div>
      `;

      return el;
    }

    function updateCityHud(d) {
      const idleState = document.getElementById('target-idle-state');
      const detailState = document.getElementById('target-detail-state');
      const badgeStatus = document.getElementById('target-badge-status');

      idleState.classList.add('hidden');
      detailState.classList.remove('hidden');

      const isTier1 = (d.tier === 1);
      document.getElementById('target-iso').textContent = `[CITY // T${d.tier}]`;
      document.getElementById('target-name').textContent = d.name;
      
      const latStr = (d.lat >= 0 ? '+' : '') + d.lat.toFixed(2);
      const lngStr = (d.lng >= 0 ? '+' : '') + d.lng.toFixed(2);
      document.getElementById('target-subname').textContent = `${isTier1 ? '全球一級超級大國核心樞紐' : '區域前線要塞 / 次級戰略節點'} (LAT ${latStr}°, LNG ${lngStr}°)`;

      // 渲染 48x48 陣營標章
      const insigniaBox = document.getElementById('target-insignia');
      if (insigniaBox) {
        const facKey = d.faction === 'western' ? 'WEST_CORE' : d.faction === 'eastern' ? 'EAST_CORE' : 'NEUTRAL';
        insigniaBox.className = `hud-insignia-box faction-${facKey}`;
        insigniaBox.innerHTML = getInsigniaSvg('', facKey);
      }

      const factionEl = document.getElementById('target-faction');
      if (d.faction === 'eastern') {
        factionEl.textContent = '東方同盟陣營 (EASTERN)';
        factionEl.style.background = 'rgba(60,8,30,0.8)';
        factionEl.style.borderColor = '#ff0080';
        factionEl.style.color = '#fbcfe8';
        badgeStatus.textContent = isTier1 ? 'EAST COMMAND HUB' : 'WARSAW/EAST OUTPOST';
        badgeStatus.style.background = 'rgba(255,0,128,0.2)';
        badgeStatus.style.borderColor = '#ff0080';
        badgeStatus.style.color = '#f472b6';
      } else if (d.faction === 'western') {
        factionEl.textContent = '西方陣營要衝 (WESTERN)';
        factionEl.style.background = 'rgba(6,28,50,0.8)';
        factionEl.style.borderColor = '#00f0ff';
        factionEl.style.color = '#a5f3fc';
        badgeStatus.textContent = isTier1 ? 'WEST COMMAND HUB' : 'NATO/SEATO/OAS HUB';
        badgeStatus.style.background = 'rgba(0,240,255,0.2)';
        badgeStatus.style.borderColor = '#00f0ff';
        badgeStatus.style.color = '#67e8f9';
      } else {
        factionEl.textContent = '不結盟運動 / 中立據點 (NEUTRAL)';
        factionEl.style.background = 'rgba(30,41,59,0.8)';
        factionEl.style.borderColor = '#64748b';
        factionEl.style.color = '#cbd5e1';
        badgeStatus.textContent = 'NON-ALIGNED NODE';
        badgeStatus.style.background = 'rgba(71,85,105,0.3)';
        badgeStatus.style.borderColor = '#64748b';
        badgeStatus.style.color = '#cbd5e1';
      }

      document.getElementById('target-pact').textContent = (
        d.faction === 'western' ? 'NATO / OAS / 美日韓雙邊防衛體系' :
        d.faction === 'eastern' ? '華沙公約體系 / 社會主義友好條約' :
        '萬隆不結盟獨立倡議'
      );
      document.getElementById('target-command').textContent = isTier1 ? '最高戰略司令部 / 統帥中心' : '戰區前線指揮所 / 戰備基地';

      const alertText = document.getElementById('target-alert-text');
      alertText.innerHTML = `
        <strong style="color:${d.faction === 'western' ? '#67e8f9' : d.faction === 'eastern' ? '#f472b6' : '#cbd5e1'};">
          【${isTier1 ? '一級戰略核心樞紐' : '區域前線要塞'}】
        </strong>
        ${d.name} 已鎖定！鏡頭已平滑移至座標 ${latStr}°, ${lngStr}°。
        ${isTier1 ? '常駐顯示名稱與十字準星，具備極高政治軍事價值。' : '滑鼠靠近時淡入名稱，支援即時戰術特寫。'}
      `;
    }

    // ==========================================
    // 9. 視角切換與旋轉控制
    // ==========================================
    function toggleAutoRotate() {
      isAutoRotating = !isAutoRotating;
      world.controls().autoRotate = isAutoRotating;
      const statusText = document.getElementById('hud-rotation-status');
      const btn = document.getElementById('btn-toggle-rotate');
      if (isAutoRotating) {
        statusText.textContent = 'AUTO-SYNC';
        statusText.style.color = '#67e8f9';
        btn.innerHTML = '<span style="width:8px; height:8px; border-radius:50%; background:#4ade80;"></span><span>自轉: 開啟</span>';
        playBlip(600, 0.05);
      } else {
        statusText.textContent = 'MANUAL';
        statusText.style.color = '#94a3b8';
        btn.innerHTML = '<span style="width:8px; height:8px; border-radius:50%; background:#64748b;"></span><span>自轉: 暫停</span>';
        playBlip(400, 0.05);
      }
    }

    function focusView(theater) {
      playBlip(950, 0.08, 'triangle', 0.06);
      if (theater === 'global') {
        world.pointOfView({ lat: 20, lng: 10, altitude: 2.3 }, 1200);
      } else if (theater === 'usa') {
        world.pointOfView({ lat: 39.5, lng: -98.5, altitude: 1.8 }, 1200);
      } else if (theater === 'ussr') {
        world.pointOfView({ lat: 55, lng: 65, altitude: 1.8 }, 1200);
      } else if (theater === 'yugo') {
        world.pointOfView({ lat: 44.0, lng: 18.5, altitude: 1.4 }, 1200);
      } else if (theater === 'cuba') {
        world.pointOfView({ lat: 22, lng: -80, altitude: 1.5 }, 1200);
      } else if (theater === 'africa') {
        world.pointOfView({ lat: 5, lng: 20, altitude: 1.9 }, 1200);
      } else if (theater === 'americas') {
        world.pointOfView({ lat: -10, lng: -60, altitude: 2.0 }, 1200);
      }
    }

    function dismissLoader() {
      const loader = document.getElementById('loading-screen');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          if (loader.parentNode) loader.remove();
        }, 500);
      }
    }

    // ==========================================
    // 10. 啟動初始化流程 (完全離線 / 零 fetch / 零 CORS 阻擋)
    // ==========================================
    window.addEventListener('DOMContentLoaded', () => {
      const statusText = document.getElementById('loading-status-text');

      try {
        if (statusText) statusText.textContent = '初始化 3D 全息視界引擎...';
        initGlobe();

        if (statusText) statusText.textContent = '載入本機 window.WORLD_GEOJSON 數據...';
        
        // 核心：直接從本地全域變數讀取，完全不發起 fetch，杜絕 file:// CORS 錯誤
        if (!window.WORLD_GEOJSON || !window.WORLD_GEOJSON.features) {
          throw new Error('未在 window.WORLD_GEOJSON 找到地理數據，請確認 ./data/world-data.js 是否存在且載入正常。');
        }

        const rawFeatures = window.WORLD_GEOJSON.features;

        if (statusText) statusText.textContent = '構建美蘇兩大超級大國邊界粗線與 1960 戰略版圖...';
        const finalDataset = processColdWarEntities(rawFeatures);

        // 裝載多邊形實體
        world.polygonsData(finalDataset);

        // 裝載蘇聯外圍粗線、美國外圍粗線與南斯拉夫一體化邊界
        const allBorderPaths = [...ussrExteriorBorderPaths, ...usaExteriorBorderPaths, ...yugoExteriorBorderPaths];
        world.pathsData(allBorderPaths);

        // 裝載冷戰核心城市與首都 (193 座 HTML Markers) 及地表大國浮水印標章
        if (statusText) statusText.textContent = '部署 1960 全球冷戰城市與地表大國國徽浮水印網...';
        const cities = (window.COLD_WAR_CITIES && Array.isArray(window.COLD_WAR_CITIES)) ? window.COLD_WAR_CITIES : [];
        world.htmlElementsData([...cities, ...SURFACE_WATERMARKS]);

        dismissLoader();
        playBlip(1200, 0.15, 'sine', 0.08);
      } catch (err) {
        console.error('[CHRONOS OFFLINE INIT ERROR]', err);
        if (statusText) {
          statusText.innerHTML = `
            <span style="color:#f87171; font-weight:bold;">【離線載入警報】</span><br/>
            <span style="font-size:11px; color:#cbd5e1;">${err.message}</span><br/>
            <button onclick="dismissLoader()" style="margin-top:12px; padding:4px 16px; background:#082f49; color:#67e8f9; border:1px solid #00f0ff; border-radius:4px; cursor:pointer;">關閉提示進入</button>
          `;
        }
      }
    });
