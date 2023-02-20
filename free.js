const dns = require('dns');
const fs = require('fs');

// Read in the file "text.txt"
let notFreeLines = fs.readFileSync('notfree.txt').toString().split("\r\n");

fs.readFile('russian_words.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the file contents into an array of lines
  const lines = data.trim().split('\n');
  let notFree = [];

  // Check each line for free words in the ".io" zone
  lines.forEach(line => {
    // Split the line into words
    const words = line.split(' ');


    // Check each word to see if it is free in the ".io" zone
    words.forEach(word => {
      if(!notFreeLines.includes(word)){
        dns.resolve(`${word}.io`, (err) => {
          if (err && err.code === 'ENOTFOUND') {
            console.log(`${word} is available in the .io zone`);
          } else {
            fs.appendFile('notfree.txt', word + "\r\n", function (err) {});
          }
        });
      }
    });
  });
});
