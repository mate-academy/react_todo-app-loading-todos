import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { SortParam } from './types/SortParam';
import { ErrorTodo } from './types/ErrorTodo';
import { ErrorMessage } from './components/errorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { NavContext, NavProvider } from './components/NavContext';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>();
  // const [sortBy, setSortBy] = useState(SortParam.All);
  const [errorTodo, setErrorTodo] = useState<ErrorTodo | null>(null);
  const { sortBy } = useContext(NavContext);

  // console.log(sortBy);

  const getSortedTodos = (sortingBy: SortParam) => {
    // console.log('getSortedTodos:', sortBy);

    switch (sortingBy) {
      case SortParam.Active:
        return todosFromServer?.filter(todo => !todo.completed);

      case SortParam.Completed:
        return todosFromServer?.filter(todo => todo.completed);

      default:
        return todosFromServer;
    }
  };

  async function loadTodos() {
    // console.log('loadTodos:', sortBy);

    setErrorTodo(null);

    if (user) {
      const loadedTodos = await getTodos(user.id);

      try {
        if ('Error' in loadedTodos) {
          throw new Error();
        }

        setTodosFromServer(loadedTodos);
      } catch {
        setErrorTodo('download');
        setTimeout(setErrorTodo, 3000, null);
      }
    }
  }

  const visibleTodos = getSortedTodos(sortBy);
  const numberOfCompletedTodo
    = todosFromServer?.filter(todo => !todo.completed).length;

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  return (
    <NavProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header newTodoField={newTodoField} />

          {visibleTodos && <TodoList todos={visibleTodos} />}

          {visibleTodos?.length !== 0 && visibleTodos && (
            <Footer
              numberOfCompletedTodo={numberOfCompletedTodo}
              // setSortBy={setSortBy}
            />
          )}
        </div>

        {errorTodo && (
          <ErrorMessage
            typeError={errorTodo}
            onCloseErrorMessage={setErrorTodo}
          />
        )}
      </div>
    </NavProvider>
  );
};
