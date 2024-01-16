"use client";
import { exampleData } from "@/type/common";
import Image from "next/image";
import { useState, useEffect } from "react";
import Card from "@/components/card";
import { Button } from "@/components/btn";
const exampleData: exampleData[] = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

const Home = () => {
  const [todoList, setTodoList] = useState<exampleData[]>(exampleData);
  const [fruitState, setFruitState] = useState<exampleData[]>([]);
  const [vegetableState, setVegetableState] = useState<exampleData[]>([]);
  const onBtnClick = (data: exampleData) => {
    setTodoList((prev) => prev.filter((item) => item !== data));
    const timeoutId = setTimeout(() => moveBack(data), 5000);
    if (data.type.toLowerCase() === "fruit") setFruitState((prev) => [...prev, { ...data, timeoutId: timeoutId }]);
    else setVegetableState((prev) => [...prev, { ...data, timeoutId: timeoutId }]);
  };
  const moveBack = (data: exampleData) => {
    if (data.timeoutId) {
      delete data.timeoutId;
    }
    setTodoList((prev) => [...prev, data]);
    if (data.type.toLowerCase() === "fruit") setFruitState((prev) => prev.filter((item) => item.name !== data.name));
    else setVegetableState((prev) => prev.filter((item) => item.name !== data.name));
  };
  const onClickRemove = (data: exampleData) => {
    clearTimeout(data.timeoutId);
    moveBack(data);
  };
  // console.log("timeoutId", timeoutId);
  return (
    <main className='flex h-screen flex-col p-4 '>
      <div className='flex gap-8'>
        <div className='flex flex-col gap-2'>
          {todoList.map((d) => {
            return (
              <Button
                data={d}
                handleClick={onBtnClick}
                key={d.name}
              />
            );
          })}
        </div>

        <Card
          handleClick={onClickRemove}
          type={"Fruit"}
          state={fruitState}
        />
        <Card
          handleClick={onClickRemove}
          type={"Vegetable"}
          state={vegetableState}
        />
      </div>
    </main>
  );
};

export default Home;
