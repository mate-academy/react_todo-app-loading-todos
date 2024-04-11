import React, { useContext, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodosContext } from './components/todosContext';
import { TodosList } from './components/todosList';
import { TodosFilter } from './components/todoFeilter';
import { ManageCheckboxContext } from './components/manageCheckboxContext';
import { ErrorNotification } from './components/errorNotification';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const { isChecked, setIsChecked } = useContext(ManageCheckboxContext);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const handleHowManyLeft = () => {
    const howManyLeft = todos.filter(todo => !todo.completed);

    return `${howManyLeft.length} items left`;
  };

  const changeAllComplete = () => {
    return todos.map(elem => {
      return {
        ...elem,
        completed: !isChecked,
      };
    });
  };

  const handleButtonCheckAll = () => {
    if (todos.length === 0) {
      return;
    }

    setIsChecked(!isChecked);
    setTodos(changeAllComplete());
  };

  const isClearHiden = () => {
    return todos.some(elem => elem.completed === true);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${isChecked && 'active'}`}
            data-cy="ToggleAllButton"
            onClick={handleButtonCheckAll}
          />

          {/* Add a todo on form submit */}
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
          <TodosList items={todos} />
        </section>

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {handleHowManyLeft()}
            </span>
            <nav className="filter" data-cy="Filter">
              <TodosFilter />
            </nav>

            {isClearHiden() && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <ErrorNotification
        errorText={errorMessage}
        setErrorText={setErrorMessage}
      />
    </div>
  );
};
