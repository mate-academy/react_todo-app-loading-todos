import { useContext } from 'react';
import { CreatedContext } from './TodoContext';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import React from 'react';

export const TodoHeader = () => {
  const { toDoTitle, setTodos, todos, setToDoTitle, setError } =
    useContext(CreatedContext);

  const handleSubmit: React.FormEventHandler = event => {
    event.preventDefault();

    if (!toDoTitle.trim()) {
      setError('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      title: toDoTitle,
      id: Date.now(),
      userId: Date.now(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setToDoTitle('');
  };

  const onlyCompletedTodos = todos.filter(todo => todo.completed);

  const allTodosAreCompleted = onlyCompletedTodos.length === todos.length;

  const handleToggleButton = () => {
    if (allTodosAreCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));

      return;
    }

    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: allTodosAreCompleted,
        })}
        data-cy="ToggleAllButton"
        onClick={handleToggleButton}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={toDoTitle}
          onChange={event => setToDoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
