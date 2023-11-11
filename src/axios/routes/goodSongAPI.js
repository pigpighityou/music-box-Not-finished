import root from "../index.js";

export function getGoodSongList() {
  return root({
    method: "GET",
    url: "/top/playlist/highquality?limit=10",
  });
}

export function getGoodSongList2() {
  return root({
    method: "GET",
    url: "/top/playlist/highquality?cat=华语&alimit=10",
  });
}

export function getGoodSongList3() {
  return root({
    method: "GET",
    url: "/top/playlist/highquality?cat=欧美&limit=10",
  });
}

export function getGoodSongList4() {
  return root({
    method: "GET",
    url: "/top/playlist/highquality?cat=流行&limit=10",
  });
}
