/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { useTodos } from './utils/useTodos';
import { FilterButtons } from './components/FilterButtons/FilterButtons';
import { Notifications } from './components/Notifications/Notifications';

export const App: React.FC = () => {
  const {
    todos,
    query,
    setQuery,
    onFormSubmit,
    onToggleAll,
    isLoading,
    selectedTodoId,
    handleToggleStatus,
    handleDelete,
    errorMessage,
    setErrorMessage,
    filteredTodos,
    filterStatus,
    setFilterStatus,
  } = useTodos();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Header
        todos={todos}
        query={query}
        setQuery={setQuery}
        onFormSubmit={onFormSubmit}
        onToggleAll={onToggleAll}
        handleDelete={handleDelete}
        isLoading={isLoading}
        selectedTodoId={selectedTodoId}
        handleToggleStatus={handleToggleStatus}
      />

      {todos.length > 0 && (
        <>
          <TodoList
            todos={filteredTodos}
            isLoading={isLoading}
            selectedTodoId={selectedTodoId}
            handleToggleStatus={handleToggleStatus}
            handleDelete={handleDelete}
          />

          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <FilterButtons
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              // onClick={}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
      <Notifications
        message={errorMessage}
        isVisible={!!errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};
