import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Comment from "../components/Comment";
import React from "react";
import { store } from "../store/store";

describe("Comment Components", () => {
  const posts = [
    {
      body: "THE WAY UP IS DOWN",
      createdAt: '"2023-03-25T05:59:07.353Z"',
      id: "3858585-e7d0-423e-90c5-4b8a738a242d",
      userId: "c23356b9-565d-4151-9f3f-9d6f520b6dd9",
      username: "John Snow",
    },
    {
      body: "NO PLACE LIKE HOME",
      createdAt: '"2023-03-25T05:59:07.353Z"',
      id: "2d216497-e7d0-423e-90c5-4b8a738a242d",
      userId: "c23356b9-565d-4151-9f3f-9d6f520b6dd9",
      username: "Victor Yim",
    },
  ];

  const state = { id: "3858585-e7d0-423e-90c5-4b8a738a242d" };

  it("Comments should be displayed", () => {
    posts.map((post) =>
      render(
        <Provider store={store}>
          <Comment
            key={post.id}
            username={post.username}
            comment={post.body}
            parentId={post.userId}
            currentUserId={state?.id}
          />
        </Provider>
      )
    );
    const userComment = screen.getByText(/THE WAY UP IS DOWN/i);
    expect(userComment).toBeInTheDocument();
  });
});
