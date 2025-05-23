/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { Todo } from './types/Todo';
import { FilterState } from './types/FilterStates';
import { MESSAGE } from './const';

const getFilteredTodo = (todos: Todo[], query: FilterState): Todo[] => {
  if (query === 'All') {
    return todos;
  }

  return todos.filter(todo => todo.completed === (query === 'Completed'));
};

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const App: React.FC = () => {
  const [loadingTodoId, setLoadingTodoId] = React.useState<Todo['id'] | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [filterState, setFilterState] = React.useState<FilterState>('All');
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(MESSAGE.UNABLE_LOAD));
  }, []);

  useEffect(() => {
    setFilteredTodos(getFilteredTodo(todos, filterState));
  }, [filterState, todos]);

  useEffect(() => {
    if (errorMessage) {
      const timeOutId = setTimeout(() => setErrorMessage(''), 3000);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const itemsLeft = todos.filter(todo => todo.completed === false).length;

  const onChange = (todo: Todo, fieldsToUpdate: Partial<Todo>) => {
    setLoadingTodoId(todo.id);
    const updatedTodo = { ...todo, ...fieldsToUpdate };

    return wait(1)
      .then(() => {
        const updatedTodos = [...todos];
        const index = updatedTodos.findIndex(
          currentTodo => currentTodo.id === todo.id,
        );

        updatedTodos.splice(index, 1, updatedTodo);
        setTodos(updatedTodos);
      })
      .catch(error => {
        setErrorMessage(MESSAGE.UNABLE_UPDARE);
        throw Error(error);
      })
      .finally(() => setLoadingTodoId(null));
  };

  const onDelete = (todo: Todo) => {
    setLoadingTodoId(todo.id);

    return wait(1)
      .then(() =>
        setTodos(todos.filter(currentTodo => todo.id !== currentTodo.id)),
      )
      .then(() => setLoadingTodoId(null));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length ? (
          <>
            <TodoList
              lodingId={loadingTodoId}
              todos={filteredTodos}
              onChange={onChange}
              onDelete={onDelete}
            />

            <Footer
              itemsLeft={itemsLeft}
              filterState={filterState}
              onFilter={setFilterState}
            />
          </>
        ) : null}
      </div>

      <Notification
        errorMessage={errorMessage}
        onClearMessage={() => setErrorMessage('')}
      />
    </div>
  );
};
