/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */

import { useCallback, useContext, useEffect } from 'react';
import { getTodos } from '../../api/todos';
import { TodoContext } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem';
import { TodoFilterType } from '../../types/TodoFilterType';
import { ErrorMessageType } from '../../types/ErrorMessageType';

export const Todos = () => {
  const { selectedFilter, setErrorType } = useContext(TodoContext);
  const { todos, setTodos } = useContext(TodoContext);

  const handleGetTodos = useCallback(async () => {
    try {
      const data = await getTodos();

      setTodos([...data]);
    } catch (error) {
      setErrorType(ErrorMessageType.Loading);
    }
  }, [setTodos, setErrorType]);

  useEffect(() => {
    handleGetTodos();
  }, [handleGetTodos]);

  if (todos === null || todos?.length === 0) {
    return null;
  }

  const filteredTodos = todos.filter(todo => {
    switch (selectedFilter) {
      case TodoFilterType.Active:
        return !todo.completed;
      case TodoFilterType.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
};
