<template>
  <div>
    <D3ModuleContainer
      :module="ChartColumnLine"
      :dataset="dataset"
    />
  </div>
</template>
<script setup>
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartColumnLine } from '@bpchart/d3-modules/chartColumn'

const dataset = {
  "data": [[
    {
      "value": 76.3098
    },
    {
      "value": 76.5973
    },
    {
      "value": 75.7679
    },
    {
      "value": 77.4424
    },
  ],],
  "xLabels": [
    "台北市",
    "新竹市",
    "台南市",
    "高雄市",
  ],
  "itemLabels": [
    "投票率",
  ]
}

</script>