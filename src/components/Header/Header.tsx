import React, { useContext, useState } from 'react';
import { todosContext } from '../../Store';
import { addTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { countCompletedTodos } from '../../utils/utils';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(todosContext);
  const [title, setTitle] = useState('');
  const allTodosAreCompleted = countCompletedTodos(todos) === todos.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newTodo: Todo = {
      id: 0,
      userId: 0,
      title,
      completed: false,
    };

    addTodo(newTodo).then(todo => {
      setTodos(prevTodos => {
        return [...prevTodos, ...todo];
      });
    });

    setTitle('');
  }

  return (
    <header className="todoapp__header">
      {false && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosAreCompleted,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
