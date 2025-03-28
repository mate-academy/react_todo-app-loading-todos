/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ErrorMessage, FilterStatus, Todo } from './types/Todo';
import cn from 'classnames';
import { getTodos } from './api/todos';
import { TodoList } from './api/components/TodoList';
import { HeaderTodoApp } from './api/components/HeaderTodoApp';
import { FooterTodoApp } from './api/components/FooterTodoApp';

const filterTodo = (todos: Todo[], filterStatus: FilterStatus) => {
  switch (filterStatus) {
    case FilterStatus.COMPLETED:
      return todos.filter(todo => todo.completed);
    case FilterStatus.ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

export const findTodoById = (todos: Todo[], id: number) => {
  return todos.find(todo => todo.id === id);
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.DEFAULT,
  );
  const [filterStatus, setFilterStatus] = useState(FilterStatus.DEFAULT);

  const isAllChecked = useRef(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.TODO_LOAD);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(ErrorMessage.DEFAULT);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  const filteredTodos = useMemo(() => {
    return filterTodo(todos, filterStatus);
  }, [todos, filterStatus]);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    );

    setTodos(updatedTodos);
  };

  const handleOnChangeTodoStatus = (id: number) => {
    const currentTodo = findTodoById(todos, id);

    if (currentTodo) {
      currentTodo.completed = !currentTodo.completed;
      const todosWithChange = todos.map(todo =>
        todo.id === currentTodo.id ? currentTodo : todo,
      );

      setTodos(todosWithChange);
    }
  };

  const handleCheckAll = () => {
    if (todos.every(todo => todo.completed)) {
      isAllChecked.current = false;
    } else {
      isAllChecked.current = true;
    }

    const checkAllTodos = todos.map(todo => ({
      ...todo,
      completed: isAllChecked.current,
    }));

    setTodos(checkAllTodos);
  };

  const handleOnDelete = (todoId: number) => {
    const todosAfterDelete = todos.filter(todo => todo.id !== todoId);

    setTodos(todosAfterDelete);
  };

  const handleClearAllCompleted = () => {
    const todosWithoutCompleted = todos.filter(todo => !todo.completed);

    setTodos(todosWithoutCompleted);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodoApp
          onCheckAll={handleCheckAll}
          onAddTodo={handleAddTodo}
          todos={todos}
        />

        <TodoList
          todos={filteredTodos}
          onUpdateTodo={handleUpdateTodo}
          onChangeTodoStatus={handleOnChangeTodoStatus}
          onDelete={handleOnDelete}
        />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <FooterTodoApp
            todos={todos}
            setFilterStatus={setFilterStatus}
            filterStatus={filterStatus}
            onClearCompleted={handleClearAllCompleted}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
        hidden={!errorMessage}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(ErrorMessage.DEFAULT)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
