const fs = require('fs');

const valuableWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const dictionary = {
    "one" : 1,
    "two" : 2,
    "three":3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}


readModuleFile('./text.txt', function (err, textBrut) {
    const words = textBrut
        .toLowerCase()
        .trim()
        .split(`\n`)

    for(let i=0; i<words.length; i++){
        let currWord = words[i];
        const matching = [];

        for (let j = 0; j < valuableWords.length; j++) {
            const currValuableWord = valuableWords[j];
            for (let i = 0; i <= currWord.length - currValuableWord.length; i++) {
                const substring = currWord.slice(i, i + currValuableWord.length);
                if (substring === currValuableWord) {
                    matching.push({
                        text: currValuableWord,
                        startAt: i
                    });
                }
            }
        }

        matching.sort((a,b) => a.startAt - b.startAt);

        for(let j=0; j<matching.length; j++){
            const currMatching = matching[j];
            words[i] = words[i].replace(currMatching?.text.slice(-currMatching?.text.length, -1), `${dictionary[currMatching?.text]}`);
        }
        console.log(matching);

    }


    const listsOfNumbersList = words
        .map(line => line.split(''))
        .map((listOfCharactersList) => {
            return listOfCharactersList.filter(character => !isNaN(character) && character !== "\r")
        })

    let concatinatedInners = [];
    for(let i=0;i<listsOfNumbersList.length; i++){
        let temps=""
        for(let j=0; j<listsOfNumbersList[i].length; j++){
            if(listsOfNumbersList[i].length === 1){
                temps = listsOfNumbersList[i][0] + listsOfNumbersList[i][0];
            }else if (listsOfNumbersList[i].length > 1){
                temps = listsOfNumbersList[i][0] + listsOfNumbersList[i][listsOfNumbersList[i].length - 1];
            }
        }
        concatinatedInners.push(temps);
    }

    concatinatedInners = concatinatedInners.map(inner => +inner);

    let finalSum = 0
    for(let i=0; i<concatinatedInners.length;i++){
        finalSum = finalSum + concatinatedInners[i]
    }

    console.log(finalSum);
});

