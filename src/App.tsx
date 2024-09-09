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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMassage, setErrorMassage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todoLoadingStates, setTodoLoadingStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [filter, setFilter] = useState('all');

  const setTodoLoading = (id: number, loading: boolean) => {
    setTodoLoadingStates(prevState => ({ ...prevState, [id]: loading }));
  };

  const errorTimerId = useRef(0);
  const showError = (message: string) => {
    setErrorMassage(message);
    window.clearTimeout(errorTimerId.current);
    errorTimerId.current = window.setTimeout(() => {
      setErrorMassage('');
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(true);

    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'))
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
      showError('Unable to add todo');
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

      setTodos(prewTodos => prewTodos.filter(todo => todo.id !== todoId));
    } catch (error) {
      showError('Unable to delete todo');
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
      showError('Unable to update todo');
    } finally {
      setTodoLoading(id, false);
    }
  };

  let todoToShow = todos;
  const getFilterTodo = () => {
    switch (filter) {
      case 'active':
        todoToShow = todoToShow.filter((todo: Todo) => !todo.completed);
        break;
      case 'completed':
        todoToShow = todoToShow.filter((todo: Todo) => todo.completed);
        break;
      case 'all':
      default:
    }

    return todoToShow;
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
          todos={getFilterTodo()}
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
        errorMassage={errorMassage}
        onClearError={() => {
          setErrorMassage('');
        }}
      />
    </div>
  );
};
