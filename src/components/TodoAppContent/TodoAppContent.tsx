import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { useAuth } from '../../Context/Context';
import { TodoItem } from '../TodoItem';
import { Filter } from '../Filter';
import { filteredData } from '../../helper';
import { FilterBy, ErrorMessage } from '../../types/types';
import { Error } from '../Error';

export const TodoAppContent: React.FC = () => {
  const userId = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const currentTodos = filteredData<Todo>(todos, filterBy);

  useEffect(() => {
    if (userId) {
      getTodos(userId)
        .then(setTodos)
        .catch(() => setErrorMessage(ErrorMessage.Load));
    }
  }, []);

  return (
    <>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            aria-label="toggle all button"
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

        {currentTodos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {currentTodos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />))}
            </section>

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                3 items left
              </span>

              {/* Active filter should have a 'selected' class */}
              <Filter getFilter={setFilterBy} />

              {/* don't show this button if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>
      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};
