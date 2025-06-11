import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggleTodoStatus={onToggle}
        deleteTodo={onDelete}
      />
    ))}
  </section>
);
