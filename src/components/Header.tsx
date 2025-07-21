import React from 'react';
import { USER_ID } from '.././api/todos';
import * as todosApi from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  currentCreatedTodo: string;
  setCurrentCreatedTodo: (value: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: (error: string) => void;
};

export const Header: React.FC<Props> = ({
  currentCreatedTodo,
  setCurrentCreatedTodo,
  setTodos,
  setError,
}) => {
  const reset = () => {
    setCurrentCreatedTodo('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          value={currentCreatedTodo}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => {
            setCurrentCreatedTodo(e.currentTarget.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              const newTodo: Omit<Todo, 'id'> = {
                userId: USER_ID,
                title: e.currentTarget.value.trim(),
                completed: false,
              };

              todosApi
                .addTodo(newTodo)
                .then(addedTodo => {
                  setTodos((prevTodos: Todo[]) => [...prevTodos, addedTodo]);
                })
                .catch(() => {
                  setError('Unable to add a todo');
                  setTimeout(() => {
                    setError('');
                  }, 3000);
                })
                .finally(() => {
                  reset();
                });
            } else if (e.key === 'Enter') {
              setError('Title should not be empty');
              setTimeout(() => {
                setError('');
              }, 3000);
            }
          }}
        />
      </form>
    </header>
  );
};
