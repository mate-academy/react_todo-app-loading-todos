/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Todo } from './types/Todo';
import { TodosContext } from './components/TodoContext';
import { Filter } from './types/Filter';
import { TodoErrors } from './components/TodoErrors';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(Filter.All);

  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    return null;
  }

  const { todos, addTodo, resetError } = todosContext;

  const activeTodosCount = todos.filter((todo: Todo) => !todo.completed).length;

  const completedTodosCount = todos.filter(
    (todo: Todo) => todo.completed,
  ).length;

  function createTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetError();

    if (title.trim() !== '') {
      setTitle('');
      addTodo(title);
    }
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case Filter.All:
        return todos;

      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filterStatus, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button is active only if there are some active todos */}
          <button
            type="button"
            className={cn(
              'todoapp__toggle-all',
              { active: activeTodosCount !== 0 },
            )}
          />

          <form onSubmit={createTodo}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length !== 0 && (
          <TodoFooter
            completedCount={completedTodosCount}
            activeCount={activeTodosCount}
            filter={filterStatus}
            onFilterChange={setFilterStatus}
          />
        )}
      </div>

      <TodoErrors />
    </div>
  );
};
