$ErrorActionPreference = "Stop"
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (!$baseDir) { $baseDir = Get-Location }

# 1. Create directories
$jsDir = Join-Path $baseDir "js"
$dataDir = Join-Path $baseDir "data"
if (!(Test-Path $jsDir)) { New-Item -ItemType Directory -Path $jsDir | Out-Null }
if (!(Test-Path $dataDir)) { New-Item -ItemType Directory -Path $dataDir | Out-Null }

# 2. Download Globe.gl standalone bundle (includes Three.js)
$globeOut = Join-Path $jsDir "globe.gl.min.js"
$globeUrl = "https://unpkg.com/globe.gl/dist/globe.gl.min.js"
Write-Host ">>> [1/2] Downloading Globe.gl to ./js/globe.gl.min.js ..." -ForegroundColor Cyan
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $globeUrl -OutFile $globeOut

# 3. Download GeoJSON and wrap as window.WORLD_GEOJSON for local file:// usage
$dataFile = Join-Path $dataDir "world-data.js"
$geoUrl = "https://cdn.jsdelivr.net/gh/vasturiano/globe.gl/example/datasets/ne_110m_admin_0_countries.geojson"
Write-Host ">>> [2/2] Downloading GeoJSON and packaging to ./data/world-data.js ..." -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri $geoUrl
$geoJsonText = $response.Content
$wrappedJs = "window.WORLD_GEOJSON = " + $geoJsonText + ";"
[System.IO.File]::WriteAllText($dataFile, $wrappedJs, [System.Text.Encoding]::UTF8)

Write-Host ">>> SUCCESS: Offline files downloaded to ./js/globe.gl.min.js and ./data/world-data.js" -ForegroundColor Green
