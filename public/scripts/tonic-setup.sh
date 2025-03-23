#!/bin/bash

# set -o errexit -o nounset -o pipefail
# VERBOSE=${VERBOSE:-false}
# trap 'error "An unexpected error occurred."' ERR

set -e

check_command_pre() {
  if ! command -v $1 &> /dev/null ; then
    echo "$1 is not installed! Please install it before running this script."
    exit 1
  fi
}

check_command_post() {
  if ! command -v $1 &> /dev/null ; then
    echo "$1 was not properly installed!"
    echo "If you think it should have been, open an issue at hackclub/tonic"
    exit 1
  fi
}

install_ruby() {
  echo "Installing Ruby..."
  brew install chruby ruby-install
  ruby-install ruby 3.3.7
  check_command_post "ruby"
}

update_rc() {
  echo "Updating your configuration file..."
  if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
    echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
    echo "chruby ruby-3.3.7" >> ~/.zshrc
    source ~/.zshrc
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.bashrc
    echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.bashrc
    echo "chruby ruby-3.3.7" >> ~/.bashrc
    source ~/.bashrc
  fi
}

install_jekyll() {
  echo "Installing Jekyll (this might take a while)..."
  gem install jekyll
  check_command_post "jekyll"
}

create_theme() {
  read -p "Theme name: " theme_name
  if [ -z "$theme_name" ] ; then
    echo "A theme name must be provided!"
    echo "Please run this script again and provide a theme name."
    exit 1
  fi
  read -p "Theme description: " theme_description
   if [ -z "$theme_description" ] ; then
    echo "A theme description must be provided!"
    echo "Please run this script again and provide a theme description."
    exit 1
  fi
  echo "Creating theme..."
  cd "$theme_name"
  jekyll new --skip-bundle --force .
  rm 404.html
  rm Gemfile
  echo 'source "https://rubygems.org"' >> Gemfile
  echo "gemspec" >> Gemfile
  rm _config.yml
  echo "title: $theme_name" >> _config.yml
  echo "description: $theme_description" >> _config.yml
  echo "encoding: utf-8" >> _config.yml
  echo >> _config.yml
  echo 'exclude: ["README.md", "LICENSE", "*.gem", "*.gemspec", "Gemfile.lock"]' >> _config.yml
  rm -rf _posts
  rm about.markdown
  rm index.markdown
}

main() {
  check_command_pre "brew"

  if command -v ruby &> /dev/null ; then
    echo "Ruby is already installed, skipping"
  else 
    install_ruby
    update_rc
  fi

  if command -v jekyll &> /dev/null ; then
    echo "Jekyll is already installed, skipping"
  else
    install_jekyll
  fi

  create_theme

  echo "Finished!"
  echo "You can now return to the Tonic site."
}

main "$@"