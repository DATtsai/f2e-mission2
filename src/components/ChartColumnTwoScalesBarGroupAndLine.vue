<template>
  <div>
    <D3ModuleContainer
      :module="ChartColumnTwoScalesBarGroupAndLine"
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
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartColumnTwoScalesBarGroupAndLine } from '@bpchart/d3-modules/chartColumnTwoScales'

const candidateColor = {1: '#FFAB6F', 2: '#63ABE9', 3: '#8EC48E'}
const candidateLabel = {1: '宋楚瑜、余湘', 2: '韓國瑜、張善政', 3: '蔡英文、賴清德'}
const params = ref({
  y1Colors: [],
  axisColumnTwoScales: {
    xLabel: '縣市',
    y1Label: '得票數',
    y2Visible: false,
  },
  padding: {
    top: 50,
    right: 70,
    bottom: 70,
    left: 100
  },
  graphicColumnBarGroup: {
    barType: 'rect',
    barPadding: 0,
    barGroupPadding: 16,
    barWidth: 16
  },
  tooltipAside: {
    templateHtml: (d) => {
      let str = d.xLabel + ' 得票數<br><hr>'
      let index = d.xIndex
      str += d.dataset.y1Data.map((item, ind) => d.dataset.y1ItemLabels[ind] + ' : ' + item[index].value).join('<br>')
      return str
    }
  }
})
const dataset = ref({
  "y1Data": [],
  "y2Data": [],
  "xLabels": [],
  "y1ItemLabels": [],
  "y2ItemLabels": []
});
const props = defineProps(['columnData'])
const dataList = computed(() => props.columnData)
dataList.value.forEach(item => {
  dataset.value.xLabels.push(item.basic.label);
  if(!params.value.y1Colors.length) params.value.y1Colors = item.filter.map(element => candidateColor[element.candidateNo])
  if(!dataset.value.y1ItemLabels.length) dataset.value.y1ItemLabels = item.filter.map(element => candidateLabel[element.candidateNo])
  item.filter.forEach((element, index) => { 
    if(!dataset.value.y1Data[index]) dataset.value.y1Data[index] = []
    dataset.value.y1Data[index].push({ value: element.getBallot })
  })
});

</script>

<style scoped>
/* BP-Chart X軸文字RWD改垂直 */
::v-deep .xAxis .tick text {
  @media screen and (width <=768px) {
    transform-origin: -12px -12px !important;
    -webkit-writing-mode: vertical-lr !important;
    writing-mode: vertical-lr !important;
  }
}

/* ::v-deep .bpchart__bar rect {
  @media screen and (width <=768px) {
  width: 4px !important;
  }
} */
</style>
