/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterSelectType } from './types/FilterSelectType';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  //#region UseHooks
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<number>(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  // const [editTitle, setEditTitle] = useState<string>('');
  const [fiilterIndex, setFilterIndex] = useState<number>(0);
  const [selecedFilter, setSelectedFilter] = useState<FilterSelectType>('All');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const filterSelect: FilterSelectType[] = useMemo(
    () => ['All', 'Active', 'Completed'],
    [],
  );
  //#endregion

  //#region Function

  const deleteTodo = useCallback(async (todoId: number) => {
    setErrorMessage('');
    setLoading(true);
    try {
      await todoService.deleteTodo(todoId);
      setTodos(curentTodos => curentTodos.filter(todo => todo.id !== todoId));
      setAllTodos(current => current - 1);
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      throw error;
    } finally {
      inputRef.current?.focus();
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(async ({ title, userId, completed }: Todo) => {
    setErrorMessage('');
    setLoading(true);

    try {
      const newTodo = await todoService.addTodo({ title, userId, completed });

      setTodos(currentTodos => [...currentTodos, newTodo]);
      setAllTodos(current => current + 1);

      return newTodo;
    } catch (error) {
      setErrorMessage('Unable to add a todo');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTodo = useCallback(async (TodoToUpdate: Todo) => {
    setErrorMessage('');
    setSelectedTodo(null);

    todoService
      .updateTodo(TodoToUpdate)
      .then(updatedTodo => {
        setTodos(currentTodo => {
          return currentTodo.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          );
        });
      })
      .catch(error => {
        setErrorMessage('Unable to update a todo');
        throw error;
      });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmiting(true);

      if (!newTodoTitle.trim()) {
        setErrorMessage('Title should not be empty');
        setIsSubmiting(false);

        return;
      }

      addTodo({
        title: newTodoTitle,
        completed: false,
        id: 0,
        userId: todoService.USER_ID,
      })
        .then(data => {
          if (data) {
            setNewTodoTitle('');
          }
        })
        .finally(() => {
          setIsSubmiting(false);
        });
    },
    [newTodoTitle, addTodo],
  );

  const handleEdit = useCallback((data: Todo) => {
    // setEditTitle(data.title);
    setNewTodoTitle(data.title);
    setSelectedTodo(data);
  }, []);

  const hendleSelectFilter = useCallback(
    (index: number) => {
      setFilterIndex(index);
      setSelectedFilter(filterSelect[index]);
    },
    [filterSelect],
  );

  const handleUpdateTitle = useCallback(
    (data: Todo) => {
      if (!newTodoTitle.trim().length) {
        deleteTodo(data.id);

        return;
      }

      // title: editTitle,
      updateTodo({
        title: newTodoTitle,
        completed: data.completed,
        id: data.id,
        userId: data.userId,
      });
      setSelectedTodo(null);
    },
    [newTodoTitle, updateTodo, deleteTodo],
  );

  const handleUpdateCompleted = useCallback(
    (data: Todo, bool: boolean = data.completed) => {
      const newObject = {
        title: data.title,
        completed: !bool,
        id: data.id,
        userId: data.userId,
      };

      updateTodo({ ...newObject });

      return newObject;
    },
    [updateTodo],
  );

  const checkTodoCompleted = useCallback(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  const handleToggleActivate = useCallback(() => {
    const toggleBoolean = checkTodoCompleted() === allTodos;

    todos.map(todo => updateTodo(handleUpdateCompleted(todo, toggleBoolean)));
  }, [handleUpdateCompleted, todos, updateTodo, checkTodoCompleted, allTodos]);

  const handleClearCompleted = useCallback(() => {
    todos.map(todo => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
  }, [todos, deleteTodo]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTodo, handleSubmit]);

  useEffect(() => {
    setErrorMessage('');
    const delayTimer = setTimeout(() => setLoading(true), 200);

    todoService
      .getTodos()
      .then(data => {
        setAllTodos(data.length);

        return data.filter(todo => {
          if (selecedFilter === 'Completed') {
            return todo.completed;
          }

          if (selecedFilter === 'Active') {
            return !todo.completed;
          }

          return data;
        });
      })
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
      });
  }, [selecedFilter]);

  useEffect(() => {
    if (errorMessage.length) {
      const delayTimer = setTimeout(() => setErrorMessage(''), 3000);

      return () => clearTimeout(delayTimer);
    }

    return;
  }, [errorMessage]);

  //#endregion

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoTitle={newTodoTitle}
          inputRef={inputRef}
          isSubmiting={isSubmiting}
          allTodos={allTodos}
          handleToggleActivate={handleToggleActivate}
          setNewTodoTitle={setNewTodoTitle}
          checkTodoCompleted={checkTodoCompleted}
          handleSubmit={handleSubmit}
        />

        <TodoList
          todos={todos}
          loading={loading}
          selectedTodo={selectedTodo}
          // editTitle={editTitle}
          newTodoTitle={newTodoTitle}
          inputRef={inputRef}
          handleUpdateCompleted={handleUpdateCompleted}
          handleEdit={handleEdit}
          deleteTodo={deleteTodo}
          handleUpdateTitle={handleUpdateTitle}
          // onEditTitle={setEditTitle}
          onNewTodoTitle={setNewTodoTitle}
        />

        {Boolean(allTodos) && (
          <Footer
            todos={todos}
            filterSelect={filterSelect}
            fiilterIndex={fiilterIndex}
            hendleSelectFilter={hendleSelectFilter}
            handleClearCompleted={handleClearCompleted}
            checkTodoCompleted={checkTodoCompleted}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};
