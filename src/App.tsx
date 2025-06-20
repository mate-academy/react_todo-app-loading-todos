/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { SearchField } from './components/SearchField';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // #region searchField states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [todosLoadingError, setTodosLoadingError] = useState(false);
  const [titleError] = useState(false);
  const [addError] = useState(false);
  const [deleteError] = useState(false);
  const [updateError] = useState(false);
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const getTodosList = async () => {
      try {
        const todosList = await getTodos();

        setVisibleTodos(todosList);
        setTodos(todosList);
      } catch {
        setIsError(true);
        setTodosLoadingError(true);
        throw new Error();
      }
    };

    getTodosList();
  }, []);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 3000);

      return;
    }

    if (
      todosLoadingError ||
      titleError ||
      addError ||
      deleteError ||
      updateError
    ) {
      setIsError(true);
    }
  }, [todosLoadingError, titleError, addError, deleteError, updateError]);
  // #endregion

  if (!USER_ID) {
    return <UserWarning />;
  }

  const checkError = () => {
    const errorsList = [];

    if (todosLoadingError) {
      errorsList.push('Unable to load todos');
    }

    if (titleError) {
      errorsList.push('Title should not be empty');
    }

    if (addError) {
      errorsList.push('Unable to add a todo');
    }

    if (deleteError) {
      errorsList.push('Unable to delete a todo');
    }

    if (updateError) {
      errorsList.push('Unable to update a todo');
    }

    return errorsList;
  };

  const handleCheckTodo = (id: number) => {
    setVisibleTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const errors = checkError();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <SearchField />
        <TodoList
          todos={todos}
          visibleTodos={visibleTodos}
          handleCheckTodo={handleCheckTodo}
        />
        {todos.length && (
          <TodoFooter todos={todos} setVisibleTodos={setVisibleTodos} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorNotification
        isError={isError}
        errors={errors}
        setIsError={setIsError}
      />
    </div>
  );
};
