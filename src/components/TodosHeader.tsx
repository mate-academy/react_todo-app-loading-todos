import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';
import { addTodos } from '../api/todos';
import { Todo } from '../types/Todo';

export const TodosHeader: React.FC = () => {
  const {
    DEFAULT_DATA,
    setTodos,
  } = useContext(TodosContext);

  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodo.trim()) {
      DEFAULT_DATA.title = newTodo;

      addTodos(DEFAULT_DATA)
        .then((data: Todo) => {
          setTodos((prev: Todo[]) => [...prev, data]);
        })
        .finally(() => setNewTodo(''));
    }
  };

  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
      </form>
    </header>
  );
};
