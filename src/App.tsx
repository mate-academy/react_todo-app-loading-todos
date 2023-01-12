/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoAppFooter } from './components/TodoAppFooter';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodosList } from './components/TodosList';
import { SortType } from './types/SortType';

import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const isErrorDefault = {
    loadError: false,
    addError: false,
    deleteError: false,
    updateError: false,
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [copyTodos, setCopyTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(isErrorDefault);
  const [selectParametr, setSelectParametr] = useState('all');

  const loadTodos = async () => {
    const { id } = user as User;

    try {
      const loadedTodos = await getTodos(id);

      setTodos(loadedTodos);
      setCopyTodos(loadedTodos);
      setIsError(isErrorDefault);
    } catch (error) {
      setIsError({ ...isError, loadError: true });
      setTimeout(() => setIsError(isErrorDefault), 2000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = copyTodos
      .filter(todo => {
        switch (selectParametr) {
          case SortType.active:
            return !todo.completed;

          case SortType.completed:
            return todo.completed;

          default:
            return todo;
        }
      });

    setTodos(filteredTodos);
  }, [selectParametr, copyTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader newTodoField={newTodoField} todos={todos} />

        {todos.length > 0 && <TodosList todos={todos} />}

        {todos.length > 0 && (
          <TodoAppFooter setSelectParametr={setSelectParametr} />
        )}
      </div>

      <ErrorNotification isError={isError} setIsError={setIsError} />
    </div>
  );
};
