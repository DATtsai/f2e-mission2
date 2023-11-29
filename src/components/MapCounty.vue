<template>
  <div>
    <svg id="county" width="1000" height="800"></svg>
  </div>
</template>

<script setup>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { onMounted, ref, watch } from 'vue'
import countyJson from '@/assets/map/COUNTY_MOI_1090820.json'

const emits = defineEmits(['hoverID', 'clickID'])
const clickID = ref('')
const hoverID = ref('')
const idMap = {
  '63000':'000',
  '65000':'001',
  '68000':'002',
  '66000':'003',
  '67000':'004',
  '64000':'005',
  '10004':'006',
  '10005':'007',
  '10007':'008',
  '10008':'009',
  '10009':'010',
  '10010':'011',
  '10013':'012',
  '10002':'013',
  '10015':'014',
  '10014':'015',
  '10016':'016',
  '10017':'017',
  '10018':'018',
  '10020':'019',
  '09020':'020',
  '09007':'021',
}

onMounted(async () => {
  const geometries = topojson.feature(countyJson, countyJson.objects['COUNTY_MOI_1090820']) // 把topojson生成geojson
  const project = d3.geoMercator().center([123, 24]).scale(8000) // center 指定台灣座標
  const pathGenerator = d3.geoPath().projection(project) // 依投影方法產生路徑生成器

  // portrait map
  d3.select('#county').append('g').append('g').attr('class', 'map')
  d3.selectAll('g.map')
    .selectAll('path')
    .data(geometries.features).enter()
    .append('path')
      .attr('d', pathGenerator)
      .attr('fill', '#7c7c7c')
      .attr('stroke', 'white')
      .attr('stroke-width', '1px')
      .attr('class', d => 'county_' + d.properties['COUNTYCODE'])
    .append('title')
      .text(d => d.properties['COUNTYNAME'])
  
  d3.select('g')
    .attr('transform', 'translate(350, 150)')

  // hover area
  d3.selectAll('path').on('mouseover', (data, index, node) => {
    d3.select(`.county_${data.properties.COUNTYCODE}`)
      .attr('fill', '#7fd6a7')

    hoverID.value = idMap[data.properties.COUNTYCODE]
    emits('hoverID', hoverID.value)
  })
  d3.selectAll('path').on('mouseout', (data, index, node) => {
    d3.select(`.county_${data.properties.COUNTYCODE}`)
      .attr('fill', '#7c7c7c')
    
    emits('hoverID', '')
  })

  d3.selectAll('path').on('click', (data, index, node) => {
    clickID.value = idMap[data.properties.COUNTYCODE]
    emits('clickID', clickID.value)
  })
  
  // zoom in&out feature
  // d3.select('svg').call(d3.zoom().on('zoom', () => {
  //   d3.select('g.map')
  //     .attr('transform', d3.event.transform)
  // }))

})

// watch(()=>clickID.value, (val) => {
//   console.log(val)
// })

</script>

<style scoped>
  \deep\ .county {
    fill: #ebf0e4;
    stroke: gray;
    stroke-width: 0.1px;
  }

  \deep\ .county:hover {
    fill: lightgray;
  }
</style>