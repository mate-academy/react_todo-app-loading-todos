/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addTodo } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { TodoItem } from './components/TodoItem';
import { TodosContext } from './stores/TodosContext';
import { ErrorMessages } from './types/ErrorMessages';
import { FilterParams } from './types/FilterParams';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const {
    USER_ID,
    todos,
    mainInput,
    completedTodos,
    unCompletedTodos,
    loading,
    setTodos,
    setLoading,
    showError,
    updateTodo,
    idsToChange,
  } = useContext(TodosContext);

  const [title, setTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState(FilterParams.All);

  useEffect(() => {
    mainInput?.current?.focus();
  }, [mainInput, todos]);

  let preparedTodos;

  switch (filterBy) {
    case FilterParams.All:
    default:
      preparedTodos = todos;
      break;

    case FilterParams.Completed:
      preparedTodos = completedTodos;
      break;

    case FilterParams.Active:
      preparedTodos = unCompletedTodos;
      break;
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    showError(ErrorMessages.None);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length === 0) {
      showError(ErrorMessages.EmptyTitle);

      return;
    }

    setLoading(true);
    setTitle(prevTitle => prevTitle.trim());

    const newTodo = {
      title: title.trim(),
      completed: false,
      id: 0,
      userId: USER_ID,
    };

    setTempTodo(newTodo);

    addTodo(newTodo)
      .then((response) => {
        setTitle('');
        setTodos((prevTodos) => [...prevTodos, response]);
        setTempTodo(null);
      })
      .catch(() => {
        showError(ErrorMessages.Add);
        setTempTodo(null);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          mainInput?.current?.focus();
        }, 0);
      });
  }

  function toggleAll() {
    if (unCompletedTodos.length > 0) {
      unCompletedTodos.forEach(todo => {
        const newTodo = {
          ...todo,
          completed: !todo.completed,
        };

        updateTodo(newTodo);
      });
    } else {
      completedTodos.forEach(todo => {
        const newTodo = {
          ...todo,
          completed: !todo.completed,
        };

        updateTodo(newTodo);
      });
    }
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: completedTodos.length === todos.length,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              disabled={loading}
              ref={mainInput}
              value={title}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">

          <TransitionGroup>
            {preparedTodos.map(todo => (
              <CSSTransition
                key={todo.id}
                timeout={300}
                classNames="item"
              >
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isUpdating={idsToChange.includes(todo.id)}
                />
              </CSSTransition>
            ))}

            {tempTodo && (
              <CSSTransition
                key={0}
                timeout={300}
                classNames="temp-item"
              >
                <TodoItem
                  todo={tempTodo}
                  isUpdating
                />

              </CSSTransition>
            )}

          </TransitionGroup>
        </section>

        {!!todos.length && (
          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      <ErrorNotification />
    </div>
  );
};
