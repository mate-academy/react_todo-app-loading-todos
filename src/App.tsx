/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './Components/Header';
import { Section } from './Components/Section';
import { Footer } from './Components/Footer';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';

const USER_ID = 12083;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [error, setErrorMessege] = useState('');
  const [statusTodo, setStatusTodo] = useState('');

  function filterTodos() {
    switch (statusTodo) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'All':
        return todos;
      default: return todos;
    }
  }

  useEffect(() => {
    setErrorMessege('');
    todoService.getTodos(USER_ID)
      .then(response => setTodos(response))
      .catch(() => setErrorMessege('Unable to load todos'))
      .finally(() => setInterval(() => setErrorMessege(''), 3000));
  }, []);

  function addTodo({
    title,
    userId,
    completed,
  }: Todo) {
    setErrorMessege('');
    if (!title) {
      setErrorMessege('Title should not be empty');
    }

    return todoService.addTodos({
      title,
      userId,
      completed,
    })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .catch((err) => {
        setErrorMessege('Unable to add a todo');
        throw err;
      })
      .finally(() => setInterval(() => setErrorMessege(''), 3000));
  }

  function updateCompliteTodos(updateTodo: Todo) {
    setErrorMessege('');

    return todoService.updateTodos(updateTodo)
      .then(newTodo => {
        setTodos(currentTodos => {
          return currentTodos.map(todo => (todo.id === newTodo.id
            ? { ...newTodo, completed: true }
            : todo));
        });
      })
      .catch(() => setErrorMessege('Unable to update a todo'))
      .finally(() => setInterval(() => setErrorMessege(''), 3000));
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          userId={USER_ID}
          onSubmit={(newValue) => addTodo(newValue)}
          selectedTodo={selectedTodo}
          statusTodo={statusTodo}
        />

        <Section
          onSelect={(newValue) => {
            setSelectedTodo(newValue);
            updateCompliteTodos(newValue);
          }}
          filteredTodos={filterTodos()}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            onStatus={(newStatus: string) => setStatusTodo(newStatus)}
            status={statusTodo}
            todos={todos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-dangers-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessege('')}
        />
        {/* show only one message at a time */}
        {error}
        {/* <br />
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
