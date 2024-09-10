/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorBox } from './components/ErrorBox';
import { UpdateTodo } from './types/Updates';
import { getFilteredTodos } from './helpers/helpers';
import { FilterType } from './enum/filterTypes';
import { ErrorMessages } from './enum/ErrorMessages';

export const App: React.FC = () => {
  const { Load, Add, Delete, Update, None } = ErrorMessages;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMassage] = useState(ErrorMessages.None);
  const [isLoading, setIsLoading] = useState(false);
  const [todoLoadingStates, setTodoLoadingStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [filter, setFilter] = useState(FilterType.All);

  const displayedTodos = getFilteredTodos(todos, filter);

  const setTodoLoading = (id: number, loading: boolean) => {
    setTodoLoadingStates(prevState => ({ ...prevState, [id]: loading }));
  };

  const errorTimerId = useRef(0);
  const showError = (message: ErrorMessages) => {
    setErrorMassage(message);
    window.clearTimeout(errorTimerId.current);
    errorTimerId.current = window.setTimeout(() => {
      setErrorMassage(None);
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(true);

    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => showError(Load))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onAdd = async ({ userId, title, completed, id }: Todo) => {
    try {
      setIsLoading(true);
      setTodoLoading(id, true);
      const newTodo = await todoService.createTodo({
        userId,
        title,
        completed,
      });

      setTodos(prev => [...prev, newTodo]);
    } catch (error) {
      showError(Add);
      throw error;
    } finally {
      setIsLoading(false);
      setTodoLoading(id, false);
    }
  };

  const onDelete = async (todoId: number) => {
    try {
      setTodoLoading(todoId, true);
      await todoService.deleteTodo(todoId);

      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    } catch (error) {
      showError(Delete);
    } finally {
      setTodoLoading(todoId, false);
    }
  };

  const updateTodo = async ({ id, newData, keyValue }: UpdateTodo) => {
    try {
      setTodoLoading(id, true);
      await todoService.updateTodo(id, {
        [keyValue]: newData,
      });

      setTodos(prev =>
        prev.map(currentTodo =>
          id === currentTodo.id
            ? { ...currentTodo, [keyValue]: newData }
            : currentTodo,
        ),
      );
    } catch (error) {
      showError(Update);
    } finally {
      setTodoLoading(id, false);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          showError={showError}
          onAdd={onAdd}
          isLoading={isLoading}
          todos={todos}
        />

        <TodoList
          todos={displayedTodos}
          onDelete={onDelete}
          updateTodo={updateTodo}
          todoLoadingStates={todoLoadingStates}
        />
        {!!todos.length && (
          <Footer
            setFilter={setFilter}
            filter={filter}
            todos={todos}
            onDelete={onDelete}
          />
        )}
      </div>

      <ErrorBox
        errorMessage={errorMessage}
        onClearError={() => {
          setErrorMassage(None);
        }}
      />
    </div>
  );
};
