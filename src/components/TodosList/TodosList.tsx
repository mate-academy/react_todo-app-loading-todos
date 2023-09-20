import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
};

export const TodosList: React.FC<Props> = ({ todos }) => {

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <React.Fragment key={todo.id}>
            <TodoItem
              todo={todo}
            />
          </React.Fragment>
        );
      })}
    </section>
  );
};
