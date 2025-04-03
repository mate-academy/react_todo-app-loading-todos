/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { callbacks, USER_ID } from './api/todos';
import { Filter, Todo, ErrorMessageToShow } from './types/Todo';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { ErrorMessage } from './Components/ErrorMessage';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [filter, setFilter] = useState(Filter.All);
  const [isLoadingAllTodos, setIsLoadingAllTodos] = useState<boolean>(false);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[] | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useTodos({ setTodos, setErrorMessage });

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      case Filter.All:
      default:
        return todos;
    }
  }, [todos, filter]);

  const deleteTodo = useCallback(
    (todoId: number) => {
      setLoadingTodoIds(prevIds => {
        return prevIds ? [...prevIds, todoId] : [todoId];
      });
      setErrorMessage('');

      return callbacks
        .deleteTodos(todoId)
        .then(() => {
          setTodos(todos.filter(todo => todo.id !== todoId));

          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 0);
        })
        .catch(() => {
          setErrorMessage(ErrorMessageToShow.Delete);
        })
        .finally(() => {
          setLoadingTodoIds(null);
        });
    },
    [todos],
  );

  const updateTodo = useCallback((updatedTodo: Todo) => {
    setErrorMessage('');
    setLoadingTodoIds([updatedTodo.id]);

    return callbacks
      .updateTodos(updatedTodo)
      .then(todo => {
        setTodos(currentTodos => {
          const newTodos = [...currentTodos];
          const index = newTodos.findIndex(t => t.id === todo.id);

          newTodos.splice(index, 1, todo);

          return newTodos;
        });
      })
      .catch(() => {
        setErrorMessage(ErrorMessageToShow.Update);
      })
      .finally(() => {
        setLoadingTodoIds(null);
        setIsLoadingAllTodos(false);
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }

    return undefined;
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          loadingTodoIds={loadingTodoIds}
          setLoadingTodoIds={setLoadingTodoIds}
          updateTodo={updateTodo}
          inputRef={inputRef}
          todoTitle={todoTitle}
          setTodoTitle={setTodoTitle}
        />
        <TodoList
          loadingTodoIds={loadingTodoIds}
          setLoadingTodoIds={setLoadingTodoIds}
          loadingAllTodos={isLoadingAllTodos}
          setErrorMessage={setErrorMessage}
          setTodos={setTodos}
          todos={todos}
          inputRef={inputRef}
          updateTodo={updateTodo}
          editingTitle={editingTitle}
          setEditingTitle={setEditingTitle}
          editingTodoId={editingTodoId}
          setEditingTodoId={setEditingTodoId}
          filteredTodos={filteredTodos}
          deleteTodo={deleteTodo}
        />

        {todos.length > 0 && (
          <Footer
            setLoadingTodoIds={setLoadingTodoIds}
            deleteTodo={deleteTodo}
            setErrorMessage={setErrorMessage}
            todos={todos}
            setTodos={setTodos}
            inputRef={inputRef}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
