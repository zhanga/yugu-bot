const Discord = require('discord.js');
const client = new Discord.Client();

const imageFolder = './images/';
const fs = require('fs');
var fileNameArray = [];
var fileNameIndex = 0;

fs.readdirSync(imageFolder).forEach(file => {
    fileNameArray[fileNameIndex] = file.substring(0, file.indexOf("."));
    fileNameIndex++;
});

client.on("ready", () => {
    console.log("Yugu good to go!");
});

client.on('message', message => {
    var sticker = message.content.toLowerCase();
    if (sticker.search("!") != -1) {
        if (sticker.replace(/[^!]/g, "").length > 1) {
            sticker = sticker.split("!");
            for (var i = 0; i < sticker.length; i++) {
                sticker[i] = sticker[i].slice(sticker[i].indexOf("!") + 1, sticker[i].length);
                if (sticker[i].search(" ") != -1) {         
                    sticker[i] = sticker[i].slice(0, sticker[i].indexOf(" "));                   
                }
                sticker[i].trim();
                for (var checkerIndex = 0; checkerIndex < fileNameIndex; checkerIndex++) {
                    if (sticker[i] == fileNameArray[checkerIndex]) {
                        message.channel.sendMessage({ file: './images/' + fileNameArray[checkerIndex] + ".png"})
                    }
                }
            }
        }
        else {
            sticker = sticker.slice(sticker.indexOf("!") + 1, sticker.length);
            if (sticker.search(" ") != -1) {
                sticker = sticker.slice(0, sticker.indexOf(" "));                
            }
            sticker.trim();
            for (var checkerIndex = 0; checkerIndex < fileNameIndex; checkerIndex++) {
                if (sticker == fileNameArray[checkerIndex]) {
                    message.channel.sendMessage({ file: './images/' + fileNameArray[checkerIndex] + ".png" })
                }
            }
        }
    }
});

client.login('Your token here');
