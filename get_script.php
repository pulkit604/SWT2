<?php
$conn = mysqli_connect('localhost', 'id12786756_pulkit', '123!@#QWEqwe', 'id12786756_chat_bot_manager');

$sql = "SELECT question,answer from QnA where user_id = 1";
$data = '';
$intro = <<<INTRO
function sendHelp(bot) {
  bot.say("markdown", 'These are the commands I can respond to:', '\n\n '+
INTRO;
$result = mysqli_query($conn, $sql);
$cnt = 1;
while($row = mysqli_fetch_assoc($result)){
    $data.= <<<SCRIPT
    framework.hears('{$row["question"]}', function (bot) {
        responded = true;
        bot.say("markdown",'{$row["answer"]}');
    });
SCRIPT;

$intro.= "{$cnt}. **{$row['question']}** \n' +";
$cnt++;
}
$intro.= "}";

$dynamic_file_content = <<<FILE

{$data}
{$intro}

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
FILE;

copy('index.js',"bot/index.js");
$file = fopen('bot/index.js', 'a');
fwrite($file, $dynamic_file_content);
fclose($file);

$files = scandir('bot');

$zipname = 'bot.zip';
$zip = new ZipArchive;
$zip->open($zipname, ZipArchive::CREATE);
    foreach ($files as $file) {
        if (file_exists($file) && is_file($file))
            $zip->addFile($file);
    }
    $zip->close();
    