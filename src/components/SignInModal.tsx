import { Button, Input, Modal, notification } from "antd";
import React, { useState } from "react";

/**
 * SignInModal is a component used to display user signIn Form,
 * name and navigations.
 * @function
 * @param {object}  props - visible- handles the modal visibility;
 * loading- handles loading effect on the modal;
 * handleCancel - handles form close;
 * submitForm - handles form submission
 * @return {HTMLElement}
 */

export default function SignInModal({
  visible,
  loading,
  handleCancel,
  submitForm,
}: ModalProps): JSX.Element {
  const [name, setName] = useState<string | null>(null);

  const enterRoom = () => {
    if (name) return submitForm(name);
    notification.error({ message: "Input name", placement: "topRight" });
  };

  return (
    <div>
      <Modal
        open={visible}
        title="Sign In"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            className="bg-[green]"
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => enterRoom()}
          >
            Enter Room
          </Button>
        ]}
      >
        <p className="mb-2 mt-10" >Enter Name</p>
        <Input
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </div>
  );
}
