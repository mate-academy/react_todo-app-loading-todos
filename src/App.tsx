import React, { useEffect, useState } from 'react';
import {
  getTodos,
  postTodo,
  patchTodo,
  deleteTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Error } from './components/Errors';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosApp, setTodosApp] = useState<Todo[]>(todos);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const autoClosingErrorMessage = (message: string) => {
    setIsError(true);
    setErrorMessage(message);

    setTimeout(() => (setIsError(false)), 3000);
  };

  const handlerError = (checked: boolean) => {
    setIsError(checked);
  };

  const filterTodos = (todoFiltered: Todo[]) => {
    setTodosApp(todoFiltered);
  };

  const loadTodos = async () => {
    setIsError(false);

    try {
      const dataFromServer = await getTodos();

      setTodos(dataFromServer);
      setTodosApp(dataFromServer);
    } catch (error) {
      autoClosingErrorMessage('Unable to load a todos');
    }
  };

  const doPostTodo = async (newTodoTitle: string) => {
    setIsError(false);

    try {
      await postTodo({
        title: newTodoTitle,
        userId: 6725,
        completed: false,
      });

      loadTodos();
    } catch (error) {
      autoClosingErrorMessage("can't send post request");
    }
  };

  const handleChecker = async (id: number, data: unknown) => {
    setIsError(false);

    try {
      await patchTodo(id, data);

      loadTodos();
    } catch (error) {
      autoClosingErrorMessage('Unable to update a todo');
    }
  };

  const removeTodo = async (id: number) => {
    setIsError(false);

    try {
      await deleteTodo(id);

      loadTodos();
    } catch (error) {
      autoClosingErrorMessage('Unable to delete a todo');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const isFooterVisible = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          doPostTodo={doPostTodo}
          handleChecker={handleChecker}
        />
        <Main
          todos={todosApp}
          handleChecker={handleChecker}
          removeTodo={removeTodo}
        />
        {isFooterVisible && (
          <Footer
            todos={todos}
            filterTodos={filterTodos}
            removeTodo={removeTodo}
          />
        )}
        {isError && (
          <Error
            isError={isError}
            errorMessage={errorMessage}
            handlerError={handlerError}
          />
        )}
      </div>
    </div>
  );
};
