function readUserConfig() {
  const path = require('path');
  const fs = require('fs');

  function findUserProjectRoot() {
    const currentDir = process.cwd();
    return currentDir;
  }

  const projectRoot = findUserProjectRoot();
  const configPath = path.join(projectRoot, 'wax.config.js');

  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found at ${configPath}`);
  }

  try {
    const config = require(configPath);
    return config;
  } catch (error) {
    throw new Error(
      `Configuration file is invalid at ${configPath}: ${error.message}`
    );
  }
}

module.exports = readUserConfig;
