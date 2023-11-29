<template>
  <div>
    <D3ModuleContainer
      :module="ChartRowBarLayout"
      :dataset="dataset"
      :params="params"
    />
    <div class="legend-group">
      <div class="legend-bar">
        <div class="color c-orange"></div>
        <span>宋楚瑜、余湘</span>
      </div>
      <div class="legend-bar">
        <div class="color c-blue"></div>
        <span>韓國瑜、張善政</span>
      </div>
      <div class="legend-bar">
        <div class="color c-green"></div>
        <span>蔡英文、賴清德</span>
      </div>
      <div class="legend-bar">
        <div class="color c-red"></div>
        <span>投票數</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartRowBarLayout } from '@bpchart/d3-modules/chartRow'

const props = defineProps(['rowData']);
const dataset = ref({
  data: [],
  yLabels: [],
  itemLabels: [
    '宋楚瑜、余湘',
    '韓國瑜、張善政',
    '蔡英文、賴清德',
    '投票數'
  ],
})

<<<<<<< HEAD
if (props.rowData) { 
  // console.log(props.rowData);
  dataset.value = props.rowData;
}
=======
props.rowData.forEach((item) => { 
  dataset.value.yLabels.push(item.basic.label);
  item.filter.forEach(i => { 
    const candidateIndex = i.candidateNo - 1; 
    if (!dataset.value.data[candidateIndex]) {
      dataset.value.data[candidateIndex] = [];
    };
    dataset.value.data[candidateIndex].push({ value: Number(i.getBallot) });
  })
  if (!dataset.value.data[3]) { 
    dataset.value.data[3] = []
  }
  dataset.value.data[3].push({ value: Number(item.basic.voteCount) });
})
>>>>>>> 5837adc45a1239444846faf9e99cbfab18fe1f27

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
        barWidth: 20,
      },
      {
        stackAmount: 1,
        barwidth: 5,
        barR: 10
      },
      {
        stackAmount: 0,
        barWidth: 20,
      }
    ],
    barPadding: 10,
    barGroupPadding: 30,
    labelTextMethod: (e,t)=>String(e.value),
    labelPositionMethod: (e,a)=>3===a[0]?"right":"top",
    labelStyleMethod: (e,a)=>3===a[0]?"font-weight:800;font-size:18px;fill:#FF685E":"",
    labelFontSizeMethod: (e,t)=>10,
    labelColorMethod: (e,t)=>'#ffffff',
    labelPadding: 5,
    tooltipAside: {
      templateHtml: (d) => {
        return `
          ${d}
        `
      }
    }
  }
})
</script>