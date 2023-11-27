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
        <el-select v-model="candidateValue" multiple collapse-tags placeholder="候選人（可複選）">
          <el-option
            v-for="item in candidate"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="chart-block" >
        <div v-if="bubbleLevel1Data || bubbleLevel1Data.label !== ''">
          <div class="chart-name">基本投票統計</div>
          <div>
            <ChartBubbleGroup :data-list="bubbleLevel1Data" :key="bubble01"/>
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
            <ChartBubbleGroup :data-list="bubbleLevel2Data" :key="bubble02"/>
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
            <ChartBubbleGroup :data-list="bubbleLevel3Data" :key="bubble03"/>
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
      <!-- <div class="chart-block">
        <div class="chart-name">圖表名稱</div>
        <div class="toolbar">
          <el-select v-model="value" clearable placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        </div>
        <div>
          <ChartRowBarLayout />
        </div>
        <div class="legend-group">
          <div class="legend-bar">
            <div class="color"></div>
            <span>選舉人數</span>
          </div>
          <div class="legend-line">
            <div class="color"></div>
            <span>選舉人數</span>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import ChartArcPie from '@/components/ChartArcPie.vue'
import ChartColumnTwoScalesBarGroupAndLine from '@/components/ChartColumnTwoScalesBarGroupAndLine.vue'
import ChartRow from '@/components/ChartRow.vue'
import ChartColumn from '@/components/ChartColumn.vue'
import ChartRowBarLayout from '@/components/ChartRowBarLayout.vue'
import ChartBubbleGroup from '@/components/ChartBubbleGroup.vue'
import searchBallot from '@/mockAPI'
import renderList from '@/assets/js/renderList.js'
import { ref, nextTick, onMounted } from 'vue'

const isClickToShow = ref(false)
const cityValue = ref(['0'])
const distValue = ref([])
const candidateValue = ref([])
const city = ref([])
const dist = ref([])
const candidate = [
  {
    value: '1',
    label: '蔡英文'
  },
  {
    value: '2',
    label: '韓國瑜'
  },
  {
    value: '3',
    label: '宋楚瑜'
  }
]

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
  dist.value = list;
  fetchData();
};


const fetchData = () => {
  let basicParam = {};
  let level2 = [];
  delete basicParam.level01;
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
  }
  let req = {
    basic: { ...basicParam }, filter: { }
  };
  (async () => {
    let result = await searchBallot(req);
    const { level01, level02, level03 } = result;
    if (level01) {
      bubbleLevel1Data.value = level01[0].basic;
      bubble01.value += 1;
    }
    if (level02) {
      bubbleLevel2Data.value = level02.map(i => i.basic);
      bubble02.value += 1;
    }
    if (level03) {
      bubbleLevel3Data.value = level03.map(i => i.basic);
      bubble03.value += 1;
    }
  })();
}

onMounted(() => { 
  city.value = renderList('city');
  dist.value = renderList('0');
  fetchData()
})
</script>
