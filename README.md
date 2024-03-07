# Welcome to the Cloverpop Api Example

## Introduction

The Cloverpop Api Example allows you to make requests to the Cloverpop server and create decisions.

The Cloverpop Api is built on:
- Ruby 3.1.2
- Rails 7.1.3
- postgresql 10.0 or higher

---

## Table of Contents
- [Setup](#setup)
- [Methods](#methods)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Security](#security)
- [New Development Machine Install (Mac)](#new-development-machine-install-mac)
- [Start Rails server](#start-rails-server)
- [GIT and Changing Code](#git)
- [License](#license)

---

## Setup
Before using the `PagesController`, make sure you have the following environment variables set:
- `CLOVERPOP_DOMAIN`: The base URL of the Cloverpop API.
- `CLOVERPOP_ORG_API_TOKEN`: Your organization's API token for authentication. 
- `API_DECISIONS_PATH`: external security path.

## Methods

### `init_data`
- **Description**: Initiates data depend on Org retrieval from the Cloverpop API.
- **HTTP Method**: GET
- **Endpoint**: `{CLOVERPOP_DOMAIN}/api/v1/{API_DECISIONS_PATH}/decisions`

### `create_decision`
- **Description**: Creates a new decision via the Cloverpop API.
- **HTTP Method**: POST
- **Endpoint**: `{CLOVERPOP_DOMAIN}/api/v1/{API_DECISIONS_PATH}/decisions`
- **Parameters**:
    - `decision`: The decision to be created, passed as a parameter.

## Usage
To utilize the methods provided by the `PagesController`, follow these steps:
1. Ensure the required environment variables are correctly set in your application environment.
2. Use the methods `init_data` and `create_decision` as needed within your application logic.

## Error Handling
If an error occurs during an API request, the controller will log the error and return an appropriate JSON response with an error message.

## Security
Ensure that sensitive information such as API tokens (`CLOVERPOP_ORG_API_TOKEN`) is handled securely and not exposed publicly.

---

## New Development Machine Install (Mac)

*NOTE:* After installing something new, if something doesn't work like you expect, try quitting and restarting terminal.

1. Install the latest version of XCode from the App store, run `$ xcode-select --install`
2. Install the latest version of Homebrew: http://brew.sh
3. Install Git on Mac using homebrew: `$ brew install git`
4. Set your GIT username from terminal: `$ git config --global user.name "YOUR NAME"`
5. Set your GIT email address from terminal: `$ git config --global user.email "YOUR EMAIL ADDRESS"`
6. Generate and add SSH keys your Github account by following the instructions at https://help.github.com/articles/generating-ssh-keys/
7. Install GPG using homebrew: `$ brew install gpg` (May be needed for RVM in next step)
8. Install the latest version of RVM: https://rvm.io, but instead of `gpg2` Use `gpg` in the command that adds the GPG keys.  If this doesn't work check out the [security](http://rvm.io/rvm/security) page for a workaround.
9. Install Ruby from terminal using RVM: `$ rvm install 3.1.2`
10. Install posgtresql from terminal: `$ brew install postgresql` and follow on screen instructions (very important)
11. Create postgresql superuser postgres: `$ createuser postgres -s`
12. Change your directory to where you want your work projects in terminal and clone the git repo: `$ git@github.com:wahanegi/vibereport.git`
13. Go into the directory `$ cd vibereport`. Confirm that when you run `$ rvm gemset list` it lists "vibereport" as your gemset.
14. Run `$ gem install bundler`
15. Run `$ gem update --system`
16. Run bundler: `$ bundle`
17. Install Yarn `$ brew install yarn`
18. Install Webpack dependencies `yarn install`
19. Create a new database: `$ rails db:create`
20. Install the new Heroku CLI: `$ brew tap heroku/brew && brew install heroku`.
21. Log into your Heroku account: `$ heroku login`
22. Should be ready to roll: `$ rake assets:precompile` to start the Rails server use: `$ ./bin/dev`
23. In Rubymine it's necessary to enable appropriate version of Javascript to make sure correct syntax highlighting.
    `Rubymine` -> `Preferences` -> `Languages & Frameworks` -> `Javascript`: Then set `Javascript language version` to "ECMA Script 6"

## Start Rails server

To start a Rails server with React, you need to  use the command every time you start the server:

`rake assets:precompile`

To start the Rails server use: `./bin/dev`

otherwise you won't be able to see your updated CSS and JavaScript

NOTE: `rails s` - is not used

## GIT

### Beginner's Guide to Changing Code

Every time you are ready to start work, do the following terminal commands in the vibereport directory:

    $ git smart-pull
    $ bundle
    $ rails db:migrate
Then if your server isn't started yet:

[Start Rails server](#start-rails-server)


At this point you can point your browser to http://localhost:3001/ and start development work.
To stop the server click `CNTL-C` in all three tabs.

To check to make sure your code changes didn't break anything critical:

    $ rspec

Green dots are good, red F's are bad. Note that sometimes other people may have broken the build, so use your best judgement if the automated test errors were caused by your code or not (for example if you undo changes and re-run the test).

To push your code changes to the repo:

        $ git add .
        $ git commit -m "CI-XXX: Message describing what changes you made"
        $ git push origin branch_name

Note: replace XXX with the Jira story ID (very important).

Switching between master and a private branch:

        $ git checkout branch_name
        $ git checkout master

### Cherry Picking
If you need to copy over a commit from one branch to another without merging:

1. Copy the SHA of the commit you want to copy over (the program "tig" is good for this which can be installed via brew on a Mac).
2. Go to the branch you want to copy the commit to ($ git checkout [BRANCHNAME])
3. Use cherry-pick to copy over the commit:

        $ git cherry-pick [SHA]

NOTE: If you have more than one commit to copy over, do the cherry-pick commands in the same order as they were commited.
Also be careful about doing this if there is a high possibility of there being a conflict.
See https://ariejan.net/2010/06/10/cherry-picking-specific-commits-from-another-branch/

## License

The MIT License (MIT)

Copyright (c) 2024 Clearbox Decisions Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

