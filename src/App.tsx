import React, {
  useContext,
  useEffect,
  useMemo,
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
  const user = useContext(AuthContext) as User;
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
  const [selectParametr, setSelectParametr] = useState(SortType.all);

  const loadTodos = async () => {
    const { id } = user;

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

  const activeTodosLength = useMemo(() => (
    copyTodos.filter(el => !el.completed).length
  ), [copyTodos]);

  const completTodoLength = useMemo(() => (
    todos.length - activeTodosLength
  ), [copyTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader newTodoField={newTodoField} todos={todos} />

        {todos.length > 0 && <TodosList todos={todos} />}

        {(todos.length > 0 || selectParametr !== SortType.all) && (
          <TodoAppFooter
            selectParametr={selectParametr}
            setSelectParametr={setSelectParametr}
            activeTodosLength={activeTodosLength}
            completTodoLength={completTodoLength}
          />
        )}
      </div>

      {Object.entries(isError).some(el => el[1] === true)
        && <ErrorNotification isError={isError} setIsError={setIsError} />}
    </div>
  );
};
