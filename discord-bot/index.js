import Client from "./client/client.js";
import config from "../config.json" assert { type: "json" };

const client = new Client(config);

client.once("ready", async (ctx) => {
  console.log(`Ready! Logged in as ${ctx.user.tag}`);
  const randomMessage = await client.getRandomMessageFromUser();
  console.log(randomMessage);
});

// Establish WebSocket connection to Discord.
client.login();
