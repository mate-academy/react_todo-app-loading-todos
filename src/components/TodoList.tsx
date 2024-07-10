import React from 'react';
import { Todo as TodoType } from '../types/Todo';
import { Todo } from './Todo';

type Props = {
  todos: TodoType[];
  isEditingTodo: TodoType | null;
  setIsEditingTodo: (todo: TodoType | null) => void;
  handleCompletedStatus: (id: number) => void;
};

export const TodoList: React.FC<Props> = React.memo(function TodoList({
  todos,
  isEditingTodo,
  setIsEditingTodo,
  handleCompletedStatus,
}) {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todo
          todo={todo}
          key={todo.id}
          isEditingTodo={isEditingTodo}
          setIsEditingTodo={setIsEditingTodo}
          handleCompletedStatus={handleCompletedStatus}
        />
      ))}
    </section>
  );
});
