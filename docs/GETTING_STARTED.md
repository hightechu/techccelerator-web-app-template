# Getting Started

This guide will help you get started with your web application.

> _HighTechU Students:_ Please remember that we are available to help at every step of the process if you need it!

> _Mentors:_ Please ensure that you have correctly set up the repository and deployment before your team starts development: [`MENTORS_INFO.md`](MENTORS_INFO.md)

## Table of Contents


1. [🔨 Install development tools](#1)

2. [🚀 Setup project in a development environment](#2)

3. [⚙️ Development environment configuration](#3)

4. [🌎 Deployment to Fly](#4)

5. [💡 Local deployment](#5)

<h2 id="1">🔨 Development Tools</h2>

Your development environment must have Git, Node.js, npm, and Flyctl (for deployment) installed. To download Git, visit [Git](https://git-scm.com). Node.js installations come with npm. To download these, visit [Node.js, and npm](https://nodejs.org/en/). To download Flyctl, visit [Fly.io](https://fly.io/docs/flyctl/).

You will need a text editor. Any text editor is fine, but we will be using VS Code. For more information about VS Code, visit [Visual Studio](https://code.visualstudio.com).

Lastly, you will need access to a terminal or command prompt. VS Code provides an integrated terminal for development. For more information about the Integrated Terminal, visit [Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal).

_Note:_ If you are using an online text editor / integrated development environment (Codespaces, Repl.it) you will most likely not need to download Git, Node.js, or npm.

<h2 id="2">🚀 Setup the Project in A Development Environment</h2>

You will need a GitHub account and read/write access to the repository.

_Note:_ HighTechU Students working in a team will have read/write access to your team's project repository.

> You will also need admin status to configure deployment using Fly. HighTechU students working in a team should nominate one person to be in charge of this.

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

We will also need to modify 1 line of code in `index.js`. During local development, please comment out line 13:

```
// ssl: { rejectUnauthorized: false }
```

Before pushing your changes, please uncomment line 13:

```
ssl: { rejectUnauthorized: false }
```

> This line is essential for deployment, but cannot be present during local development.

Running `npm start` for the first time will create a new table with a username column and a password column.

If you're having trouble getting the local project to run, try the following in the `.env` file instead:

```
DATABASE_URL=postgresql://username:pswrd@localhost
```

> _Fun fact:_ You can replace `pswrd` with any arbitrary word you like!

Replace `username` with your device's username. If you're not sure, check this by opening up Postgres. Mine is `kiarahosie`:

![Postgres server list](pgex.png)

If you don't see this already, you'll need to create a new server by clicking the + on the bottom left corner:

![Postgres server creation](pgcr.png)

> Ensure the port is 5432

<h2 id="4">🌎 Deployment to Fly</h2>

The Techccelerator web app project is set up with a Dockerfile to make it easy to deploy with Fly. It only needs a little bit of setup.

> For HighTechU teams, only one team member (the admin) needs to do this.

### Step 1: Configure Fly

Ensure that you have flyctl installed. If this is your first time using Fly, please sign up:

```
fly auth signup
``` 

> We recommend signing up with your Github account

### Step 2: Launch your app

```
fly launch
```

The CLI will guide you through the configuration:

```
An existing fly.toml file was found for app test-template
? Would you like to copy its configuration to the new app?
? Choose an app name:
? Would you like to set up a Postgresql database now?
? Scale single node pg to zero after one hour?
? Would you like to set up an Upstash Redis database now?
? Would you like to deploy now?
```

In order, the answers you should enter are are:

```
y
APP-NAME-HERE
y
N
N
y
```

It may also ask for your organization and which region you want to be in. Go ahead and press `ENTER` for both of these to use the defaults.

Once the app is finished deploying (this can take up to 5 minutes), open your app:

```
fly open 
```

> _Note:_ You may see an error about running virtual machines. Don't worry about this; your app will still be up and running.

> _Note:_ On a free account, you will only be able to run one app using our template.

### Step 3: Configure automatic deployment

The template is already set up for continuous deployment via Github actions, so all you need to do is configure the secrets.

> Essentially, the secret tells Fly to watch this specific repository for changes so that it can automatically redeploy when there is a change.

First, generate a Fly token and copy the token that it returns:

```
flyctl auth token
```

On the settings page of your Github repository, navigate to **secrets and variables -> actions** and click on **New repository secret.** Create a new secret called `FLY_API_TOKEN` with the value of the token you copied from the previous step.

> The name of the secret **is** case sensitive.

And you're done!

> Your app will be re-deployed when the `main` branch of your repository is updated. Always test your changes locally before merging your working branch into `main`

<h2 id="5">💡 Local Deployment</h2>

This is the information on how to set up your local environment and run the project locally.

### Test your app

To run your app locally, ensure that line 13 in `index.js` is commented out, so that it looks like this:

```
// ssl: { rejectUnauthorized: false }
```

Then, start the app:

```
npm run start
```

Go to [localhost:8080](localhost:8080) to ensure that your web app up and running locally.

Changes to the client side, like HTML, CSS, and client side JS will be observed when you refresh the page. In order to see your changes to the server side, like changes to `index.js`, simply stop your app with `CTRL C` and then restart it.

Once you're done making changes and everything works how it should, uncomment line 13 of `index.js`:

```
  ssl: { rejectUnauthorized: false }
```

Add, commit, and push to your Github branch and then make a pull request!

### Template functions

The Techccelerator web app template comes with the following functions implemented:

- Register user
- Login user

> _Hint:_ These functions also give you a basic outline of how to write a function and make a database query.

### Problems?

Do not worry if your application doesn't respond. Ask for help, and we can troubleshoot together to solve the problem.

## 🌟 Conclusion

You can now start developing. If you have any questions, feel free to ask. We want you to succeed!
