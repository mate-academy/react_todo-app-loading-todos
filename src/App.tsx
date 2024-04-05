/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoContext } from './context/TodosContext';

enum FilterOptions {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

type Error =
  | 'Unable to load todos'
  | 'Title should not be empty'
  | 'Unable to add a todo'
  | 'Unable to delete a todo'
  | 'Unable to update a todo';

export const App: React.FC = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);
  const [activeFilter, setActiveFilter] = useState(FilterOptions.ALL);
  const [newTodo, setNewTodo] = useState('');

  const handleErrorMessage = (error: Error | null) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch({ type: 'SET_TODOS', payload: todosFromServer });
      } catch {
        handleErrorMessage('Unable to load todos');
      }
    };

    fetchTodos();
  }, [dispatch]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const itemsLeft = todos.length - completedTodosCount;

  const handleFilterClick = (filter: FilterOptions) => {
    setActiveFilter(filter);
    switch (filter) {
      case FilterOptions.ACTIVE:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case FilterOptions.COMPLETED:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleErrorMessage(null);
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim() !== '') {
      const maxId = todos.reduce(
        (max, todo) => (todo.id > max ? todo.id : max),
        0,
      );

      const addTodo = {
        id: maxId + 1,
        userId: USER_ID,
        title: newTodo,
        completed: false,
      };

      dispatch({ type: 'ADD_TODO', payload: addTodo });
      setNewTodo('');
    } else {
      handleErrorMessage('Title should not be empty');
    }
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'DELETE_COMPLETED' });
  };

  const handleToggleAllButton = () => {
    const toggleAll = !todos.every(todo => todo.completed);

    dispatch({ type: 'TOGGLE_ALL', payload: toggleAll });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            onClick={handleToggleAllButton}
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={handleQueryChange}
            />
          </form>
        </header>

        {todos.length !== 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {itemsLeft} items left
              </span>
              <nav className="filter" data-cy="Filter">
                {Object.values(FilterOptions).map(option => (
                  <a
                    key={option}
                    href={`#${option === FilterOptions.ALL ? '' : option.toLowerCase()}`}
                    className={cn('filter__link', {
                      selected: activeFilter === option,
                    })}
                    data-cy={`FilterLink${option}`}
                    onClick={() => handleFilterClick(option)}
                  >
                    {option}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={completedTodosCount === 0}
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => handleErrorMessage(null)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
