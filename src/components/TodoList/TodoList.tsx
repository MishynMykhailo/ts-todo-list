import React from "react";
import { IItem } from "../../types/todo";
import s from "./TodoList.module.css";

interface IProps {
  todos: IItem[];
  onRemoveTodo: (id: string) => void;
  changeStatusHandler: (idTodo: string) => void;
}

const TodoList: React.FC<IProps> = (props) => {
  return (
    <ul className={s.ul}>
      {props.todos.map(({ id, title, status }) => {
        return (
          <li key={id} className={s.li}>
            <input
              type="checkbox"
              className={s.checkbox}
              checked={status}
              id={id}
              onChange={() => props.changeStatusHandler(id)}
            />
            <label
              htmlFor={id}
              className={s.label}
              style={
                status
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "none" }
              }
            >
              {title}
            </label>
            <button
              onClick={props.onRemoveTodo.bind(this, id)}
              className={s.button}
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;

// interface IItem {
//   id: string;
//   title: string;
// }
// interface IProps {
//   todos: IItem[];
// }
// interface IState {
//   count: number;
// }

// export class TodoList extends React.Component<IProps, IState> {
//   stateHandler() {
//     this.setState(({ count }) => {});
//   }
//   render() {
//     return <div>TodoList</div>;
//   }
// }

// export default TodoList;
