const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const { getHtmlBody, getFollowersFromHtml } = require('../src/helpers');
// validateCommandLineArguments, fetchHTML,

describe('getHtmlBody', () => {
  it('should return body tag when it is available', () => {
    expect(getHtmlBody('<html><body>test content</body></html>')).to
      .equal('<body>test content</body>');
  });

  it('should return empty string if body tag is not available', () => {
    expect(getHtmlBody('<html><div>test content</div></html>')).to
      .equal('');
  });
});

describe('getFollowersFromHtml', () => {
  let sampleHtml = '';

  before((done) => {
    const sampleFileName = path.join(__dirname, 'keybase-user.sample.html');

    fs.readFile(sampleFileName, 'utf8', (err, data) => {
      sampleHtml = data;
      done();
    });
  });

  it('should return users array', () => {
    const followers = getFollowersFromHtml(sampleHtml);
    expect(followers).to.be.an('array');
    expect(followers).to.eql(['test 1', 'test 2', 'test 3']);
  });
});
