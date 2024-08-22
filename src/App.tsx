/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { FilterStatusType, Todo } from './types/Todo';
import * as tadoService from './api/todos';
import { Footer } from './component/Footer';
import { Error } from './component/Error';
import { UserWarning } from './UserWarning';
import { TodoItem } from './component/Todo';

function filterTodos(todoArr: Todo[], filter: FilterStatusType) {
  const todos = [...todoArr];

  switch (filter) {
    case FilterStatusType.All:
      return todos;
    case FilterStatusType.Active:
      return todos.filter(todo => todo.completed === false);
    case FilterStatusType.Completed:
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterStatusType>(
    FilterStatusType.All,
  );

  const [hiddenError, setHiddenError] = useState(true);

  useEffect(() => {
    tadoService
      .getTodos()
      .then(setTodos)
      .catch(error => {
        setHiddenError(false);
        alert(error);
      })
      .finally(() => {
        setTimeout(() => {
          setHiddenError(true);
        }, 3000);
      });
  }, []);

  if (!tadoService.USER_ID) {
    return <UserWarning />;
  }

  const tasks = filterTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
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
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {tasks.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </section>
        {todos.length > 0 && (
          <Footer setFilterBy={setFilterBy} todos={todos} filterBy={filterBy} />
        )}
      </div>
      <Error hiddenError={hiddenError} setHiddenError={setHiddenError} />
    </div>
  );
};
