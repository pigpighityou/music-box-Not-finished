<script setup></script>

<template>
  <div class="listWrapper">
    <div class="content">
      <svg
        class="listIcon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-ea893728=""
      >
        <path
          fill="currentColor"
          d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
        ></path>
      </svg>
      <div class="word">分类视频</div>
    </div>
  </div>
</template>

<style scoped>
.listWrapper {
  width: 30vw;
  height: 10vw;
  background-color: rgb(97, 99, 99);

  box-shadow: 0 0 0.5vw 0.7vw rgb(5, 30, 38);
  color: black;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.listIcon {
  width: 15vw;
  height: 15vw;
  margin: 0 5vw;
}

.word {
  font-size: 2vw;
  font-weight: 700;
  margin-right: 1vw;
  color: white;
}
</style>
