/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { TodoStatus } from './types/TodoStatus';

const USER_ID = 11468;

function filterBySelect(
  todo: Todo,
  selectedOption: string,
) : boolean {
  switch (selectedOption) {
    case TodoStatus.Active:
      return !todo.completed;
    case TodoStatus.Completed:
      return todo.completed;
    default:
      return true;
  }
}

function filterTodos(todos: Todo[], selectedOption: string) {
  if (!selectedOption) {
    return todos;
  }

  return todos.filter((todo) => (
    filterBySelect(todo, selectedOption)
  ));
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(TodoStatus.All);

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then((todosFromSrever) => {
        setTodos(todosFromSrever);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = filterTodos(todos, selectedOption);

  const onChangeSelect = (newOption: TodoStatus) => {
    setSelectedOption(newOption);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header
          todos={todos}
        />

        <TodoList
          todos={visibleTodos}
        />

        {todos.length !== 0 && (
          <Footer
            onChangeSelect={onChangeSelect}
            selectedOption={selectedOption}
            todos={todos}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}

      >
        <button
          data-cy="HideErrorButton"
          type="button"
          onClick={() => (setErrorMessage(''))}
          className="delete"
        />
        {errorMessage}

        {/* show only one message at a time */}

        {/* Unable to load todos

        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>

  );
};
