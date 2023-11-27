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
    <!-- <D3ModuleContainer
      :module="ChartBubbleGroup"
      :data="dataset"
      :params="params2"
    /> -->
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
    "#355070",
    "#646464"
  ],
  types: [
    "選舉人數",
    "發出選票數",
    "剩餘選票數",
    "有效票數",
    "無效票數",
    "未投票數",
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
if (props.dataList) {
  const { level01, level02, level03 } = props.dataList;
  if (level01) {
    // pollbook 選舉人數、ballot 發出選票數、remain 剩餘選票數、voteCount 投票數、validBallot 有效票數、invalidBallot 無效票數、voteRatio投票率、voteFailCount 已領未投票數
    for (let i = 0; i < level01.length; i++) {
      const { label, pollbook, remain, validBallot, invalidBallot, voteFailCount, ballot } = level01[i];
      const data01_1 = { id: `${label}_選舉人數`, label: label, value: Number(pollbook), type: '選舉人數' };
      const data01_2 = { id: `${label}_選舉人數`, label: label, value: Number(remain), type: '剩餘選票數' };
      const data01_3 = { id: `${label}_有效票數`, label: label, value: Number(validBallot), type: '有效票數' };
      const data01_4 = { id: `${label}_無效票數`, label: label, value: Number(invalidBallot), type: '無效票數' };
      const data01_5 = { id: `${label}_未投票數`, label: label, value: Number(voteFailCount), type: '未投票數' };
      const data01_6 = { id: `${label}_發出選票數`, label: label, value: Number(ballot), type: '發出選票數' };
      dataset.push(data01_1, data01_2, data01_3, data01_4, data01_5, data01_6);
    }
  }
  if (level02) {
    for (let i = 0; i < level02.length; i++) {
      const { label, pollbook, remain, validBallot, invalidBallot, voteFailCount, ballot } = level02[i];
      const data02_1 = { id: `${label}_選舉人數`, label: label, value: Number(pollbook), type: '選舉人數' };
      const data02_2 = { id: `${label}_選舉人數`, label: label, value: Number(remain), type: '剩餘選票數' };
      const data02_3 = { id: `${label}_有效票數`, label: label, value: Number(validBallot), type: '有效票數' };
      const data02_4 = { id: `${label}_無效票數`, label: label, value: Number(invalidBallot), type: '無效票數' };
      const data02_5 = { id: `${label}_未投票數`, label: label, value: Number(voteFailCount), type: '未投票數' };
      const data02_6 = { id: `${label}_發出選票數`, label: label, value: Number(ballot), type: '發出選票數' };
      dataset.push(data02_1, data02_2, data02_3, data02_4, data02_5, data02_6);
    }
  }
  if (level03) {
    for (let i = 0; i < level03.length; i++) {
      const { label, pollbook, remain, validBallot, invalidBallot, voteFailCount, ballot } = level03[i];
      const data03_1 = { id: `${label}_選舉人數`, label: label, value: Number(pollbook), type: '選舉人數' };
      const data03_2 = { id: `${label}_選舉人數`, label: label, value: Number(remain), type: '剩餘選票數' };
      const data03_3 = { id: `${label}_有效票數`, label: label, value: Number(validBallot), type: '有效票數' };
      const data03_4 = { id: `${label}_無效票數`, label: label, value: Number(invalidBallot), type: '無效票數' };
      const data03_5 = { id: `${label}_未投票數`, label: label, value: Number(voteFailCount), type: '未投票數' };
      const data03_6 = { id: `${label}_發出選票數`, label: label, value: Number(ballot), type: '發出選票數' };
      dataset.push(data03_1, data03_2, data03_3, data03_4, data03_5, data03_6);
    }
  }
}
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