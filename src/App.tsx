/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterConstant } from './types/FilterConstants';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>();
  const [addTodo, setAddTodo] = useState('');
  const [loadError, setLoadError] = useState('');

  const [titleError, setTitleError] = useState('');
  const [actionError, setActionError] = useState('');
  const [filter, setFilter] = useState(FilterConstant.All);

  useEffect(() => {
    // setLoading(true);
    getTodos()
      .then(resolve => {
        setTodos(resolve);
      })
      .catch(() => setLoadError('Unable to Load Todos'))
      .finally(() => {
        // setLoading(false);
      });
    const errorTimerId = setTimeout(() => {
      setLoadError('');
    }, 3000);

    return () => clearTimeout(errorTimerId);
  }, []);

  useEffect(() => {
    const getFilteredTodos = (filterParam: string): void => {
      const todoList: Todo[] = todos || [];

      if (filterParam === 'Active') {
        setFilteredTodos(todoList.filter(t => t.completed === false));
      } else if (filterParam === 'Completed') {
        setFilteredTodos(todoList.filter(t => t.completed === true));
      } else {
        setFilteredTodos([...todoList]);
      }
    };

    if ((todos?.length || 0) > 0) {
      getFilteredTodos(filter);
    }
  }, [todos, filter]);

  const isAllTodoCompleted = todos?.every(t => t.completed === true) || false;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {/* NewTodo Component */}
        <NewTodo
          isAllTodoCompleted={isAllTodoCompleted}
          addTodo={addTodo}
          setTitleError={setTitleError}
          setAddTodo={setAddTodo}
          setActionError={setActionError}
        />

        {/* Todo List Component */}
        {(todos?.length || 0) >= 1 && (
          <TodoList
            filteredTodos={filteredTodos}
            setActionError={setActionError}
          />
        )}

        {/* Hide the footer if there are no todos */}
        {(todos?.length || 0) >= 1 && (
          <Filter todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${loadError || titleError || actionError ? ' ' : 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {loadError && 'Unable to load todos'}
        <br />
        {titleError && 'Title should not be empty'}
        <br />
        {actionError === 'Add' ? 'Unable to add a todo' : ''}
        <br />
        {actionError === 'delete' ? 'Unable to delete a todo' : ''}
        <br />
        {actionError === 'update' ? 'Unable to update a todo' : ''}
      </div>
    </div>
  );
};
