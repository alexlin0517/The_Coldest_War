/* ====================================================
   1960 COLD WAR FACTION DEFINITIONS & CLASSIFICATION
   ==================================================== */

// ==========================================
    // 1. 1960 冷戰陣營名單定義
    // ==========================================

    const SOVIET_CODES = new Set([
      'RUS', 'UKR', 'BLR', 'KAZ', 'UZB', 'TKM', 'KGZ', 
      'TJK', 'GEO', 'ARM', 'AZE', 'MDA', 'LTU', 'LVA', 'EST'
    ]);

    const YUGO_CODES = new Set([
      'SRB', 'HRV', 'BIH', 'SVN', 'MKD', 'MNE', 'KOS'
    ]);

    const EAST_CORE_CODES = new Set([
      'SOV', 'POL', 'CZE', 'SVK', 'CSK', 'HUN', 'ROU', 'ROM', 'BGR', 'ALB', 
      'CHN', 'PRK', 'MNG', 'VNM', 'LAO', 'DDR'
    ]);

    const EAST_PROXY_CODES = new Set([
      'CUB', 'EGY', 'SYR', 'IRQ', 'YEM', 'GIN', 'MLI', 'GHA', 'COD', 
      'ZAI', 'DZA', 'SOM'
    ]);

    const WEST_CORE_CODES = new Set([
      'USA', 'GBR', 'FRA', 'DEU', 'CAN', 'ITA', 'BEL', 'NLD', 'LUX', 
      'DNK', 'NOR', 'ISL', 'PRT', 'GRC', 'TUR', 'AUS', 'NZL', 'JPN', 
      'KOR', 'TWN', 'PHL', 'THA', 'PAK', 'IRN', 'GRL'
    ]);

    const WEST_PROXY_CODES = new Set([
      // 拉美美洲國家組織 OAS (里約互助條約) 與加勒比海地區
      'BRA', 'ARG', 'CHL', 'COL', 'VEN', 'MEX', 'PER', 'BOL', 'ECU', 
      'PRY', 'URY', 'GTM', 'HND', 'SLV', 'NIC', 'CRI', 'PAN', 'DOM', 
      'HTI', 'GUY', 'SUR', 'BHS', 'BLZ', 'JAM', 'TTO', 'PRI', 'FLK',
      // 歐洲與地中海親西要塞
      'ESP',
      // 中東親西盟邦與波斯灣防務條約區
      'SAU', 'JOR', 'ISR', 'KWT', 'ARE', 'QAT', 'OMN',
      // 非洲親西獨立國家、法非共同體與英屬/葡屬防務領地
      'ZAF', 'LBR', 'ETH', 'ERI', 'NGA', 'CIV', 'SEN', 'GAB', 'MDG', 
      'TCD', 'CAF', 'NER', 'CMR', 'COG', 'MRT', 'BEN', 'BFA', 'TGO', 
      'LBY', 'MAR', 'TUN', 'AGO', 'MOZ', 'GNB', 'KEN', 'UGA', 'TZA', 
      'ZMB', 'ZWE', 'MWI', 'BWA', 'LSO', 'SWZ', 'SLE', 'GMB', 'RWA', 
      'BDI', 'NAM', 'DJI', 'GNQ', 'SAH',
      // 亞洲/大洋洲西方防務條約盟邦與屬地
      'MYS', 'BRN', 'PNG', 'NCL', 'FJI', 'SLB'
    ]);

// ==========================================
    // 2. 輔助函式：國碼識別與 1960 陣營分層
    // ==========================================

    function getCountryCode(feature) {
      if (!feature) return '';
      const p = feature.properties || {};
      if (p.isUSSR || p.ADM0_A3 === 'SOV' || p.ISO_A3 === 'SOV') return 'SOV';
      if (p.isYugoslavia || p.ADM0_A3 === 'YUG' || p.ISO_A3 === 'YUG') return 'YUG';
      let code = p.ADM0_A3 || p.ISO_A3 || feature.id || '';
      
      if (code === '-99' || !code) {
        code = p.ISO_A3_EH || p.GU_A3 || '';
      }
      if (code === '-99' || !code) {
        const name = p.NAME || p.ADMIN || '';
        if (name === 'France') return 'FRA';
        if (name === 'Norway') return 'NOR';
        if (name === 'Kosovo') return 'KOS';
      }
      return String(code).toUpperCase().trim();
    }

    function getFaction(code) {
      if (code === 'SOV' || EAST_CORE_CODES.has(code)) return 'EAST_CORE';
      if (EAST_PROXY_CODES.has(code)) return 'EAST_PROXY';
      if (WEST_CORE_CODES.has(code)) return 'WEST_CORE';
      if (WEST_PROXY_CODES.has(code)) return 'WEST_PROXY';
      return 'NEUTRAL';
    }

// ==========================================
    // 5. 陣營色彩設定 (含代理人淺色階)
    // ==========================================
    const COLOR_SCHEME = {
      // 東方核心 (亮霓虹粉)
      EAST_CORE: {
        fill: 'rgba(255, 0, 128, 0.32)',
        border: '#ff0080',
        hoverFill: 'rgba(255, 0, 128, 0.70)',
        side: 'rgba(255, 0, 128, 0.25)',
        hoverBorder: '#ffffff',
        title: '東方同盟核心 (EAST CORE)'
      },
      // 東方代理人/社會主義友好 (淺霓虹粉，非灰色)
      EAST_PROXY: {
        fill: 'rgba(255, 60, 150, 0.18)',
        border: 'rgba(255, 80, 160, 0.65)',
        hoverFill: 'rgba(255, 80, 160, 0.58)',
        side: 'rgba(255, 60, 150, 0.12)',
        hoverBorder: '#fda4af',
        title: '東方代理人 / 友好同盟 (EAST PROXY)'
      },
      // 西方核心 (亮青色)
      WEST_CORE: {
        fill: 'rgba(0, 240, 255, 0.30)',
        border: '#00f0ff',
        hoverFill: 'rgba(0, 240, 255, 0.68)',
        side: 'rgba(0, 240, 255, 0.20)',
        hoverBorder: '#ffffff',
        title: '西方陣營核心 (WEST CORE)'
      },
      // 西方代理人/美洲條約國/非洲盟邦 (淺天藍，非灰色)
      WEST_PROXY: {
        fill: 'rgba(0, 190, 255, 0.15)',
        border: 'rgba(0, 210, 255, 0.58)',
        hoverFill: 'rgba(0, 210, 255, 0.52)',
        side: 'rgba(0, 190, 255, 0.12)',
        hoverBorder: '#7dd3fc',
        title: '西方代理人 / 美洲防務條約 (WEST PROXY)'
      },
      // 真正不結盟/中立國 (暗灰藍)
      NEUTRAL: {
        fill: 'rgba(25, 40, 60, 0.20)',
        border: 'rgba(80, 120, 160, 0.28)',
        hoverFill: 'rgba(70, 110, 160, 0.50)',
        side: 'rgba(25, 40, 60, 0.10)',
        hoverBorder: '#93c5fd',
        title: '不結盟運動 / 獨立中立 (NEUTRAL)'
      }
    };
