<template>
  <div>
    <D3ModuleContainer
      :module="ChartColumnTwoScalesBarGroupAndLine"
      :dataset="dataset"
      :params="params"
    />
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
    barGroupPadding: 30,
    barWidth: 16
  },
  // tooltipAside: {
  //   templateHtml: (d) => {
  //     return `
  //     得票數<br>
  //     ${d.dataset.y1ItemLabels[0]} : ${d.dataset.y1Data[0][0].value}<br>
  //     ${d.dataset.y1ItemLabels[1]} : ${d.dataset.y1Data[1][0].value}<br>
  //     ${d.dataset.y1ItemLabels[2]} : ${d.dataset.y1Data[2][0].value}<br>
  //     `
  //   }
  // }
})

const dataset = {
  "y1Data": [],
  "y2Data": [],
  "xLabels": [],
  "y1ItemLabels": [
    "宋楚瑜",
    "韓國瑜",
    "蔡英文"
  ],
  "y2ItemLabels": []
};
const props = defineProps(['columnData']);
const xlabel = [];

if (props.columnData && !Array.isArray(props.columnData)) {
  const label = props.columnData.basic.label;
  xlabel.push(label);
  dataset.xLabels.push(xlabel);
  const ballotValue = props.columnData.filter.map((e) => {
    let list = [];
    list.push({ value: e.getBallot });
    dataset.y1ItemLabels.push(e.label)
    return list
  })
  dataset.y1Data = ballotValue;
}
if(Array.isArray(props.columnData) && props.columnData.length > 0){
  const dataList = props.columnData;
  dataList.forEach((item) => {
    item.filter.forEach((filterItem) => {
      const candidateIndex = filterItem.candidateNo - 1; 
      if (!dataset.y1Data[candidateIndex]) {
        dataset.y1Data[candidateIndex] = [];
      }
      dataset.y1Data[candidateIndex].push({ value: filterItem.getBallot });
    });
    dataset.xLabels.push(item.basic.label);
  });
}
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
