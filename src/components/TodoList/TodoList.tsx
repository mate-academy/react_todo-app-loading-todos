import React from 'react';
import { Loader } from '../Loader/Loader';
import { Todo } from '../Todo/Todo';
import { TypeTodo } from '../../types/Todo';

interface Props {
  isLoading: boolean,
  todos: TypeTodo[],
};

export const TodoList: React.FC<Props> = ({ isLoading, todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {isLoading
        ? <Loader />
        : (
          todos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))
        )
      }
    </section>
  );
};

