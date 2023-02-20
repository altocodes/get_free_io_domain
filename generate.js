const fs = require('fs');
const transliteration = require('transliteration');

const consonants = 'бвгдзклмнпрстфхц';
const vowels = 'аеиоу';

const words = [];

// Generate all possible combinations of consonants and vowels
for (let i = 0; i < consonants.length; i++) {
  for (let j = 0; j < vowels.length; j++) {
    for (let k = 0; k < consonants.length; k++) {
      for (let l = 0; l < vowels.length; l++) {
          // Combine the consonants and vowels to create a potential 
          let word = consonants[i] + vowels[j] + consonants[k] + (l%2 ==0 ? vowels[l] : consonants[getRandomIntInclusive(1, consonants.length)]);
          addWord(word);
          word = consonants[i] + vowels[j] + vowels[j] + consonants[k];
          addWord(word);
          word = consonants[i] + vowels[j] + vowels[l] + consonants[k];
          addWord(word);
          word = vowels[j] + consonants[i] + vowels[j] + consonants[k];
          addWord(word);
          word = vowels[l] + consonants[i] + vowels[j] + vowels[j];
          addWord(word);
          word = vowels[j] + consonants[i] + vowels[j] + consonants[k] + vowels[j];
          addWord(word);
        }
      }
    }
  }

// Write the list of words to a file, with each word on a new line
fs.writeFile('combination.txt', words.join('\n'), (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Words written to russian_words.txt');
});

function addWord(word){
   
   if (word.length <=5 
    && isPretty(word)
   
    ) {
      let transliteratedWord = transliteration.transliterate(word);
      transliteratedWord = transliteratedWord.replace('c', 'k');

      if(!words.includes(transliteratedWord) 
        && !transliteratedWord.match(/ee/gi)
        && !transliteratedWord.match(/ii/gi)
        && !transliteratedWord.match(/uo/gi)
        && !transliteratedWord.match(/uu/gi)
        && !transliteratedWord.match(/beb/gi)
        )
        words.push(transliteratedWord);
   }
}
// Helper function to check if a word is "pretty" in Russian
function isPretty(word) {
  for (let i = 0; i < word.length - 1; i++) {
    if (isConsonant(word[i]) && isConsonant(word[i + 1])) {
      return false;
    }
  }
  return true;
}

// Helper function to check if a letter is a consonant
function isConsonant(letter) {
  return consonants.includes(letter);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
