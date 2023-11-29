<template>
  <div>
    <D3ModuleContainer
      :module="ChartRowBarLayout"
      :dataset="dataset"
      :params="params"
    />
    <div class="legend-group" style="margin-bottom: 24px">
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
import { ref, computed } from 'vue'
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartRowBarLayout } from '@bpchart/d3-modules/chartRow'

const candidateColor = {1: '#FFAB6F', 2: '#63ABE9', 3: '#8EC48E', voteCount: '#FF685E' }
const candidateLabel = {1: '宋楚瑜、余湘', 2: '韓國瑜、張善政', 3: '蔡英文、賴清德', voteCount: '投票數'}
const params = ref({
  colors: [],
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
        barWidth: 10,
        barR: 5
      },
    ],
    barPadding: 10,
    barGroupPadding: 30,
    labelTextMethod: (e,t)=>String(e.value),
    labelPositionMethod: (e,a)=> a[0] === (dataset.value.itemLabels.length - 1) ? "right" : "top",
    labelStyleMethod: (e,a)=>a[0] === (dataset.value.itemLabels.length - 1) ? "font-weight:800;font-size:18px;fill:#FF685E" : "",
    labelFontSizeMethod: (e,t)=>10,
    labelColorMethod: (e,t)=>'#ffffff',
    labelPadding: 5,
  },
  tooltipAside: {
    templateHtml: (d) => {
      if(d.itemData.length) {
        let str = d.yLabel + ' '
        let voteCount = d.groupData[d.groupData.length - 1].value
        let strList = d.groupData.map(item => `${item.itemLabel + ' : ' + item.value + ' (' + ((item.value / voteCount) * 100).toFixed(2) + '%)' }`)
        str += strList[d.groupData.length - 1] + '<br><hr>'
        if(d.itemData[0].itemIndex + 1 === d.groupData.length) {
          str += strList.filter((item, index) => index !== d.groupData.length - 1).join('<br>')
        }
        else {
          str += strList.filter((item, index) => index == d.itemData[0].itemIndex).join('<br>')
        }
        return str
      }
    }
  }
})
const dataset = ref({
  data: [],
  yLabels: [],
  itemLabels: [],
})
const props = defineProps(['rowData']);
const dataList = computed(() => props.rowData)
dataList.value.forEach(item => { 
  dataset.value.yLabels.push(item.basic.label);
  params.value.graphicRowBarLayout.groupLayout[0].stackAmount = item.filter.length
  if(!params.value.colors.length) params.value.colors = item.filter.map(element => candidateColor[element.candidateNo])
  if(!dataset.value.itemLabels.length) dataset.value.itemLabels = item.filter.map(element => candidateLabel[element.candidateNo])
  item.filter.forEach((element, index) => {
    if(!dataset.value.data[index]) dataset.value.data[index] = []
    dataset.value.data[index].push({ value: Number(element.getBallot) })
  })
  if(item.filter.length) {
    let lastIndex = item.filter.length
    if(!params.value.colors.length[lastIndex]) params.value.colors[lastIndex] = candidateColor['voteCount']
    if(!dataset.value.itemLabels[lastIndex]) dataset.value.itemLabels[lastIndex] = candidateLabel['voteCount']
    if(!dataset.value.data[lastIndex]) dataset.value.data[lastIndex] = []
    dataset.value.data[lastIndex].push({ value: Number(item.basic.voteCount)})
  }
})

</script>