import { Button } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SignInModal from "../../components/SignInModal";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { admitUser } from "../../store/actionCreators";

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch: Dispatch<any> = useDispatch();

  let navigate = useNavigate();

  const signInUser = (name: string) => {
    const id = uuidv4();
    setLoading(true);

    // simulate async call
    setTimeout(() => {
      const user: IUser = {
        name: name,
        id: id,
      };
      dispatch(admitUser(user));
      setLoading(false);
      setVisible(false);
      navigate("/chat", { state: user });
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <SignInModal
        visible={visible}
        loading={loading}
        handleCancel={handleCancel}
        submitForm={signInUser}
      />
      <Button className="bg-[blue] text-white" onClick={() => setVisible(true)}>Enter Chat</Button>
    </div>
  );
}
