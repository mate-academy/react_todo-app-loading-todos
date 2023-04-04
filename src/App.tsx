/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader';
import { FilterBy } from './types/FilteredBy';
import { TodoFilter } from './components/TodoFilter';
import { Form } from './components/Form';
import { ErrorMessage } from './components/ErrorMessage';

const USER_ID = 6894;

function filterTodosByCompleted(todos: Todo[], filterBy: string): Todo[] {
  switch (filterBy) {
    case FilterBy.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case FilterBy.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const App: FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<FilterBy>(FilterBy.ALL);

  const addError = (message: string) => {
    setErrorMessage(message);
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID).then(todos => setAllTodos(todos))
      .catch(() => addError('Unable to update a todo'));
  }, []);

  const visibleTodos = filterTodosByCompleted(allTodos, filteredTodos);

  const countActiveTodos = visibleTodos.reduce((sum, todo) => {
    if (!todo.completed) {
      return sum + 1;
    }

    return sum;
  }, 0);

  const isComplitedTodo = allTodos.some(todo => todo.completed);
  const isActiveTodo = allTodos.some(todo => !todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames(
              'todoapp__toggle-all',
              {
                active: isActiveTodo,
              },
            )}
          />

          {/* Add a todo on form submit */}
          <Form
            todoTitle={todoTitle}
            setTodoTitle={setTodoTitle}
          />
        </header>

        {allTodos.length === 0
          ? (
            <Loader />
          ) : (
            <section className="todoapp__main">
              <TodoList todos={visibleTodos} />
            </section>
          )}

        {allTodos.length === 0
        || (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${countActiveTodos} items left`}
            </span>

            <nav className="filter">
              <TodoFilter
                filteredTodos={filteredTodos}
                setFilteredTodos={setFilteredTodos}
              />
            </nav>

            {isComplitedTodo
            && (
              <button
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            )}

          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorMessage
        errorMessage={errorMessage}
        isError={isError}
        setIsError={setIsError}
      />
    </div>
  );
};
