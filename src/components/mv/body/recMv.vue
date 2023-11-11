<script setup></script>

<template>
  <div class="recWrapper">
    <div class="content">
      <svg
        class="recIcon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-ea893728=""
      >
        <path
          fill="currentColor"
          d="M480 896V640H192v-64h288V320H192v576h288zm64 0h288V320H544v256h288v64H544v256zM128 256h768v672a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V256z"
        ></path>
        <path
          fill="currentColor"
          d="M96 256h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32z"
        ></path>
        <path
          fill="currentColor"
          d="M416 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
        ></path>
        <path
          fill="currentColor"
          d="M608 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
        ></path>
      </svg>
      <div class="word">推荐视频</div>
    </div>
  </div>
</template>

<style scoped>
.recWrapper {
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
.recIcon {
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
