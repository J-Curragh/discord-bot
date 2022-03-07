import { Client, Intents } from "discord.js";
import config from "./config.json" assert { type: "json" };

// Declare Intents
const intents = new Intents();
intents.add(Intents.FLAGS.GUILDS);

// Instantiate Discord API Client instance with intents.
const client = new Client({ intents: intents });

// Events
client.once("ready", (ctx) => {
  console.log(`Ready! Logged in as ${ctx.user.tag}`);
});


// Authenticate with discord
// client.login(token)
const token = config['token']
client.login(token)
