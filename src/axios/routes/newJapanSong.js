import root from "../index";
export function getNewJapanSong() {
  return root({
    method: "GET",
    url: "/top/song?type=8",
  });
}
