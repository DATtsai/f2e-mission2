<template>
  <div class="page">
    <div class="landing">
      <div class="map-box">
        <MapCounty @hoverID="hoverID" @clickID="clickID" />
        <!-- <img class="tw-map" src="@/assets/tw.svg" alt="台灣地圖"> -->
      </div>
      <div class="content">
        <img class="logo" src="@/assets/logo.svg" alt="決戰2020總統大選"> 
        <div class="nowrap"><h1 class="region">{{landingInfo.label}}</h1><h1>投票概況</h1></div>
        <div class="des">將滑鼠移至縣市查看各選區投票概況</div>
        <div class="data-number">
          <h2>投票數：<span>{{landingInfo.voteCount}}</span></h2>
          <h2>投票率：<span>{{landingInfo.voteRatio}}%</span></h2>
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
        <el-select v-model="distValue" @change="fetchData(getReq(['level03']))" multiple collapse-tags placeholder="鄉鎮市區（可複選）" >
          <el-option
            v-for="item in dist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="candidateValue" @change="fetchData(getReq(['level01', 'level02', 'level03', 'candidate']))" multiple collapse-tags placeholder="候選人（可複選）">
          <el-option
            v-for="item in candidate"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 泡泡圖 -->
      <div class="bubbleChart chart-block">
        <!-- todo: 確認 level01 資料 -->
        <div class="chart-name">基本投票統計</div>
        <div v-if="level01Data.length">
          <div class="chart-container">
            <ChartBubbleGroup :data-list="level01Data" :key="`泡泡${refreshKey.level01}`"/>
          </div>
        </div>
        <div v-if="level02Data.length">
          <div class="chart-container">
            <ChartBubbleGroup :data-list="level02Data" :key="`泡泡${refreshKey.level02}`"/>
          </div>
        </div>
        <div v-if="level03Data.length">
          <div class="chart-container">
            <ChartBubbleGroup :data-list="level03Data" :key="`泡泡${refreshKey.level03}`"/>
          </div>
        </div>
      </div>
      <!-- 長條圖 -->
      <div class="BarChart chart-block">
        <div class="chart-name">候選人選區得票數</div>
        <div v-if="level01Data.length">
          <div class="chart-container">
            <ChartColumnTwoScalesBarGroupAndLine :column-data="level01Data" :key="`長條${refreshKey.level01}`"/>
          </div>
        </div>
        <div v-if="level02Data.length">
          <div class="chart-container">
            <ChartColumnTwoScalesBarGroupAndLine :column-data="level02Data" :key="`長條${refreshKey.level02}`"/>
          </div>
        </div>
        <div v-if="level03Data.length">
          <div class="chart-container">
            <ChartColumnTwoScalesBarGroupAndLine :column-data="level03Data" :key="`長條${refreshKey.level03}`"/>
          </div>
        </div>
      </div>
      <!-- 縱向圖 -->
      <div class="RowBarChart chart-block">
        <div class="chart-name">候選人選區得票比率</div>
        <div v-if="level01Data.length">
          <div class="chart-container">
            <ChartRowBarLayout :row-data="level01Data" :key="`比例${refreshKey.level01}`"/>
          </div>
        </div>        
        <div v-if="level02Data.length">
          <div class="chart-container">
            <ChartRowBarLayout :row-data="level02Data" :key="`比例${refreshKey.level02}`"/>
          </div>
        </div>
        <div v-if="level03Data.length">
          <div class="chart-container">
            <ChartRowBarLayout :row-data="level03Data" :key="`比例${refreshKey.level03}`"/>
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
import MapCounty from '@/components/MapCounty.vue'
import searchBallot from '@/mockAPI'
import renderList from '@/assets/js/renderList.js'
import { ref, nextTick, onMounted, computed } from 'vue'

// 地圖資料互動
const landingInfo = ref({})
const countyData = ref({})

const hoverID = (id) => {
  let matchInfo = countyData.value?.level02.filter(item => item.id === id)[0] || countyData.value?.level01[0] 
  landingInfo.value = matchInfo.basic
}

const clickID = (id) => {
  cityValue.value = [id]
  setCity()
  clicktoShow()
}

(async () => {
  countyData.value = await searchBallot({ basic: { level01: [], level02: [] }})
  landingInfo.value = countyData.value?.level01[0].basic
})()

const isClickToShow = ref(false)
const countryValue = computed(() => cityValue.value.findIndex(item => item === '0') > -1 ? ['0'] : [])
const cityValue = ref(['0'])
const distValue = ref([])
const candidateValue = ref([])
const city = ref([])
const dist = ref([])
const candidate = [
  {
    value: '3',
    label: '蔡英文、賴清德'
  },
  {
    value: '2',
    label: '韓國瑜、張善政'
  },
  {
    value: '1',
    label: '宋楚瑜、余湘'
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
const level01Data = ref([])
const level02Data = ref([])
const level03Data = ref([])
const refreshKey = ref({level01: 0, level02: 0, level03: 0})

const getReq = (config) => { // config: []
  let basic = {}
  let filter = {}
  for(let item of config) {
    switch (item){
      case 'level01':
        if(countryValue.value.length) basic[item] = countryValue.value
        break
      case 'level02':
        if(cityValue.value.filter(item => item !== '0').length) basic[item] = cityValue.value.filter(item => item !== '0')
        break
      case 'level03':
        if(distValue.value.length) basic[item] = distValue.value
        break
      case 'candidate':
        if(candidateValue.value.length) filter[item] = candidateValue.value
        break
    }
  }
  return { basic, filter }
}

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

  fetchData(getReq(['level01', 'level02']));
};

const fetchData = (req = {basic: {}}) => {
  (async () => {
    let result = await searchBallot(req);
    const { level01, level02, level03 } = result;
    if (level01) {
      level01Data.value = level01
      refreshKey.value.level01 += 1
    }
    if (level02) {
      level02Data.value = level02
      refreshKey.value.level02 += 1
    }
    if (level03) {
      level03Data.value = level03
      refreshKey.value.level03 += 1
    }
  })();
}

onMounted(() => { 
  city.value = renderList('city');
  dist.value = renderList('0');
  fetchData(getReq(['level01']));
  isHasTaiwan.value = true;
})
</script>
