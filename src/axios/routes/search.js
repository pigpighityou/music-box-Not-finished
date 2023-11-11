import root from "../index.js";



export function getSearch(keyword) {
  return root({
    method: "GET",
    url: `/search?keywords=${keyword}`,
  });
}
