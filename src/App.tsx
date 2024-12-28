import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFooter } from './Components/Footer';
import { TodoHeader } from './Components/Header';
import { TodoMain } from './Components/Main';
import { ErrorNotifications } from './Components/Errors';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(err => {
        setErrorMessage('Unable to load todos');
        throw err;
      });
  }, []);

  const filterTodos = (list: Todo[], filterWord: Filter) => {
    switch (filterWord) {
      case Filter.All:
        return list;
      case Filter.Active:
        return list.filter(todo => !todo.completed);
      case Filter.Completed:
        return list.filter(todo => todo.completed);
      default:
        return list;
    }
  };

  const viewedTodos = filterTodos(todos, filter);
  const todosQuantity = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />
        <section className="todoapp__main" data-cy="TodoList">
          {viewedTodos.map(todo => (
            <TodoMain todo={todo} key={todo.id} />
          ))}
        </section>

        {todos.length !== 0 && (
          <TodoFooter
            todosQuantity={todosQuantity}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotifications error={errorMessage} setError={setErrorMessage} />
    </div>
  );
};
