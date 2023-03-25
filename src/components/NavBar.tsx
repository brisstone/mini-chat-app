import { Avatar } from "antd";
import React from "react";
import { generateColour } from "../utils/colorGenerator";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaEllipsisV } from "react-icons/fa";

/**
 * NavBar is a component used to display page navigation showing user avartar, 
 * name and navigations.
 * @function
 * @param {string}  props - username (logged In user).
 * @return {HTMLElement}
 */

export default function NavBar({ username }: { username: string }): JSX.Element {
  return (
    <div className="flex mx-6 h-[70px] justify-between items-center">
      <div className="flex items-center gap-x-[10px]">
        <div>
          <IoIosArrowBack className="text-xl" />
        </div>
        <div className="h-[30px] w-[100px]">
          <Avatar
            style={{
              backgroundColor: generateColour(username),
            }}
            size="large"
          >
            {username?.split(" ")[0]?.split("")[0]}{" "}
            {username?.split(" ")[1]?.split("")[0]}
          </Avatar>
          <div
            className="relative top-[-13px] left-[55px] bg-[green] h-[15px] w-[15px] rounded-xl border-white border-2"
          ></div>
        </div>
        <div>{username}</div>
      </div>
      <div className="flex gap-x-[10px]">
        <FaEllipsisV className="text-xl" />
        <IoIosArrowDown className="text-xl" />
      </div>
    </div>
  );
}
