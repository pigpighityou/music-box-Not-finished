import root from "../index";

export function getHotChineseSongList() {
  return root({
    method: "GET",
    url: "/top/playlist?cat=华语&limit=10&order=hot",
  });
}
