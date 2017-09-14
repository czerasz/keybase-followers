const https = require('https');
const $ = require('cheerio');

/**
 * Helper method used to validate command line arguments
 * @param  {String} scriptName Current script/file name
 * @param  {String} user Keybase user name
 */
function validateCommandLineArguments(scriptName, user) {
  const usageMessage = `
  Usage:

    ${scriptName} user

    where:
      user - keybase.io user name
  `;

  // If user is not given return an error
  if (typeof user === 'undefined') {
    console.error('Erro: No user is given\n');
    console.log(usageMessage);

    process.exit(1);
  } else if (user === '--help') {
    console.log(usageMessage);
  }
}

/**
 * Fetch keybase.io user details
 * @param  {String}   user Keybase user name
 * @param  {Function} callback Callback function
 */
function fetchHTML(user, callback) {
  https.get(`https://keybase.io/${user}`, (response) => {
    let html = '';

    response.on('data', (data) => {
      html += data;
    });

    response.on('end', () => {
      callback(null, html);
    });
  }).on('error', (error) => {
    callback(error);
  });
}

/**
 * Extract body element from HTML document
 * @param  {String} html HTML content
 * @return {String}      Body outer HTML
 */
function getHtmlBody(html) {
  const match = /<body>[\s\S]*<\/body>/gm.exec(html);

  if (match) {
    return match[0];
  }
  return '';
}

/**
 * Parse the keybase.io HTML to fetch the followers
 * @param  {String} html HTML content
 * @return {Array}      Follower names
 */
function getFollowersFromHtml(html) {
  const followers = [];
  const query = '#profile-tracking-section .follower-table';

  const tableHtml = $(query, getHtmlBody(html)).first().html();

  $('.td-follower-info .username', tableHtml).each((index, item) => {
    followers.push(item.childNodes[0].nodeValue);
  });

  return followers;
}

module.exports = {
  validateCommandLineArguments,
  fetchHTML,
  getHtmlBody,
  getFollowersFromHtml,
};
