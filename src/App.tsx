/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header';
import { Error } from './components/Error';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorType } from './types/Error';
import { TodoStatus } from './types/TodoStatus';
import { useErrorHandler } from './hooks/useErrorHandler';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus>(TodoStatus.all);
  const { error, handleError } = useErrorHandler();

  const receiveData = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
    } catch (err) {
      handleError(ErrorType.loading_error, 3000);
    }
  };

  const updateTodoStatus = (id: number, completed: boolean) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, completed } : todo)),
    );
  };

  const filterData = (filterBy: TodoStatus) => {
    switch (filterBy) {
      case TodoStatus.active:
        return todos.filter(todo => !todo.completed);

      case TodoStatus.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  useEffect(() => {
    receiveData();
  }, []);

  const visibleTodos = filterData(filter);
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      {!USER_ID ? (
        <UserWarning />
      ) : (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <Header />

            {todos.length > 0 && (
              <>
                <TodoList
                  todos={visibleTodos}
                  setUpdateTodoStatus={updateTodoStatus}
                />
                <Footer
                  filterBy={filter}
                  setFilterBy={setFilter}
                  activeCount={activeCount}
                />
              </>
            )}
          </div>

          <Error error={error} setError={handleError} />
        </>
      )}
    </div>
  );
};
