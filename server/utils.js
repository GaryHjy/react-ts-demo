module.exports = {
  md5(value) {
    return require('crypto').createHash('md5').update(value).digest('hex');
  }
}