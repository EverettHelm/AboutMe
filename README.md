# Everett Site

Basic personal website scaffold using the Hydejack theme from the local `../hydejack` repository.

## What is included

- Home page
- About page
- Contact page
- One starter blog post

## Run locally (Windows)

1. Install Ruby with RubyInstaller: <https://rubyinstaller.org/>
2. In a new terminal, run:

```powershell
gem install bundler
cd c:\Users\evere\DevRepos\EverettHelmPersonal\everett-site
bundle install
bundle exec jekyll serve
```

3. Open <http://127.0.0.1:4000>

## Edit your content

- Home: `index.md`
- About: `about.md`
- Contact: `contact.md`
- Blog posts: `_posts/*.md`
- Site settings: `_config.yml`

## Git repository

This folder is already initialized as a Git repository.

To create a remote GitHub repository and push:

```powershell
cd c:\Users\evere\DevRepos\EverettHelmPersonal\everett-site
git add .
git commit -m "Initial personal site with Hydejack"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
