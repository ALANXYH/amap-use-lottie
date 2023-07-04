<script setup>
import MapUtils from '@/utils/mapUtils'
import mapData from '@/components/AMap/mapData'
import { onMounted, reactive } from 'vue'

const pageData = reactive({
    dataList: []
})

onMounted(async () => {
    pageData.dataList = mapData.list
    console.log(123123, pageData.dataList)
    await MapUtils.init(pageData.dataList)
})

</script>

<template>
    <div class="map-container">
        <div
            id="container"
        />
    </div>
</template>

<style scoped>
#container {
    width: 1300px;
    height: 500px;
}
</style>
