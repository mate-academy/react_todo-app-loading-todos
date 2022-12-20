/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createTodo, getTodos, TodoData } from './api/todos';
import { AuthContext, AuthProvider } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { FilterOptions } from './types/Filter';
import { Todo } from './types/Todo';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [isErrorHidden, setIsErrorHidden] = useState(true);
  const [selectedOption, setSelectedOption] = useState(FilterOptions.ALL);

  const addNewTodo = (todo: TodoData) => {
    setIsErrorHidden(true);

    return wait(300)
      .then(() => createTodo(todo))
      .then(todoToAdd => {
        setTodos(prevTodos => [...prevTodos, todoToAdd]);
      }).catch(errorMes => {
        if (errorMes) {
          setError('add');
          setIsErrorHidden(false);
        }
      });
  };

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(todoList => setTodos(todoList))
        .catch(errorMes => {
          if (errorMes) {
            setError('get');
            setIsErrorHidden(false);
          }
        });
    }
  }, []);

  const filterBySelect = useCallback((
    todosFromServer: Todo[],
    option: string,
  ) => {
    return todosFromServer.filter(todo => {
      switch (option) {
        case FilterOptions.ACTIVE:
          return todo.completed === false;

        case FilterOptions.COMPLETED:
          return todo.completed === true;

        case FilterOptions.ALL:
        default:
          return true;
      }
    });
  }, []);

  const visibleTodos = useMemo(() => {
    return filterBySelect(todos, selectedOption);
  }, [todos, selectedOption]);

  const AmountOfActiveTodos = useMemo(() => {
    return filterBySelect(todos, FilterOptions.ACTIVE).length;
  }, [todos]);

  return (
    <AuthProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <div className="todoapp__content">
          <header className="todoapp__header">
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                { active: AmountOfActiveTodos === 0 },
              )}
            />
            <NewTodoForm
              onAdd={addNewTodo}
            />
          </header>
          {todos.length > 0 && (
            <>
              <TodoList todos={visibleTodos} />

              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="todosCounter">
                  {`${AmountOfActiveTodos} items left`}
                </span>

                <TodoFilter
                  selectedOption={selectedOption}
                  onOptionChanged={setSelectedOption}
                />

                <button
                  data-cy="ClearCompletedButton"
                  type="button"
                  className="todoapp__clear-completed"
                >
                  Clear completed
                </button>
              </footer>
            </>
          )}
        </div>

        <ErrorNotification
          error={error}
          isHidden={isErrorHidden}
          onErrorHidden={setIsErrorHidden}
        />
      </div>

    </AuthProvider>
  );
};
