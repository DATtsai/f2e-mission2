<template>
  <div>
    <D3ModuleContainer
      :module="ChartRowBarStack"
      :dataset="dataset"
      :params="params"
    />
  </div>
</template>
<script setup>
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartRowBarStack } from '@bpchart/d3-modules/chartRow'

const dataset = {
  "data": [[
    {
      "value": 1653834
    },
    {
      "value": 264533
    },
    {
      "value": 1179611
    },
    {
      "value": 1780844
    },
  ],
  [
    {
      "value": 513287
    },
    {
      "value": 80812
    },
    {
      "value": 377234
    },
    {
      "value": 518714
    },
  ],],
  "yLabels": [
    "台北市",
    "新竹市",
    "台南市",
    "高雄市",
  ],
  "itemLabels": [
    "發出票數",
    "剩餘票數"
  ]
}

const params = {
  "graphicRowBarStack": {
    barWidth: 20,
    barR: 5,
  }
}
</script>