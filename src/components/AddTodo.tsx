import React, { useState } from "react";
import { IItem } from "../types/todo";
type OnlyTitle = Pick<IItem, "title">;

interface IProps {
  onAddTodo: (todo: IItem) => void;
}

const AddTodo: React.FC<IProps> = (props) => {
  const [titleTodo, setTitleTodo] = useState<Partial<OnlyTitle>>({});

  function titleHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleTodo({
      title: e.target.value,
    });
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!titleTodo) {
      return;
    }
    props.onAddTodo(titleTodo as IItem);
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <span>Add todo</span>
        <input type="text" id="add-todo" onChange={titleHandler}></input>
      </div>
      <button type="submit">AddTodo</button>
    </form>
  );
};

export default AddTodo;
