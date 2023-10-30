<script setup>
import {getDjCategory} from '../../../axios/routes/djCategory.js'
import {ref, reactive} from 'vue'

let djCategoryAPI
let djCategoryList = reactive({
    djCategory: [],
    failImages:[
            'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
        ]
});

(async ()=>{
    try{
        djCategoryAPI = await getDjCategory()
      
        djCategoryList.djCategory = djCategoryAPI.data.categories
        console.log('ok',djCategoryList.djCategory)
    }
    catch(err){
        console.log(err)
    }
})();





</script>



<template>





     

       




</template>


<style scoped>



</style>  