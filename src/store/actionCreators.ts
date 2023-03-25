import * as actionTypes from "./actionTypes"

export function admitUser(user: IUser) {
  const action: UserAction = {
    type: actionTypes.ADD_USER,
    user,
  }

  return simulateHttpRequest(action)
}

export function saveComment(post: IPost) {
  const action: PostAction = {
    type: actionTypes.ADD_POST,
    post,
  }
  return simulateHttpRequest(action)
}

export function saveCurrentPage(page: number) {
  const action: PageAction = {
    type: actionTypes.ADD_POST_PAGE,
    page,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: any) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}