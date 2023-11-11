



<template>
    <div>
        
    </div>
</template>


<script setup>

import { ref, reactive, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSearch } from "@/axios/routes/search.js";
import { getCloudSearch } from "@/axios/routes/search";
import store from "@/store/store.js";
const router = useRouter();
const route = useRoute();




(async ()=>{
    const res = await getCloudSearch(route.params.id);
    console.log('cloudSearch',res.data.result);
})();



</script>

<style scoped>




</style>