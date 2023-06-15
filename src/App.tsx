/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { FilterPanel } from './FilterPanel';
import { InputForm } from './InputForm';
import { Notifications } from './Notifications';
import { TodoList } from './TodoList';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';

const USER_ID = 10592;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [removeTodoIsClicked, setRemoveTodoIsClicked] = useState(false);
  const [addTodoIsClicked, setAddTodoIsClicked] = useState(false);
  const [editTodoIsClicked, setEditTodoIsClicked] = useState(false);
  const [filterMode, setFilterMode] = useState<string>('All');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const showNotification = removeTodoIsClicked
    || addTodoIsClicked || editTodoIsClicked;

  const getTodos = async () => {
    const data = await client.get(`/todos?userId=${USER_ID}`) as Todo[];

    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const filteredTodosArr = useMemo(() => {
    return todos.filter((todo) => {
      if (filterMode === 'Active') {
        return !todo.completed;
      }

      if (filterMode === 'Completed') {
        return todo.completed;
      }

      return todo;
    });
  }, [todos, filterMode]);

  useEffect(() => {
    setFilteredTodos(filteredTodosArr);
  }, [filteredTodosArr]);

  return USER_ID
    ? (
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            {/* this buttons is active only if there are some active todos */}
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: filteredTodos.every((todo) => todo.completed),
                inactive: filteredTodos.some((todo) => todo.completed),

              })}
            />

            {/* Add a todo on form submit */}
            <InputForm
              setAddTodoIsClicked={setAddTodoIsClicked}
            />
          </header>

          <TodoList
            todos={filteredTodos}
            removeTodo={setRemoveTodoIsClicked}
            editTodo={setEditTodoIsClicked}
          />

          {/* Hide the footer if there are no todos */}
          {!!filteredTodos.length
          && (
            <FilterPanel
              setFilterMode={setFilterMode}
              filteredTodos={filteredTodos}
              setFilteredTodos={setFilteredTodos}
            />
          )}
        </div>

        {/* Notification is shown in case of any error */}
        {/* Add the 'hidden' class to hide the message smoothly */}
        {showNotification
        && (
          <Notifications
            removeTodoIsClicked={removeTodoIsClicked}
            setRemoveTodoIsClicked={setRemoveTodoIsClicked}
            addTodoIsClicked={addTodoIsClicked}
            editTodoIsClicked={editTodoIsClicked}
            setEditTodoIsClicked={setEditTodoIsClicked}
            setAddTodoIsClicked={setAddTodoIsClicked}
          />
        ) }
      </div>
    )
    : <UserWarning />;
};
