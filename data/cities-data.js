/**
 * PROJECT CHRONOS // 1960 冷戰全息戰略地球儀核心城市數據庫
 * 總計收錄: 193 個冷戰時期關鍵戰略城市與世界首都
 * 包含：超級大國統帥部 (Tier 1)、歐洲鐵幕前線、美蘇戰略空軍與核武基地、亞非拉美代理人樞紐
 *
 * 資料格式:
 * { id: string, name: string, lat: number, lng: number, faction: 'eastern' | 'western' | 'neutral', tier: 1 | 2 }
 */

const COLD_WAR_CITIES = [
  // -------------------------------------------------------------------------
  // 超級大國核心統帥部與全球第一線危機焦點 (Superpower & World Crisis Epicenters)
  // -------------------------------------------------------------------------
  { id: 'washington', name: 'WASHINGTON, D.C.', lat: 38.9072, lng: -77.0369, faction: 'western', tier: 1 },
  { id: 'new_york', name: 'NEW YORK', lat: 40.7128, lng: -74.0060, faction: 'western', tier: 1 },
  { id: 'moscow', name: 'MOSCOW', lat: 55.7558, lng: 37.6173, faction: 'eastern', tier: 1 },
  { id: 'leningrad', name: 'LENINGRAD', lat: 59.9343, lng: 30.3351, faction: 'eastern', tier: 1 },
  { id: 'kiev', name: 'KIEV', lat: 50.4501, lng: 30.5234, faction: 'eastern', tier: 1 },
  { id: 'berlin', name: 'BERLIN', lat: 52.5200, lng: 13.4050, faction: 'eastern', tier: 1 },
  { id: 'london', name: 'LONDON', lat: 51.5074, lng: -0.1278, faction: 'western', tier: 1 },
  { id: 'paris', name: 'PARIS', lat: 48.8566, lng: 2.3522, faction: 'western', tier: 1 },
  { id: 'bonn', name: 'BONN', lat: 50.7374, lng: 7.0982, faction: 'western', tier: 1 },
  { id: 'warsaw', name: 'WARSAW', lat: 52.2297, lng: 21.0122, faction: 'eastern', tier: 1 },
  { id: 'beijing', name: 'BEIJING', lat: 39.9042, lng: 116.4074, faction: 'eastern', tier: 1 },
  { id: 'havana', name: 'HAVANA', lat: 23.1136, lng: -82.3666, faction: 'eastern', tier: 1 },

  // -------------------------------------------------------------------------
  // 北美防衛體系與軍事航太戰略中樞 (North America: USA & Canada)
  // -------------------------------------------------------------------------
  { id: 'san_francisco', name: 'SAN FRANCISCO', lat: 37.7749, lng: -122.4194, faction: 'western', tier: 2 },
  { id: 'los_angeles', name: 'LOS ANGELES', lat: 34.0522, lng: -118.2437, faction: 'western', tier: 2 },
  { id: 'chicago', name: 'CHICAGO', lat: 41.8781, lng: -87.6298, faction: 'western', tier: 2 },
  { id: 'omaha', name: 'OMAHA (SAC HQ)', lat: 41.2565, lng: -95.9345, faction: 'western', tier: 2 },
  { id: 'colorado_springs', name: 'COLORADO SPRINGS (NORAD)', lat: 38.8339, lng: -104.8214, faction: 'western', tier: 2 },
  { id: 'norfolk', name: 'NORFOLK', lat: 36.8508, lng: -76.2859, faction: 'western', tier: 2 },
  { id: 'san_diego', name: 'SAN DIEGO', lat: 32.7157, lng: -117.1611, faction: 'western', tier: 2 },
  { id: 'seattle', name: 'SEATTLE', lat: 47.6062, lng: -122.3321, faction: 'western', tier: 2 },
  { id: 'honolulu', name: 'HONOLULU (CINCPAC)', lat: 21.3069, lng: -157.8583, faction: 'western', tier: 2 },
  { id: 'anchorage', name: 'ANCHORAGE', lat: 61.2181, lng: -149.9003, faction: 'western', tier: 2 },
  { id: 'houston', name: 'HOUSTON (NASA)', lat: 29.7604, lng: -95.3698, faction: 'western', tier: 2 },
  { id: 'miami', name: 'MIAMI', lat: 25.7617, lng: -80.1918, faction: 'western', tier: 2 },
  { id: 'ottawa', name: 'OTTAWA', lat: 45.4215, lng: -75.6972, faction: 'western', tier: 2 },
  { id: 'montreal', name: 'MONTREAL', lat: 45.5017, lng: -73.5673, faction: 'western', tier: 2 },
  { id: 'halifax', name: 'HALIFAX', lat: 44.6488, lng: -63.5752, faction: 'western', tier: 2 },
  { id: 'thule', name: 'THULE AIR BASE', lat: 76.5312, lng: -68.7032, faction: 'western', tier: 2 },

  // -------------------------------------------------------------------------
  // 蘇聯加盟共和國首府、閉鎖軍工城與核要塞 (USSR & Warsaw Pact)
  // -------------------------------------------------------------------------
  { id: 'minsk', name: 'MINSK', lat: 53.9006, lng: 27.5590, faction: 'eastern', tier: 2 },
  { id: 'stalingrad', name: 'STALINGRAD (VOLGOGRAD)', lat: 48.7080, lng: 44.5133, faction: 'eastern', tier: 2 },
  { id: 'vladivostok', name: 'VLADIVOSTOK', lat: 43.1155, lng: 131.8855, faction: 'eastern', tier: 2 },
  { id: 'murmansk', name: 'MURMANSK', lat: 68.9585, lng: 33.0827, faction: 'eastern', tier: 2 },
  { id: 'sevastopol', name: 'SEVASTOPOL', lat: 44.6166, lng: 33.5254, faction: 'eastern', tier: 2 },
  { id: 'sverdlovsk', name: 'SVERDLOVSK', lat: 56.8389, lng: 60.6057, faction: 'eastern', tier: 2 },
  { id: 'novosibirsk', name: 'NOVOSIBIRSK', lat: 55.0084, lng: 82.9357, faction: 'eastern', tier: 2 },
  { id: 'tashkent', name: 'TASHKENT', lat: 41.2995, lng: 69.2401, faction: 'eastern', tier: 2 },
  { id: 'baku', name: 'BAKU', lat: 40.4093, lng: 49.8671, faction: 'eastern', tier: 2 },
  { id: 'tbilisi', name: 'TBILISI', lat: 41.7151, lng: 44.8271, faction: 'eastern', tier: 2 },
  { id: 'yerevan', name: 'YEREVAN', lat: 40.1792, lng: 44.4991, faction: 'eastern', tier: 2 },
  { id: 'alma_ata', name: 'ALMA-ATA', lat: 43.2220, lng: 76.8512, faction: 'eastern', tier: 2 },
  { id: 'semipalatinsk', name: 'SEMIPALATINSK', lat: 50.4111, lng: 80.2275, faction: 'eastern', tier: 2 },
  { id: 'baikonur', name: 'BAIKONUR (TYURATAM)', lat: 45.6167, lng: 63.3167, faction: 'eastern', tier: 2 },
  { id: 'gorky', name: 'GORKY', lat: 56.3269, lng: 44.0059, faction: 'eastern', tier: 2 },
  { id: 'kuibyshev', name: 'KUIBYSHEV', lat: 53.1959, lng: 50.1002, faction: 'eastern', tier: 2 },
  { id: 'chelyabinsk', name: 'CHELYABINSK', lat: 55.1644, lng: 61.4368, faction: 'eastern', tier: 2 },
  { id: 'riga', name: 'RIGA', lat: 56.9496, lng: 24.1052, faction: 'eastern', tier: 2 },
  { id: 'tallinn', name: 'TALLINN', lat: 59.4370, lng: 24.7535, faction: 'eastern', tier: 2 },
  { id: 'vilnius', name: 'VILNIUS', lat: 54.6872, lng: 25.2797, faction: 'eastern', tier: 2 },
  { id: 'kishinev', name: 'KISHINEV', lat: 47.0105, lng: 28.8638, faction: 'eastern', tier: 2 },
  { id: 'petropavlovsk', name: 'PETROPAVLOVSK-KAMCHATSKY', lat: 53.0167, lng: 158.6500, faction: 'eastern', tier: 2 },
  { id: 'prague', name: 'PRAGUE', lat: 50.0755, lng: 14.4378, faction: 'eastern', tier: 2 },
  { id: 'budapest', name: 'BUDAPEST', lat: 47.4979, lng: 19.0402, faction: 'eastern', tier: 2 },
  { id: 'bucharest', name: 'BUCHAREST', lat: 44.4268, lng: 26.1025, faction: 'eastern', tier: 2 },
  { id: 'sofia', name: 'SOFIA', lat: 42.6977, lng: 23.3219, faction: 'eastern', tier: 2 },
  { id: 'tirana', name: 'TIRANA', lat: 41.3275, lng: 19.8187, faction: 'eastern', tier: 2 },

  // -------------------------------------------------------------------------
  // 歐洲 NATO 盟邦、美軍歐陸前沿與永久中立緩衝國 (Western & Neutral Europe)
  // -------------------------------------------------------------------------
  { id: 'brussels', name: 'BRUSSELS (NATO HQ)', lat: 50.8503, lng: 4.3517, faction: 'western', tier: 2 },
  { id: 'frankfurt', name: 'FRANKFURT (V CORPS)', lat: 50.1109, lng: 8.6821, faction: 'western', tier: 2 },
  { id: 'munich', name: 'MUNICH (RFE)', lat: 48.1351, lng: 11.5820, faction: 'western', tier: 2 },
  { id: 'rome', name: 'ROME', lat: 41.9028, lng: 12.4964, faction: 'western', tier: 2 },
  { id: 'naples', name: 'NAPLES (AFSOUTH)', lat: 40.8518, lng: 14.2681, faction: 'western', tier: 2 },
  { id: 'amsterdam', name: 'AMSTERDAM', lat: 52.3676, lng: 4.9041, faction: 'western', tier: 2 },
  { id: 'the_hague', name: 'THE HAGUE', lat: 52.0705, lng: 4.3007, faction: 'western', tier: 2 },
  { id: 'luxembourg', name: 'LUXEMBOURG', lat: 49.6116, lng: 6.1319, faction: 'western', tier: 2 },
  { id: 'copenhagen', name: 'COPENHAGEN', lat: 55.6761, lng: 12.5683, faction: 'western', tier: 2 },
  { id: 'oslo', name: 'OSLO', lat: 59.9139, lng: 10.7522, faction: 'western', tier: 2 },
  { id: 'reykjavik', name: 'REYKJAVIK (KEFLAVIK)', lat: 64.1466, lng: -21.9426, faction: 'western', tier: 2 },
  { id: 'lisbon', name: 'LISBON', lat: 38.7223, lng: -9.1393, faction: 'western', tier: 2 },
  { id: 'madrid', name: 'MADRID', lat: 40.4168, lng: -3.7038, faction: 'western', tier: 2 },
  { id: 'athens', name: 'ATHENS', lat: 37.9838, lng: 23.7275, faction: 'western', tier: 2 },
  { id: 'ankara', name: 'ANKARA', lat: 39.9334, lng: 32.8597, faction: 'western', tier: 2 },
  { id: 'istanbul', name: 'ISTANBUL', lat: 41.0082, lng: 28.9784, faction: 'western', tier: 2 },
  { id: 'belgrade', name: 'BELGRADE', lat: 44.7866, lng: 20.4489, faction: 'neutral', tier: 2 },
  { id: 'vienna', name: 'VIENNA', lat: 48.2082, lng: 16.3738, faction: 'neutral', tier: 2 },
  { id: 'geneva', name: 'GENEVA', lat: 46.2044, lng: 6.1432, faction: 'neutral', tier: 2 },
  { id: 'bern', name: 'BERN', lat: 46.9480, lng: 7.4474, faction: 'neutral', tier: 2 },
  { id: 'stockholm', name: 'STOCKHOLM', lat: 59.3293, lng: 18.0686, faction: 'neutral', tier: 2 },
  { id: 'helsinki', name: 'HELSINKI', lat: 60.1699, lng: 24.9384, faction: 'neutral', tier: 2 },
  { id: 'dublin', name: 'DUBLIN', lat: 53.3498, lng: -6.2603, faction: 'neutral', tier: 2 },
  { id: 'nicosia', name: 'NICOSIA', lat: 35.1856, lng: 33.3823, faction: 'neutral', tier: 2 },

  // -------------------------------------------------------------------------
  // 東亞、東南亞與第一島鏈前線 (East Asia & Southeast Asia)
  // -------------------------------------------------------------------------
  { id: 'tokyo', name: 'TOKYO', lat: 35.6762, lng: 139.6503, faction: 'western', tier: 2 },
  { id: 'seoul', name: 'SEOUL', lat: 37.5665, lng: 126.9780, faction: 'western', tier: 2 },
  { id: 'pyongyang', name: 'PYONGYANG', lat: 39.0392, lng: 125.7625, faction: 'eastern', tier: 2 },
  { id: 'taipei', name: 'TAIPEI', lat: 25.0330, lng: 121.5654, faction: 'western', tier: 2 },
  { id: 'hanoi', name: 'HANOI', lat: 21.0285, lng: 105.8542, faction: 'eastern', tier: 2 },
  { id: 'saigon', name: 'SAIGON', lat: 10.8231, lng: 106.6297, faction: 'western', tier: 2 },
  { id: 'hong_kong', name: 'HONG KONG', lat: 22.3193, lng: 114.1694, faction: 'western', tier: 2 },
  { id: 'okinawa', name: 'OKINAWA (KADENA)', lat: 26.2124, lng: 127.6809, faction: 'western', tier: 2 },
  { id: 'manila', name: 'MANILA', lat: 14.5995, lng: 120.9842, faction: 'western', tier: 2 },
  { id: 'bangkok', name: 'BANGKOK (SEATO HQ)', lat: 13.7563, lng: 100.5018, faction: 'western', tier: 2 },
  { id: 'vientiane', name: 'VIENTIANE', lat: 17.9757, lng: 102.6331, faction: 'neutral', tier: 2 },
  { id: 'phnom_penh', name: 'PHNOM PENH', lat: 11.5564, lng: 104.9282, faction: 'neutral', tier: 2 },
  { id: 'jakarta', name: 'JAKARTA', lat: -6.2088, lng: 106.8456, faction: 'neutral', tier: 2 },
  { id: 'kuala_lumpur', name: 'KUALA LUMPUR', lat: 3.1390, lng: 101.6869, faction: 'western', tier: 2 },
  { id: 'singapore', name: 'SINGAPORE', lat: 1.3521, lng: 103.8198, faction: 'western', tier: 2 },
  { id: 'rangoon', name: 'RANGOON', lat: 16.8661, lng: 96.1951, faction: 'neutral', tier: 2 },
  { id: 'ulaanbaatar', name: 'ULAANBAATAR', lat: 47.8864, lng: 106.9057, faction: 'eastern', tier: 2 },
  { id: 'shanghai', name: 'SHANGHAI', lat: 31.2304, lng: 121.4737, faction: 'eastern', tier: 2 },
  { id: 'guangzhou', name: 'GUANGZHOU', lat: 23.1291, lng: 113.2644, faction: 'eastern', tier: 2 },
  { id: 'wuhan', name: 'WUHAN', lat: 30.5928, lng: 114.3055, faction: 'eastern', tier: 2 },
  { id: 'shenyang', name: 'SHENYANG', lat: 41.8057, lng: 123.4315, faction: 'eastern', tier: 2 },
  { id: 'lop_nur', name: 'LOP NUR (MALAN BASE)', lat: 41.7333, lng: 88.7500, faction: 'eastern', tier: 2 },

  // -------------------------------------------------------------------------
  // 南亞與中亞弧環地帶 (South Asia & Indian Ocean)
  // -------------------------------------------------------------------------
  { id: 'new_delhi', name: 'NEW DELHI', lat: 28.6139, lng: 77.2090, faction: 'neutral', tier: 2 },
  { id: 'bombay', name: 'BOMBAY (MUMBAI)', lat: 19.0760, lng: 72.8777, faction: 'neutral', tier: 2 },
  { id: 'karachi', name: 'KARACHI', lat: 24.8607, lng: 67.0011, faction: 'western', tier: 2 },
  { id: 'islamabad', name: 'ISLAMABAD', lat: 33.6844, lng: 73.0479, faction: 'western', tier: 2 },
  { id: 'peshawar', name: 'PESHAWAR (BADABER)', lat: 34.0151, lng: 71.5249, faction: 'western', tier: 2 },
  { id: 'dhaka', name: 'DHAKA', lat: 23.8103, lng: 90.4125, faction: 'neutral', tier: 2 },
  { id: 'kabul', name: 'KABUL', lat: 34.5553, lng: 69.2075, faction: 'neutral', tier: 2 },
  { id: 'colombo', name: 'COLOMBO', lat: 6.9271, lng: 79.8612, faction: 'neutral', tier: 2 },
  { id: 'kathmandu', name: 'KATHMANDU', lat: 27.7172, lng: 85.3240, faction: 'neutral', tier: 2 },

  // -------------------------------------------------------------------------
  // 中東石油中樞、以阿衝突地帶與地緣結盟 (Middle East & Levant)
  // -------------------------------------------------------------------------
  { id: 'jerusalem', name: 'JERUSALEM', lat: 31.7683, lng: 35.2137, faction: 'western', tier: 2 },
  { id: 'tel_aviv', name: 'TEL AVIV', lat: 32.0853, lng: 34.7818, faction: 'western', tier: 2 },
  { id: 'cairo', name: 'CAIRO', lat: 30.0444, lng: 31.2357, faction: 'eastern', tier: 2 },
  { id: 'riyadh', name: 'RIYADH', lat: 24.7136, lng: 46.6753, faction: 'western', tier: 2 },
  { id: 'tehran', name: 'TEHRAN', lat: 35.6892, lng: 51.3890, faction: 'western', tier: 2 },
  { id: 'baghdad', name: 'BAGHDAD', lat: 33.3152, lng: 44.3661, faction: 'eastern', tier: 2 },
  { id: 'damascus', name: 'DAMASCUS', lat: 33.5138, lng: 36.2765, faction: 'eastern', tier: 2 },
  { id: 'beirut', name: 'BEIRUT', lat: 33.8938, lng: 35.5018, faction: 'western', tier: 2 },
  { id: 'amman', name: 'AMMAN', lat: 31.9454, lng: 35.9284, faction: 'western', tier: 2 },
  { id: 'kuwait_city', name: 'KUWAIT CITY', lat: 29.3759, lng: 47.9774, faction: 'western', tier: 2 },
  { id: 'aden', name: 'ADEN', lat: 12.7855, lng: 45.0187, faction: 'eastern', tier: 2 },
  { id: 'sanaa', name: 'SANA\'A', lat: 15.3694, lng: 44.1910, faction: 'neutral', tier: 2 },
  { id: 'muscat', name: 'MUSCAT', lat: 23.5880, lng: 58.3829, faction: 'western', tier: 2 },
  { id: 'doha', name: 'DOHA', lat: 25.2854, lng: 51.5310, faction: 'western', tier: 2 },
  { id: 'abu_dhabi', name: 'ABU DHABI', lat: 24.4539, lng: 54.3773, faction: 'western', tier: 2 },

  // -------------------------------------------------------------------------
  // 非洲去殖民化浪潮與冷戰代理人前沿 (Africa & Non-Aligned Frontiers)
  // -------------------------------------------------------------------------
  { id: 'algiers', name: 'ALGIERS', lat: 36.7538, lng: 3.0588, faction: 'eastern', tier: 2 },
  { id: 'luanda', name: 'LUANDA', lat: -8.8390, lng: 13.2894, faction: 'eastern', tier: 2 },
  { id: 'pretoria', name: 'PRETORIA', lat: -25.7479, lng: 28.2293, faction: 'western', tier: 2 },
  { id: 'johannesburg', name: 'JOHANNESBURG', lat: -26.2041, lng: 28.0473, faction: 'western', tier: 2 },
  { id: 'cape_town', name: 'CAPE TOWN', lat: -33.9249, lng: 18.4241, faction: 'western', tier: 2 },
  { id: 'kinshasa', name: 'KINSHASA (LEOPOLDVILLE)', lat: -4.4419, lng: 15.2663, faction: 'western', tier: 2 },
  { id: 'brazzaville', name: 'BRAZZAVILLE', lat: -4.2634, lng: 15.2429, faction: 'eastern', tier: 2 },
  { id: 'salisbury', name: 'SALISBURY (HARARE)', lat: -17.8252, lng: 31.0335, faction: 'western', tier: 2 },
  { id: 'addis_ababa', name: 'ADDIS ABABA', lat: 9.0300, lng: 38.7400, faction: 'eastern', tier: 2 },
  { id: 'mogadishu', name: 'MOGADISHU', lat: 2.0469, lng: 45.3182, faction: 'eastern', tier: 2 },
  { id: 'nairobi', name: 'NAIROBI', lat: -1.2921, lng: 36.8219, faction: 'western', tier: 2 },
  { id: 'lagos', name: 'LAGOS', lat: 6.5244, lng: 3.3792, faction: 'western', tier: 2 },
  { id: 'accra', name: 'ACCRA', lat: 5.6037, lng: -0.1870, faction: 'eastern', tier: 2 },
  { id: 'conakry', name: 'CONAKRY', lat: 9.6412, lng: -13.5784, faction: 'eastern', tier: 2 },
  { id: 'bamako', name: 'BAMAKO', lat: 12.6392, lng: -8.0029, faction: 'eastern', tier: 2 },
  { id: 'dakar', name: 'DAKAR', lat: 14.7167, lng: -17.4677, faction: 'western', tier: 2 },
  { id: 'abidjan', name: 'ABIDJAN', lat: 5.3600, lng: -4.0083, faction: 'western', tier: 2 },
  { id: 'tripoli', name: 'TRIPOLI', lat: 32.8872, lng: 13.1913, faction: 'eastern', tier: 2 },
  { id: 'benghazi', name: 'BENGHAZI', lat: 32.1167, lng: 20.0667, faction: 'eastern', tier: 2 },
  { id: 'rabat', name: 'RABAT', lat: 34.0209, lng: -6.8416, faction: 'western', tier: 2 },
  { id: 'casablanca', name: 'CASABLANCA', lat: 33.5731, lng: -7.5898, faction: 'western', tier: 2 },
  { id: 'tunis', name: 'TUNIS', lat: 36.8065, lng: 10.1815, faction: 'western', tier: 2 },
  { id: 'khartoum', name: 'KHARTOUM', lat: 15.5007, lng: 32.5599, faction: 'neutral', tier: 2 },
  { id: 'maputo', name: 'MAPUTO (LOURENCO MARQUES)', lat: -25.9692, lng: 32.5732, faction: 'eastern', tier: 2 },
  { id: 'windhoek', name: 'WINDHOEK', lat: -22.5609, lng: 17.0658, faction: 'western', tier: 2 },
  { id: 'libreville', name: 'LIBREVILLE', lat: 0.4162, lng: 9.4673, faction: 'western', tier: 2 },
  { id: 'yaounde', name: 'YAOUNDE', lat: 3.8480, lng: 11.5021, faction: 'western', tier: 2 },
  { id: 'ndjamena', name: 'N\'DJAMENA (FORT-LAMY)', lat: 12.1348, lng: 15.0557, faction: 'western', tier: 2 },
  { id: 'dar_es_salaam', name: 'DAR ES SALAAM', lat: -6.7924, lng: 39.2083, faction: 'neutral', tier: 2 },
  { id: 'lusaka', name: 'LUSAKA', lat: -15.3875, lng: 28.3228, faction: 'neutral', tier: 2 },
  { id: 'kampala', name: 'KAMPALA', lat: 0.3476, lng: 32.5825, faction: 'neutral', tier: 2 },
  { id: 'antananarivo', name: 'ANTANANARIVO', lat: -18.8792, lng: 47.5079, faction: 'eastern', tier: 2 },

  // -------------------------------------------------------------------------
  // 拉丁美洲、加勒比海與 OAS 美洲防務條約 (Latin America & OAS)
  // -------------------------------------------------------------------------
  { id: 'buenos_aires', name: 'BUENOS AIRES', lat: -34.6037, lng: -58.3816, faction: 'western', tier: 2 },
  { id: 'santiago', name: 'SANTIAGO', lat: -33.4489, lng: -70.6693, faction: 'western', tier: 2 },
  { id: 'rio_de_janeiro', name: 'RIO DE JANEIRO', lat: -22.9068, lng: -43.1729, faction: 'western', tier: 2 },
  { id: 'brasilia', name: 'BRASILIA', lat: -15.7975, lng: -47.8919, faction: 'western', tier: 2 },
  { id: 'sao_paulo', name: 'SAO PAULO', lat: -23.5505, lng: -46.6333, faction: 'western', tier: 2 },
  { id: 'bogota', name: 'BOGOTA', lat: 4.7110, lng: -74.0721, faction: 'western', tier: 2 },
  { id: 'caracas', name: 'CARACAS', lat: 10.4806, lng: -66.9036, faction: 'western', tier: 2 },
  { id: 'lima', name: 'LIMA', lat: -12.0464, lng: -77.0428, faction: 'western', tier: 2 },
  { id: 'mexico_city', name: 'MEXICO CITY', lat: 19.4326, lng: -99.1332, faction: 'western', tier: 2 },
  { id: 'panama_city', name: 'PANAMA CITY', lat: 8.9824, lng: -79.5199, faction: 'western', tier: 2 },
  { id: 'guatemala_city', name: 'GUATEMALA CITY', lat: 14.6349, lng: -90.5069, faction: 'western', tier: 2 },
  { id: 'san_salvador', name: 'SAN SALVADOR', lat: 13.6929, lng: -89.2182, faction: 'western', tier: 2 },
  { id: 'managua', name: 'MANAGUA', lat: 12.1150, lng: -86.2362, faction: 'eastern', tier: 2 },
  { id: 'tegucigalpa', name: 'TEGUCIGALPA', lat: 14.0723, lng: -87.1921, faction: 'western', tier: 2 },
  { id: 'san_jose', name: 'SAN JOSE', lat: 9.9281, lng: -84.0907, faction: 'western', tier: 2 },
  { id: 'santo_domingo', name: 'SANTO DOMINGO', lat: 18.4861, lng: -69.9312, faction: 'western', tier: 2 },
  { id: 'port_au_prince', name: 'PORT-AU-PRINCE', lat: 18.5944, lng: -72.3074, faction: 'western', tier: 2 },
  { id: 'kingston', name: 'KINGSTON', lat: 18.0179, lng: -76.8099, faction: 'neutral', tier: 2 },
  { id: 'montevideo', name: 'MONTEVIDEO', lat: -34.9011, lng: -56.1645, faction: 'western', tier: 2 },
  { id: 'asuncion', name: 'ASUNCION', lat: -25.2637, lng: -57.5759, faction: 'western', tier: 2 },
  { id: 'la_paz', name: 'LA PAZ', lat: -16.4897, lng: -68.1193, faction: 'western', tier: 2 },
  { id: 'quito', name: 'QUITO', lat: -0.1807, lng: -78.4678, faction: 'western', tier: 2 },
  { id: 'georgetown', name: 'GEORGETOWN', lat: 6.8013, lng: -58.1551, faction: 'neutral', tier: 2 },
  { id: 'paramaribo', name: 'PARAMARIBO', lat: 5.8520, lng: -55.2038, faction: 'neutral', tier: 2 },
  { id: 'guantanamo', name: 'GUANTANAMO BAY', lat: 19.9078, lng: -75.1479, faction: 'western', tier: 2 },
  { id: 'st_georges', name: 'ST. GEORGE\'S', lat: 12.0561, lng: -61.7488, faction: 'eastern', tier: 2 },

  // -------------------------------------------------------------------------
  // 大洋洲與南太平洋核試防衛圈 (Oceania & Pacific Front)
  // -------------------------------------------------------------------------
  { id: 'canberra', name: 'CANBERRA', lat: -35.2809, lng: 149.1300, faction: 'western', tier: 2 },
  { id: 'sydney', name: 'SYDNEY', lat: -33.8688, lng: 151.2093, faction: 'western', tier: 2 },
  { id: 'melbourne', name: 'MELBOURNE', lat: -37.8136, lng: 144.9631, faction: 'western', tier: 2 },
  { id: 'pine_gap', name: 'PINE GAP (ALICE SPRINGS)', lat: -23.7990, lng: 133.7370, faction: 'western', tier: 2 },
  { id: 'wellington', name: 'WELLINGTON', lat: -41.2865, lng: 174.7762, faction: 'western', tier: 2 },
  { id: 'auckland', name: 'AUCKLAND', lat: -36.8485, lng: 174.7633, faction: 'western', tier: 2 },
  { id: 'port_moresby', name: 'PORT MORESBY', lat: -9.4438, lng: 147.1803, faction: 'western', tier: 2 },
  { id: 'suva', name: 'SUVA', lat: -18.1416, lng: 178.4419, faction: 'western', tier: 2 },
  { id: 'kwajalein', name: 'KWAJALEIN ATOLL', lat: 8.7167, lng: 167.7333, faction: 'western', tier: 2 },
  { id: 'mururoa', name: 'MURUROA ATOLL', lat: -21.8333, lng: -138.9167, faction: 'western', tier: 2 },

];

// 支援純本地離線 (file://) 與模組化載入環境
if (typeof window !== 'undefined') {
  window.COLD_WAR_CITIES = COLD_WAR_CITIES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COLD_WAR_CITIES;
}
