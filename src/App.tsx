import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { FilterEnum } from './types/FilterEnum';
import { TodoInfo } from './components/TodoInfo/TodoInfo';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { Filter } from './components/Filter/Filter';
import { Error } from './components/Notification/Notification';

const USER_ID = 9946;

const URL = `/todos?userId=${USER_ID}`;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<null | Todo[]>(null);
  const [filterValue, setFilterValue] = useState(FilterEnum.All);
  const [isAddError, setIsAddError] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(URL);
        const todosData = response as Todo[];

        setTodos(todosData);
        setIsAddError(false);
        setIsDeleteError(false);
        setIsUpdateError(false);
      } catch (error) {
        setIsAddError(true);
        setIsDeleteError(true);
        setIsUpdateError(true);
      }
    };

    fetchData();
  }, []);

  const selectAll = () => {
    setFilterValue(FilterEnum.All);
  };

  const selectCompleted = () => {
    setFilterValue(FilterEnum.Completed);
  };

  const selectActive = () => {
    setFilterValue(FilterEnum.Active);
  };

  const filteredTodos = useMemo(() => {
    return todos?.filter(todo => {
      switch (filterValue) {
        case FilterEnum.Active:
          return !todo.completed;
        case FilterEnum.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filterValue]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={filteredTodos} />

        <section className="todoapp__main">
          {filteredTodos?.map(({ completed, title, id }) => (
            <TodoInfo
              completed={completed}
              title={title}
              key={id}
            />
          ))}
        </section>

        {filteredTodos && (
          <Filter
            todos={filteredTodos}
            filterValue={filterValue}
            onActive={selectActive}
            onAll={selectAll}
            onCompleted={selectCompleted}
          />
        )}
      </div>

      {isAddError && (
        <Error>
          Unable to add a todo
        </Error>
      )}

      {isDeleteError && (
        <Error>
          Unable to delete a todo
        </Error>
      )}

      {isUpdateError && (
        <Error>
          Unable to update a todo
        </Error>
      )}
    </div>
  );
};
