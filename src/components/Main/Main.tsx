import React from 'react';
import { TodoList } from '../TodoList';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  loading: boolean;
  filter: Filter;
  todos: Todo[];
  filterTodos: (value: Todo[] | ((prev: Todo[]) => Todo[])) => void;
};

export const Main: React.FC<Props> = ({
  loading,
  filter,
  todos,
  filterTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoList filter={filter} todos={todos} filterTodos={filterTodos} />

      {/* 'is-active' class puts this modal on top of the todo */}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': loading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </section>
  );
};
