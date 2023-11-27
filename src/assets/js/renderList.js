import city from '@/assets/data/city.json'
import tpe from '@/assets/data/tpe.json'
import tph from '@/assets/data/tph.json'


const listMap = [
  {
    value: '000',
    data: tpe
  },
  {
    value: '001',
    data: tph
  }
];
export default function(code) { 
  if (code === 'city') {
    return city
  } else {
    return listMap.filter((i) => {
      if (i.value === code) {
        return i.data
      }
    })
  }
}