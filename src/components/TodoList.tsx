import React from "react";
import { IItem } from "../types/todo";
interface IProps {
  todos: IItem[];
  onRemoveTodo: (id: string) => void;
}
const TodoList: React.FC<IProps> = (props) => {
  return (
    <ul>
      {props.todos.map(({ id, title }) => {
        return (
          <li key={id}>
            <div>{title}</div>
            <button onClick={props.onRemoveTodo.bind(this, id)}>Remove</button>
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
