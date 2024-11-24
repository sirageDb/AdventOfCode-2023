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
        .map(game => {
            let highestRed = 0;
            let highestGreen= 0;
            let highestBlue= 0;

            for(const pic of game.pics){
                if(pic.red > highestRed){
                    highestRed = pic.red;
                }
                if(pic.green > highestGreen){
                    highestGreen = pic.green;
                }
                if(pic.blue > highestBlue){
                    highestBlue = pic.blue;
                }
            }

            game["highest"] = {
                red: highestRed,
                green: highestGreen,
                blue : highestBlue,
            }
            game["power"] = highestRed * highestGreen * highestBlue;
            return game;
        })

    games.map(g => console.log(g));

    let sumOfPowers = 0;
    for(let i=0; i<games.length; i++){
        sumOfPowers = sumOfPowers + games[i].power;
    }
    console.log(sumOfPowers)

    fs.writeFileSync('output.text', games.toString())
});
