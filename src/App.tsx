import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';

import { Todo } from './types/Todo';
import { Filters } from './types/Filters';

import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { ErrorNotification } from './components/ErrorNotification';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todoList, setTodolist] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Filters>(Filters.All);
  const [showError, setShowError] = useState<Errors>(Errors.None);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const countActivaTodos = todosFromServer.filter(
    todo => !todo.completed,
  ).length;

  async function loadingTodos() {
    if (!user) {
      return;
    }

    const todos = await getTodos(user.id);

    setTodosFromServer(todos);
    setTodolist(todos);
  }

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadingTodos();
  }, []);

  useEffect(() => {
    switch (filterBy) {
      case Filters.Completed:
      case Filters.Active:
        setTodolist([...todosFromServer].filter(
          todo => {
            return filterBy === 'completed'
              ? todo.completed
              : !todo.completed;
          },
        ));

        break;

      default:
        setTodolist(todosFromServer);
    }
  }, [filterBy]);

  useEffect(() => {
    setTimeout(() => {
      setShowError(Errors.None);
    }, 3000);
  }, [showError]);

  let text = '';

  switch (showError) {
    case Errors.Add:
      text = 'add';
      break;

    case Errors.Delete:
      text = 'delete';
      break;

    case Errors.Update:
      text = 'update';
      break;

    default:
      break;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          setShowError={setShowError}
          newTodoField={newTodoField}
        />

        {todosFromServer && (
          <>
            <TodoList
              todoList={todoList}
              setShowError={setShowError}
            />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${countActivaTodos} items left`}
              </span>

              <Filter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {showError !== Errors.None && (
        <ErrorNotification
          text={text}
          setShowError={setShowError}
        />
      )}
    </div>
  );
};
