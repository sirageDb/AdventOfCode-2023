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
    const games = textBrut
        .trim()
        .split(`\n`)
        .map(game => {
            const originalArray = [...game.split(":")[0]]
            const gameId = originalArray.splice(5).join("");

            const g = game
                .split(":")[1]
                .trim()
                .split(";")
                .map(singlePic => {
                    const asArray = singlePic.split(",");

                    let red = 0;
                    let green= 0;
                    let blue= 0;

                    for(let i=0; i<asArray.length; i++){
                        const value = parseInt(asArray[i]);
                        if(asArray[i].includes("red")){
                            red = value;
                        }else if(asArray[i].includes("green")){
                            green = value;
                        }else if(asArray[i].includes("blue")){
                            blue = value;
                        }
                    }

                    return {
                        red: red,
                        green: green,
                        blue : blue,
                    }
                })

            return {
                gameId: +gameId,
                pics: g,
            }
        })

    const possibleGames = games
        .filter(game => {
            for(const pic of game.pics){
                if(pic.red > 12){
                    return false;
                }
                if(pic.green > 13){
                    return false;
                }
                if(pic.blue > 14){
                    return false
                }
            }
            return true;
        })

    let sumOfIds =0;
    for(let i=0; i<possibleGames.length; i++){
        sumOfIds = sumOfIds + possibleGames[i].gameId;
    }
    console.log(sumOfIds)
    fs.writeFileSync('output.text', games.toString())
});
