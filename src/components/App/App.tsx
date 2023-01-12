import React, { useState, useEffect } from "react";
import s from "./App.module.css";
import AddTodo from "../AddTodo/AddTodo";
import TodoList from "../TodoList/TodoList";
import { IItem } from "../../types/todo";
import { nanoid } from "nanoid";
import { Notify } from "notiflix/build/notiflix-notify-aio";

Notify.init({
  width: "300px",
  position: "right-bottom",
  closeButton: false,
  clickToClose: true,
  timeout: 2000,
});

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
    if (todo.trim().length < 1) {
      Notify.failure("Notes is empty");
      return;
    }
    setTodos((prevTodos) => {
      const result = [
        ...prevTodos,
        {
          id: nanoid(),
          title: todo,
          status: false,
        },
      ];
      Notify.success("Note added");
      localStorage.setItem("todos", JSON.stringify(result));
      return result;
    });
  }

  function changeStatusHandler(idTodo: string): void {
    setTodos((prevTodos) => {
      const result = prevTodos.map((todo) => {
        const { id, status, title } = todo;
        if (id !== idTodo) {
          return todo;
        }
        return { id, title, status: !status };
      });
      console.log(result);
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
    Notify.success("Note deleted");
  }
  return (
    <div className={s.div}>
      <h1 className={s.h1}>Todo list</h1>
      <AddTodo onAddTodo={todoAddHandler} />

      {todos.length >= 1 ? (
        <TodoList
          onRemoveTodo={todoRemoveHandler}
          todos={todos}
          changeStatusHandler={changeStatusHandler}
        />
      ) : (
        <p className={s.p}>Write down a note 📒</p>
      )}
    </div>
  );
};

export default App;
