import root from "../index";

export function getVIPGrow() {
  return root({
    method: "GET",
    url: "/vip/growthpoint",
  });
}
