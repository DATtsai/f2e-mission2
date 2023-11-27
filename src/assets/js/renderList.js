import city from '@/assets/data/city'
import tpe from '@/assets/data/tpe'
import tph from '@/assets/data/tph'
import tyc from '@/assets/data/tyc'
import txg from '@/assets/data/txg'
import tnn from '@/assets/data/tnn'
import khh from '@/assets/data/khh'
import hsh from '@/assets/data/hsh'
import mal from '@/assets/data/mal'
import cwh from '@/assets/data/cwh'
import nto from '@/assets/data/nto'
import ylh from '@/assets/data/ylh'
import chy from '@/assets/data/chy'
import pts from '@/assets/data/pts'
import iln from '@/assets/data/iln'
import hwc from '@/assets/data/hwc'
import ttt from '@/assets/data/ttt'
import peh from '@/assets/data/peh'
import klu from '@/assets/data/klu'
import hsc from '@/assets/data/hsc'
import cyi from '@/assets/data/cyi'
import kmn from '@/assets/data/kmn'


const listMap = [
  { // 台北市
    value: '000', data: tpe },
  { // 新北市
    value: '001', data: tph },
  { // 桃園市
    value: '002', data: tyc },
  { // 台中市
    value: '003', data: txg },
  { // 台南市
    value: '004', data: tnn },
  { // 高雄市
    value: '005', data: khh },
  { // 新竹縣
    value: '006', data: hsh },
  { // 苗栗縣
    value: '007', data: mal },
  { // 彰化縣
    value: '008', data: cwh },
  { // 南投縣
    value: '009', data: nto },
  { // 雲林縣
    value: '010', data: ylh },
  { // 嘉義縣
    value: '011', data: chy },
  { // 屏東縣
    value: '012', data: pts },
  { // 宜蘭縣
    value: '013', data: iln },
  { // 花蓮縣
    value: '014', data: hwc },
  { // 台東縣
    value: '015', data: ttt },
  { // 澎湖縣
    value: '016', data: peh },
  { // 基隆市
    value: '017', data: klu },
  { // 新竹市
    value: '018', data: hsc },
  { // 嘉義市
    value: '019', data: cyi },
  { // 金門縣
    value: '020', data: kmn },
  { // 連江縣
    value: '021', data: hsc },
];
export default function (code) { 
  console.log(code);
  if (code === 'city') {
    return city
  } else if (code === '0') {
    let alldata = [];
    for (let i = 0; i < listMap.length; i++) {
      alldata.push(...listMap[i].data)
    }
    return alldata
  } else {
    return listMap.filter((i) => {
      if (i.value === code) {
        return i.data
      }
    })
  }
}