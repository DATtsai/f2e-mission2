const fs = require('fs')
const { preprocess } = require('./prepare.js');

(async () => {
    let level01 = await preprocess('./data/level02.csv', {level: 1, candidateCount: 3, candidateLabel: ['宋楚瑜,余湘', '韓國瑜,張善政', '蔡英文,賴清德']})
    let level02 = await preprocess('./data/level02.csv', {level: 2, candidateCount: 3, candidateLabel: ['宋楚瑜,余湘', '韓國瑜,張善政', '蔡英文,賴清德']})
    let level03 = []
    for(let i=0; i < 22; i++) {
        let result = await preprocess(`./data/level03_${i<10 ? '0'+i : i}.csv`, {level: 3, candidateCount: 3, candidateLabel: ['宋楚瑜,余湘', '韓國瑜,張善政', '蔡英文,賴清德']})
        level03 = level03.concat(result)
    }

    fs.writeFileSync('../src/assets/data/level01.json', JSON.stringify(level01))
    fs.writeFileSync('../src/assets/data/level02.json', JSON.stringify(level02))
    fs.writeFileSync('../src/assets/data/level03.json', JSON.stringify(level03))
})()