import React,
{
  useState, useEffect, useMemo,
} from 'react';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { Errors } from './types/Errors';
import { getTodos } from './api/todos';
import Footer from './components/Footer';
import Header from './components/Header';
import Notification from './components/Notification';
import TodoList from './components/TodoList';
import { UserWarning } from './UserWarning';

const USER_ID = 6511;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilterType, setTodoFilterType] = useState<FilterBy>(FilterBy.all);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.none);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (todoFilterType) {
        case FilterBy.active:
          return !todo.completed;

        case FilterBy.completed:
          return todo.completed;

        case FilterBy.all:
          return true;

        default:
          return todo;
      }
    });
  }, [todos, todoFilterType]);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        setErrorMessage(Errors.load);
      }
    };

    getTodosFromServer();
  }, []);

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleErrorMessage = () => {
    setErrorMessage(Errors.none);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodos={activeTodos}
        />

        {todos && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              activeTodos={activeTodos}
              todoFilterType={todoFilterType}
              setTodoFilterType={setTodoFilterType}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <Notification
          errorMessage={errorMessage}
          closeError={handleErrorMessage}
        />
      )}
    </div>
  );
};
