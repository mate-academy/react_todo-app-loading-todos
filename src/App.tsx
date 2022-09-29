/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
// import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from
  './components/Auth/ErrorNotification/ErrorNotification';
import { Footer } from './components/Auth/Footer/Footer';
import { Header } from './components/Auth/Header/Header';
import { TodoList } from './components/Auth/TodoList/TodoList';
import { FilterType } from './types/FilterBy';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const user = useContext(AuthContext);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const receivedTodos = await getTodos(2);

        setTodos(receivedTodos);
      } catch (error) {
        setErrorMessage(`${error}`);
      }
    };

    getTodosFromServer();
  }, []);

  const getFilteredTodo = todos.filter(todo => {
    switch (filterType) {
      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodosField={newTodoField}
        />
        {
          todos.length > 0 && (
            <>
              <TodoList
                todos={getFilteredTodo}
              />
              <Footer
                filterTypes={setFilterType}
                filterType={filterType}
                todos={todos}
              />
            </>
          )
        }

      </div>
      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}

    </div>
  );
};
