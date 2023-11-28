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
    y2Visible: false
  },
  padding: {
    top: 50,
    right: 70,
    bottom: 50,
    left: 100
  },
  graphicColumnBarGroup: {
    barType: 'rect',
    barPadding: 1,
    barGroupPadding: 30,
    barWidth: 16
  },
  tooltipAside: {
    templateHtml: (d) => {
      return `
        得票數<br>${d.dataset.y1Data.map((i, index) => {
          let name;
          index === 0 ? name = '宋楚瑜 : ': false;
          index === 1 ? name = '韓國瑜 : ': false;
          index === 2 ? name = '蔡英文 : ': false;
          return `${ name + i[0].value } 票`
        }).join("<br>")}
      `
    }
  }
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