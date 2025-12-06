param(
  [Parameter(Mandatory=$true)]
  [string] $GitHubUsername,

  [Parameter(Mandatory=$true)]
  [string] $RepoName,

  [switch] $Private
)

# Quick script to create GitHub repo with gh CLI and push current repo
# Usage: .\push-to-github.ps1 -GitHubUsername yourname -RepoName truestate-sales-management -Private

function Write-Info($m){ Write-Host $m -ForegroundColor Cyan }
function Write-Warn($m){ Write-Host $m -ForegroundColor Yellow }
function Write-Err($m){ Write-Host $m -ForegroundColor Red }

# Ensure we're in repo root
$root = (Get-Location).Path
Write-Info "Running from: $root"

# Check for git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Err "git not found. Please install Git: https://git-scm.com/downloads"
  exit 1
}

# Check for gh
$hasGh = $true
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  $hasGh = $false
  Write-Warn "GitHub CLI (gh) not found. This script works best with gh installed.
Install gh: https://cli.github.com/"
}

# Initialize git repo if needed
if (-not (Test-Path .git)) {
  Write-Info "Initializing git repository..."
  git init
}

# Ensure .gitignore exists
if (-not (Test-Path .gitignore)) {
  @"
node_modules/
dist/
build/
.env
.vscode/
.DS_Store
"@ | Out-File -Encoding utf8 .gitignore
  git add .gitignore
}

# commit
git add -A
if (-not (git rev-parse --verify HEAD 2>$null)) {
  git commit -m "Initial commit - TruEstate SDE intern assignment scaffold"
} else {
  # If there is already a commit, amend or create a new commit
  git commit -m "Update project" -a 2>$null
}

if ($hasGh) {
  Write-Info "Using GitHub CLI to create repository on GitHub and push..."
  $visibility = $Private.IsPresent ? "--private" : "--public"
  # Create remote repo and push source
  gh repo create "$GitHubUsername/$RepoName" $visibility --source . --remote origin --push --confirm
  if ($LASTEXITCODE -eq 0) {
    Write-Info "Repository created and pushed: https://github.com/$GitHubUsername/$RepoName"
    exit 0
  } else {
    Write-Err "gh command failed. You might need to run 'gh auth login' first or check your credentials."
    exit 1
  }
} else {
  Write-Warn "Falling back to manual remote setup (requires a GitHub repo to already exist)."
  Write-Info "Please either:"
  Write-Info "  1) Install GitHub CLI and run this script again, OR"
  Write-Info "  2) Create an empty repo on GitHub (do NOT initialize with README), then run the following commands replacing placeholders:"
  Write-Host "`n# Example commands to run (replace placeholders)" -ForegroundColor Green
  Write-Host "git remote add origin https://github.com/$GitHubUsername/$RepoName.git" -ForegroundColor Green
  Write-Host "git branch -M main" -ForegroundColor Green
  Write-Host "git push -u origin main" -ForegroundColor Green
  Write-Info "If you push over HTTPS you will be prompted for GitHub username and a PAT (personal access token)."
  exit 0
}
