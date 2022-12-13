/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Erorr } from './components/Erorr/Erorr';
import { FilterTodoList } from './components/FilterTodoList/FilterTodoList';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TypeErorr } from './types/ErorrType';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [hasErorr, setHasErorr] = useState(false);
  const [erorrType, setErorrType] = useState<TypeErorr>(TypeErorr.NONE);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const loadTodosFromServer = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch {
        setHasErorr(true);
      }
    }
  }, []);

  const removeErorrHandler = () => {
    setHasErorr(false);
    setErorrType(TypeErorr.NONE);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodosFromServer();
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterType) {
        case FilterType.All:
          return todo;
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [todos, filterType]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
            aria-label="Toggle"
          />

          <NewTodo newTodoField={newTodoField} />
        </header>

        <TodoList todos={visibleTodos} />

        <FilterTodoList
          todosLeft={todos.length}
          setFilterType={setFilterType}
          filterType={filterType}
        />
      </div>

      {hasErorr
        && (
          <Erorr
            erorrType={erorrType}
            onRemoveErorrHandler={removeErorrHandler}
          />
        )}
    </div>
  );
};
