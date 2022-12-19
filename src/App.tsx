/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getTodos, patchTodos, deleteTodo } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/Error/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [loadingTodosId, setLoadingTodosId] = useState<number[]>([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [error, setError] = useState('');

  const loadTodos = async () => {
    try {
      const TodosFromServer = await getTodos(user?.id || 0);

      setTodos(TodosFromServer);
    } catch {
      setError('Error to load user todos');
    } finally {
      setError('');
    }
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (!user) {
      return;
    }

    loadTodos();
  }, []);

  const addTodo = async (newTodo: Todo) => {
    try {
      setLoadingTodosId((previous) => [...previous, newTodo.id]);
      setTodos(currentTodos => [...currentTodos, newTodo]);
    } catch {
      setError('Can`t add todo');
    } finally {
      setError('');
      setLoadingTodosId([]);
    }
  };

  const updateTodo = async (
    updatedTodo: Todo,
    previousTodo: Todo,
    updateAll = true,
  ) => {
    if (JSON.stringify(updatedTodo) !== JSON.stringify(previousTodo)) {
      try {
        setLoadingTodosId((previous) => [...previous, updatedTodo.id]);
        const UpdatTodoFromServer
          = await patchTodos(updatedTodo, updatedTodo.id);
        const updateTodos = todos.map((todo) => (todo.id === updatedTodo.id
          ? UpdatTodoFromServer
          : todo));

        if (updateAll) {
          setTodos(updateTodos);
        }
      } catch {
        setError('Cannot update todos');
      } finally {
        setError('');
        setLoadingTodosId([]);
      }
    }
  };

  const removeTodo = async (todoId: number, updateAll = true) => {
    // const deletResult = await deleteTodo(todoId);
    try {
      await deleteTodo(todoId);

      if (updateAll) {
        const todosAfterRemove = todos.filter(todo => todo.id !== todoId);

        setTodos(todosAfterRemove);
      }
    } catch {
      setError('Can`t dealete todo');
    } finally {
      setError('');
    }
  };

  const selectAll = async () => {
    const unselectTodos = todos.filter(todo => todo.completed === false);

    const promises: any[] = [];

    if (unselectTodos.length) {
      unselectTodos.forEach((todo) => {
        promises.push(updateTodo({ ...todo, completed: true }, todo, false));
      });
    } else {
      todos.forEach((todo) => {
        promises.push(updateTodo({ ...todo, completed: false }, todo, false));
      });
    }

    await Promise.all(promises);
    await loadTodos();
  };

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed === true);

    const promises: any[] = [];

    if (completedTodos.length) {
      completedTodos.forEach((todo) => {
        promises.push(removeTodo(todo.id, false));
      });
    }

    await Promise.all(promises);
    await loadTodos();
  };

  const memorizeFilter = useMemo(() => {
    const filterBy = (todoStatus: boolean) => {
      switch (currentFilter) {
        case 'active':
          return !todoStatus;

        case 'completed':
          return todoStatus;

        case 'all':
        default:
          return true;
      }
    };

    const filteredTodos = todos.filter(todo => filterBy(todo.completed));

    return filteredTodos;
  }, [todos, currentFilter]);

  const countLeftItems = () => (todos
    .filter(todo => todo.completed === false).length);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          addTodo={addTodo}
          selectAll={selectAll}
          setError={setError}
        />
        <TodoList
          todos={memorizeFilter}
          updatedTodo={updateTodo}
          removeTodo={removeTodo}
          loadingTodosId={loadingTodosId}
        />
        <Footer
          setCurrentFilter={setCurrentFilter}
          itemsLeft={countLeftItems()}
          currentFilter={currentFilter}
          clearCompleted={clearCompleted}
        />
        {error
        && (
          <ErrorNotification
            errorMessage={error}
            updateError={setError}
          />
        )}

      </div>
    </div>
  );
};
