/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { FilteredBy } from './types/FilteredBy';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoMain } from './components/TodoMain/TodoMain';
import { TodoError } from './components/TodoError/TodoError';
import { getTodos } from './api/todos';

const USER_ID = 11136;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState(FilteredBy.All);
  const [hasError, setHasError] = useState('');

  useEffect(() => {
    setHasError('');

    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch((err) => {
        setHasError('Unable to get todos');
        setTimeout(() => {
          setHasError('');
        }, 3000);
        throw err;
      });
  });
  const preparedTodos = (todos: Todo[]) => {
    const copyTodos = [...todos];

    switch (filteredBy) {
      case FilteredBy.Active:
        return copyTodos.filter(todo => !todo.completed);

      case FilteredBy.Completed:
        return copyTodos.filter(todo => todo.completed);

      default:
        return copyTodos;
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={preparedTodos(todosFromServer)} />
        <TodoMain
          todos={preparedTodos(todosFromServer)}
          setHasError={setHasError}
        />
        {
          todosFromServer.length > 0 && (
            <TodoFooter
              todos={preparedTodos(todosFromServer)}
              filteredBy={filteredBy}
              setFilteredBy={setFilteredBy}
            />
          )
        }
      </div>
      <TodoError
        hasError={hasError}
        setHasError={(error) => setHasError(error)}
      />
    </div>
  );
};
