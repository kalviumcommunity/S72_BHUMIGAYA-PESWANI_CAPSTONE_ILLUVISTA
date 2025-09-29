// logger.js

function info(message) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[INFO]  ${timestamp} - ${message}`;
  console.log(formattedMessage);
}

function warn(message) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[WARN]  ${timestamp} - ${message}`;
  console.warn(formattedMessage);
}

function error(message) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[ERROR] ${timestamp} - ${message}`;
  console.error(formattedMessage);
}

function debug(message) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[DEBUG] ${timestamp} - ${message}`;
  console.debug(formattedMessage);
}

module.exports = {
  info,
  warn,
  error,
  debug
};
