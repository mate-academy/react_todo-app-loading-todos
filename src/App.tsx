/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { UserWarning } from './components/UserWarning';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<Filter>(Filter.All);

  const fetchTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const todosFromServer = await getTodos();

      setTodoList(todosFromServer);
    } catch (error) {
      setErrorMessage('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => setErrorMessage(null), 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const filteredTodos = (todos: Todo[], filter: Filter): Todo[] => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      case Filter.All:
      default:
        return todos;
    }
  };

  const activeTodosCount = useMemo(
    () => todoList.filter(todo => !todo.completed).length,
    [todoList],
  );

  const filteredTodosList = useMemo(
    () => filteredTodos(todoList, currentFilter),
    [todoList, currentFilter],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!loading && todoList.length > 0 && (
          <>
            <TodoList todos={filteredTodosList} />
            <Footer
              activeCount={activeTodosCount}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onHide={() => setErrorMessage(null)}
      />
    </div>
  );
};
