import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterTodos, setFilterTodos] = useState('All');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleButtonClickAll = () => {
    setFilterTodos('All');
  };

  const handleButtonClickActive = () => {
    setFilterTodos('Active');
  };

  const handleButtonClickCompleted = () => {
    setFilterTodos('Completed');
  };

  let visibleTodos = todos;

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  if (filterTodos === 'Active') {
    visibleTodos = todos.filter(todo => !todo.completed);
  }

  if (filterTodos === 'Completed') {
    visibleTodos = todos.filter(todo => todo.completed);
  }

  const todosLeft = visibleTodos.filter(todo => !todo.completed);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => (setErrorMessage('Unable to load a todos')));
    }

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
        />
        {todos.length !== 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              filterTodos={filterTodos}
              todosLeft={todosLeft}
              onClickAll={handleButtonClickAll}
              onClickActive={handleButtonClickActive}
              onClickCompleted={handleButtonClickCompleted}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
