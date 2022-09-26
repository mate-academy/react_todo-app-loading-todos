/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AuthContext,
  TodoList,
  TodoFooter,
  Todo,
  getTodos,
  Filter,
  Notification,
  TodoHeader,
} from './imports';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [notification, setNotification] = useState('');

  const filterList = (todosList: Todo[]) => {
    switch (filter) {
      case Filter.all:
        return todosList;
      case Filter.active:
        return todosList.filter(todo => todo.completed === false);
      case Filter.completed:
        return todosList.filter(todo => todo.completed === true);
      default:
        return todosList;
    }
  };

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setNotification('Unable to get todos');
        });
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filterList(todos)}
              setTodos={setTodos}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            <TodoFooter
              todos={todos}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      {notification && (
        <Notification notification={notification} />
      )}

    </div>
  );
};
