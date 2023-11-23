<template>
  <div>
    <svg id="county" width="900" height="500"></svg>
  </div>
</template>

<script setup>
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { onMounted } from 'vue'
import countyJson from '@/assets/map/COUNTY_MOI_1090820.json'

console.log(d3)
console.log(topojson)
console.log(countyJson)

onMounted(async () => {
  const geometries = topojson.feature(countyJson, countyJson.objects['COUNTY_MOI_1090820']) // 把topojson生成geojson
  // console.log(geometries)
  const project = d3.geoMercator().center([123, 24]).scale(5500) // center 指定台灣座標
  const pathGenerator = d3.geoPath().projection(project) // 依投影方法產生路徑生成器


  d3.select('#county').append('g')
  d3.selectAll('g')
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

  // d3.select('#county').append('g')
  //   .append('text')
  //   .text('1234').attr('x', 10).attr('y', 20).style('fill', 'white').style('font-size', '24px').style('font-weight', 'bold')
    // .attr('transform', 'translate(150, 0)')
    // .append('line')
    // .attr('x2', 500)
    // .attr('stroke-width', '2px')
    // .attr('storke', 'white')
    // .attr('transform', 'translate(150, 0)')

})


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