import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { SortType } from '../../types/SortType';
import { FilterContext } from '../../context/FilterContext';

type Props = {
  todos: Todo[],
  isLoading: boolean,
};

const getVisibleTodos = (filter: SortType, allTodos: Todo[]) => {
  switch (filter) {
    case SortType.ACTIVE:
      return allTodos.filter(todo => todo.completed === false);

    case SortType.COMPLETED:
      return allTodos.filter(todo => todo.completed === true);

    default:
      return allTodos;
  }
};

export const TodoMain: React.FC<Props> = ({ todos, isLoading }) => {
  const { filter } = useContext(FilterContext);

  const visbleTodos = useMemo(() => (
    getVisibleTodos(filter, todos)
  ), [filter, todos]);

  return (
    <section className="todoapp__main">
      {visbleTodos.map(todo => (
        <div
          className={classNames('todo', {
            completed: todo.completed,
          })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              defaultChecked={todo.completed}
            />
          </label>

          <span className="todo__title">{todo.title}</span>
          <button type="button" className="todo__remove">×</button>

          <div
            className="modal overlay"
            style={{
              display: !isLoading ? 'block' : 'none',
            }}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
