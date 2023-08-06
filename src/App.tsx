/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import * as todosService from './api/todos';

import { TodoHeader } from './components/TodoHeader';
import { TodoBody } from './components/TodoBody';
import { TodoFooter } from './components/TodoFooter';
import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.ALL);
  const [errorMessage, setErrorMessage] = useState('');
  const [newTodoId, setNewTodoId] = useState<number[]>([]);

  // Request todos from server on first render
  useEffect(() => {
    todosService.getTodos(todosService.USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('load');
        throw error;
      })
      .finally(() => {
        setErrorMessage('');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  // Filtering todos by FilteringBy without request on server
  const filteringBy = useMemo(() => {
    switch (filterBy) {
      case FilterBy.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterBy.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filterBy, todos]);

  // Update or Edit todo on server
  const updateTodo = async (todoToUpdate: Todo) => {
    setNewTodoId(currentIDs => [...currentIDs, todoToUpdate.id]);

    try {
      const updatedTodo = await todosService
        .updateTodo(todoToUpdate.id, todoToUpdate) as Todo;

      const findIndexTodo = [...todos]
        .findIndex(todo => todo.id === todoToUpdate.id);

      setTodos((currentTodos: Todo[]): Todo[] => {
        const newTodos = [...currentTodos];

        newTodos.splice(findIndexTodo, 1, updatedTodo);

        return newTodos;
      });
    } catch (error) {
      setErrorMessage('update');
      throw error;
    } finally {
      setNewTodoId([]);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  // Delete todo from server
  const deleteTodo = async (todoId: number) => {
    setNewTodoId(currentIDs => [...currentIDs, todoId]);

    try {
      await todosService.deleteTodo(todoId);

      setTodos((currentTodos: Todo[]) => (
        currentTodos.filter(todo => todo.id !== todoId)
      ));
    } catch (error) {
      setErrorMessage('delete');
      throw error;
    } finally {
      setNewTodoId([]);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={todos}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          updateTodo={updateTodo}
          setNewTodoId={setNewTodoId}
        />
        <TodoBody
          filteringBy={filteringBy}
          newTodoId={newTodoId}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        <TodoFooter
          todos={todos}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          deleteTodo={deleteTodo}
        />
      </div>

      {errorMessage && (
        <div
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            type="button"
            className={classNames('delete', {
              hidden: !errorMessage,
            })}
            onClick={() => {
              setErrorMessage('');
            }}
          />
          {`Unable ${errorMessage} a todo`}
        </div>

      )}
    </div>
  );
};
