const Discord = require("discord.js"),
  db = require("quick.db"),
  ms = require("parse-ms");

exports.run = async (bot, message, args) => {
  let cooldown = 300000,
    amount = Math.floor(Math.random() * 10) + 100;

  let lastDaily = await db.fetch(
    `lastDaily_${message.guild.id}_${message.author.id}`
  );
  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    let timeObj = ms(cooldown - (Date.now() - lastDaily));

    const embed = new Discord.RichEmbed()
      .setTitle("Hata!")
      .setColor("BLACK")
      .setDescription(
        `Zaten çalışmaya gitmişsin!\nYeniden çalışmana: **${timeObj.minutes} dakika ${timeObj.seconds} saniye**!`
      );
    message.channel.send(embed);
    return;
  } else {
    const embed = new Discord.RichEmbed()
      .setTitle("Çalıştın!")
      .setDescription(`İşten: **${amount}** ₺ kadar kazandın!`)
      .setColor("BLACK");
    message.channel.send(embed);

    db.set(`lastDaily_${message.guild.id}_${message.author.id}`, Date.now());

    db.add(`para_${message.guild.id}_${message.author.id}`, amount);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "puan"
};

exports.help = {
  name: "çalış",
  description: "Günlük ödül alırsınız.",
  usage: "çalış"
};
