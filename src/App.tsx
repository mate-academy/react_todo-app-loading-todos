import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleError = (ErrorNotification: string) => {
    setErrorMessage(ErrorNotification);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        handleError('Unable to load todos');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const itemsLeft = todos.filter(({ completed }) => !completed).length;
  const haveCompletedTodos = todos.some(({ completed }) => completed);
  const allCompleted = todos.every(({ completed }) => completed);

  const filteredTodos = todos.filter(task => {
    switch (status) {
      case Status.Active:
        return !task.completed;
      case Status.Completed:
        return task.completed;
      case Status.All:
      default:
        return true;
    }
  });

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!!todo.trim()) {
      setTodos(prevTodos => {
        const newTodo: Todo = {
          id: prevTodos.length + 1,
          userId: USER_ID,
          title: todo,
          completed: false,
          status: status,
        };

        return [...prevTodos, newTodo];
      });
      setTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todoItem => todoItem.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todoItem => !todoItem.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          isAllCompleted={allCompleted}
          onAddTodo={addTodo}
          handleInputChange={handleInputChange}
          todosLength={todos.length}
        />
        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} onDeleteTodo={deleteTodo} />
            <Footer
              todos={todos}
              onClearCompleted={clearCompleted}
              onStatusChange={setStatus}
              status={status}
              itemsLeft={itemsLeft}
              haveCompletedTodos={haveCompletedTodos}
            />
          </>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};

export default App;
