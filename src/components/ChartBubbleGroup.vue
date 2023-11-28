<template>
  <div>
    <div class="type-btns">
      <el-row>
        <el-button @click="isChecked('center')" :class="[ btnNow === 'center' ? 'checked':'' ]">預設</el-button>
        <el-button @click="isChecked('type')" :class="[ btnNow === 'type' ? 'checked':'' ]">分類</el-button>
      </el-row>
    </div>
    <D3ModuleContainer
      :key="bubbleId"
      :module="ChartBubbleGroup"
      :data="dataset"
      :params="params"
    />
    <div class="legend-group" style="margin-bottom: 24px">
      <div class="legend-bar">
        <div class="color pink"></div>
        <span>選舉人數</span>
      </div>
      <div class="legend-bar">
        <div class="color green"></div>
        <span>發出票數</span>
      </div>
      <div class="legend-bar">
        <div class="color purple"></div>
        <span>剩餘選票數</span>
      </div>
      <div class="legend-bar">
        <div class="color orange"></div>
        <span>有效票數</span>
      </div>
      <div class="legend-bar">
        <div class="color blue"></div>
        <span>無效票數</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import D3ModuleContainer from '@bpchart/vue/components/D3ModuleContainer.vue'
import { ChartBubbleGroup } from '@bpchart/d3-modules/chartBubbleGroup'
import { watch, ref } from 'vue'

const props = defineProps(['dataList'])

const params = ref({
  "colors": [
    "#EA378B",
    "#20AD93",
    "#7C7EB9",
    "#C76C66",
    "#355070"
  ],
  types: [
    "選舉人數",
    "發出選票數",
    "剩餘選票數",
    "有效票數",
    "無效票數",
  ],
  collisionSpacing: 2,
  groupMode: "center",
  tooltipFollowing: {
    templateHtml: (d) => {
      return `${d.label}<br/>${d.type}：${d.value}`
     }
  }
})

const btnNow = ref('center');
const bubbleId = ref(0);
const isChecked = (type) => {
  btnNow.value = type;
  params.value['groupMode'] = type;
  bubbleId.value += 1;
};

const dataset = [];

props.dataList.map(data => {
  const { label, pollbook, remain, validBallot, invalidBallot, ballot } = data['basic'];
  const data1 = { id: `${label}_選舉人數`, label: label, value: Number(pollbook), type: '選舉人數' };
  const data2 = { id: `${label}_選舉人數`, label: label, value: Number(remain), type: '剩餘選票數' };
  const data3 = { id: `${label}_有效票數`, label: label, value: Number(validBallot), type: '有效票數' };
  const data4 = { id: `${label}_無效票數`, label: label, value: Number(invalidBallot), type: '無效票數' };
  const data5 = { id: `${label}_發出選票數`, label: label, value: Number(ballot), type: '發出選票數' };
  dataset.push(data1, data2, data3, data4, data5);
})
</script>

<style scoped>
.type-btns {
  display: flex;
  justify-content: center;
  & .el-button {
    background-color: var(--color-black-soft);
    border:none;
    margin-left: -1px;
  }
  @media (max-width: 768px) {
    margin-top: 1rem;
    justify-content: start;
  }
}

.checked {
  background-color: var(--color-background-mute) !important;
  color: #fff !important;
}

</style>