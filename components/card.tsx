import { Button } from "./btn";
import React from "react";
import { exampleData } from "@/type/common";

const Card = (props: { type: string; state: exampleData[]; handleClick: (data: exampleData) => void }) => {
  const { type, state, handleClick } = props;
  return (
    <div className='bg-gray-50 border-2 h-[calc(100svh-4rem)] flex-1 text-center flex flex-col  rounded-lg '>
      <p className='rounded-t-lg py-2 bg-gray-200'>{type}</p>
      <div
        className='flex flex-col px-16 gap-2  py-2 '
      >
        {state.map((d) => {
          return (
            <Button
              data={d}
              handleClick={() => handleClick(d)}
              key={d.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Card;
