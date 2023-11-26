<template>
  <RouterView />
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'

import searchBallot from '@/mockAPI'

let req = {basic:{level02: ['000']}, filter:{candidate: [3]}};
(async () => {
  let result = await searchBallot(req)
  console.log(result)
})()

</script>
<style scoped>

</style>
