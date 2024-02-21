const dotenv = require('dotenv')
const { Client, GatewayIntentBits } = require('discord.js')
const { OpenAI } = require('openai')

//beetle juice discord roasting bot
//When a user mentions the bot in your chat it will response with a light hearted roast

//Check config/.env.sample for the env var names
dotenv.config()

//Open ai config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

//discord bot config
// ensure your bot has the right intents allowed in the bot settings page on discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

// can change this prompt to whatever you like
let prompt = 'you are the internet sensation beetle juice and I want you to roast me as hard as you can. Anything is free game, yo momma jokes you name it. i just want you to make it sound gangster with some slang and keep it to one sentence maximum'


//discord bot events handler
client.on("messageCreate", async function(message) {
  if (message.mentions.has(client.user))
    try {
      const response = await openai.chat.completions.create({
        messages: [{ "role": "system", "content": prompt }],
        model: "gpt-3.5-turbo"
      })
      const generatedRoast = response.choices[0].message

      return message.reply(generatedRoast)
    } catch (err) {
      console.error(err)
      return message.reply("man im too tired leave me alone")
    }

})
client.login(process.env.BOT_KEY)


