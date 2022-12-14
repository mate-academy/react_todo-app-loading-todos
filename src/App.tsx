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
import { Footer } from './components/Footer/Footer';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[] | []>([]);
  // const [loadedTodos, setLoadedTodos] = useState<Todo[] | []>([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  // const [updated, setUpdated] = useState(false);
  // const [filteredTodos, setFilteredTodos] = useState<Todo[] | []>([]);

  const loadTodos = async () => {
    const TodosFromServer = await getTodos(user?.id || 0);

    setTodos(TodosFromServer);
    // setLoadedTodos(TodosFromServer);
    // setFilteredTodos(TodosFromServer);
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
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const updateTodo = async (
    updatedTodo: Todo,
    previousTodo: Todo,
    updateAll = true,
  ) => {
    if (JSON.stringify(updatedTodo) !== JSON.stringify(previousTodo)) {
      const UpdatTodoFromServer = await patchTodos(updatedTodo, updatedTodo.id);
      const updateTodos = todos.map((todo) => (todo.id === updatedTodo.id
        ? UpdatTodoFromServer
        : todo));

      if (updateAll) {
        setTodos(updateTodos);
      }
    }
  };

  const removeTodo = async (todoId: number, updateAll = true) => {
    // const deletResult = await deleteTodo(todoId);
    await deleteTodo(todoId);

    if (updateAll) {
      const todosAfterRemove = todos.filter(todo => todo.id !== todoId);

      setTodos(todosAfterRemove);
    }
  };

  const seleAll = async () => {
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
          seleAll={seleAll}
        />
        <TodoList
          todos={memorizeFilter}
          updatedTodo={updateTodo}
          removeTodo={removeTodo}
        />
        <Footer
          setCurrentFilter={setCurrentFilter}
          itemsLeft={countLeftItems()}
          currentFilter={currentFilter}
          clearCompleted={clearCompleted}
          // todos={todos}
          // setTodos={setTodos}
          // itemsLeft={countLeftItems()}
          // filterTodos={filterTodos}
        />
      </div>
    </div>
  );
};
