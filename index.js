const Discord = require("discord.js")
const client = new Discord.Client(
        { Intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
)    

        

        client.on("ready", () => {
            console.log("Bot Online")
        })

//COMANDI

var embed = new Discord.MessageEmbed()
  .setTitle("Commands list")
  .setDescription("Commands")
  .addField(".Modalità", "coming soon...", true)
  .addField(".Server", "coming soon....", true )
  .addField(".Staff", "coming soon....", true )
  .setColor("RED")

client.on("message", (message) => {
    if (message.content == ".command help") {
        message.channel.send(embed)
    }
})

//SEZIONE SISTEMA TICKET


client.on("message", message => {
    if (message.content == ".ticket") {
        message.channel.send("Clicca sulla reazione per aprire un ticket")
            .then(msg => msg.react("📩")) 
    }
  })
  
  
  client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return
  
    if (messageReaction.message.partial) await messageReaction.message.fetch();
  
    if (messageReaction._emoji.name == "📩") { 
        if (messageReaction.message.channel.id == "972914296524795965") { //canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send("Hai gia un ticket aperto").catch(() => { })
                return
            }
  
            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent("912270715166793759") //categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: "973161643590701076",
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                       }
                ])
                canale.send("Grazie per aver aperto un ticket")
            })
        }
    }
  })
  
  client.on("message", message => {
    if (message.content == ".close") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
  
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
  
    if (message.content.startsWith(".add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
  
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
  
                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
  
                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }
  
                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: true
                })
  
                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith(".remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
  
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
  
                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
  
                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }
  
                if (utente.hasPermission("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }
  
                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: false
                })
  
                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
  })



  //Notifica a una determinata ora
  var embed01 = new Discord.MessageEmbed()
  .setTitle("Annuncio Bot")
  .setDescription("Annuncio")
  .addField("Server ip", "coming soon...", true)
  .addField("server discord", "ONLINE", true )
  .setColor("GREEN")

client.on("message", (message) => {

});

function oraAttuale() {
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    
    var canale = client.channels.cache.get("972960971121393734");
    if (hour == 12 && minutes == 00) {
        canale.send(embed01)
    }
}
setInterval(oraAttuale, 1000 * 60)

client.login("ODI2ODU0NTkwNDU5ODA1NzM3.Gugk1a.-GBnNg0vFANgS1a4LoGry6jF-ypkTGbz2XON0s")