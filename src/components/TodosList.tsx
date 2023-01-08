import React from 'react';
import { Todo } from '../types/Todo';
import { Todos } from './Todos';

type Props = {
  todos: Todo[];
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <ul>
        {todos.map(todo => (
          <li>
            <Todos todo={todo} key={todo.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
