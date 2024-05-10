import React from 'react';
import { Loader } from '../Loader/Loader';
import { Todo } from '../Todo/Todo';
import { TypeTodo } from '../../types/Todo';

interface Props {
  isLoading: boolean,
  todos: TypeTodo[],
  filteredTodo: TypeTodo[],
};

export const TodoList: React.FC<Props> = ({
  isLoading, todos, filteredTodo
}) => {
  return (
    <>
      {todos.length > 0 && (
        <section className="todoapp__main" data-cy="TodoList">
          {isLoading
            ? <Loader />
            : (
              filteredTodo.map(todo => (
                <Todo key={todo.id} todo={todo} />
              ))
            )
          }
        </section>
      )}
    </>
  );
};

