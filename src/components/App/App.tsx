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
  // function changeStatusHandler(id: string) {
  //   console.log("hi");
  //   console.log(id);
  //   // setTodos((prevTodos) => {
  //   //   const result = prevTodos.filter((item) => {
  //   //     return item.id === id;
  //   //   });
  //   //   localStorage.setItem("todos", JSON.stringify(result));
  //   //   return result;
  //   // });
  //   setTodos((prevTodos) => {
  //     return prevTodos.map((todo) => {
  //       if (todo.id === id) {
  //         return [...prevTodos];
  //       }
  //     });
  //   });
  // }

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
  }
  return (
    <div className={s.div}>
      <h1 className={s.h1}>Todo list</h1>
      <AddTodo onAddTodo={todoAddHandler} />
      <TodoList
        onRemoveTodo={todoRemoveHandler}
        todos={todos}
        changeStatusHandler={changeStatusHandler}
      />
    </div>
  );
};

export default App;
