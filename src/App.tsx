import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
// import { UserWarning } from './components/UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo, TodoType } from './types/Todo';
import { errorsData } from './utils';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedType, setSelectedType] = useState<TodoType>('all');

  const timer = useRef<NodeJS.Timeout | null>(null);

  const activeTodos = useMemo(
    () => todos.filter(item => !item.completed).length,
    [todos],
  );

  const filteredTodos = useMemo(() => {
    if (selectedType === 'all') {
      return todos;
    }

    const isCompleted = selectedType === 'completed';

    return todos.filter(todo => todo.completed === isCompleted);
  }, [selectedType, todos]);

  useEffect(() => {
    const getTodosList = async () => {
      setIsLoading(true);
      try {
        const result = await getTodos(USER_ID);

        setTodos(result);
        setErrorMessage('');
      } catch (error) {
        setTodos([]);
        setErrorMessage(errorsData.loadingError);
      } finally {
        setIsLoading(false);
      }
    };

    getTodosList();
  }, []);

  const handleSelectType = useCallback((newType: TodoType) => {
    setSelectedType(newType);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      timer.current = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [errorMessage]);

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: activeTodos === 0,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos?.map(todo => <TodoItem todo={todo} key={todo.id} />)}
        </section>

        {todos.length > 0 && (
          <Footer
            hasCompleted={!!todos.length && activeTodos !== todos.length}
            selectedType={selectedType}
            handleSelectType={handleSelectType}
            activeTodos={activeTodos}
          />
        )}
      </div>

      <ErrorNotification message={errorMessage} />
    </div>
  );
};
