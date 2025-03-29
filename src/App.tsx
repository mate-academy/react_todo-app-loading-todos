import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { FilterStatus } from './types/FilterStatus';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ErrorNotification from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  useEffect(() => {
    getTodos()
      .then((fetchedTodos: Todo[]) => {
        setTodos(fetchedTodos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filterStatus === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleFilterChange = (newFilter: FilterStatus) => {
    setFilterStatus(newFilter);
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {!errorMessage && filteredTodos.length > 0 && (
                <TodoList
                  visibleTodos={filteredTodos}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              )}
            </section>
            <Footer
              todos={todos}
              filterStatus={filterStatus}
              handleFilterChange={handleFilterChange}
            />
          </>
        )}
      </div>
      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
