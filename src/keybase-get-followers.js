// Fetch followers for keybase.io user

// Get helper methods
const { validateCommandLineArguments, fetchHTML, getFollowersFromHtml } = require('./helpers');

// Get command line arguments
const [, scriptName, user] = process.argv;

validateCommandLineArguments(scriptName, user);
fetchHTML(user, (error, html) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  const followers = getFollowersFromHtml(html);

  if (followers.length > 0) {
    console.log(followers.join(' '));
  } else {
    console.log('');
  }

  // Return without error
  process.exit(0);
});
