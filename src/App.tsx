/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const USER_ID = 12037;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState('all');

  useEffect(
    () => {
      getTodos(USER_ID)
        .then((dataFromServer) => {
          setTodos(dataFromServer);
        });
    },
    [],
  );

  const todosToRender = useMemo(
    () => {
      return todos.filter(todo => {
        const statusMatches
          = filterValue === 'all'
          || (filterValue === 'completed' ? todo.completed : !todo.completed);

        return statusMatches;
      });
    },
    [todos, filterValue],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={todosToRender}
        />

        {todos.length > 0 && (
          <Footer
            todos={todosToRender}
            setFilterValue={setFilterValue}
            filterValue={filterValue}
          />
        )}
      </div>
    </div>
  );
};

// { /* </div> */ }
//
// { /* /!* Notification is shown in case of any error *!/ */ }
//
// { /* /!* Add the 'hidden' class to hide the message smoothly *!/ */ }
//
// { /* <div */ }
//
// { /*  data-cy="ErrorNotification" */ }
//
// { /*  className="notification is-danger is-light has-text-weight-normal" */ }
//
// { /* > */ }
//
// { /*  <button data-cy="HideErrorButton" type="button" className="delete" /> */ }
//
// { /*  /!* show only one message at a time *!/ */ }
//
// { /*  Unable to load todos */ }
//
// { /*  <br /> */ }
//
// { /*  Title should not be empty */ }
//
// { /*  <br /> */ }
//
// { /*  Unable to add a todo */ }
//
// { /*  <br /> */ }
//
// { /*  Unable to delete a todo */ }
//
// { /*  <br /> */ }
//
// { /*  Unable to update a todo */ }
