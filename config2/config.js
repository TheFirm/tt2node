var fs = require('fs'),
    configPath = __dirname + '/config.json',
    localConfigPath = __dirname + '/local/config.json'
    ;


var pathToConfigFile = configPath;
if (fs.existsSync(localConfigPath)) {
    pathToConfigFile = localConfigPath;
}

var parsed = JSON.parse(fs.readFileSync(pathToConfigFile, 'UTF-8'));

exports.c = parsed;