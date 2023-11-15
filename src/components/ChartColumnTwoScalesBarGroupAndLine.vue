<template>
  <div>
    <D3ModuleContainer
      :module="ChartColumnTwoScalesBarGroupAndLine"
      :dataset="dataset"
      :params="params"
    />
  </div>
</template>
<script setup>
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartColumnTwoScalesBarGroupAndLine } from '@bpchart/d3-modules/chartColumnTwoScales'

const dataset = {
  "y1Data": [
  [
    {
      "value": 70769
    },
    {
      "value": 14103
    },
    {
      "value": 41075
    },
    {
      "value": 55309
    },
  ],
  [
    {
      "value": 685830
    },
    {
      "value": 102725
    },
    {
      "value": 339702
    },
    {
      "value": 610896
    },
  ],
  [
    {
      "value": 875854
    },
    {
      "value": 144274
    },
    {
      "value": 786471
    },
    {
      "value": 1097621
    },
  ]],
  "y2Data": [[
    {
      "value": 76.3098
    },
    {
      "value": 75.7679
    },
    {
      "value": 77.4424
    },
    {
      "value": 76.5973
    },
  ],],
  "xLabels": [
    "台北市",
    "新竹市",
    "台南市",
    "高雄市",
  ],
  "y1ItemLabels": [
    "宋楚瑜、余湘",
    "韓國瑜、張善政",
    "蔡英文、賴清德",
  ],
  "y2ItemLabels": [
    "得票率",
  ],
}

const params = {
  y1Colors: ['#FF6310','#000095','#1B9431']
}
</script>