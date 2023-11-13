import React from 'react';
import { Todo as TodoItem } from '../../types/Todo';
import { Todo } from '../Todo/Todo';

type Props = {
  todos: TodoItem[];
  selectedTodoId: number;
  setSelectedTodoId: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todo
          todo={todo}
          selectedTodoId={selectedTodoId}
          setSelectedTodoId={setSelectedTodoId}
          key={todo.id}
        />
      ))}
    </section>
  );
};
