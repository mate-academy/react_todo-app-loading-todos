import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { FilterNav } from './components/FilterNav';
import { ErrorContent } from './components/Error';
import { getTodos, postTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterArgument } from './types/FilterArgument';
import { TodoInput } from './components/TodoInput';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  // Filter argument
  const [
    filterArgument,
    setFilterArgument,
  ] = useState<FilterArgument>(FilterArgument.ALL);

  // Todos state
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const loadTodos = async () => {
    let response;

    if (user) {
      response = await getTodos(user.id);
    }

    setTodos(response || null);
  };

  const visibleTodos = (): (Todo[] | null) => {
    if (todos) {
      switch (filterArgument) {
        case FilterArgument.COMPLETED:
          return todos.filter(todo => todo.completed);
        case FilterArgument.ACTIVE:
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    }

    return null;
  };

  // New todos block
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const handleSetNewTodoTitle = (newTitle: string) => {
    setNewTodoTitle(newTitle);
  };

  const isAllTodosCompleted = todos?.filter(todo => (
    !todo.completed
  )).length === 0;

  const saveTodos = async () => {
    if (user) {
      await postTodos(user.id, {
        title: newTodoTitle,
        userId: user.id,
        completed: false,
      });
      await loadTodos();
    }
  };

  // Error block
  const [isError, setError] = useState(false);
  const handleSetError = (visible: boolean) => setError(visible);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
    saveTodos();
  }, [newTodoTitle]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {todos && (
        <div className="todoapp__content">
          <header className="todoapp__header">
            <TodoInput
              newTodoField={newTodoField}
              isAllTodosCompleted={isAllTodosCompleted}
              handleSetNewTodoTitle={handleSetNewTodoTitle}
            />
          </header>

          <TodoList todos={visibleTodos()} />

          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todos?.length} items left`}
            </span>

            <FilterNav
              filterArgument={filterArgument}
              setFilterArgument={setFilterArgument}
            />

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>
          </footer>
        </div>
      )}

      {isError && <ErrorContent setError={handleSetError} />}
    </div>
  );
};
