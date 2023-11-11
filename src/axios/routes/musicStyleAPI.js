import root from "../index.js";

export function getMusicStyleList() {
  return root({
    method: "GET",
    url: "/style/list",
  });
}
