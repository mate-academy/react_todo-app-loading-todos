/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';
import { TodoErrors } from './TodoErrors';
import { TodosContext } from './Todos.Context';

export const TodoApp: React.FC = () => {
  const { addTodo, todos, setTodos, setError } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');
  const [toggleAll, setToggleAll] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      addTodo({
        id: +new Date(),
        userId: 206,
        title: newTodo,
        completed: false,
      });
      setNewTodo('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleAddTodo();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTodo.length !== 0) {
      handleAddTodo();
    }

    if (event.key === 'Enter' && newTodo.length === 0) {
      setError('Title should not be empty');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    }));

    setTodos(updatedTodos);
    setToggleAll(!toggleAll);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {!!todos.length && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: toggleAll,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          </form>
        </header>
        {!!todos.length && (
          <>
            <TodoList />
            <TodoFilter />
          </>
        )}
      </div>

      <TodoErrors />
    </div>
  );
};
