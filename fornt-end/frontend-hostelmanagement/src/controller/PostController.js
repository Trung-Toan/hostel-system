import { POST_API } from "../api/api";
import { useDataByUrl } from "../fetch/FetchData";

export const useGetPostList = () => {
  return useDataByUrl({
    url: POST_API.VIEW,
    key: "port",
  });
};


