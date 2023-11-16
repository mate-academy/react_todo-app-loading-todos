/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Section } from './Components/Todolist';
import { TodosFooter } from './Components/TodosFooter';
import { client } from './utils/fetchClient';

const USER_ID = 'https://mate.academy/students-api/todos?userId=11910';

export const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Функция для загрузки данных с сервера
    const fetchTodos = async () => {
      try {
        // throw new Error();
        setIsLoading(true);
        const response = await client.getAll<Todo[]>();

        setTodos(response);
      } catch (error) {
        setIsLoadingError(true);
        // console.log('Error fetching todos:', error);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    // Вызываем функцию загрузки при открытии страницы (монтировании компонента)
    fetchTodos();
  }, []); // Пустой массив зависимостей гарантирует, что useEffect сработает только при монтировании

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.floor(Math.random() * 1000),
        title: inputValue,
        completed: false,
        userId: 11910,
      }]);

    setInputValue('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos + */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all',
              { active: todos.find(todo => !todo.completed) })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit + */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
            />
          </form>
        </header>

        <Section
          filterType={filterType}
          todos={todos}
          setTodos={setTodos}
          isLoading={isLoading}
        />

        {/* Hide the footer if there are no todos + */}
        {todos.length !== 0 && (
          <TodosFooter
            todos={todos}
            setTodos={setTodos}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      {isError && (
        <div
          data-cy="ErrorNotification"
          className={
            classNames('notification is-danger is-light has-text-weight-normal',
              {
                hidden: !isError,
              })
          }
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setIsError(false)}
          />
          {/* show only one message at a time + */}

          {isLoadingError && 'Unable to load todos'}

          {/* <br />
        {inputValue !== '' && 'Title should not be empty'}
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
        </div>
      )}
    </div>
  );
};
