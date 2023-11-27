const fs = require('fs')

const preprocess = async (path, config) => {
    let raw = fs.readFileSync(path, 'utf-8')
        .split(/\r?\n/g)
        .filter((item, index) => index > 17)
        .map(item => item.replace(/"(\d{0,3})?,?(\d{0,3}),(\d{0,3})"/g, '$1$2$3'))
        .map(item => item.split(/,/g))
    // console.log(raw)
    let keyConfig = {
        id: 0, // id
        basic: {
            label: '', // 行政區標籤
            pollbook: 0, // 選舉人數
            ballot: 0, // 發出票數
            remain: 0, // 剩餘票數
            voteCount: 0, // 投票數
            voteFailCount: 0, // 已領但未投票
            validBallot: 0, // 有效票
            invalidBallot: 0, // 無效票
            voteRatio: 0, // 投票率
        },
        filter: [{candidateNo: 0, label: '', getBallot: 0, getRatio: 0}] // 候選人得票結果
    }

    const parse = (raw, level, candidateCount, candidateLabel) => {
        const result = []
        for(let index in raw) {
            let datum = JSON.parse(JSON.stringify(keyConfig))
            switch(level) {
                case 1:
                    datum.id = index
                    break;
                case 2:
                    datum.id = '0' + (index.length === 1 ? '0'+index : index)
                    break;
                case 3:
                    let preID = '0' + path.replace(/.+_(\d+)\..+/g, '$1')
                    datum.id = preID + (index.length === 1 ? '0'+index : index)
                    break
            }
            datum.basic.label = raw[index][0].trim()
            datum.basic.pollbook = raw[index][10]
            datum.basic.ballot = raw[index][8]
            datum.basic.remain = raw[index][9]
            datum.basic.voteCount = raw[index][6]
            datum.basic.voteFailCount = raw[index][7]
            datum.basic.validBallot = raw[index][4]
            datum.basic.invalidBallot = raw[index][5]
            datum.basic.voteRatio = raw[index][11]
            datum.filter = []
            for(let i=0; i < candidateCount; i++) {
                let candiate = {candidateNo: 0, label: '', getBallot: 0, getRatio: 0}
                candiate.candidateNo = i+1
                candiate.label = candidateLabel[i] || i+1
                candiate.getBallot = raw[index][i+1]
                candiate.getRatio = candiate.getBallot / datum.basic.validBallot
                datum.filter.push(candiate)
            }
            if(level === 1) datum.basic.label = '全國'
            result.push(datum)
        }
        return result
    }

    switch (config.level) {
        case 1:
            raw = [raw[0]]
            break
        case 2:
            raw = raw.filter((item, index) => index !== 0)
            break
        case 3:
            raw = raw.filter((item, index) => index !== 0)
            break
    }

    return parse(raw, config.level, config.candidateCount, config.candidateLabel)
}

module.exports = {
    preprocess
}