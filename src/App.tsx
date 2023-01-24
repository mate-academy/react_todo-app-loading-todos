import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilterForTodos, setSelectedFilterForTodos] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setErrorMessage('Unable to load a todo'));
    }
  }, [user]);

  const visibleFiltredTodos = useMemo(() => (
    todos.filter(todo => {
      if (selectedFilterForTodos === 'active') {
        return !todo.completed;
      }

      if (selectedFilterForTodos === 'completed') {
        return todo.completed;
      }

      return todo;
    })
  ), [selectedFilterForTodos, todos]);

  const countOfActiveTodos = useMemo(() => (
    todos.filter(todo => !todo.completed)).length, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0
          && (
            <>
              <TodoList todos={visibleFiltredTodos} />
              <Footer
                countActiveTodos={countOfActiveTodos}
                selectedFilterForTodos={selectedFilterForTodos}
                onChosedFilter={setSelectedFilterForTodos}
              />
            </>
          )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
