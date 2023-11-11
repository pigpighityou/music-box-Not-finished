import root from "../index";

export function getGoodMv() {
  return root({
    url: "/mv/exclusive/rcmd?limit=15",
    method: "GET",
  });
}
