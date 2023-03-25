
type PostState = {
  posts: IPost[];
};

type PageState = {
  currentPostPage: number
};

type userState = {
  users: IUser[];
};

type UserAction = {
  type: string;
  user: IUser;
};

type PostAction = {
  type: string;
  post: IPost;
};

type PageAction = {
  type: string;
  page: number;
};

type SavedUserRouter ={
  name: string;
  id: string;
  state: SavedUserRouter
}

type IUser = {
  name: string;
  id: string;
};

type IPost = {
  id: string;
  body: string;
  username: string;
  userId: string;
  createdAt: string;
};

type IComment = {
  comment: string,
  parentId: string,
  currentUserId: string
  username: string
};




type ModalProps = {
  visible: boolean;
  loading: boolean;
  handleCancel: () => void;
  submitForm: (name: string) => void;

  //   isOpen: boolean;
  //   onOpen: () => void;
  //   onClose: () => void;
  //   initialRef: any;
  //   finalRef: any;
};

type DispatchType = (args: UserAction) => UserAction;
