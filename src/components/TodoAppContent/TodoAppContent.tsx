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
  }, [userId]);

  return (
    <>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            aria-label="toggle all button"
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

        {currentTodos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {currentTodos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                3 items left
              </span>

              <Filter getFilter={setFilterBy} />

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

      <Error
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};
