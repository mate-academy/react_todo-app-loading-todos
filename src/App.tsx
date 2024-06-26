import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoErrorMessage } from './components/TodoErrorMessage';
import { TodoList } from './components/TodoList';
import { Error } from './types/Error';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  const handleError = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  function loadPosts() {
    getTodos()
      .then(setTodos)
      .catch(() => handleError(Error.LOAD_TODOS));
  }

  useEffect(loadPosts, []);
  if (!USER_ID) {
    return <UserWarning />;
  }

  function getVisibleTodos(newTodos: Todo[], newFilter: Filter) {
    switch (newFilter) {
      case Filter.Active:
        return newTodos.filter(todo => !todo.completed);

      case Filter.Completed:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }

  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title is-unselectable">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList visibleTodos={visibleTodos} />

        {!!todos.length && (
          <TodoFooter todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <TodoErrorMessage error={errorMessage} />
    </div>
  );
};
