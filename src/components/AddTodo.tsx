import React, { useState } from "react";
import { IItem } from "../types/todo";

interface IProps {
  onAddTodo: (todo: IItem) => void;
}

const AddTodo: React.FC<IProps> = ({ onAddTodo }) => {
  const [todo, setTodo] = useState<Partial<IItem>>({});
  // через таргет берем value и создаем ID
  function todoHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo({
      title: e.target.value,
    });
  }

  // Отправляем создание todo
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!todo) {
      return;
    }
    onAddTodo(todo as IItem);
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <span>Add todo</span>
        <input type="text" id="add-todo" onChange={todoHandler}></input>
      </div>
      <button type="submit">AddTodo</button>
    </form>
  );
};

export default AddTodo;
