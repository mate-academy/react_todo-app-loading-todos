import React from "react";
import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

 export type Props = {
  todos: Todo[];
  loading: boolean;
}

export const TodoList: React.FC<Props> = ({todos, loading}) => {
  return(
    <section className="todoapp__main" data-cy="TodoList">
      {loading ? (
        <div className="loader" data-cy="Loader"></div>
      ) : (
        todos.map(todo => (
         <TodoItem
           key={todo.id}
           todo={todo}
          />
        ))
      )}
    </section>
  );
}
