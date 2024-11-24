
const fs = require('fs');

function readModuleFile(path, callback) {
    try {
        const filename = require.resolve(path);
        fs.readFile(filename, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}

function hasMatchingNeighbour(coordination, n) {
    return (coordination.indexInRow + 1 === n.numberStartIndex)
        || (coordination.indexInRow - 1 === n.numberEndIndex);
}


readModuleFile('./input.txt', function (err, textBrut) {

    const schematicLines = textBrut
        .trim()
        .split(`\n`)

    let symbolsCoordinates = [];
    let numbersAndCoordinations = [];


    for (let i = 0; i < schematicLines.length; i++) {
        const currentLine = schematicLines[i];

        let number = "";
        let numberStartIndex = 0;
        let numberEndIndex = 0;
        let lineNumber = 0;

        for (let j = 0; j < currentLine.length; j++) {
            if (isNaN(+currentLine[j]) && currentLine[j] === "*") {
                symbolsCoordinates.push({
                    lineNumber: i,
                    indexInRow: j,
                })
            }

            if (!isNaN(+currentLine[j])) {
                if (number === "") {
                    numberStartIndex = j;
                    lineNumber = i;
                }
                number = number + currentLine[j]
            }

            if ((j === currentLine.length - 1 && !isNaN(+currentLine[j])) || (isNaN(+currentLine[j]) && number !== "")) {
                numberEndIndex = j;
                numbersAndCoordinations.push({
                    number: +number,
                    numberStartIndex: numberStartIndex,
                    numberEndIndex: numberEndIndex - 1,
                    lineNumber: lineNumber,
                    numberLength: number.length,
                })
                number = ""
                numberStartIndex = 0;
                numberEndIndex = 0;
                lineNumber = 0;
            }
        }
    }

    const partsNumbers = numbersAndCoordinations.filter(n => {

        //check on sides
        const symbolsCoordinatedOnTheSameLine = symbolsCoordinates.filter(s => s.lineNumber === n.lineNumber);
        const hasMatchingObjectOnSides = symbolsCoordinatedOnTheSameLine
            .some(coordination => hasMatchingNeighbour(coordination, n));
        if (hasMatchingObjectOnSides) {
            return n;
        }


        // check on top
        const symbolsCoordinatesTop = symbolsCoordinates.filter(s => s.lineNumber === n.lineNumber - 1);
        const hasMatchingObjectOnTop = symbolsCoordinatesTop
            .some(coordination => hasMatchingNeighbour(coordination, n)
                || (coordination.indexInRow >= n.numberStartIndex - 1 && coordination.indexInRow <= n.numberEndIndex)
            );
        if (hasMatchingObjectOnTop) {
            return n;
        }

        //check down
        const symbolsCoordinatesDown = symbolsCoordinates.filter(s => s.lineNumber === n.lineNumber + 1);
        const hasMatchingObjectOnDown = symbolsCoordinatesDown
            .some(coordination => hasMatchingNeighbour(coordination, n)
                || (coordination.indexInRow >= n.numberStartIndex - 1 && coordination.indexInRow <= n.numberEndIndex)
            );
        if (hasMatchingObjectOnDown) {
            return n;
        }
    })


    const joinedWithSymbol = [];
    for (let i = 0; i < symbolsCoordinates.length; i++) {
        const currentSymbol = symbolsCoordinates[i];

        let symbolLeftNeighbour = partsNumbers.find(p => (p.numberEndIndex + 1) === currentSymbol.indexInRow && p.lineNumber === currentSymbol.lineNumber);
        let symbolRightNeighbour = partsNumbers.find(p => (p.numberStartIndex - 1) === currentSymbol.indexInRow && p.lineNumber === currentSymbol.lineNumber);
        if (symbolLeftNeighbour && symbolRightNeighbour) {
            joinedWithSymbol.push([symbolLeftNeighbour, symbolRightNeighbour]);
        }

        let symbolTopNeighbour = partsNumbers.find(p => (p.lineNumber === currentSymbol.lineNumber - 1) && (currentSymbol.indexInRow < p.numberEndIndex + 2 &&  currentSymbol.indexInRow > p.numberStartIndex - 2))
        let symbolDownNeighbour = partsNumbers.find(p => (p.lineNumber === currentSymbol.lineNumber + 1) && (currentSymbol.indexInRow < p.numberEndIndex + 2 &&  currentSymbol.indexInRow > p.numberStartIndex - 2))
        if (symbolTopNeighbour && symbolDownNeighbour) {
            joinedWithSymbol.push([symbolTopNeighbour, symbolDownNeighbour]);
        }
    }

    let multiplicationOfJoins = [];
    for (let i = 0; i < unique.length; i++) {
        const currJoin = unique[i];
        multiplicationOfJoins.push(currJoin[0].number * currJoin[1].number);
    }

    let sum = 0;
    for (let i = 0; i < multiplicationOfJoins.length; i++) {
        sum = sum + multiplicationOfJoins[i];
    }
    console.log("THIS IS THE SUM:", sum)
});
