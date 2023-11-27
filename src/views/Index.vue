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
    <div class="chart" id="chart" v-if="isClick">
      <div class="filter" id="filterBar">
        <el-select v-model="cityValue" @change="setCity()" multiple collapse-tags placeholder="縣市（可複選）">
          <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="distValue" multiple collapse-tags placeholder="鄉鎮市區（可複選）" >
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
      <div class="chart-block" v-if="bubbleLevel1Data">
        <div class="chart-name">基本投票統計</div>
        <div class="toolbar">
        </div>
        <div>
          <ChartBubbleGroup :data-list="bubbleLevel1Data"/>
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
          <div class="legend-bar">
            <div class="color gray"></div>
            <span>未投票數</span>
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

const isClick = ref(false)
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

const filterBar = ref();
const position = ref();

const clicktoShow = async () => { 
  isClick.value = true;
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

const bubbleLevel1Data = ref([]);



const setCity = () => { 
  let list = [];
  for (let i = 0; i < cityValue.value.length; i++) { 
    console.log(cityValue.value);
    const res = renderList(cityValue.value[i])
    const { data } = res[0];
    list.push( ...data );
  }
  dist.value = list;
}

const fetchData = () => {
  let req = {
    basic: { level01: ['0'], level02: ['000', '001'], level03: ['00000'] }, filter: { candidate: [3] }
  };
  (async () => {
    let result = await searchBallot(req)
    console.log('result',result);
    bubbleLevel1Data.value = { ...result }
    console.log(bubbleLevel1Data.value);
  })();
}

onMounted(() => { 
  city.value = renderList('city');
  fetchData()
})
</script>
