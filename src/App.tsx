/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ErrorMessage, FilterStatus, Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.DEFAULT);
  const [todoStatus, setTodoStatus] = useState(FilterStatus.ALL);

  if (!USER_ID) {
    return <UserWarning />;
  }

  useEffect(() => {
    setErrorMessage(ErrorMessage.DEFAULT);

    getTodos()
      .then((todos: Todo[]) => {
        setSelectedTodo(todos);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.LOAD);
        setTimeout(() => {
          setErrorMessage(ErrorMessage.DEFAULT);
        }, 3000);
      });
  }, []);

  const visibleTodos = selectedTodo.filter(todo => {
    switch (todoStatus) {
      case FilterStatus.ACTIVE:
        return !todo.completed;
      case FilterStatus.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleFilterChange = (newTodoStatus: FilterStatus) => {
    setTodoStatus(newTodoStatus);
  };

  const handleHideError = () => {
    setErrorMessage(ErrorMessage.DEFAULT);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!selectedTodo.length && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {!errorMessage && !!visibleTodos.length && (
                <TodoList visibleTodos={visibleTodos} />
              )}
            </section>
            <Footer
              selectedTodo={selectedTodo}
              todoStatus={todoStatus}
              handleFilterChange={handleFilterChange}
            />
          </>
        )}
      </div>

      <Error errorMessage={errorMessage} onHideError={handleHideError} />
    </div>
  );
};
