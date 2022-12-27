import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { NewTodo } from './Todo';
import { Status } from '../types/Status';

type Props = {
  todos: Todo[];
  status: Status;
};

export const TodoList: React.FC<Props> = ({ todos, status }) => {
  const visibleTodos = useMemo((): Todo[] => {
    return todos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        case Status.All:
        default:
          return todos;
      }
    });
  }, [todos, status]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <NewTodo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
