# Step 1: Check if Ruby is installed
if (-not (Get-Command ruby -ErrorAction SilentlyContinue)) {
  Write-Host "Ruby is not installed! Please install it before running this script."
}

# Step 2: Install Jekyll
if (-not (Get-Command jekyll -ErrorAction SilentlyContinue)) {
  Write-Host "Installing Jekyll (this might take a while)..."
  Write-Host "(If the script hangs, try pressing Enter)"
  gem install jekyll
} else {
  Write-Host "Jekyll is already installed, skipping"
}

# Step 3: Get input
$theme_name = Read-Host "Theme name"
if ([string]::IsNullOrWhiteSpace($theme_name)) {
  Write-Host "A theme name must be provided!"
  Write-Host "Please run this script again and provide a theme name."
  exit
}
$theme_description = Read-Host "Theme description"
if ([string]::IsNullOrWhiteSpace($theme_description)) {
  Write-Host "A theme description must be provided!"
  Write-Host "Please run this script again and provide a theme description."
  exit
}
$author = Read-Host "GitHub username"
if ([string]::IsNullOrWhiteSpace($author)) {
  Write-Host "A username must be provided!"
  Write-Host "Please run this script again and provide your GitHub username."
  exit
}

# Step 4: Create theme
cd $theme_name
& jekyll new --skip-bundle --force .
rm 404.html
rm Gemfile
$gemfile_content = @"
source "https://rubygems.org"
gemspec
"@
Set-Content -Path "Gemfile" -Value $gemfile_content
rm _config.yml
$config_yml_content = @"
title: $theme_name
description: $theme_description
encoding: utf-8

exclude: ["README.md", "LICENSE", "*.gem", "*.gemspec", "Gemfile.lock"]
"@
Set-Content -Path "_config.yml" -Value $config_yml_content
rm -Path _posts -Recurse
rm about.markdown
rm index.markdown
$index_content = @"
---
---

# $theme_name
"@
Set-Content -Path "index.md" -Value $index_content
$gemspec_content = @"
Gem::Specification.new do |spec|
  spec.name = "$theme_name"
  spec.version = "0.0.0"
  spec.authors = ["$author"]

  spec.summary = "$theme_description"

  spec.add_runtime_dependency "jekyll", ">= 3.10.0"
end
"@
Set-Content -Path "$theme_name.gemspec" -Value $gemspec_content

# All done
Write-Host "Finished!"
Write-Host "You can now return to the Tonic site."