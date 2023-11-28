<template>
  <div class="page">
    <div class="landing">
      <div class="map-box">
        <img class="tw-map" src="@/assets/tw.svg" alt="台灣地圖">
      </div>
      <div class="content">
        <img class="logo" src="@/assets/logo.svg" alt="決戰2020總統大選"> 
        <div class="nowrap"><h1 class="region">全國</h1><h1>投票概況</h1></div>
        <div class="des">將滑鼠移至縣市查看各選區投票概況</div>
        <div class="data-number">
          <h2>投票數：<span>14464571</span></h2>
          <h2>投票率：<span>74.9%</span></h2>
        </div>
        <button class="button" @click="clicktoShow()">查看開票結果</button>
      </div>
    </div>
    <div class="chart" id="chart" v-if="isClickToShow">
      <div class="filter" id="filterBar">
        <el-select v-model="cityValue" @change="setCity()" multiple collapse-tags placeholder="縣市（可複選）">
          <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="distValue" @change="fetchData()" multiple collapse-tags placeholder="鄉鎮市區（可複選）" >
          <el-option
            v-for="item in dist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="candidateValue" @change="fetchData()" multiple collapse-tags placeholder="候選人（可複選）">
          <el-option
            v-for="item in candidateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 泡泡圖 -->
      <div class="bubbleChart chart-block">
        <!-- todo: 確認 level01 資料 -->
        <div v-if="bubbleLevel1Data || bubbleLevel1Data.label !== ''">
          <div class="chart-name">基本投票統計</div>
          <div>
            <ChartBubbleGroup :data-list="bubbleLevel1Data" :key="`全國${bubble01}`"/>
          </div>
          <div class="legend-group">
            <div class="legend-bar">
              <div class="color pink"></div>
              <span>選舉人數</span>
            </div>
            <div class="legend-bar">
              <div class="color green"></div>
              <span>發出票數</span>
            </div>
            <div class="legend-bar">
              <div class="color purple"></div>
              <span>剩餘選票數</span>
            </div>
            <div class="legend-bar">
              <div class="color orange"></div>
              <span>有效票數</span>
            </div>
            <div class="legend-bar">
              <div class="color blue"></div>
              <span>無效票數</span>
            </div>
          </div>
        </div>
        <div v-if="bubbleLevel2Data.length>0" style="margin-top:2rem;">
          <div>
            <ChartBubbleGroup :data-list="bubbleLevel2Data" :key="`全國${bubble02}`"/>
          </div>
          <div class="legend-group">
            <div class="legend-bar">
              <div class="color pink"></div>
              <span>選舉人數</span>
            </div>
            <div class="legend-bar">
              <div class="color green"></div>
              <span>發出票數</span>
            </div>
            <div class="legend-bar">
              <div class="color purple"></div>
              <span>剩餘選票數</span>
            </div>
            <div class="legend-bar">
              <div class="color orange"></div>
              <span>有效票數</span>
            </div>
            <div class="legend-bar">
              <div class="color blue"></div>
              <span>無效票數</span>
            </div>
          </div>
        </div>
        <div v-if="bubbleLevel3Data.length>0" style="margin-top:2rem;">
          <div>
            <ChartBubbleGroup :data-list="bubbleLevel3Data" :key="`全國${bubble03}`"/>
          </div>
          <div class="legend-group">
            <div class="legend-bar">
              <div class="color pink"></div>
              <span>選舉人數</span>
            </div>
            <div class="legend-bar">
              <div class="color green"></div>
              <span>發出票數</span>
            </div>
            <div class="legend-bar">
              <div class="color purple"></div>
              <span>剩餘選票數</span>
            </div>
            <div class="legend-bar">
              <div class="color orange"></div>
              <span>有效票數</span>
            </div>
            <div class="legend-bar">
              <div class="color blue"></div>
              <span>無效票數</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 長條圖 -->
      <div class="BarChart chart-block">
        <div class="chart-name">候選人選區得票數</div>
        <div>
          <div class="chart-container">
            <ChartColumnTwoScalesBarGroupAndLine :column-data="columnLevel1Data" :key="`長條${column01}`"/>
          </div>
          <div class="legend-group">
            <div class="legend-bar" v-for="people in candidateOptions" :key="people.value">
              <div class="color" :class="{ 'c-orange': people.value === 1,'c-blue': people.value === 2, 'c-green': people.value === 3}"></div>
              <span>{{ people.label }}</span>
            </div>
          </div>
        </div>
        <div v-if="columnLevel2Data" style="margin-top:2rem;">
          <div class="chart-container">
            <ChartColumnTwoScalesBarGroupAndLine :column-data="columnLevel2Data" :key="`長條${column02}`"/>
          </div>
          <div class="legend-group">
            <div class="legend-bar"  v-for="people in candidateOptions" :key="people.value">
              <div class="color" :class="{ 'c-orange': people.value === 1,'c-blue': people.value === 2, 'c-green': people.value === 3}"></div>
              <span>{{ people.label }}</span>
            </div>
          </div>
        </div>
        <div v-if="columnLevel3Data" style="margin-top:2rem;">
          <div class="chart-container">
            <ChartColumnTwoScalesBarGroupAndLine :column-data="columnLevel3Data" :key="`長條${column03}`"/>
          </div>
          <div class="legend-group">
            <div class="legend-bar" v-for="people in candidateOptions" :key="people.value">
              <div class="color" :class="{ 'c-orange': people.value === 1,'c-blue': people.value === 2, 'c-green': people.value === 3}"></div>
              <span>{{ people.label }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 縱向圖 -->
      <div class="RowBarChart chart-block">
        <div class="chart-name">候選人選區得票比率</div>
        <div>
          <ChartRowBarLayout :row-data="rowData" :key="rowKey"/>
        </div>
        <div class="legend-group">
          <div class="legend-bar" v-for="people in candidateOptions" :key="people.value">
              <div class="color" :class="{ 'c-orange': people.value === '1','c-blue': people.value === '2', 'c-green': people.value === '3'}"></div>
              <span>{{ people.label }}</span>
          </div>
          <div class="legend-bar">
            <div class="color c-red"></div>
            <span>總票數</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChartColumnTwoScalesBarGroupAndLine from '@/components/ChartColumnTwoScalesBarGroupAndLine.vue'
import ChartRowBarLayout from '@/components/ChartRowBarLayout.vue'
import ChartBubbleGroup from '@/components/ChartBubbleGroup.vue'
import searchBallot from '@/mockAPI'
import renderList from '@/assets/js/renderList.js'
import { ref, nextTick, onMounted } from 'vue'

const isClickToShow = ref(false)
const cityValue = ref(['0'])
const distValue = ref([])
const candidateValue = ref([1,2,3])
const city = ref([])
const dist = ref([])
const candidateOptions = [
  {
    value: 1,
    label: '宋楚瑜'
  },
  {
    value: 2,
    label: '韓國瑜'
  },
  {
    value: 3,
    label: '蔡英文'
  }
];
const isHasTaiwan = ref(false);

// 頁面
const filterBar = ref();
const position = ref();

const clicktoShow = async () => { 
  isClickToShow.value = true;
  await nextTick();
  window.scrollTo({
    top: document.getElementById('chart').offsetTop,
    behavior: "smooth",
  });
  filterBar.value = document.getElementById('filterBar');
  position.value = filterBar.value.offsetTop;
  window.onscroll = function () { setSticky() };
}

const setSticky = () => { 
  if (window.pageYOffset >= position.value) {
    filterBar.value.classList.add('sticky')
  } else { 
    filterBar.value.classList.remove('sticky')
  }
}

// data
const bubbleLevel1Data = ref({});
const bubbleLevel2Data = ref([]);
const bubbleLevel3Data = ref([]);
const bubble01 = ref(0);
const bubble02 = ref(0);
const bubble03 = ref(0);
const columnLevel1Data = ref([]);
const columnLevel2Data = ref(null);
const columnLevel3Data = ref(null);
const column01 = ref(0);
const column02 = ref(0);
const column03 = ref(0);
const rowData = ref([]);
const rowKey = ref(0);

const setCity = () => {
  let list = [];
  for (let i = 0; i < cityValue.value.length; i++) {
    if (cityValue.value[i] === '0') {
      list = renderList('0');
      break;
    } else {
      const res = renderList(cityValue.value[i])
      const { data } = res[0];
      list.push(...data);
    }
  }
  cityValue.value.indexOf('0') > -1 ? isHasTaiwan.value = true : isHasTaiwan.value = false;
  dist.value = list;
  fetchData();
};

const fetchData = () => {
  let basicParam = {};
  let level2 = [];
  cityValue.value.forEach(i => {
    if (i === '0') {
      basicParam.level01 = ['0'];
    } else {
      level2.push(i);
      basicParam.level02 = level2;
    }
  });
  if (distValue.value.length > 0) {
    basicParam.level03 = distValue.value; 
  };
  const candidate = candidateValue.value.map(i => i);
  let req = {
    basic: { ...basicParam }, filter: { candidate }
  };
  (async () => {
    let result = await searchBallot(req);
    const { level01, level02, level03 } = result;
    const colParam = {
      y1Data: [],
      y2Data: [],
      xLabels: [],
      y1ItemLabels: [],
      y2ItemLabels: [],
      id: []
    };
    let rowParam = {
      yLabels: [],
      data: [],
      itemLabels: [],
      // "宋楚瑜,余湘",
    //   "韓國瑜,張善政",
    //   "蔡英文,賴清德",
    //   "投票數"
    };
    if (level01) {
      bubbleLevel1Data.value = level01[0].basic;
      bubble01.value += 1;
      const colParam1 = JSON.parse(JSON.stringify(colParam));
      level01.forEach((item) => {
        // column Data
        colParam1.xLabels.push(item.basic.label);
        item.filter.forEach((i, index) => {
          if (!colParam1.y1Data[index]) {
            colParam1.y1Data[index] = [];
          }
          colParam1.y1Data[index].push({ value: i.getBallot });
          colParam1.y1ItemLabels.push(i.label);
          colParam1.id.push(i.candidateNo)
        })
        columnLevel1Data.value = colParam1;
        // row Data
        rowParam.yLabels.push(item.basic.label);
        console.log(1,rowParam);
        // item.filter.forEach((i, index) => { 
        //   if (!rowParam.data[index]) {
        //     rowParam.data[index] = [];
        //   };
        //   rowParam.itemLabels.push(i.label);
        //   rowParam.data[index].push({ value: Number(i.getBallot) });
        // })
        // rowParam.itemLabels.push("投票數");
        // const end = rowParam.data.length;
        // if (!rowParam.data[end]) { 
        //   rowParam.data[end] = []
        // }
        // rowParam.data[end].push({ value: Number(item.basic.voteCount) });
      });

      if (isHasTaiwan.value) {
        column01.value += 1;
      };
    }
    if (level02) {
      bubbleLevel2Data.value = level02.map(i => i.basic);
      bubble02.value += 1;
      const colParam2 = JSON.parse(JSON.stringify(colParam));
      level02.forEach((item) => { 
        // console.log(item);
        // column Data
        colParam2.xLabels.push(item.basic.label);
        item.filter.forEach((i, index) => {
          if (!colParam2.y1Data[index]) {
            colParam2.y1Data[index] = [];
          }
          colParam2.y1Data[index].push({ value: i.getBallot });
          colParam2.y1ItemLabels.push(i.label);
          colParam2.id.push(i.candidateNo)
        });
        columnLevel2Data.value = colParam2;
        // row Data
        // rowParam.yLabels.push(item.basic.label);
        // item.filter.forEach((i,index) => { 
        //   if (!rowParam.data[index]) {
        //     console.log('data:',rowParam.data[index]);
        //     rowParam.data[index] = [];
        //   };
        //   rowParam.itemLabels.push(i.label);
        //   rowParam.data[index].push({ value: Number(i.getBallot) });
        // })
        // rowParam.itemLabels.push("投票數");
        // const end = rowParam.data.length;
        // if (!rowParam.data[end]) { 
        //   rowParam.data[end] = []
        // }
        // rowParam.data[end].push({ value: Number(item.basic.voteCount) });
      })
      column02.value += 1;
    }
    if (level03) {
      bubbleLevel3Data.value = level03.map(i => i.basic);
      bubble03.value += 1;
      const colParam3 = JSON.parse(JSON.stringify(colParam));
      level03.forEach((item) => { 
        colParam3.xLabels.push(item.basic.label);
        item.filter.forEach((i, index) => {
          if (!colParam3.y1Data[index]) {
            colParam3.y1Data[index] = [];
          }
          colParam3.y1Data[index].push({ value: i.getBallot });
          colParam3.y1ItemLabels.push(i.label);
          colParam3.id.push(i.candidateNo)
        });
        columnLevel3Data.value = colParam3;
        // row Data
        rowParam.yLabels.push(item.basic.label);
        item.filter.forEach((i, index) => {
          console.log(i); 
          if (!rowParam.data[index]) {
            rowParam.data[index] = [];
          };
          rowParam.itemLabels.push(i.label);
          rowParam.data[index].push({ value: Number(i.getBallot) });
          // const end = rowParam.data.length;
          // if (!rowParam.data[end]) { 
          //   rowParam.data[end] = []
          // }
          // rowParam.data[end].push({ value: Number(item.basic.voteCount) });
        })
        rowParam.itemLabels.push("投票數");
        // const end = rowParam.data.length;
        // if (!rowParam.data[end]) { 
        //   rowParam.data[end] = []
        // }
        // rowParam.data[end].push({ value: Number(item.basic.voteCount) });
      })
      column03.value += 1;
    }
    rowKey.value += 1;
    rowData.value = rowParam;
  })();
}

onMounted(() => { 
  city.value = renderList('city');
  dist.value = renderList('0');
  fetchData();
  isHasTaiwan.value = true;
})
</script>
