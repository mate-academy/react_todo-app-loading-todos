import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoAddForm } from './components/TodoAddForm';
import { TodoErrorNotification } from './components/TodoErrorNotification';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { Errors } from './types/Errors';
import { FilterValues } from './types/FilterValues';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [errorNotification, setErrorNotification]
    = useState<Errors | null>(null);
  const [selectedFilter, setSelectedFilter]
    = useState<FilterValues>(FilterValues.All);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    (async () => {
      if (user) {
        setErrorNotification(null);
        const loadedTodos = await getTodos(user.id);

        setTodos(loadedTodos);
      }
    })();
  }, []);

  const getVisibleTodos = () => {
    return [...todos].filter((todo) => {
      switch (selectedFilter) {
        case FilterValues.Completed:
          return todo.completed;
        case FilterValues.Active:
          return !todo.completed;
        default:
          return todo;
      }
    });
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [selectedFilter, todos],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAddForm
          newTodoField={newTodoField}
          newTodoTitle={newTodoTitle}
          onAdd={(title: string) => setNewTodoTitle(title)}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFilter
              selectedFilter={selectedFilter}
              onSelection={(filter:FilterValues) => setSelectedFilter(filter)}
            />
          </>
        )}
      </div>

      <TodoErrorNotification
        errorNotification={errorNotification}
        changeErrors={setErrorNotification}
      />
    </div>
  );
};
