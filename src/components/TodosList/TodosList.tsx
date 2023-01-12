import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[],
}

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};
