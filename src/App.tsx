/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/footer';
import { Main } from './components/main';
import { ErrorNotification } from './components/errorNotification';
import { Header } from './components/header';
import { Todo } from './types/Todo';
import { SelectOptions } from './types/SelectOptions';
import { getTodos } from './api/todos';

const USER_ID = 6447;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [onError, setOnError] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [completedTodosId, setCompletedTodosId] = useState<number[]>([]);

  const filteredCompletedTodosId = (allTodos:Todo[]) => {
    return allTodos
      .filter((todo: Todo) => todo.completed)
      .map(todoItem => todoItem.id);
  };

  const filterTodosBySelectOptions = (type: SelectOptions) => {
    switch (type) {
      case SelectOptions.ACTIVE:
        setVisibleTodos(todos.filter((todo: Todo) => !todo.completed));
        break;
      case SelectOptions.COMPLETED:
        setVisibleTodos(todos.filter((todo: Todo) => todo.completed));
        break;
      case SelectOptions.ALL:
        setVisibleTodos(todos);
        break;
      default:
        setVisibleTodos(todos);
    }
  };

  const loadTodosFromServer = async () => {
    try {
      const todosData = await getTodos(USER_ID);

      if (!todosData) {
        setOnError(true);
      } else {
        setTodos(todosData);
        setVisibleTodos(todosData);
        setCompletedTodosId(filteredCompletedTodosId(todosData));
      }
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(err);
      }
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOnError(false);
    }, 3000);
  }, []);

  const closeNotification = () => {
    setOnError(false);
  };

  const addComplitedTodo = (todoId:number) => {
    const currentTodo = todos.find(todo => todo.id === todoId);

    if (currentTodo) {
      if (!completedTodosId.includes(todoId)) {
        setCompletedTodosId(prevState => ([...prevState, todoId]));
      } else {
        setCompletedTodosId(prevState => {
          return prevState.filter(id => id !== todoId);
        });
      }
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length
          && <Main todos={visibleTodos} addComplitedTodo={addComplitedTodo} />}

        {todos && (
          <Footer
            filterTodos={filterTodosBySelectOptions}
            todosCount={todos.length}
            completedTodosCount={completedTodosId.length}
          />
        )}
      </div>

      {onError && (
        <ErrorNotification
          onNotificationClose={closeNotification}
          isErrorOccuring={onError}
        />
      )}
    </div>
  );
};
