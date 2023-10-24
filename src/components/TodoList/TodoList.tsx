import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  markOneComplete: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  removeTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  markOneComplete,
  updateTodo,
  removeTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          markOneComplete={markOneComplete}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />
      ))}
    </section>
  );
};
