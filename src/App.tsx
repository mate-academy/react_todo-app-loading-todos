import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorText } from './components/ErrorText/ErrorText';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorText, setErrorText] = useState<string>('');
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  const user = useContext(AuthContext);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const getTodosFromServer = async (userId: number) => {
      try {
        const receivedTodos = await getTodos(userId);

        setTodos(receivedTodos);
      } catch (error) {
        setErrorText(`${error}`);
      }
    };

    if (!user) {
      return;
    }

    getTodosFromServer(user.id);
  }, []);

  const getFilteredTodo = useMemo(() => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.Active:
          return !todo.completed;

        case FilterType.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filterType]);

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
              <TodoList todos={getFilteredTodo} />
              <Footer
                filteredType={setFilterType}
                filterType={filterType}
                todos={todos}
              />
            </>
          )
        }
      </div>

      {errorText && (
        <ErrorText
          errorText={errorText}
          setErrorText={setErrorText}
        />
      )}
    </div>
  );
};
