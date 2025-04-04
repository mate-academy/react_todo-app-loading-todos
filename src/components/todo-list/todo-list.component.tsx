import React, { useCallback } from 'react';
import { TodoListTypes } from './todo-list.types';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo, updateTodo } from '../../api/todos';
import { LoaderComponent } from '../loader/loader.component';

export const TodoListComponent: React.FC<TodoListTypes> = ({
  todos,
  setTodos,
  setError,
  isLoadingId,
  handleLoading,
}) => {
  const handleSelectedTodo = useCallback(
    (todo: Todo) => {
      setError('');
      handleLoading(todo.id);
      const updatedTodo = { ...todo, completed: !todo.completed };

      updateTodo(todo.id, updatedTodo)
        .then(updatedTodoFromServer => {
          setTodos(prevTodos => {
            return prevTodos.map(currentTodo =>
              currentTodo.id === updatedTodoFromServer.id
                ? updatedTodoFromServer
                : currentTodo,
            );
          });
        })
        .catch(err => {
          setError('failed to update there');
          throw new Error(err);
        })
        .finally(() => handleLoading(todo.id));
    },
    [handleLoading, setError, setTodos],
  );

  const handleDelete = (todo: Todo) => {
    handleLoading(todo.id);

    deleteTodo(todo.id)
      .then(() => {
        setTodos(prevState =>
          prevState.filter(currentTodo => currentTodo.id !== todo.id),
        );
      })
      .catch(e => console.log(e))
      .finally(() => handleLoading(todo.id));
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          <LoaderComponent isLoading={isLoadingId[todo.id] || false} />
          <label className="todo__status-label">
            <input
              onChange={() => handleSelectedTodo(todo)}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button
            onClick={() => handleDelete(todo)}
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
          >
            ×
          </button>
        </div>
      ))}
    </section>
  );
};
