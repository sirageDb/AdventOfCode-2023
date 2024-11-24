const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

readModuleFile('./text.txt', function (err, textBrut) {

    const listsOfNumbersList = textBrut
        .trim()
        .split(`\n`)
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
    fs.writeFileSync('output.txt', concatinatedInners.toString())
});