import { useContext, useMemo, useState } from 'react';
import cn from 'classnames';
import { TodoList } from '../TodoList';
import { TodosContext } from '../../contexts/TodosProvider';
import { TodoAction } from '../../types/TodoAction';
import { Todo } from '../../types/Todo';
import { FilterOptions } from '../../types/FilterOptions';
import { TodosFilter } from '../TodosFilter';
import { USER_ID } from '../../constants/USER_ID';
import { ErrorMessage } from '../ErrorMessage';

function filterTodos(todos: Todo[], filterOpitons: FilterOptions) {
  switch (filterOpitons) {
    case FilterOptions.Active:
      return todos.filter(({ completed }) => !completed);

    case FilterOptions.Completed:
      return todos.filter(({ completed }) => completed);

    default:
      return [...todos];
  }
}

export const TodoApp = () => {
  const {
    errorMessage: contextErrorMessage,
    filterOptions,
    todos,
    dispatch,
  } = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState(contextErrorMessage);
  const filteredTodos = useMemo(() => filterTodos(todos, filterOptions),
    [todos, filterOptions]);

  const isSomeTodoCompleted = todos.some(({ completed }) => completed);

  const isAllCompleted = todos.every(({ completed }) => completed);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = newTodoTitle.trim();

    if (normalizedTitle) {
      dispatch({
        type: TodoAction.Add,
        todo: {
          userId: USER_ID,
          id: +new Date(),
          title: normalizedTitle,
          completed: false,
        },
      });
      setNewTodoTitle('');
    } else {
      setErrorMessage('Title should not be empty');
    }
  };

  const handleToggleAllChanged = () => {
    // eslint-disable-next-line no-restricted-syntax
    todos.forEach(todo => {
      dispatch({
        type: TodoAction.Update,
        todo: {
          ...todo,
          completed: !isAllCompleted,
        },
      });
    });
  };

  const handleCleanCompletedButtonClicked = () => {
    dispatch({
      type: TodoAction.ClearCompleted,
    });
  };

  const handleErrorHiding = () => {
    if (errorMessage) {
      if (contextErrorMessage) {
        dispatch({
          type: TodoAction.setError,
          errorMessage: '',
        });
      }

      setErrorMessage('');
    }
  };

  const uncompletedTodosCount
    = todos.filter(({ completed }) => !completed).length;

  if (contextErrorMessage && errorMessage !== contextErrorMessage) {
    setErrorMessage(contextErrorMessage);
  }

  if (errorMessage) {
    setTimeout(() => {
      handleErrorHiding();
    }, 2000);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={handleToggleAllChanged}
            type="button"
            className={cn('todoapp__toggle-all', {
              active: isAllCompleted,
            })}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              value={newTodoTitle}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={event => setNewTodoTitle(event.target.value)}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {!!todos.length
          && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${uncompletedTodosCount} items left`}
              </span>

              <TodosFilter />

              <button
                disabled={!isSomeTodoCompleted}
                onClick={handleCleanCompletedButtonClicked}
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          )}
      </div>

      <ErrorMessage
        isErrorShown={!!errorMessage}
        errorMessage={errorMessage}
        onErrorHiding={handleErrorHiding}
      />

    </div>
  );
};
