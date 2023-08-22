import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { ListAction } from '../Enum/ListAction';
import { useTodo } from '../Hooks/UseTodo';

export const TodosFooter: React.FC = () => {
  const {
    todo,
    setTodo,
    filter,
    setFilter,
  } = useTodo();

  const selectedTodosLength = useMemo(() => (
    todo.filter(todos => !todos.completed).length), [todo]);

  const compleatedTodosLength = todo.filter(todos => todos.completed).length;

  const deleteTodos = () => {
    const filterTodos = (currentTodos: Todo[]) => currentTodos.filter(
      todoItem => !todoItem.completed,
    );

    setTodo(filterTodos(todo));
  };

  return (
    <>
      {todo.length > 0 && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {selectedTodosLength === 1
              ? '1 item left'
              : `${selectedTodosLength} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={classNames(
                'filter__link',
                { selected: filter === ListAction.ALL },
              )}
              onClick={() => setFilter(ListAction.ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames(
                'filter__link',
                { selected: filter === ListAction.ACTIVE },
              )}
              onClick={() => setFilter(ListAction.ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames(
                'filter__link',
                { selected: filter === ListAction.COMPLETED },
              )}
              onClick={() => setFilter(ListAction.COMPLETED)}
            >
              Completed
            </a>
          </nav>

          {compleatedTodosLength > 0 && (
            <button
              type="button"
              className="todoapp__clear-completed"
              onClick={deleteTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
