import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { deleteTodoOnServer, getTodos, updatingTodo } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorMasage } from './components/ErrorMessage/ErrorMessage';
import { Loader } from './components/Loader/Loader';
import { FilterType } from './components/Header/HeaderPropTypes';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countOfItemsLeft, setCountOfItemsLeft] = useState(0);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [loadingTodoid, setLoadingTodoId] = useState<number | null>(null);
  const [temporaryTodo, setTemporaryTodo] = useState<Todo | null>(null);

  const uploadTodos = useCallback(
    async () => {
      setIsLoading(true);
      try {
        const data = await getTodos(user?.id);

        setTodos(data);
        setVisibleTodos(data);
      } catch (err) {
        const errUpload = 'upload a todo';

        setErrorMessage(errUpload);
      } finally {
        setIsLoading(false);
      }
    }, [user],
  );

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

  // filtering ↓

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterType) {
        case FilterType.All:
          return true;
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [filterType]);

  // updating ↓

  const toggleStatus = (todoId: number, comleted: boolean) => {
    const index = visibleTodos.findIndex(todo => todo.id === todoId);

    setVisibleTodos((prevVisibleTodos) => {
      const todosCopy = [...prevVisibleTodos];

      todosCopy[index].completed = !comleted;

      return todosCopy;
    });
  };

  const changeTitle = (todoId: number, newTitle: string) => {
    const index = visibleTodos.findIndex(todo => todo.id === todoId);

    setVisibleTodos((prevVisibleTodos) => {
      const todosCopy = [...prevVisibleTodos];

      todosCopy[index].title = newTitle;

      return todosCopy;
    });
  };

  // deleting ↓

  const deleteInVisibleTodos = (id: number) => {
    const filteredTodos = visibleTodos.filter(todo => todo.id !== id);

    setVisibleTodos(filteredTodos);
    setTodos(filteredTodos);
  };

  const deleteTodo = async (id: number) => {
    setLoadingTodoId(id);
    try {
      await deleteTodoOnServer(id);
      deleteInVisibleTodos(id);
    } catch {
      const errDelete = 'delete Todo';

      setErrorMessage(errDelete);
    } finally {
      setLoadingTodoId(null);
    }
  };

  const clearCompleted = () => {
    visibleTodos.forEach((todo) => {
      const { completed, id } = todo;

      if (completed) {
        deleteTodo(id);
      }
    });
  };

  const addInVisibleTodos = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setVisibleTodos((prevTodos) => [...prevTodos, newTodo]);
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
    const isAllSelectedNow = !countofLeftItems;

    setIsAllSelected(isAllSelectedNow);
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
          setLoadingTodoId={setLoadingTodoId}
          setErrorMessage={setErrorMessage}
          selectAllTodos={selectAllTodos}
          isAllSelected={isAllSelected}
          setTemporaryTodo={setTemporaryTodo}
        />

        {isLoading
          ? (
            <Loader />
          )
          : (
            <TodoList
              todos={visibleTodos}
              toggleStatus={toggleStatus}
              setErrorMessage={setErrorMessage}
              loadingTodoId={loadingTodoid}
              setLoadingTodoId={setLoadingTodoId}
              deleteTodo={deleteTodo}
              temporaryTodo={temporaryTodo}
              changeTitle={changeTitle}
            />
          )}

        <Footer
          countOfItems={countOfItemsLeft}
          setFelterType={setFilterType}
          filterType={filterType}
          clearCompleted={clearCompleted}
          countOfItemsLeft={countOfItemsLeft}
          todosLength={todos.length}
        />

      </div>
      {errorMessage
      && (
        <ErrorMasage
          errorType={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
