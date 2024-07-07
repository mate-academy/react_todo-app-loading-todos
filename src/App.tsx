import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/header';
import { TodoList } from './components/todoList';
import { Footer } from './components/footer';
import { Notification } from './components/notification';
import { Todo } from './types/Todo';
import { Completed } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtersParams, setFiltersParams] = useState(Completed.All);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setMessageError('Unable to load todos'));
  }, []);

  const todosCounter = todos.filter(todo => !todo.completed)

  const filterTodos = useMemo(() => {
    let copyTodos = [...todos];

    copyTodos = copyTodos.filter(item => {
      switch (filtersParams) {
        case Completed.Active:
          return item.completed === false;
        case Completed.Completed:
          return item.completed;
        case Completed.All:
        default:
          return true;
      }
    });

    return copyTodos;
  }, [todos, filtersParams]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filterTodos} />
        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            onSetParam={setFiltersParams}
            filterParam={filtersParams}
            count={todosCounter.length}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification messageError={messageError} onSetError={setMessageError} />
    </div>
  );
};
