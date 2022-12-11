/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createTodo, getTodos, TodoData } from './api/todos';
import { AuthContext, AuthProvider } from './components/Auth/AuthContext';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotiication';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [isErrorHidden, setIsErrorHidden] = useState(true);
  const [selectedOption, setSelectedOption] = useState('all');

  const addNewTodo = (todo: TodoData) => {
    setIsErrorHidden(true);

    return wait(300)
      .then(() => createTodo(todo))
      .then(todoToAdd => {
        setTodos(prevTodos => [...prevTodos, todoToAdd]);
      }).catch(errorMes => {
        if (errorMes) {
          setError('add');
          setIsErrorHidden(false);
        }
      });
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus(); // why it doesn't work???
    }

    if (user) {
      getTodos(user.id).then(todoList => setTodos(todoList));
    }
  }, []);

  const filterBySelect = useCallback((
    todosFromServer: Todo[],
    option: string,
  ) => {
    return todosFromServer.filter(todo => {
      switch (option) {
        case 'active':
          return todo.completed === false;

        case 'completed':
          return todo.completed === true;

        case 'all':
        default:
          return true;
      }
    });
  }, []);

  const visibleTodos = useMemo(() => {
    return filterBySelect(todos, selectedOption);
  }, [todos, selectedOption]);

  const AmountOfActiveTodos = useMemo(() => {
    return filterBySelect(todos, 'active').length;
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = {
      title: newTodoTitle,
      completed: false,
      userId: user?.id,
    };

    addNewTodo(newTodo);
    setNewTodoTitle('');
  };

  return (
    <AuthProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />

            <form onSubmit={handleSubmit}>
              <input
                data-cy="NewTodoField"
                type="text"
                ref={newTodoField}
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
                value={newTodoTitle}
                onChange={(event) => {
                  setNewTodoTitle(event.target.value);
                }}
              />
            </form>
          </header>
          {todos.length > 0 && (
            <>
              <TodoList todos={visibleTodos} />

              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="todosCounter">
                  {`${AmountOfActiveTodos} items left`}
                </span>

                <TodoFilter
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />

                <button
                  data-cy="ClearCompletedButton"
                  type="button"
                  className="todoapp__clear-completed"
                >
                  Clear completed
                </button>
              </footer>
            </>
          )}
        </div>

        <ErrorNotification
          error={error}
          isHidden={isErrorHidden}
          setError={setIsErrorHidden}
        />
      </div>
    </AuthProvider>
  );
};
