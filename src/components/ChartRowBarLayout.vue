<template>
  <div>
    <D3ModuleContainer
      :module="ChartRowBarLayout"
      :dataset="dataset"
      :params="params"
    />
  </div>
</template>
<script setup>
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartRowBarLayout } from '@bpchart/d3-modules/chartRow'

const dataset = {
  "data": [
    [ // 宋楚瑜、余湘
      {value: 70769}, {value: 14103}, {value: 41075}, {value: 55309} // 台北市、新竹市、台南市、高雄市
    ],
    [ // 韓國瑜、張善政
      {value: 685830}, {value: 102725}, {value: 339702}, {value: 610896} 
    ],
    [ // 蔡英文、賴清德
      {value: 875854}, {value: 144274}, {value: 786471}, {value: 1097621} 
    ],
    [ // 投票數
      {value: 1653834}, {value: 264525}, {value: 1179589}, {value: 1780832}
    ]
  ],
  "yLabels": [
    "台北市",
    "新竹市",
    "台南市",
    "高雄市",
  ],
  "itemLabels": [
    "宋楚瑜、余湘",
    "韓國瑜、張善政",
    "蔡英文、賴清德",
    "投票數"
  ]
}

const params = {
  "colors": [
    '#FFAB6F','#63ABE9','#8EC48E','#FF685E'
  ],
  "padding": {
    "top": 50,
    "right": 70,
    "bottom": 50,
    "left": 100
  },
  "axisRow": {
    "yLabel": "",
    "xLabel": "",
  },
  "graphicRowBarLayout": {
    "groupLayout": [
      {
        "stackAmount": 3,
        "barWidth": 24,
        // "barR": 10
      },
      {
        "stackAmount": 1,
        "barwidth": 12,
        "barR": 2
      }
    ],
    "barPadding": 5,
    "barGroupPadding": 30,
    "labelTextMethod": (e,t)=>String(e.value),
    "labelPositionMethod": (e,a)=>3===a[0]?"right":"top",
    "labelStyleMethod": (e,a)=>3===a[0]?"font-weight:800;font-size:18px;fill:#FF685E":"",
    "labelFontSizeMethod": (e,t)=>10,
    "labelColorMethod": (e,t)=>'#ffffff',
    "labelPadding": 5
  }
}
</script>