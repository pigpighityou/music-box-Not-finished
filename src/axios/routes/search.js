import { multiply } from "lodash";
import root from "../index.js";

export function getSearch(keyword) {
  return root({
    method: "GET",
    url: `/search?keywords=${keyword}`,
  });
}

export function getCloudSearch(keyword) {
  return root({
    method: "GET",
    url: `/cloudsearch?keywords=${keyword}`,
  });
}

export function multiSearch(keyword) {
  return root({
    method: "GET",
    url: `/search/multimatch?keywords=${keyword}`,
  });
}

export function getSearchSuggest(keyword) {
  return root({
    method: "GET",
    url: `/search/suggest?keywords=${keyword}&type=mobile`,
  });
}
