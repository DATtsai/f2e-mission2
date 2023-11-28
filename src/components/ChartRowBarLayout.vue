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
import { ref } from 'vue'
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartRowBarLayout } from '@bpchart/d3-modules/chartRow'

const props = defineProps(['rowData']);
const dataset = ref({});

if (props.rowData) { 
  console.log(props.rowData);
  dataset.value = props.rowData;
}

const params = ref({
  colors: [
    '#FFAB6F','#63ABE9','#8EC48E','#FF685E'
  ],
  padding: {
    "top": 50,
    "right": 70,
    "bottom": 50,
    "left": 100
  },
  axisRow: {
    "yLabel": "地區",
    "xLabel": "票數",
  },
  xLabelOffset: [0, 200],
  graphicRowBarLayout: {
    groupLayout: [
      {
        stackAmount: 3,
        barWidth: 10,
      },
      {
        stackAmount: 1,
        barwidth: 30,
        barR: 2
      }
    ],
    barPadding: 5,
    barGroupPadding: 30,
    labelTextMethod: (e,t)=>String(e.value),
    labelPositionMethod: (e,a)=>3===a[0]?"right":"top",
    labelStyleMethod: (e,a)=>3===a[0]?"font-weight:800;font-size:18px;fill:#FF685E":"",
    labelFontSizeMethod: (e,t)=>10,
    labelColorMethod: (e,t)=>'#ffffff',
    labelPadding: 5
  }
})
</script>