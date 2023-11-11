import root from "../index";
export function getNewKoreaSong() {
  return root({
    method: "GET",
    url: "/top/song?type=16",
  });
}
