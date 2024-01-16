import React from "react";
import { exampleData } from "@/type/common";

export const Button = (props: { data: exampleData; handleClick: (data: exampleData) => void }) => {
  const { data, handleClick } = props;
  return (
    <button
      onClick={() => handleClick(data)}
      className='border-2 w-full px-12 py-2 border-black hover:bg-gray-400'
      key={data.name}
    >
      {data.name}
    </button>
  );
};
