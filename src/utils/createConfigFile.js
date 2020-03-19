const fs = require('fs');
const path = require('path');

const createConfigFile = (outputDirectory) => {
  const version = require(path.join(process.cwd(), 'package.json')).version;
  const config = { version };

  fs.writeFileSync(path.join(outputDirectory, 'config.json'), JSON.stringify(config));
};

createConfigFile('./src');
