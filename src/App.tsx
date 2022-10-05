/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext, useEffect, useRef, FC, useState, FormEvent,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import
{
  getTodos, updateTodoCompleted, createTodo, deleteTodo,
}
  from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import {
  ErrorNotifications,
} from './types/ErrorNotifications';
import { Header } from './components/Header/Header';
import { Error } from './Error';

export const App: FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [todoTitle, setTodoTitle] = useState('');
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [globalLoader, setGlobalLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const deleteErrors = () => {
    setError(null);
  };

  const uploadTodos = async () => {
    try {
      const data = await getTodos(user?.id);

      setTodoList(data);
    } catch (err) {
      setError(Error.LOADING);
    }
  };

  uploadTodos();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      setError(Error.TITLE);
      setTodoTitle('');

      return;
    }

    setIsLoading(true);
    deleteErrors();

    try {
      const newTodo = await createTodo(user?.id, todoTitle);

      setTodoList([...todoList, newTodo]);
    } catch {
      setError(Error.ADDING);
    }

    setTodoTitle('');
    setIsLoading(false);
  };

  const handleSelectTodo = async (
    todo: Todo,
  ) => {
    setSelectedTodo(todo.id);

    try {
      const newSelectedTodo = await updateTodoCompleted(
        todo.id, !todo.completed,
      );

      setSelectedTodo(newSelectedTodo.id);
    } catch {
      setError(Error.UPDATING);
    }

    setSelectedTodo(null);
  };

  const handleChooseAll = () => {
    setGlobalLoader(true);

    todoList.map(async (todo) => {
      try {
        await updateTodoCompleted(todo.id, true);

        if (todoList.every(item => item.completed)) {
          await updateTodoCompleted(todo.id, false);
        }
      } catch {
        setError(Error.UPDATING);
      }

      setGlobalLoader(false);

      return todo;
    });
  };

  const filteredTodos = todoList.filter(todo => {
    switch (filter) {
      case 'All':
        return todo;

      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return null;
    }
  });

  const handleDeleteTodo = async (todo: Todo) => {
    setSelectedTodo(todo.id);

    try {
      if (todo.id) {
        await deleteTodo(todo.id);
      }
    } catch {
      setError(Error.DELETING);
    }

    setSelectedTodo(null);
  };

  const handleDeleteAllTodos = () => {
    todoList.map(async (todo) => {
      setGlobalLoader(true);

      try {
        if (todo.completed) {
          await deleteTodo(todo.id);
        }
      } catch {
        setError(Error.DELETING);
      }

      setGlobalLoader(false);

      return todo;
    });
  };

  const anyCompletedTodo = todoList.some(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todoList={filteredTodos}
          updateTodoCompleted={updateTodoCompleted}
          handleChooseAll={handleChooseAll}
          handleSubmit={handleSubmit}
          todoTitle={todoTitle}
          setTodoTitle={setTodoTitle}
          isLoading={isLoading}
        />
        <TodoList
          globalLoader={globalLoader}
          selectedTodo={selectedTodo}
          selectTodo={handleSelectTodo}
          todos={filteredTodos}
          updateTodoCompleted={updateTodoCompleted}
          setError={setError}
          deleteTodo={handleDeleteTodo}
          isLoading={isLoading}
          todoTitle={todoTitle}
        />
        <Footer
          todoList={filteredTodos}
          setFilter={setFilter}
          filter={filter}
          deleteAllTodos={handleDeleteAllTodos}
          anyCompletedTodo={anyCompletedTodo}
        />
      </div>
      <ErrorNotifications
        error={error}
        setError={setError}
      />
    </div>
  );
};
