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
    [ // 有效票數
      {value: 1632453}, {value: 261102}, {value: 1167248}, {value: 1763826}
    ],
    [ // 無效票數
      {value: 21381}, {value: 3423}, {value: 12341}, {value: 17006}
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
    "有效票數",
    "無效票數",
    "投票數"
  ]
}

const params = {
  "colors": [
    '#FF6310','#000095','#1B9431','#8F4586','#5A5AAD',"#709EE2"
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
        "stackAmount": 2,
        "barwidth": 6,
        "barR": 10
      },
      {
        "stackAmount": 1,
        "barwidth": 12,
        "barR": 10
      }
    ],
    "barPadding": 5,
    "barGroupPadding": 30,
    "labelTextMethod": (e,t)=>String(e.value),
    "labelPositionMethod": (e,t)=>"center",
    "labelStyleMethod": (e,t)=>"",
    "labelFontSizeMethod": (e,t)=>10,
    "labelColorMethod": (e,t)=>'#ffffff',
    "labelPadding": 5
  }
}
</script>