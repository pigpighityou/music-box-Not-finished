import root from "../index";

export function getId() {
  return root({
    method: "GET",
    url: "/dj/category/recommend",
  });
}

export function getDjHot(id) {
  return root({
    method: "GET",
    url: `/dj/radio/hot?cateId=${id}`,
  });
}

export function getDjDetail(id) {
  return root({
    method: "GET",
    url: `/dj/program/?rid=${id}`,
  });
}
