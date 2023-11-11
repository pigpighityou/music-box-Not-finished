import root from "../index";
export function getHotJapanSinger() {
  return root({
    method: "GET",
    url: "/toplist/artist?type=4",
  });
}
