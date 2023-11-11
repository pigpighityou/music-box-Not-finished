<script setup>
import { getId } from "../../../axios/routes/djHot.js";
import { getDjHot } from "../../../axios/routes/djHot.js";

import { ref, reactive, computed } from "vue";

let idAPI;
let djHotAPI;

let djHotList = reactive({
  djHot: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

let idList = reactive({
  id: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

let songs = reactive({
  data: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

// 获取电台id类别系列
(async () => {
  try {
    idAPI = await getId();
    idList.id = idAPI.data.data;
    /*   console.log('ok1',idList.id);   */
  } catch (err) {
    console.log(err);
  }
})();

// 通过id的参数获取具体电台
// 初始id为3
(async () => {
  try {
    djHotAPI = await getDjHot(3);
    djHotList.djHot = djHotAPI.data.djRadios;
    /*  console.log('ok2',djHotList.djHot)  */
  } catch (err) {
    console.log(err);
  }
})();

const getSong = async (id) => {
  try {
    songAPI = await getSongs(id);
    songs.data = songAPI.data.data;
    /*  console.log('ok3',songs.data) */
  } catch (err) {
    console.log(err);
  }
};

const currentPage = ref(1);

const id = computed(() => {
  return idList.id[currentPage.value - 1].categoryId;
});

const getDjHotByPage = async (page) => {
  try {
    djHotAPI = await getDjHot(page);
    djHotList.djHot = djHotAPI.data.djRadios;
    /* console.log('new ok2',djHotList.djHot) */
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="radioWrapper">
    <div class="djWrapper" v-for="(item, index1) in idList.id" :key="index">
      <div class="name" v-if="currentPage - 1 === index1">
        <div class="category">
          <div class="icon1">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728=""
            >
              <path
                fill="currentColor"
                d="M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128zm0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64zm-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64z"
              ></path>
            </svg>
          </div>
          <div class="icon4">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728=""
            >
              <path
                fill="currentColor"
                d="M896 529.152V512a384 384 0 1 0-768 0v17.152A128 128 0 0 1 320 640v128a128 128 0 1 1-256 0V512a448 448 0 1 1 896 0v256a128 128 0 1 1-256 0V640a128 128 0 0 1 192-110.848zM896 640a64 64 0 0 0-128 0v128a64 64 0 0 0 128 0V640zm-768 0v128a64 64 0 0 0 128 0V640a64 64 0 1 0-128 0z"
              ></path>
            </svg>
          </div>
          <div class="words">{{ item.categoryName }}电台</div>
          <div class="icon2">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728=""
            >
              <path
                fill="currentColor"
                d="M896 529.152V512a384 384 0 1 0-768 0v17.152A128 128 0 0 1 320 640v128a128 128 0 1 1-256 0V512a448 448 0 1 1 896 0v256a128 128 0 1 1-256 0V640a128 128 0 0 1 192-110.848zM896 640a64 64 0 0 0-128 0v128a64 64 0 0 0 128 0V640zm-768 0v128a64 64 0 0 0 128 0V640a64 64 0 1 0-128 0z"
              ></path>
            </svg>
          </div>
          <div class="icon3">
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728=""
            >
              <path
                fill="currentColor"
                d="M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128zm0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64zm-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64z"
              ></path>
            </svg>
          </div>
        </div>
        <hr />
        <van-pagination
          v-model="currentPage"
          :total-items="12"
          :items-per-page="1"
          :show-page-size="5"
          force-ellipses
          @click="getDjHotByPage(id)"
          class="select"
        >
          <template #prev-text>
            <van-icon name="arrow-left" />
            <div class="up">上个频道</div>
          </template>
          <template #next-text>
            <van-icon name="arrow" />
            <div class="down">下个频道</div>
          </template>
          <template #page="{ text }">{{ text }}</template>
        </van-pagination>

        <div class="radio">
          <hr />
          <div
            class="instance"
            v-for="(childItem, index2) in item.radios"
            :key="index"
            v-if="currentPage - 1 === index1"
          >
            <div class="wrapper">
              <div class="picture">
                <router-link
                  :to="{ name: 'storeRadioItem', params: { id: childItem.id } }"
                >
                  <img
                    :src="childItem?.picUrl || idList.failImages"
                    alt="pic"
                    class="pic"
                  />
                </router-link>
              </div>

              <div class="wordWrapper">
                <div class="childName">
                  {{ childItem.name }}
                </div>

                <div class="text">
                  {{ childItem.rcmdText }}
                </div>

                <div class="lastProgram">
                  {{ childItem.lastProgramName }}
                </div>
              </div>
            </div>

            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="contentWrapper">
    <div class="title">
      {{ djHotList.djHot[currentPage - 1]?.category }}在线
    </div>

    <div class="content" v-for="(item, index) in djHotList.djHot" :key="index">
      <div class="picWrapper" @click="getDetail(item.id)">
        <router-link :to="{ name: 'storeRadioItem', params: { id: item.id } }">
          <img :src="item.picUrl" alt="pic2" class="pictures" />
        </router-link>
      </div>

      <div class="desc">
        {{ item.desc }}
        <!-- {{ item.id }} -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.radioWrapper {
  margin-top: 3vw;
  margin-right: 0vw;
  border-top: 0.3vw black solid;
  border-bottom: 0.3vw black solid;
}

.category {
  font-weight: 800;
  background-color: rgb(253, 250, 245);
  text-align: center;
  width: 100vw;
  height: 4.5vw;
  font-family: cursive;
  font-weight: 800;
  color: rgb(32, 28, 22);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.words {
  width: 80vw;
}

.title {
  font-weight: 800;
  background-color: rgb(253, 250, 245);
  text-align: center;
  width: 100vw;
  height: 4.5vw;
  font-family: cursive;
  font-weight: 800;
  color: rgb(134, 104, 58);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.icon1 {
  width: 4vw;
  height: 100%;
}

.icon2 {
  width: 4vw;
  height: 100%;
}
.icon3 {
  width: 4vw;
  height: 100%;
}
.icon4 {
  width: 4vw;
  height: 100%;
}

.wrapper {
  width: 97vw;
  height: 26vw;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-top: 1vw;
  background-color: hsl(72, 26%, 96%);
  display: flex;
  margin: 1vw;
}

.wordWrapper {
  margin-left: 5vw;
  width: 71vw;
  height: 25vw;
  display: flex;
  flex-direction: column;
}

.childName {
  font-size: 3vw;
  font-weight: bold;
  margin-top: 1vw;
}

.text {
  font-size: 4vw;
  height: 8vw;
  margin-top: 0.6vw;
  margin-left: 11vw;
  font-family: serif;
  overflow: auto;
}

.lastProgram {
  height: 4vw;
  width: 60vw;

  font-weight: 800;
  margin-top: 4vw;
  margin-left: 2vw;
  overflow: auto;
}

.pic {
  margin-top: 2vw;
  width: 20vw;
  height: 20vw;
  border-radius: 2vw;
}

.radio {
  width: 100vw;
  height: 35vw;
  background-color: hsl(60, 54%, 97%);
  margin-top: 0.05vw;
  margin-bottom: 0.3vw;
  overflow: auto;
}

.up {
  font-size: 3vw;
  font-family: cursive;
  color: black;
}
.down {
  font-size: 3vw;
  font-family: cursive;
  color: black;
}

.content {
  display: flex;
  flex-direction: row;
  margin-top: 1vw;
  border: 0.3vw black solid;
  border-radius: 2vw;
}

.contentWrapper {
  margin-top: 0.5vw;
}

.pictures {
  width: 30vw;
  height: 30vw;
  border-radius: 2vw;
  margin-left: 0.3vw;
  margin-top: 0.3vw;
}

.desc {
  width: 50vw;
  height: 25vw;

  font-family: cursive;
  font-weight: 800;
  margin-left: 2vw;
  margin-top: 1vw;
  overflow: auto;
  text-align: justify;
}
</style>
