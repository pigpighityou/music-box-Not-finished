import root from "../index.js";

export function getHotSongList() {
  return root({
    method: "GET",
    url: "/top/playlist?limit=15&order=hot",
  });
}
