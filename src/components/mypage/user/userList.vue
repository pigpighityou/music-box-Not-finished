<script setup></script>

<template>
  <div class="userListWrapper">
    <div class="components">
      <div class="component">
        <router-link to="/recentSongs">
          <svg
            class="pic"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-ea893728=""
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
            ></path>
          </svg>

          <div class="intro">最近播放</div>
        </router-link>
      </div>

      <div class="component">
        <router-link to="/storeItem">
          <svg
            class="pic"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-ea893728=""
          >
            <path
              fill="currentColor"
              d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"
            ></path>
          </svg>

          <div class="intro">我的收藏</div>
        </router-link>
      </div>

      <div class="component">
        <router-link to="/localStore">
          <svg
            class="pic"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-ea893728=""
          >
            <path
              fill="currentColor"
              d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"
            ></path>
          </svg>
          <div class="intro">本地歌曲</div>
        </router-link>
      </div>

      <div class="component">
        <router-link to="/storeRadio">
          <svg
            class="pic"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-ea893728=""
          >
            <path
              fill="currentColor"
              d="M480 704h160a64 64 0 0 0 64-64v-32h-96a32 32 0 0 1 0-64h96v-96h-96a32 32 0 0 1 0-64h96v-96h-96a32 32 0 0 1 0-64h96v-32a64 64 0 0 0-64-64H384a64 64 0 0 0-64 64v32h96a32 32 0 0 1 0 64h-96v96h96a32 32 0 0 1 0 64h-96v96h96a32 32 0 0 1 0 64h-96v32a64 64 0 0 0 64 64h96zm64 64v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768h-96a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64h256a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128h-96z"
            ></path>
          </svg>
          <div class="intro">我的播客</div>
        </router-link>
      </div>
    </div>

    <div class="more">
      <hr class="hr" />

      <div class="word">
        <svg
          class="editPic"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-ea893728=""
        >
          <path
            fill="currentColor"
            d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
          ></path>
          <path
            fill="currentColor"
            d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
          ></path>
        </svg>
        添加功能
      </div>
    </div>
  </div>
</template>

<style scoped>
.userListWrapper {
  margin-left: 1vw;
  width: 98vw;
  height: 36vw;
  background-color: whitesmoke;
  border-radius: 2vw;
}
.components {
  margin-top: 2vw;
  margin-left: 0.5vw;
  margin-right: 1.5vw;
  border-radius: 4vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.pic {
  width: 11vw;
  height: 11vw;
  margin-left: 5.5vw;
  margin-top: 3vw;
  margin-bottom: 2vw;
  color: black;
}

.intro {
  width: 100%;
  height: 5vw;
  text-align: center;
  line-height: 5vw;
  font-size: 3.8vw;
  margin-left: -0.5vw;
  color: black;
}

.component {
  display: flex;
  flex-direction: column;
}

.components > div {
  margin-top: 1vw;
  margin-left: 1vw;
  width: 23vw;
  height: 23vw;
  background-color:;
}

.more {
  margin-top: 0.7vw;
}
.hr {
  width: 100%;
  height: 0.2vw;
  background-color: rgb(213, 206, 206);
  border: none;
}
.word {
  margin-top: 3vw;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editPic {
  width: 5vw;
  height: 5vw;
  margin-right: 1vw;
  margin-left: 1vw;
}
</style>
