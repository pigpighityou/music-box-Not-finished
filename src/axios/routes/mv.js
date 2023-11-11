import root from "../index";

export function getMv(country) {
  return root({
    method: "GET",
    url: `/mv/all?area=${country}&limit=15`,
  });
}

// id只有数字
export function getMvDetail(id) {
  return root({
    method: "GET",
    url: `/mv/detail?mvid=${id}`,
  });
}

// id有字母
export function getMvDetailAlias(id) {
  return root({
    method: "GET",
    url: `/video/detail?id=${id}`,
  });
}

// id只有数字
export function getMvUrl(id) {
  return root({
    method: "GET",
    url: `/mv/url?id=${id}`,
  });
}

// id有字母
export function getMvUrlAlias(id) {
  return root({
    method: "GET",
    url: `/video/url?id=${id}`,
  });
}
