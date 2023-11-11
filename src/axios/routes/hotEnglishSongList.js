import root from "../index";
export function getHotEnglishSongList() {
  return root({
    method: "GET",
    url: "/top/playlist?cat=欧美&limit=10&order=hot",
  });
}
