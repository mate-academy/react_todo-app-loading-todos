import React, {
  useContext, useEffect, useRef, useState, useCallback,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessage } from './components/ErrorMessage';
import { FilterForTodos } from './components/FilterForTodos';
import { NewTodo } from './components/NewTodo';
import { TodosList } from './components/TodosList';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<TodoStatus>(TodoStatus.ALL);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const loadTodos = useCallback(async () => {
    try {
      if (user) {
        const responseTodos = await getTodos(user.id);

        setTodos(responseTodos);
      }
    } catch (error) {
      setIsError(true);

      throw new Error(`unexpected error: ${error}`);
    } finally {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  const filterTodos = useCallback((todosFromServer: Todo[]) => {
    return todosFromServer.filter(todo => {
      switch (filterBy) {
        case TodoStatus.ACTIVE:
          return !todo.completed;

        case TodoStatus.COMPLETED:
          return todo.completed;

        default:
          return todosFromServer;
      }
    });
  }, [filterBy]);

  useEffect(() => {
    const filteredTodos = filterTodos(todos);

    setVisibleTodos(filteredTodos);
  }, [todos, filterBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodosList todos={visibleTodos} />
            <FilterForTodos
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              todos={todos}
            />
          </>
        )}

      </div>

      {isError && (
        <ErrorMessage isError={isError} onClose={() => setIsError(false)} />
      )}
    </div>
  );
};
