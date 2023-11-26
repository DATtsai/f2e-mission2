<template>
  <div>
    <div class="type-btns">
      <el-row>
        <el-button @click="isChecked('center')" :class="[ btnNow === 'center' ? 'checked':'' ]">預設</el-button>
        <el-button @click="isChecked('type')" :class="[ btnNow === 'type' ? 'checked':'' ]">分類</el-button>
      </el-row>
    </div>
    <D3ModuleContainer
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

const props = defineProps(['groupMode'])

const dataset = [
  { id: '台北市_選舉人數', label: '台北市', value: 2167264, type: '選舉人數'},
  { id: '新竹市_選舉人數', label: '新竹市', value: 345345, type: '選舉人數'},
  { id: '台南市_選舉人數', label: '台南市', value: 1556845, type: '選舉人數'},
  { id: '高雄市_選舉人數', label: '高雄市', value: 2299558, type: '選舉人數'},
  { id: '台北市_投票數', label: '台北市', value: 1653834, type: '投票數'},
  { id: '新竹市_投票數', label: '新竹市', value: 264525, type: '投票數'},
  { id: '台南市_投票數', label: '台南市', value: 1179589, type: '投票數'},
  { id: '高雄市_投票數', label: '高雄市', value: 1780832, type: '投票數'},
  { id: '台北市_有效票數', label: '台北市', value: 1632453, type: '有效票數'},
  { id: '新竹市_有效票數', label: '新竹市', value: 261102, type: '有效票數'},
  { id: '台南市_有效票數', label: '台南市', value: 1167248, type: '有效票數'},
  { id: '高雄市_有效票數', label: '高雄市', value: 1763826, type: '有效票數'},
  { id: '台北市_無效票數', label: '台北市', value: 21381, type: '無效票數'},
  { id: '新竹市_無效票數', label: '新竹市', value: 3423, type: '無效票數'},
  { id: '台南市_無效票數', label: '台南市', value: 12341, type: '無效票數'},
  { id: '高雄市_無效票數', label: '高雄市', value: 17006, type: '無效票數'},
  { id: '台北市_未投票數', label: '台北市', value: 143, type: '未投票數'},
  { id: '新竹市_未投票數', label: '新竹市', value: 8, type: '未投票數'},
  { id: '台南市_未投票數', label: '台南市', value: 22, type: '未投票數'},
  { id: '高雄市_未投票數', label: '高雄市', value: 12, type: '未投票數'},
]

const params = ref({
  "colors": [
    "#4A4AFF",
    "#0080FF",
    "#00E3E3",
    "#02F78E",
    "#00EC00"
  ],
  types: [
    "選舉人數",
    "投票數",
    "有效票數",
    "無效票數",
    "未投票數",
  ],
  collisionSpacing: 2,
  groupMode: 'center',
  tooltipFollowing: {
    templateHtml: (d) => {
      return `${d.label}<br/>選舉人數：${d.value}`
     }
  }
})

const params2 = {
  "colors": [
    "#4A4AFF",
    "#0080FF",
    "#00E3E3",
    "#02F78E",
    "#00EC00"
  ],
  types: [
    "選舉人數",
    "投票數",
    "有效票數",
    "無效票數",
    "未投票數",
  ],
  collisionSpacing: 2,
  groupMode: 'type'
}

const btnNow = ref('center')
const isChecked = (type) => { 
  btnNow.value = type
}

watch(()=>props.groupMode, (val)=>{
  params.value.groupMode = val
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