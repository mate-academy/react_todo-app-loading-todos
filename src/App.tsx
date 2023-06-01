/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Todo } from './components/Todo';
import { Error } from './components/Error';
import { Todo as TodoType } from './types/Todo';
import { getTodos } from './api/todos';
import { Actions } from './types/Actions';
import { Filter } from './types/Filter';

const USER_ID = 10583;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[] | null>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [currentAction, setCurrentAction]
  = useState<Actions>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(() => setError(currentAction));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {todos?.length && <Header />}

        <section className="todoapp__main">
          {todos?.filter((todo: TodoType) => {
            switch (filter) {
              case 'all': return true;
              case 'active': return !todo.completed;
              case 'completed': return todo.completed;
              default: return true;
            }
          })
            .map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                setCurrentAction={setCurrentAction}
              />
            ))}
        </section>

        {todos?.length
        && (
          <Footer
            setFilter={setFilter}
            filter={filter}
            todos={todos}
          />
        )}
      </div>

      <Error error={error} />
    </div>
  );
};
