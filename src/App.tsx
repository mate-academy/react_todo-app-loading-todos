import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Selected } from './types/Selected';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selected, setSelected] = useState(Selected.All);

  const todosToShow = todos.filter(todo => {
    switch (selected) {
      case Selected.Active:
        return !todo.completed;
      case Selected.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const isAllCompleted = todos.every(todo => todo.completed === true);
  const activeTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.filter(todo => todo.completed === true);

  const handleSelected = (selectedOption: Selected) => {
    setSelected(selectedOption);
  };

  const showError = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const onCloseError = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAllCompleted={isAllCompleted} />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todosToShow={todosToShow} />
        </section>

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            selected={selected}
            handleSelected={handleSelected}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onCloseError={onCloseError}
      />
    </div>
  );
};
