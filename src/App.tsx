/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosService from './api/todos';
import { OnTodoChange, Todo } from './types/Todo';
import cn from 'classnames';
import { TodoComponent } from './components/todo';
import { setFieldTodo } from './utils/setTodoField';
import { filterTodos } from './utils/filterTodos';
import { TodosFilter } from './types/TodosFilter';
import { FilterButton } from './components/FilterButton/FilterButton';
import { ErrorMessage } from './components/Error';

export const App: React.FC = () => {
  const todosFilters = ['All', 'Active', 'Completed'] as TodosFilter[];

  const [isLoading, setIsLoading] = useState(false);
  const [doubleclicked, setDoubleclicked] = useState(false);

  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [selectedFilter, setSelectedFilter] = useState<TodosFilter>('All');
  const [editing, setEditing] = useState<number | null>(null);

  const [todosLeftToComplete, setTodosLeftToComplete] = useState(0);

  const [errors, setErrors] = useState({
    load: '',
    title: '',
    add: '',
    delete: '',
    update: '',
  });
  const errorsArray = Object.entries(errors);

  const [isAnyError, setIsAnyError] = useState(false);

  /* Get todos */
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await todosService.getTodos();

        setTodosFromServer(fetchedTodos);
        fetchedTodos.forEach(
          todo => !todo.completed && setTodosLeftToComplete(prev => prev + 1),
        );
      } catch (error) {
        setErrors(prev => ({ ...prev, load: 'Unable to load todos' }));
      }
    };

    fetchTodos();
  }, []);

  /* Synchronize todos */
  useEffect(() => {
    setFilteredTodos(todosFromServer);
  }, [todosFromServer]);

  /*  For errors handling */
  useEffect(() => {
    const isSomeError = Object.values(errors).some(error => error.length);

    setIsAnyError(isSomeError);

    if (isSomeError) {
      const timeoutId = setTimeout(() => {
        setErrors({
          load: '',
          title: '',
          add: '',
          delete: '',
          update: '',
        });
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [errors]);

  const handleTodoChange: OnTodoChange = async (todo, field, value) => {
    if (field === 'title' && value === todo.title) {
      return;
    }

    setIsLoading(true);

    try {
      const updatedTodo = setFieldTodo(todo, field, value);

      await todosService.updateTodo(updatedTodo);

      setTodosFromServer(prevTodos => {
        return prevTodos.map(t => (t.id === updatedTodo.id ? updatedTodo : t));
      });

      if (field === 'completed' && value === true) {
        setTodosLeftToComplete(prev => (prev === 0 ? 0 : prev - 1));
      } else if (field === 'completed' && value === false) {
        setTodosLeftToComplete(prev => {
          if (todosLeftToComplete === filteredTodos.length) {
            return todosLeftToComplete;
          }

          return prev + 1;
        });
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, update: 'Unable to update a todo' }));
    } finally {
      setIsLoading(false);
      setEditing(null);
      setDoubleclicked(false);
    }
  };

  const handleAllDoneButton = () => {
    const switcher = todosLeftToComplete === 0;

    filteredTodos.forEach(todo =>
      handleTodoChange(todo, 'completed', !switcher),
    );
  };

  const handleFilterButton = (filter: TodosFilter) => {
    switch (filter) {
      case 'Active':
        setFilteredTodos(filterTodos(todosFromServer, 'completed', false));
        break;
      case 'Completed':
        setFilteredTodos(filterTodos(todosFromServer, 'completed', true));
        break;
      default:
        setFilteredTodos(todosFromServer);
    }
  };

  if (!todosService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {filteredTodos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: todosLeftToComplete === 0,
              })}
              data-cy="ToggleAllButton"
              onClick={handleAllDoneButton}
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoComponent
              key={todo.id}
              todo={todo}
              onTodoChange={handleTodoChange}
              isLoading={isLoading}
              isDoubleclicked={doubleclicked}
              setIsDoubleclicked={setDoubleclicked}
              editing={editing}
              setEditing={setEditing}
            />
          ))}
        </section>

        {todosFromServer.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosLeftToComplete} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {todosFilters.map(filter => (
                <FilterButton
                  key={filter}
                  filter={filter}
                  selectedFilter={selectedFilter}
                  onClick={() => {
                    handleFilterButton(filter);
                    setSelectedFilter(filter);
                  }}
                />
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todosLeftToComplete === todosFromServer.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !isAnyError },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorsArray.map(([key, error]) => (
          <ErrorMessage key={key} message={error} />
        ))}
      </div>
    </div>
  );
};
