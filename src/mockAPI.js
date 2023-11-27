import dataLevel01 from '@/assets/data/level01.json'
import dataLevel02 from '@/assets/data/level02.json'
import dataLevel03 from '@/assets/data/level03.json'

const searchBallot = async (req) => {
    let level01, level02, level03
    let basic = req.basic
    let filter = req.filter
    if(basic) {
        if(Object.keys(basic).length === 0) level01 = dataLevel01
        if(basic.level01 && basic.level01.length > 0) {
            level01 = dataLevel01
            level01 = basic.level01.map(item => level01.find(element => element.id == item)).filter(item => item)
        }
        if(basic.level02 && basic.level02.length > 0) {
            level02 = dataLevel02
            level02 = basic.level02.map(item => level02.find(element => element.id == item)).filter(item => item)
        }
        if(basic.level03 && basic.level03.length > 0) {
            level03 = dataLevel03
            level03 = basic.level03.map(item => level03.find(element => element.id == item)).filter(item => item)
        }
        // 空陣列預設為全選
        if(basic.level01 && basic.level01.length === 0) {
            level01 = dataLevel01
        }
        if(basic.level02 && basic.level02.length === 0) {
            level02 = dataLevel02
        }
        if(basic.level03 && basic.level03.length === 0) {
            level03 = dataLevel03
        }
    }
    else {
        level01 = dataLevel01
    }
    let result = {}
    if(level01) result.level01 = level01
    if(level02) result.level02 = level02
    if(level03) result.level03 = level03
    if(filter) {
        if(filter.candidate && filter.candidate.length > 0) {
            if(result.level01) {
                for(let i=0; i<filter.candidate.length; i++) {
                    filter.candidate = filter.candidate.map(item => String(item))
                    result.level01 = result.level01.map(item => {
                        item.candidateResult = item.candidateResult.filter(element => filter.candidate.includes(String(element.candidateNo)))
                        return item
                    })
                }
            }
            if(result.level02) {
                for(let i=0; i<filter.candidate.length; i++) {
                    filter.candidate = filter.candidate.map(item => String(item))
                    result.level02 = result.level02.map(item => {
                        item.candidateResult = item.candidateResult.filter(element => filter.candidate.includes(String(element.candidateNo)))
                        return item
                    })
                }
            }
            if(result.level03) {
                for(let i=0; i<filter.candidate.length; i++) {
                    filter.candidate = filter.candidate.map(item => String(item))
                    result.level03 = result.level03.map(item => {
                        item.candidateResult = item.candidateResult.filter(element => filter.candidate.includes(String(element.candidateNo)))
                        return item
                    })
                }
            }
        }
    }
    return result
};

export default searchBallot