import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import classnames from 'classnames';
import { createTodos, getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { Header } from './components/Auth/Header';
import { TodoList } from './components/Auth/TodoList';
import { FooterTodo } from './components/Auth/FooterTodo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [islinkAll, setislinkAll] = useState(true);
  const [islinkActive, setislinkActive] = useState(false);
  const [islinkCompleted, setislinkCompleted] = useState(false);

  const [currentFilter, setCurrentFilter] = useState(Filters.All);
  const [isError, setisError] = useState(false);
  const [isHidden, setisHidden] = useState(false);
  const [completedTodo, setCompletedTodo] = useState<Todo>({
    id: 0,
    userId: 0,
    title: '',
    completed: false,
  });

  const handleCompletedTodo = () => {
    setCompletedTodo((prevState) => ({
      ...prevState,
      completed: !prevState.completed,
    }));
  };

  useEffect(() => {
    setisHidden(true);

    getTodos(user?.id)
      .then(setTodos)
      .catch(() => setisError(true));

    setTimeout(() => {
      setisHidden(true);
    }, 3000);

    createTodos(value).then(setTodos);
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const filterList = (): Todo[] | undefined => todos.filter((todo) => {
    switch (currentFilter) {
      case Filters.Active:
        setislinkAll(false);
        setislinkActive(true);
        setislinkCompleted(false);

        return !todo.completed;

      case Filters.Completed:
        setislinkAll(false);
        setislinkActive(false);
        setislinkCompleted(true);

        return todo.completed;

      default:
        setislinkAll(true);
        setislinkActive(false);
        setislinkCompleted(false);

        return todo;
    }
  });

  const filteredList = useMemo(() => filterList(), [currentFilter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length !== 0 && (
          <>
            <TodoList
              filteredList={filteredList}
              completedTodo={completedTodo}
              handleCompletedTodo={handleCompletedTodo}
            />

            <FooterTodo
              todos={todos}
              setCurrentFilter={setCurrentFilter}
              islinkAll={islinkAll}
              islinkActive={islinkActive}
              islinkCompleted={islinkCompleted}
              setValue={setValue}
            />
          </>
        )}

        {isError && (
          <div
            data-cy="ErrorNotification"
            className={classnames(
              'notification is-danger is-light has-text-weight-normal',
              {
                hidden: isHidden,
              },
            )}
          >
            <button
              aria-label="button"
              data-cy="HideErrorButton"
              type="button"
              hidden
              onClick={() => {
                setisHidden(true);
              }}
              className="delete"
            />
            Unable to add a todo
            <br />
            Unable to delete a todo
            <br />
            Unable to update a todo
          </div>
        )}
      </div>
    </div>
  );
};
