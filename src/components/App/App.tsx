import React, { useState, useEffect } from "react";
import s from "./App.module.css";
import AddTodo from "../AddTodo/AddTodo";
import TodoList from "../TodoList/TodoList";
import { IItem } from "../../types/todo";
import { nanoid } from "nanoid";

const App: React.FC = () => {
  const [todos, setTodos] = useState<IItem[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("todos")) {
      return;
    }
    const result = JSON.parse(localStorage.getItem("todos") || " ");
    setTodos(result);
  }, []);

  function todoAddHandler(todo: string) {
    setTodos((prevTodos) => {
      const result = [
        ...prevTodos,
        {
          id: nanoid(),
          title: todo,
          status: false,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(result));
      return result;
    });
  }
  //  delete todo
  function todoRemoveHandler(id: string): void {
    setTodos((prevTodos) => {
      const result = prevTodos.filter((item) => {
        return item.id !== id;
      });
      localStorage.setItem("todos", JSON.stringify(result));
      return result;
    });
  }
  return (
    <div className={s.div}>
      <h1 className={s.h1}>Todo list</h1>
      <AddTodo onAddTodo={todoAddHandler} />
      <TodoList onRemoveTodo={todoRemoveHandler} todos={todos} />
    </div>
  );
};

export default App;
