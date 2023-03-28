import React,
{
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
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
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage('upload');
      }
    };

    getTodosFromServer();
  }, []);

  const handleFormInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          query={query}
          onFormInputChange={handleFormInputChange}
        />

        {todos && (
          <>
            <TodoList
              todos={filteredTodos}
            />
            <Footer
              todos={filteredTodos}
              todoFilterType={todoFilterType}
              setTodoFilterType={setTodoFilterType}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification
        errorMessage={errorMessage}
      />
    </div>
  );
};
