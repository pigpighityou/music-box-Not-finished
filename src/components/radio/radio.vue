<script setup>
import radioBanner from './components/radioBanner.vue';
import search from '../public/search.vue';
import djHot from './components/djHot.vue';

</script>



<template>





        <search></search>
        <radioBanner></radioBanner>
        <djCategory></djCategory>
        <djHot></djHot>
        <div class="blank"></div>

       




</template>


<style scoped>
.blank{
        width:100vw;
        height:20vw;
        background-color: white;
}


</style>  