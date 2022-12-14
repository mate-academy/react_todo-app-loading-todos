import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { Notification } from '../Notification';
import { TodoAddForm } from '../TodoAddForm';
import { TodoList } from '../TodoList';
import { BottomBar } from '../BottomBar';
import { FilterType } from '../../types/FilterType';
import classNames from "classnames";

export const Todos: React.FC = () => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const user = useContext(AuthContext);
  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.All:
        return true;

      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
  const activeTodos = todos.filter(todo => !todo.completed);

  useEffect(() => {
    const loadTodos = async () => {
      if (user) {
        setTodos(await getTodos(user.id));
      }
    };

    loadTodos()
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {!todos.length || (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                {
                  active: !activeTodos.length,
                }
              )}
            />
          )}
          <TodoAddForm newTodoField={newTodoField} />
        </header>

        {!todos.length || (
          <>
            <TodoList todos={visibleTodos} />
            <BottomBar
              filter={filter}
              onSetFilter={setFilter}
              activeTodosCount={activeTodos.length}
            />
          </>
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        onHideErrMessage={setErrorMessage}
      />
    </>
  );
};
