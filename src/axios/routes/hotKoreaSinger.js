import root from "../index";
export function getHotKoreaSinger() {
  return root({
    method: "GET",
    url: "/toplist/artist?type=3",
  });
}
