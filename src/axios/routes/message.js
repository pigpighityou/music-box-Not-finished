import root from "../index.js";

export function getMsg() {
  return root({
    method: "GET",
    url: "/msg/private",
  });
}

export function getNotice() {
  return root({
    method: "GET",
    url: "/msg/notices",
  });
}

export function getMsgContent(id) {
  return root({
    method: "GET",
    url: `/msg/private/history?uid=${id}`,
  });
}
