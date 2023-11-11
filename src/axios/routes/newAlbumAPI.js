import root from "../index";

export function getNewAlbum() {
  return root({
    method: "GET",
    url: "/top/album?&limit=10&offset=0&area=ALL",
  });
}

export function getNewAlbum2() {
  return root({
    method: "GET",
    url: "/top/album?&limit=10&offset=0&area=ZH",
  });
}

export function getNewAlbum3() {
  return root({
    method: "GET",
    url: "/top/album?&limit=10&offset=0&area=EA",
  });
}

export function getNewAlbum4() {
  return root({
    method: "GET",
    url: "/top/album?&limit=10&offset=0&area=KR",
  });
}

export function getNewAlbum5() {
  return root({
    method: "GET",
    url: "/top/album?&limit=10&offset=0&area=JP",
  });
}

export function getNewAlbumInfo(id) {
  return root({
    method: "GET",
    url: `/album?id=${id}`,
  });
}
