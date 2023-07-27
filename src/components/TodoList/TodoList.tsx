import React from 'react';
import { Todo } from '../../types/Todo';
import { OneTodo } from '../OneTodo/OneTodo';

type Props = {
  todos: Todo[];
  loadingTodoId: number | null;
  onSetLoadingTodo: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos, loadingTodoId, onSetLoadingTodo,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <OneTodo
          key={todo.id}
          todo={todo}
          loadingTodoId={loadingTodoId}
          onSetLoadingTodo={(id) => onSetLoadingTodo(id)}
        />
      ))}
    </section>
  );
};
