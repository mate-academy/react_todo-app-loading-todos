import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { FilterOptions } from '../../types/FilterOptions';

interface Props {
  todos: Todo[],
  currentFilter: FilterOptions,
}

export const TodoList: FC<Props> = ({ todos, currentFilter }) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (currentFilter) {
        case FilterOptions.Active:
          return !todo.completed;
        case FilterOptions.Completed:
          return todo.completed;
        case FilterOptions.All:
        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [todos, currentFilter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames(
            'todo',
            { completed: todo.completed },
          )}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">{todo.title}</span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
          >
            ×
          </button>

          <div
            data-cy="TodoLoader"
            className={classNames(
              'modal',
              'overlay',
            )}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
