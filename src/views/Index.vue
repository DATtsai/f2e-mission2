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
        <button class="button">查看開票結果</button>
      </div>
    </div>
    <div class="chart">
      <div class="filter">
        <el-select v-model="cityValue" multiple collapse-tags clearable placeholder="縣市（可複選）">
          <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="distValue" multiple collapse-tags clearable placeholder="鄉鎮市區（可複選）" >
          <el-option
            v-for="item in dist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="candidateValue" multiple collapse-tags clearable placeholder="候選人（可複選）">
          <el-option
            v-for="item in candidate"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="chart-block">
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
      </div>
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
import { ref } from 'vue'

const cityValue = ref([])
const distValue = ref([])
const candidateValue = ref([])
const city = [
  {
    value: '01',
    label: '台北市',
  },
  {
    value: '02',
    label: '新北市',
  },
  {
    value: '03',
    label: '桃園市',
  },
  {
    value: '04',
    label: '新竹市',
  },
  {
    value: '05',
    label: '高雄市',
  },
]

const dist = [
  {
    value: '001',
    label: '信義區'
  }
]

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

const handleCheckAll = () => { 
  console.log('dd');
}
</script>
