<template>
  <div>
    <D3ModuleContainer
      :module="ChartArcPie"
      :dataset="dataset"
      :params="params"
    />
    選區票數說明：(需另外切版)
    <ul>
      <li>中山區</li>
      <li>有效票數：141,880</li>
      <li>無效票數：1,922</li>
      <li>投票數：143,802</li>
      <li>投票率：75.6097％</li>
    </ul>
  </div>
</template>
<script setup>
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartArcPie } from '@bpchart/d3-modules/chartArc'

const dataset = {
  data: [
    {
      "itemLabel": "宋楚瑜、余湘",
      "value": 6367
    },
    {
      "itemLabel": "韓國瑜、張善政",
      "value": 56491
    },
    {
      "itemLabel": "蔡英文、賴清德",
      "value": 79022
    },
  ],
  itemLabels: [
      "宋楚瑜、余湘",
      "韓國瑜、張善政",
      "蔡英文、賴清德",
  ],
  arcLabels: [
    "宋楚瑜、余湘",
    "韓國瑜、張善政",
    "蔡英文、賴清德",
  ]
}

const params = {
  "graphicArcPie": {
    "outerMouseoverRadius": 1,
    "outerRadius": 0.95,
    "innerRadius": 0.7,
    "padAngle": 0.02,
    "cornerRadius": 0
  },
  "centerText": (e,t,a=1)=>"mouseover"===t?[e.arcLabel,e.datum.value]:["蔡英文、賴清德",Math.round(e.dataset.data.reduce((e,t)=>e+t.value,0)*a)],
  "centerTextStyles": [
    { 
      "font-weight": "bold",
      "text-anchor": "middle",
      "pointer-events": "none",
      "dominant-baseline": "middle",
      "font-size": 20,
      "fill": "#000"
    },
    {
      "pointer-events": "none",
      "dominant-baseline": "middle",
      "text-anchor": "middle",
      "font-size": 18,
      "fill": "rgb(96, 98, 102)"
    }
  ],
  "centerTextAttrs": [
    {
      "transform": "translate(0, -12)"
    },
    {
      "transform": "translate(0, 48)"
    }
  ],
  colors: ['#FF6310','#000095','#1B9431']
}
</script>