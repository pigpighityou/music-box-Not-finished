import root from "../index";

export function getRecMv() {
  return root({
    url: "/personalized/mv?limit=15",
    method: "GET",
  });
}
