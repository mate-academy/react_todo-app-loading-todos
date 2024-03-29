import React, { useState, useEffect } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        return wait(3000).then(() => setErrorMessage(''));
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
      const newTodo: Todo = {
        id: todos.length + 1,
        userId: USER_ID,
        title: todo,
        completed: false,
        status: status,
      };

      setTodos([...todos, newTodo]);
      setTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todoItem => todoItem.id !== id);

    setTodos(newTodos);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter(todoItem => !todoItem.completed);

    setTodos(newTodos);
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
        className={`notification is-danger is-light has-text-weight-normal ${errorMessage ? '' : 'hidden'}`}
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
