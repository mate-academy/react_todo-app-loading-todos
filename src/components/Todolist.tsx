/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { filterValues } from '../constants';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  setHasCompleted: (argument: boolean) => void;
  selectedFilter: string;
};

export const Todolist: React.FC<Props> = ({
  todos,
  setHasCompleted,
  selectedFilter,
}) => {
  return (
    <section className="todoapp__main">
      {todos
        .filter(todo => {
          if (selectedFilter === filterValues.completed) {
            return todo.completed;
          }

          if (selectedFilter === filterValues.active) {
            return !todo.completed;
          }

          return true;
        })
        .map(todo => {
          if (todo.completed) {
            setHasCompleted(true);
          }

          return (
            <TodoInfo
              todo={todo}
              key={todo.id}
            />
          );
        })}
    </section>
  );
};
