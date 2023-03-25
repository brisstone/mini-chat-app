import * as actionTypes from "./actionTypes";

const initialPostState: PostState = {
  posts: [],
};

const initialPageState: PageState = {
  currentPostPage: 1
};

const initialUserState: userState = {
  users: [],
};

export const postReducer = (
  state: PostState = initialPostState,
  action: PostAction
): PostState => {  
  switch (action.type) {
    case actionTypes.ADD_POST:
      const newPost: IPost = {
        id: action.post.id,
        body: action.post.body,
        username: action.post.username,
        userId: action.post.userId,
        createdAt: action.post.createdAt,
      };
      return {
        ...state,
        posts: state.posts.concat(newPost),
      };
      
  }
  return state;
};

export const pageReducer = (
  state: PageState = initialPageState,
  action: PageAction
): PageState => {
  switch (action.type) {
    case actionTypes.ADD_POST_PAGE:
 
      return {
        ...state,
        currentPostPage: action.page,
      };
      
  }
  return state;
};

export const userReducer = (
  state: userState = initialUserState,
  action: UserAction
): userState => {

  switch (action.type) {
    case actionTypes.ADD_USER:
      const newUser: IUser = {
        id: action.user.id, 
        name: action.user.name,
      };
      return {
        ...state,
        users: state.users.concat(newUser),
      };
  }
  return state;
};
