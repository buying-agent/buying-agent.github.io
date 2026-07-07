$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Input = Join-Path $Root "INPUT_HERE"
$Output = Join-Path $Root "review_images"

if (!(Test-Path -LiteralPath $Input)) { New-Item -ItemType Directory -Path $Input | Out-Null }
if (Test-Path -LiteralPath $Output) { Remove-Item -LiteralPath $Output -Recurse -Force }
New-Item -ItemType Directory -Path $Output | Out-Null

$SourceFolders = @()
$AllDirs = @(Get-Item -LiteralPath $Input) + @(Get-ChildItem -LiteralPath $Input -Directory -Recurse -ErrorAction SilentlyContinue)
foreach ($Dir in $AllDirs) {
    $Jpgs = @(Get-ChildItem -LiteralPath $Dir.FullName -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -match '^\.(jpg|jpeg)$' })
    if ($Jpgs.Count -gt 0) {
        $SourceFolders += [PSCustomObject]@{ Path = $Dir.FullName; Files = $Jpgs }
    }
}

if ($SourceFolders.Count -eq 0) {
    Write-Host "NO JPG/JPEG FOUND"
    Write-Host "Put the saved *_files folder inside INPUT_HERE, then run again."
    Start-Process explorer.exe $Input
    exit 1
}

$FolderNo = 1
foreach ($Group in $SourceFolders) {
    $DestName = "folder{0:D2}" -f $FolderNo
    $DestDir = Join-Path $Output $DestName
    New-Item -ItemType Directory -Path $DestDir | Out-Null

    $Files = $Group.Files | Sort-Object Name
    $ImageNo = 1
    foreach ($File in $Files) {
        $DestFile = Join-Path $DestDir ("image{0:D2}.jpg" -f $ImageNo)
        Copy-Item -LiteralPath $File.FullName -Destination $DestFile -Force
        $ImageNo++
    }
    Write-Host ("OK folder{0:D2}: {1} jpg files" -f $FolderNo, $Files.Count)
    $FolderNo++
}
Write-Host "DONE: review_images created."
Start-Process explorer.exe $Output
