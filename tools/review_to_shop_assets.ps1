$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Review = Join-Path $Root "review_images"
$Assets = Join-Path $Root "assets"
$Uploads = Join-Path $Root "uploads"

if (!(Test-Path -LiteralPath $Review)) {
    New-Item -ItemType Directory -Path $Review | Out-Null
    Write-Host "review_images missing. Created it."
    Start-Process explorer.exe $Review
    exit 1
}

foreach ($Out in @($Assets, $Uploads)) {
    if (Test-Path -LiteralPath $Out) { Remove-Item -LiteralPath $Out -Recurse -Force }
    New-Item -ItemType Directory -Path $Out | Out-Null
}

$ProductFolders = @(Get-ChildItem -LiteralPath $Review -Directory -ErrorAction SilentlyContinue | Sort-Object Name)
if ($ProductFolders.Count -eq 0) {
    Write-Host "NO PRODUCT FOLDERS FOUND IN review_images"
    Start-Process explorer.exe $Review
    exit 1
}

$totalProducts = 0
$totalImages = 0
foreach ($folder in $ProductFolders) {
    $imgs = @(Get-ChildItem -LiteralPath $folder.FullName -File -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match '^\.(jpg|jpeg)$' } | Sort-Object DirectoryName, Name)
    if ($imgs.Count -eq 0) { continue }

    foreach ($BaseOut in @($Assets, $Uploads)) {
        $outFolder = Join-Path $BaseOut $folder.Name
        New-Item -ItemType Directory -Path $outFolder | Out-Null
        $i = 0
        foreach ($img in $imgs) {
            if ($i -eq 0) { $targetName = "main.jpg" } else { $targetName = "detail{0:D2}.jpg" -f $i }
            Copy-Item -LiteralPath $img.FullName -Destination (Join-Path $outFolder $targetName) -Force
            $i++
        }
    }
    $totalProducts++
    $totalImages += $imgs.Count
    Write-Host ("OK: {0} -> main/detail, {1} images" -f $folder.Name, $imgs.Count)
}
Write-Host ("DONE: Products {0}, Images {1}" -f $totalProducts, $totalImages)
Write-Host "Shop uses: assets/productFolder/main.jpg"
Write-Host "Extra copy also made in: uploads"
Start-Process explorer.exe $Assets
