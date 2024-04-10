import React, { useContext, useEffect, useMemo } from 'react';
import { DispatchContext, FilterValue, StateContext } from '../../Store';
import { client } from '../../utils/fetchClient';
import { Todo as TodoType } from '../../types/Todo';
import { USER_ID } from '../../api/todos';
import { Todo } from '../Todo';

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    client
      .get<TodoType[]>('/todos?userId=' + USER_ID)
      .then(items => {
        setTimeout(() => {
          return dispatch({
            type: 'loadTodos',
            todos: items,
          });
        }, 300);
      })
      .catch(() => {
        dispatch({ type: 'setErrorLoad', payload: 'Unable to load todos' });
      });
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterValue.Active:
        return todos.filter((todo: TodoType) => !todo.completed);
      case FilterValue.Completed:
        return todos.filter((todo: TodoType) => todo.completed);
      default:
        return todos;
    }
  }, [filterStatus, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: TodoType) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
