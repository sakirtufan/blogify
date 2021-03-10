module.exports = {
  truncate : (str, len) => {
    if(str.length > len) {
      return str = str.substr(0, len) + '...';
    }
  }
}