import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTypes } from './types/Enums';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState(FilterTypes.All);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleButtonClickAll = () => {
    setFilterType(FilterTypes.All);
  };

  const handleButtonClickActive = () => {
    setFilterType(FilterTypes.ACTIVE);
  };

  const handleButtonClickCompleted = () => {
    setFilterType(FilterTypes.COMPLETED);
  };

  const visibleTodos = useMemo(() => {
    switch (filterType) {
      case FilterTypes.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterTypes.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filterType]);

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
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
              filterType={filterType}
              todosLeft={todosLeft}
              handleButtonClickAll={handleButtonClickAll}
              handleButtonClickActive={handleButtonClickActive}
              handleButtonClickCompleted={handleButtonClickCompleted}
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
