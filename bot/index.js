//Webex Bot Starter - featuring the webex-node-bot-framework - https://www.npmjs.com/package/webex-node-bot-framework

var framework = require('webex-node-bot-framework');
var webhook = require('webex-node-bot-framework/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static('images'));
const config = require("./config.json");

// init framework
var framework = new framework(config);
framework.start();
console.log("Starting framework, please wait...");

framework.on("initialized", function () {
  console.log("framework is all fired up! [Press CTRL-C to quit]");
});

// A spawn event is generated when the framework finds a space with your bot in it
// If actorId is set, it means that user has just added your bot to a new space
// If not, the framework has discovered your bot in an existing space
framework.on('spawn', (bot, id, actorId) => {
  if (!actorId) {
    // don't say anything here or your bot's spaces will get
    // spammed every time your server is restarted
    console.log(`While starting up, the framework found our bot in a space called: ${bot.room.title}`);
  } else {
    // When actorId is present it means someone added your bot got added to a new space
    // Lets find out more about them..
    var msg = 'You can say `help` to get the list of words I am able to respond to.';
    bot.webex.people.get(actorId).then((user) => {
      msg = `Hello there ${user.displayName}. ${msg}`; 
    }).catch((e) => {
      console.error(`Failed to lookup user details in framwork.on("spawn"): ${e.message}`);
      msg = `Hello there. ${msg}`;  
    }).finally(() => {
      // Say hello, and tell users what you do!
      if (bot.isDirect) {
        bot.say('markdown', msg);
      } else {
        let botName = bot.person.displayName;
        msg += `\n\nDon't forget, in order for me to see your messages in this group space, be sure to *@mention* ${botName}.`;
        bot.say('markdown', msg);
      }
    });
  }
});


//Process incoming messages

let responded = false;


    framework.hears('A', function (bot) {
        responded = true;
        bot.say("markdown",'1');
    });    framework.hears('b', function (bot) {
        responded = true;
        bot.say("markdown",'2');
    });    framework.hears('c', function (bot) {
        responded = true;
        bot.say("markdown",'3');
    });    framework.hears('d', function (bot) {
        responded = true;
        bot.say("markdown",'4');
    });    framework.hears('e', function (bot) {
        responded = true;
        bot.say("markdown",'5');
    });    framework.hears('f', function (bot) {
        responded = true;
        bot.say("markdown",'6');
    });    framework.hears('g', function (bot) {
        responded = true;
        bot.say("markdown",'7');
    });    framework.hears('h', function (bot) {
        responded = true;
        bot.say("markdown",'8');
    });    framework.hears('i', function (bot) {
        responded = true;
        bot.say("markdown",'9');
    });    framework.hears('j', function (bot) {
        responded = true;
        bot.say("markdown",'10');
    });    framework.hears('k', function (bot) {
        responded = true;
        bot.say("markdown",'11');
    });    framework.hears('A', function (bot) {
        responded = true;
        bot.say("markdown",'1');
    });    framework.hears('b', function (bot) {
        responded = true;
        bot.say("markdown",'2');
    });    framework.hears('c', function (bot) {
        responded = true;
        bot.say("markdown",'3');
    });    framework.hears('d', function (bot) {
        responded = true;
        bot.say("markdown",'4');
    });    framework.hears('e', function (bot) {
        responded = true;
        bot.say("markdown",'5');
    });    framework.hears('f', function (bot) {
        responded = true;
        bot.say("markdown",'6');
    });    framework.hears('g', function (bot) {
        responded = true;
        bot.say("markdown",'7');
    });    framework.hears('h', function (bot) {
        responded = true;
        bot.say("markdown",'8');
    });    framework.hears('i', function (bot) {
        responded = true;
        bot.say("markdown",'9');
    });    framework.hears('j', function (bot) {
        responded = true;
        bot.say("markdown",'10');
    });    framework.hears('k', function (bot) {
        responded = true;
        bot.say("markdown",'11');
    });
function sendHelp(bot) {
  bot.say("markdown", 'These are the commands I can respond to:', '

 '+1. **A** 
' +2. **b** 
' +3. **c** 
' +4. **d** 
' +5. **e** 
' +6. **f** 
' +7. **g** 
' +8. **h** 
' +9. **i** 
' +10. **j** 
' +11. **k** 
' +12. **A** 
' +13. **b** 
' +14. **c** 
' +15. **d** 
' +16. **e** 
' +17. **f** 
' +18. **g** 
' +19. **h** 
' +20. **i** 
' +21. **j** 
' +22. **k** 
' +}

//Server config & housekeeping
// Health Check
app.get('/', function (req, res) {
  res.send(`I'm alive.`);
});

app.post('/', webhook(framework));

var server = app.listen(config.port, function () {
  framework.debug('framework listening on port %s', config.port);
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function () {
  framework.debug('stoppping...');
  server.close();
  framework.stop().then(function () {
    process.exit();
  });
});