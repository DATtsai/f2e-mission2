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
import { ref } from 'vue'
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartColumnTwoScalesBarGroupAndLine } from '@bpchart/d3-modules/chartColumnTwoScales'

const params = ref({
  y1Colors: ['#FFAB6F','#63ABE9','#8EC48E'],
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
      return `
        得票數<br>${d.dataset.y1Data.map((i, index) => {
          let name;
          index === 0 ? name = '宋楚瑜、余湘 : ': false;
          index === 1 ? name = '韓國瑜、張善政 : ': false;
          index === 2 ? name = '蔡英文、賴清德 : ': false;
          return `${ name + i[0].value } 票`
        }).join("<br>")}
      `
    }
  }
})

const dataset = ref({
  "y1Data": [],
  "y2Data": [],
  "xLabels": [],
  "y1ItemLabels": [
    "宋楚瑜、余湘",
    "韓國瑜、張善政",
    "蔡英文、賴清德"
  ],
  "y2ItemLabels": []
});

const props = defineProps(['columnData']);
const xlabel = [];

const dataList = props.columnData;
dataList.forEach((item) => {
  item.filter.forEach((filterItem) => {
    const candidateIndex = filterItem.candidateNo - 1; 
    if (!dataset.value.y1Data[candidateIndex]) {
      dataset.value.y1Data[candidateIndex] = [];
    }
    dataset.value.y1Data[candidateIndex].push({ value: filterItem.getBallot });
  });
  dataset.value.xLabels.push(item.basic.label);
});
console.log('dataset', dataset)

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
