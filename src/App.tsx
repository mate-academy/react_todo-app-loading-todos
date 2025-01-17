/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as TodoService from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { filteredTodos } from './servises/filterTodos';
import { FilterNav } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [completedTodos, setCompletedTodos] = useState(0);

  const [filter, setFilter] = useState<FilterNav>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await TodoService.getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    setFilterTodos(filteredTodos(todos, filter));

    const completeCount = todos.filter(todo => todo.completed).length;

    setCompletedTodos(completeCount);
  }, [todos, filter]);

  const handleFormSubmit = (newTodoTitle: string) => {
    if (!newTodoTitle) {
      setErrorMessage('Title should not be empty');

      return;
    }

    const createdTodo = {
      title: newTodoTitle,
      completed: false,
      userId: TodoService.USER_ID,
    };

    TodoService.createTodo(createdTodo)
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
      });
  };

  const deleteTodo = (todoId: number) => {
    TodoService.deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos => {
          return currentTodos.filter(todo => todo.id !== todoId);
        });
      })
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
      });
  };

  const handleErrorButton = () => {
    setErrorMessage('');
  };

  const handleFilter = (filterName: FilterNav) => {
    setFilter(filterName);
  };

  if (!TodoService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <TodoHeader
        todos={filterTodos}
        onSubmit={handleFormSubmit}
        deleteTodo={deleteTodo}
        handleFilter={handleFilter}
        selectFilter={filter}
        totalItems={todos.length}
        completedTodos={completedTodos}
      />

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorButton}
        />
        {errorMessage}
      </div>
    </div>
  );
};
