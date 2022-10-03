/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { deleteTodo, getTodos, updatingTodo } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorMasage } from './components/ErrorMessage/ErrorMessage';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countOfItemsLeft, setCountOfItemsLeft] = useState(0);
  const [filterType, setFilterType] = useState('All');
  const [isAllSelected, setIsAllSelected] = useState(false);

  const uploadTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getTodos(user?.id);

      setTodos(data);
      setVisibleTodos(data);
    } catch (err) {
      setErrorMessage('upload a todo');
    } finally {
      setIsLoading(false);
    }
  };

  const selectAllTodos = () => {
    const isAllSelectedNow = visibleTodos.every(todo => todo.completed);

    setIsAllSelected(isAllSelectedNow);

    const selectedTodos = visibleTodos.map((todo) => {
      const { completed, id } = todo;

      if (isAllSelectedNow) {
        return { ...todo, completed: false };
      }

      if (completed) {
        return todo;
      }

      updatingTodo(id, true);

      return { ...todo, completed: true };
    });

    setVisibleTodos(selectedTodos);
  };

  const clearCompleted = () => {
    const filteredTodos = visibleTodos.filter((todo) => {
      const { completed, id } = todo;

      if (completed) {
        deleteTodo(id);
      }

      return !completed;
    });

    setTodos(filteredTodos);
    setVisibleTodos(filteredTodos);
  };

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterType) {
        case 'All':
          return true;
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [filterType]);

  const toggleStatus = (todoId: number, comleted: boolean) => {
    const index = visibleTodos.findIndex(todo => todo.id === todoId);
    const todosCopy = [...visibleTodos];

    todosCopy[index].completed = !comleted;
    setVisibleTodos(todosCopy);
  };

  const deleteInVisibleTodos = (id: number) => {
    const filteredTodos = visibleTodos.filter(todo => todo.id !== id);

    setVisibleTodos(filteredTodos);
    setTodos(filteredTodos);
  };

  const addInVisibleTodos = (newTodo: Todo) => {
    setVisibleTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    uploadTodos();
  }, [user]);

  useEffect(() => {
    const countofLeftItems = visibleTodos
      .filter(({ completed }) => !completed).length;

    setCountOfItemsLeft(countofLeftItems);
  }, [visibleTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header
          newTodoField={newTodoField}
          userId={user?.id}
          addInVisibleTodos={addInVisibleTodos}
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          selectAllTodos={selectAllTodos}
          isAllSelected={isAllSelected}
        />

        {isLoading
          ? (
            <>
              <div data-cy="TodoLoader" className="modal" />
              <div className="loader" />
            </>
          )
          : (
            <TodoList
              todos={visibleTodos}
              toggleStatus={toggleStatus}
              setErrorMessage={setErrorMessage}
              deleteInVisibleTodos={deleteInVisibleTodos}
            />
          )}

        <Footer
          countOfItems={countOfItemsLeft}
          setFelterType={setFilterType}
          filterType={filterType}
          clearCompleted={clearCompleted}
        />

      </div>
      {errorMessage
      && (
        <ErrorMasage
          errorType={errorMessage}
          setErrorType={setErrorMessage}
        />
      )}
    </div>
  );
};
