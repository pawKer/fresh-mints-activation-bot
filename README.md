# Discord Bot Typescript Template

A basic template for a Discord bot in Typescript.

# Features

The template includes loading commands and events dynamically, a script to deploy commands, a basic implementation of MongoDB, a basic embed + docker, eslint, prettier, typescript config.

## Running instructions

1. Run `npm install`
2. Rename `.env.example` to `.env`
3. Populate environment variables in the `.env` file
4. Run the bot by doing `ts-node src/bot.js` or `npm run dev`

## Deploying commands

Before the commands are available on your test server (guild)
you need to deploy them using the `deploy-commands.ts` script.
To run it you just need to populate the bot token, bot id and server id in the script and then run `ts-node src/deploy-commands.ts`.

## Global dependencies

You might need to install `typescript` and `ts-node` globally for easier development.
To do that you can run `npm i -g typescript` and `npm i -g ts-node`.
