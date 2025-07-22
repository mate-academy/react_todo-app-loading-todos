import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoFilterType } from '../../types/TodoFilterType';
import cn from 'classnames';
import { deleteTodo, getTodos } from '../../api/todos';
import { ErrorMessageType } from '../../types/ErrorMessageType';

export const Footer = () => {
  const { selectedFilter, setSelectedFilter, setIsListLoading } =
    useContext(TodoContext);
  const { todos, setTodos, setErrorType } = useContext(TodoContext);

  if ((todos && todos.length === 0) || todos === null) {
    return null;
  }

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const hasCompletedTodo = todos.some(todo => todo.completed);

  const handleDeleteCompletedTodos = async () => {
    setIsListLoading(true);

    try {
      if (todos) {
        const completedTodos = todos.filter(todo => todo.completed);

        if (completedTodos.length === 0) {
          return;
        }

        await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));

        const updatedTodos = await getTodos();

        if (updatedTodos) {
          setTodos(updatedTodos);
        }
      }
    } catch (error) {
      setErrorType(ErrorMessageType.Delete);
    } finally {
      setIsListLoading(false);
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedFilter === TodoFilterType.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedFilter(TodoFilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedFilter === TodoFilterType.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedFilter(TodoFilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedFilter === TodoFilterType.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedFilter(TodoFilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodo}
        onClick={handleDeleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
