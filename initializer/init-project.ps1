$OutputEncoding = [System.Text.Encoding]::UTF8

# Configurations
$configFile  = "init-config.json"
$logFile     = "replace.log"
$projectRoot = (Resolve-Path "$PSScriptRoot\..").Path

# Icons
$ICON_START           = "🚀"
$ICON_FILE            = "🔍"
$ICON_REPLACE         = "🔄"
$ICON_NO_MATCH        = "❌"
$ICON_REPLACE_SUCCESS = "✅"
$ICON_RENAME          = "📁"
$ICON_RENAME_SUCCESS  = "📂"
$ICON_CLEAN           = "🧹"

# Delete node_modules and package-lock.json
$nodeModulesPath = Join-Path $projectRoot "node_modules"
$packageLockPath = Join-Path $projectRoot "package-lock.json"

if (Test-Path $nodeModulesPath) {
    Remove-Item $nodeModulesPath -Recurse -Force
    Write-Host "$ICON_CLEAN Removed node_modules" -ForegroundColor Magenta
}

if (Test-Path $packageLockPath) {
    Remove-Item $packageLockPath -Force
    Write-Host "$ICON_CLEAN Removed package-lock.json" -ForegroundColor Magenta
}

# Load config
$config         = Get-Content -Raw $configFile | ConvertFrom-Json
$replacements   = $config.contentReplacement
$renamePatterns = $config.filenameReplacement
$ignoreDirs     = $config.ignoreDirs
$ignoreFiles    = $config.ignoreFiles

# Start
$startTime = Get-Date
Write-Host "$ICON_START Starting file replacements..." -ForegroundColor Green

# Process all files recursively
Get-ChildItem -Path $projectRoot -Recurse -File | ForEach-Object {
  $filePath = $_.FullName
  $fileDir  = $_.DirectoryName
  $fileName = $_.Name
  $relPath  = $filePath.Replace($projectRoot, '').TrimStart('\', '/')

  # Exclusions
  $skipFile = $false
  foreach ($ignoredDir in $ignoreDirs) {
    if ($fileDir -like "*\$ignoredDir*") {
      $skipFile = $true
      break
    }
  }
  if ($ignoreFiles -contains $fileName) {
    $skipFile = $true
  }
  if ($skipFile) {
    return
  }

  Write-Host "$ICON_FILE Processing file: $relPath" -ForegroundColor Blue

  # ----------------------
  # Replace in content
  # ----------------------
  $originalContent = Get-Content -Path $filePath -Raw
  $modifiedContent = $originalContent
  $fileModified = $false

  foreach ($replace in $replacements) {
    $old = [regex]::Escape($replace.old)
    $new = $replace.new
    $updatedContent = $modifiedContent -creplace $old, $new

    if ($modifiedContent -ne $updatedContent) {
      $fileModified = $true
      Write-Host "    $ICON_REPLACE '$($replace.old)' → '$new'" -ForegroundColor Yellow
      Write-Host "    $ICON_REPLACE_SUCCESS Content updated" -ForegroundColor Green
      Add-Content -Path $logFile -Value "$ICON_REPLACE_SUCCESS Replaced '$($replace.old)' with '$new' in $relPath"
      $modifiedContent = $updatedContent
    }
    else {
      Write-Host "    $ICON_NO_MATCH No match for '$($replace.old)'" -ForegroundColor DarkYellow
    }
    Write-Host "    -------------------------------------------------------------" -ForegroundColor Cyan
  }

  if ($fileModified) {
    Set-Content -Path $filePath -Value $modifiedContent
  }

  # ----------------------
  # Rename file if needed
  # ----------------------
  $newFileName = $fileName
  foreach ($pattern in $renamePatterns) {
    if ($newFileName -like "*$($pattern.old)*") {
      $newFileName = $newFileName -replace [regex]::Escape($pattern.old), $pattern.new
    }
  }

  if ($fileName -ne $newFileName) {
    $newPath = Join-Path $fileDir $newFileName
    Move-Item -Path $filePath -Destination $newPath
    Write-Host "    $ICON_RENAME '$fileName' → '$newFileName'" -ForegroundColor Magenta
    Write-Host "    $ICON_RENAME_SUCCESS File renamed" -ForegroundColor Green
    Add-Content -Path $logFile -Value "$ICON_RENAME_SUCCESS Renamed '$fileName' to '$newFileName' in $relPath"
  }
}
