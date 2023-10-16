/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { StatusState } from './types/StatusState';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodosItem } from './components/TodoItems';
import { TodosFilter } from './components/TodoFilter';
import { UNLOADED_TODO, USER_ID } from './utils/constans';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterTodo, setFilterTodo] = useState(StatusState.All);

  const handleChangeFilter = (newElement: StatusState) => {
    setFilterTodo(newElement);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage(UNLOADED_TODO);
      }
    };

    fetchTodos();
  }, []);

  const incompleteTodosCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    switch (filterTodo) {
      case StatusState.Active:
        return !todo.completed;
      case StatusState.Completed:
        return todo.completed;
      case StatusState.All:
      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

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
          {filteredTodos.map(todo => (
            <TodosItem todo={todo} key={todo.id} />
          ))}
        </section>

        { !!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${incompleteTodosCount} items left`}
            </span>
            <TodosFilter
              filterTodo={filterTodo}
              onChangeFilter={handleChangeFilter}
            />
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onCloseMessage={setErrorMessage}
      />
    </div>
  );
};
