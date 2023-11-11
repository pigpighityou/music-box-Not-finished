import root from "../index";

export function getSingerInfo(id) {
  return root({
    method: "GET",
    url: `/ugc/artist/search?keyword=${id}`,
  });
}

export function getSingerWiki(id) {
  return root({
    method: "GET",
    url: `/ugc/artist/get?id=${id}`,
  });
}

export function getSingerDetail(id) {
  return root({
    method: "GET",
    url: `/artist/detail?id=${id}`,
  });
}

export function getSingerHotSong(id) {
  return root({
    method: "GET",
    url: `/artist/top/song?id=${id}`,
  });
}

export function getSingerAlbum(id) {
  return root({
    method: "GET",
    url: `/artist/album?id=${id}`,
  });
}

export function getSingerMV(id) {
  return root({
    method: "GET",
    url: `/artist/mv?id=${id}`,
  });
}

export function getSingerFans(id) {
  return root({
    method: "GET",
    url: `/artist/follow/count?id=${id}`,
  });
}

export function getSingerSimi(id) {
  return root({
    method: "GET",
    url: `/simi/artist?id=${id}`,
  });
}
