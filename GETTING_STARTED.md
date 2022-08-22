# Getting Started

This guide will help you get started with your web application.

> _HighTechU Students:_ Please remember that we are available to help at every step of the process if you need it!

> _Mentors:_ Please ensure that you have correctly set up the repository and deployment before your team starts development: [`MENTORS_INFO.md`](MENTORS_INFO.md)

## Table of Contents


1. [🔨 Install development tools](#1)

2. [🚀 Setup project in a development environment](#2)

3. [⚙️ Development environment configuration](#3)

4. [🌎 Deployment to Heroku](#4)

5. [💡 Local deployment](#5)

<h2 id="1">🔨 Development Tools</h2>

Your development environment must have Git, Node.js, and npm installed. To download Git, visit "[Git](https://git-scm.com)". Node.js installations come with npm. To download these, visit "[Node.js, and npm](https://nodejs.org/en/)".

You will need a text editor. Any text editor is fine, but we will be using VS Code. For more information about VS Code, visit [Visual Studio](https://code.visualstudio.com).

Lastly, you will need access to a terminal or command prompt. VS Code provides an integrated terminal for development. For more information about the Integrated Terminal, visit [Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

_Note:_ If you are using an online text editor / integrated development environment (Codespaces, Repl.it) you will most likely not need to download Git, Node.js, or npm.

> Optional: You may want to install the Heroku CLI to manually deploy the project with Heroku. For more information, visit [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

<h2 id="2">🚀 Setup the Project in A Development Environment</h2>

You will need a GitHub account and read/write access to the repository.

_Note:_ HighTechU Students working in a team will have read/write access to your team's project repository.

_Note:_ You will also need admin access on the repository in order to set up automatic Heroku deployments.

> For HighTechU students, your Team Mentor will be the admin on your repository and handle the deployment to Heroku.

Notes:

* You may want to fork the repository first if you do not have read/write access to the repository. For more information, visit "[Fork a repo](https://docs.github.com/en/github/getting-started-with-github/quickstart/fork-a-repo)".
* You may want to create a new repository using the HighTechU repository as a template. For more information, visit "[About Repository Templates](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template#about-repository-templates)".

### Step 1: Open the terminal or command prompt and navigate to your development directory.

```bash
  # Example: Navigate to Your-Development-Folder
  # "cd" means Change Directory
  cd your-development-folder
```

> _Note:_ We recommend working from a development folder, `development` or from the `desktop`

### Step 2: Clone the project locally. For more information, visit "[Cloning a repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository#cloning-a-repository)".

```bash
  # URL: Check which repository you are trying to clone. It may not be the one in the example below.
  git clone https://github.com/hightechu/techccelerator-2022.git
```

### Step 3: Navigate to the project directory.

```bash
  # Project Directory: Check the name of your repository. It may not be the one in the example below.
  cd techccelerator-2022
```

### Step 4: Switch to a new branch from `main`.

_Note:_ It is important that developers do not work directly in the `main` branch. The `main` branch should remain stable.

```bash
  # Replace <branch_name> with the name of your new branch.
  # Example: git checkout -b really-awesome-feature
  git checkout -b branch_name
```

> We recommend calling your branch `your-name`

### Step 5: Install the npm dependencies.

```bash
  npm install
```

### Step 6: Open the project in your preferred code editor.

```bash
  # Example: Open VS Code
  code .
```

<h2 id="3">⚙️ Setup Configuration</h2>

After cloning the repository, we should set up a local copy of the database to be able to test on before pushing to main. Create a file in the root folder called `.env` and add the following into it:

```
DATABASE_URL=postgresql://$(whoami)
```

Running `npm start` for the first time will create a new table with a username column and a password column.

<h2 id="4">🌎 Deployment to Heroku</h2>

The Techccelerator 2022 web app project comes with an automatic deploy to Heroku button.

> For HighTechU students, this will already be set up by your Team Mentor. You can skip this section.

- [ ] Set a Heroku Account. For more information, visit "[Heroku](https://www.heroku.com)".
- [ ] Click on the **Deploy to Heroku** button and follow the prompts:

  [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

- [ ] Enable Automatic Deployments. For more information, visit "[Automatic deploys](https://devcenter.heroku.com/articles/github-integration#automatic-deploys)".

> _Note:_ Your app will be re-deployed when the `main` branch of your repository is updated. Always test your changes locally before merging your working branch into `main`

<h2 id="5">💡 Local Deployment</h2>

This is the information on how to set up your local environment and run the project locally.

### Test your app

What function should they check out to make sure it all works?

### Template functions

The Techccelerator 2022 web app template comes with the following functions implemented:

- Register user
- Login

The following functions are written and ready for you to implement:

- Read database
- Write to database

> All pre-written functions are commented in the code

### Problems?

Do not worry if your application doesn't respond. Ask for help, and we can troubleshoot together to solve the problem.

## 🌟 Conclusion

You can now start developing. If you have any questions, feel free to ask. We want you to succeed!
