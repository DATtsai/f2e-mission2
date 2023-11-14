<template>
  <div>
    hi <el-button>Default</el-button>
    <D3ModuleContainer
      :module="ChartColumnBar"
      :dataset="dataset"
    />
  </div>
</template>

<script setup>
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartColumnBar } from '@bpchart/d3-modules/chartColumn'

const dataset = {
  "data": [
    {
      "value": 55
    },
    {
      "value": 150
    },
    {
      "value": 45
    },
    {
      "value": 2
    },
    {
      "value": 3
    },
    {
      "value": 30
    }
  ],
  "xLabels": [
    "心",
    "讚",
    "哈",
    "怒",
    "嗚",
    "哇"
  ],
  "itemLabels": []
}
</script>