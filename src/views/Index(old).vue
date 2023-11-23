<template>
  <div style="width: 100vh;">
    <div>
      <el-button>地圖</el-button>
      <MapCounty />
    </div>
    <div>
      <el-button>投票統計類別摘要區塊</el-button>
      <ChartBubbleGroup :groupMode="'type'" />
    </div>
    <div>
      <el-button>候選人區域比較區塊</el-button>
      <ChartColumnTwoScalesBarGroupAndLine class="child"/>
    </div>
    <div>
      <el-button>候選人各單區得票顯示區塊</el-button>
      <ChartRowBarLayout />
    </div>
    <div class="container">
      <el-button>投票統計類別摘要區塊</el-button>
      <ChartRow class="child" />
      <ChartRow class="child" />
      <ChartColumn class="child" />
    </div>
    <div class="container">
      <el-button>候選人區域比較區塊</el-button>
      <ChartColumnTwoScalesBarGroupAndLine class="child"/>
      <ChartColumnTwoScalesBarGroupAndLine class="child"/>
      <ChartColumnTwoScalesBarGroupAndLine class="child"/>
    </div>
    <div class="container">
      <el-button>候選人各單區得票顯示區塊</el-button>
      <ChartArcPie class="child" />
      <ChartArcPie class="child" />
      <ChartArcPie class="child" />
    </div>
  </div>
</template>

<script setup>
import ChartArcPie from '@/components/ChartArcPie.vue'
import ChartColumnTwoScalesBarGroupAndLine from '@/components/ChartColumnTwoScalesBarGroupAndLine.vue'
import ChartRow from '@/components/ChartRow.vue'
import ChartColumn from '@/components/ChartColumn.vue'
import ChartRowBarLayout from '@/components/ChartRowBarLayout.vue'
import ChartBubbleGroup from '@/components/ChartBubbleGroup.vue'
import MapCounty from '@/components/MapCounty.vue'

</script>

<style scoped>
.container {
  display: flex;
}
.child {
  flex: 1
}
</style>