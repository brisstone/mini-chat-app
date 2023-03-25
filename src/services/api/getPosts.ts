import { store } from "../../store/store";

export const fetchPaginatedPosts = async (limit: number, page?: number) => {
  // Mock Async Call
  await new Promise((resolve) => setTimeout(resolve, 100));
  const posts = store.getState().postReducer.posts;

  page = page || 1;

  let offset = limit * (page - 1);
  const pageLimit = Number(limit) * page;

  const comments = posts
    // .sort(
    //   // @ts-ignore
    //   (a, b) =>
    //     new Date(JSON.parse(a?.createdAt)).getTime() -
    //     new Date(JSON.parse(b?.createdAt)).getTime()
    // )
    ?.slice(offset, pageLimit);

  return comments;
};
