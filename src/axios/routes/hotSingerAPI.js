import root from "../index";

export function getHotSinger() {
  return root({
    method: "GET",
    url: "/top/artists?offset=0&limit=100",
  });
}
