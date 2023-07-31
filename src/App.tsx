/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { FilteredBy } from './types/FilteredBy';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoMain } from './components/TodoMain/TodoMain';
import { TodoError } from './components/TodoError/TodoError';
import { deleteTodos, getTodos } from './api/todos';
import { TodoErrorType } from './types/TodoErrorType';

const USER_ID = 11136;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState(FilteredBy.All);
  const [hasError, setHasError] = useState(TodoErrorType.noError);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteTodo = (todoId: number) => {
    setIsLoading(true);
    setHasError(TodoErrorType.noError);

    deleteTodos(todoId)
      .then(() => {
        setTodosFromServer(currentTodos => currentTodos.filter(
          todo => todo.id !== todoId,
        ));
      })

      .catch(() => {
        setHasError(TodoErrorType.deleteTodoError);
      })
      .finally(() => {
        setIsLoading(false);
        setHasError(TodoErrorType.noError);
      });
  };

  useEffect(() => {
    setHasError(TodoErrorType.noError);

    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => {
        setHasError(TodoErrorType.loadTodoError);
      });
  }, []);
  const preparedTodos = useMemo(() => {
    const copyTodos = [...todosFromServer];

    switch (filteredBy) {
      case FilteredBy.Active:
        return copyTodos.filter(todo => !todo.completed);

      case FilteredBy.Completed:
        return copyTodos.filter(todo => todo.completed);

      default:
        return copyTodos;
    }
  }, [todosFromServer, filteredBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={preparedTodos}
        />
        <TodoMain
          todos={preparedTodos}
          setHasError={setHasError}
          setTodosFromServer={setTodosFromServer}
          handleDeleteTodo={handleDeleteTodo}
        />
        {
          todosFromServer.length > 0 && (
            <TodoFooter
              todos={todosFromServer}
              filteredBy={filteredBy}
              setFilteredBy={setFilteredBy}
              handleDeleteTodo={handleDeleteTodo}
            />
          )
        }
      </div>
      {false && isLoading}
      <TodoError
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
