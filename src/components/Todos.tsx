import React from "react";
import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

type Props = {
  visibleTodos: Todo[];
  handleDelete: (id: number) => void;
  handleToggle: (todo: Todo) => void;
  loadingTodoCheck: number | null;
};

export const Todos: React.FC<Props> = ({
  visibleTodos,
  handleDelete,
  handleToggle,
  loadingTodoCheck,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo =>(
      <TodoItem
        key={todo.id}
        todo={todo}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        loadingTodoCheck={loadingTodoCheck}
      />
      ))}
    </section>
  );
};
