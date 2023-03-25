import { Avatar } from "antd";
import { generateColour } from "../utils/colorGenerator";

/**
 * Represents the dashboard card container.
 * @function
 * @param {object} props - stores all the value of the comment comment.
 * @Description - Comment is a component used to display users comments which includes comment body(comment)
 * logged in user details (currentUserId, username), and comment owner (parentId)
 *  @return {HTMLElement}
 */

export default function Comment({
  username,
  comment,
  parentId,
  currentUserId,
}: IComment): JSX.Element {
  return (
    <div
      className={`flex justify-between items-end gap-x-[10px] mx-6 mb-[20px]`}
    >
      <div className={`grow-0`}>
        {parentId !== currentUserId ? (
          <Avatar
            style={{
              backgroundColor: generateColour(username),
            }}
            size="large"
          >
            {username?.split(" ")[0]?.split("")[0]}{" "}
            {username?.split(" ")[1]?.split("")[0]}
          </Avatar>
        ) : (
          <div className="w-[40px]"></div>
        )}
      </div>
      <div className={`${parentId !== currentUserId && "grow"}`}>
        <div
          className={`min-h-[60px] overflow-x-auto max-w-[390px] rounded-tl-lg rounded-tr-lg p-2 text-justify ${
            parentId === currentUserId
              ? "rounded-br-lg bg-[#0F8CFF] text-white"
              : "rounded-bl-lg bg-[#DDE2EB] text-black"
          } `}
        >
          {comment}
        </div>
      </div>
    </div>
  );
}
