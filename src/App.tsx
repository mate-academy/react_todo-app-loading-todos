import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterTypes } from './types/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState<FilterTypes>(FilterTypes.All);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function todosFromServer(userId: number) {
      try {
        const visibleTodos = getTodos(userId);

        setTodos(await visibleTodos);
      } catch (error) {
        setErrorMessage(`${error}`);
      }
    }

    if (!user) {
      return;
    }

    todosFromServer(user.id);
  }, []);

  const ActiveTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const filterTodos = useMemo(() => {
    return todos.filter(todoItem => {
      switch (filterBy) {
        case FilterTypes.All:
          return todoItem;

        case FilterTypes.Active:
          return !todoItem.completed;

        case FilterTypes.Completed:
          return todoItem.completed;

        default:
          return null;
      }
    });
  }, [todos, filterBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos && (
          <div className="todoapp__content">
            <TodoList
              filterTodos={filterTodos}
            />
            <Footer
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              ActiveTodos={ActiveTodos}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
