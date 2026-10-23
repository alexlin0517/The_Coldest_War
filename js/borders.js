/* ====================================================
   SUPERPOWER BORDER OUTLINES & DISSOLUTION ALGORITHMS
   U.S.S.R., U.S.A., and Yugoslavia Topologies
   ==================================================== */

// ==========================================
    // 6. 蘇聯、美國與南斯拉夫國界強化與路徑提取演算法
    // ==========================================
    let ussrExteriorBorderPaths = [];
    let usaExteriorBorderPaths = [];
    let yugoExteriorBorderPaths = [];

    function processColdWarEntities(allFeatures) {
      const sovietFeatures = [];
      const yugoFeatures = [];
      const usaFeatures = [];
      const standardFeatures = [];

      allFeatures.forEach(feat => {
        const rawCode = getCountryCode(feat);
        if (rawCode === 'ATA') return; // 排除南極條約區

        if (SOVIET_CODES.has(rawCode)) {
          feat.properties.ADM0_A3 = 'SOV';
          feat.properties.ISO_A3 = 'SOV';
          feat.properties.NAME = '蘇維埃社會主義共和國聯盟 (U.S.S.R.)';
          feat.properties.isUSSR = true;
          sovietFeatures.push(feat);
        } else if (YUGO_CODES.has(rawCode)) {
          feat.properties.ADM0_A3 = 'YUG';
          feat.properties.ISO_A3 = 'YUG';
          feat.properties.NAME = '南斯拉夫社會主義聯邦共和國 (S.F.R. Yugoslavia)';
          feat.properties.isYugoslavia = true;
          yugoFeatures.push(feat);
        } else if (rawCode === 'USA') {
          usaFeatures.push(feat);
          standardFeatures.push(feat);
        } else {
          standardFeatures.push(feat);
        }
      });

      // 提取蘇聯對外完整輪廓線（過濾掉 15 國所有內部交界，由 pathsData 粗線層繪製）
      ussrExteriorBorderPaths = extractExteriorPaths(sovietFeatures, 'SOV');
      // 提取美國對外完整國界線（本土、阿拉斯加、夏威夷，由 pathsData 粗線層繪製）
      usaExteriorBorderPaths = extractExteriorPaths(usaFeatures, 'USA');
      // 提取南斯拉夫對外完整輪廓線（過濾掉 7 個解體實體內部交界，不特意粗線強化，維持正常國界粗細）
      yugoExteriorBorderPaths = extractExteriorPaths(yugoFeatures, 'YUG');

      return [...sovietFeatures, ...yugoFeatures, ...standardFeatures];
    }

    function extractExteriorPaths(countryFeatures, entityType) {
      const segmentCount = new Map();
      const segmentList = [];

      function ptKey(pt) {
        return (Math.round(pt[0] * 100) / 100) + ',' + (Math.round(pt[1] * 100) / 100);
      }

      countryFeatures.forEach(feat => {
        if (!feat.geometry) return;
        const geom = feat.geometry;
        const polygons = (geom.type === 'Polygon') ? [geom.coordinates] : (geom.type === 'MultiPolygon') ? geom.coordinates : [];

        polygons.forEach(rings => {
          rings.forEach(ring => {
            for (let i = 0; i < ring.length - 1; i++) {
              const p1 = ring[i];
              const p2 = ring[i + 1];
              const k1 = ptKey(p1);
              const k2 = ptKey(p2);
              if (k1 === k2) continue;
              const edgeKey = k1 < k2 ? (k1 + '|' + k2) : (k2 + '|' + k1);

              const count = (segmentCount.get(edgeKey) || 0) + 1;
              segmentCount.set(edgeKey, count);
              segmentList.push({ p1, p2, edgeKey });
            }
          });
        });
      });

      const exteriorSegments = segmentList.filter(s => segmentCount.get(s.edgeKey) === 1);

      const paths = [];
      const visited = new Set();
      const nodeMap = new Map();

      exteriorSegments.forEach((seg, idx) => {
        const k1 = ptKey(seg.p1);
        const k2 = ptKey(seg.p2);
        if (!nodeMap.has(k1)) nodeMap.set(k1, []);
        if (!nodeMap.has(k2)) nodeMap.set(k2, []);
        nodeMap.get(k1).push({ to: k2, pt: seg.p2, idx });
        nodeMap.get(k2).push({ to: k1, pt: seg.p1, idx });
      });

      exteriorSegments.forEach((seg, startIdx) => {
        if (visited.has(startIdx)) return;

        const pathPoints = [seg.p1, seg.p2];
        visited.add(startIdx);

        let currKey = ptKey(seg.p2);
        let maxSteps = 4000;

        while (maxSteps-- > 0) {
          const neighbors = nodeMap.get(currKey) || [];
          const nextEdge = neighbors.find(n => !visited.has(n.idx));
          if (!nextEdge) break;

          visited.add(nextEdge.idx);
          pathPoints.push(nextEdge.pt);
          currKey = nextEdge.to;
        }

        if (pathPoints.length >= 2) {
          paths.push({ points: pathPoints, type: entityType });
        }
      });

      return paths;
    }
