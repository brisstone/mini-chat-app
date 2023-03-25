// import { Button } from "@chakra-ui/react";
import { Button, Input, Spin } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import Comment from "../../components/Comment";
import { saveComment, saveCurrentPage } from "../../store/actionCreators";
import { v4 as uuidv4 } from "uuid";
import { fetchPaginatedPosts } from "../../services/api/getPosts";
import NavBar from "../../components/NavBar";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { RiMic2Line } from "react-icons/ri";

/**
 * Represents the Chat Screen.
 * @function
 * @Description - Renders the chat Page consisting of Comment and Navigation Components
 * @todo - Fully hook up the pagination api
 *  @return {HTMLElement}
 */

export default function ChatScreen(): JSX.Element {
  const [comment, setComment] = useState<string>();
  const dispatch: Dispatch<any> = useDispatch();
  const [loading, setLoading] = useState(false);
  const posts = useSelector((state: any) => state.postReducer, shallowEqual);
  const users = useSelector((state: any) => state.userReducer, shallowEqual);
  const { currentPostPage } = useSelector(
    (state: any) => state.pageReducer,
    shallowEqual
  );
  const { state } = useLocation();
  const [user, setUser] = useState<string>(state?.name);
  const ref = useRef<null | HTMLDivElement>(null);
  const [allComments, setAllComments] = useState<IPost[]>([]);
  const [limit, setlimit] = useState<number>(10);


  const oldMessage = useCallback(async (page?: number) => {

    setLoading(true);
    try {
      const response = await fetchPaginatedPosts(limit, page);
      setAllComments((prevState) => [...prevState, ...response]);
      // Only tries to fetch old messages if page is supplied
      // This is to prevent page update at page load
      page !== undefined && dispatch(saveCurrentPage(page));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const scrollToBottom = () => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    oldMessage();
    dispatch(saveCurrentPage(1));

    return () => {
      dispatch(saveCurrentPage(1));
    };
  }, []);

  React.useEffect(() => {
    window.onscroll = () => {

      // Handle Api call on scroll to top
      if (window.pageYOffset === 0) {
        console.log("back at top", currentPostPage);
        oldMessage(currentPostPage + 1);
      }

      return () => (window.onscroll = null);
    };
  });

  const postComment = useCallback(() => {
    if (comment) {
      const currentUser = users?.users?.filter(
        (user: IUser) => user?.id === state?.id
      );

      const post: IPost = {
        id: uuidv4(),
        body: comment,
        username: currentUser[0]?.name,
        userId: currentUser[0]?.id,
        createdAt: JSON.stringify(new Date()),
      };
      dispatch(saveComment(post));
      setComment("");

      oldMessage(currentPostPage + 1);
    }
  }, [comment, currentPostPage, dispatch, oldMessage, state?.id, users.users]);


  useEffect(() => {
 
  }, [comment])
  

  return (
    <div className="p-5 overflow-y-auto min-h-[100vh] rounded-b-lg">
      <div className="w-[490px] min-h-[100vh]  m-auto p-0 bg-slate-50 border-2 border-b-0 rounded-t-lg mt-6 shadow-2xl rounded-b-lg flex flex-col items-between justify-between "
      >
        <div>
          <NavBar username={user} />
          <hr className="mb-8" />
          {loading && <Spin />}
          {posts?.posts
            .sort(
              (a: { createdAt: string }, b: { createdAt: string }) =>
                new Date(JSON.parse(a?.createdAt)).getTime() -
                new Date(JSON.parse(b?.createdAt)).getTime()
            )
            ?.map((post: IPost) => (
              <Comment
                key={post.id}
                username={post.username}
                comment={post.body}
                parentId={post.userId}
                currentUserId={state?.id}
              />
            ))}
        </div>

        <div
          className="relative"
        >
          <div className="h-20 bg-white flex items-center justify-between border-t-2 px-[20px] rounded-b-lg">
            <div>
              <Input
                value={comment}
                className="h-12 w-[250px] border-white border-none"
                placeholder="Your message..."
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="flex space-x-6">
              <GrAttachment className="text-xl" />
              <MdOutlineGifBox className="text-xl" />
              <FaRegSmile className="text-xl" />
              <RiMic2Line className="text-xl" />
            </div>
          </div>
          <div className="absolute left-[33rem] bottom-[2rem]">
            <Button
              className="h-30 w-30 bg-red-400"
              onClick={() => postComment()}
            >
              Send
            </Button>
          </div>
          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
}
