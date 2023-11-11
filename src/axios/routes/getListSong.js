import root from "../index";

export function getListSong(id) {
  return root({
    methods: "GET",
    url: `/playlist/track/all?id=${id}`,
  });
}

export function getListSongDetail(id) {
  return root({
    methods: "GET",
    url: `/playlist/detail?id=${id}`,
  });
}
