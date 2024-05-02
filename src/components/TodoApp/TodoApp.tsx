import React, { useContext } from 'react';

import { TodoList } from '../TodoList';
import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { KEY_STORAGE } from '../../constants/constants';
import { ErrorNotification } from '../ErrorNotification';
import { TodoListContext } from '../../contexts/TodoListContext';

export const TodoApp = () => {
  const {
    todos,
    errorMessage,
    loadCompletedTodos,
    loadActiveTodos,
    loadAllTodos,
  } = useContext(TodoListContext);

  const globalTodoList = JSON.parse(String(localStorage.getItem(KEY_STORAGE)));

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList />

        {!!globalTodoList.length && (
          <TodoFooter
            loadCompletedTodos={loadCompletedTodos}
            loadActiveTodos={loadActiveTodos}
            loadAllTodos={loadAllTodos}
            todos={todos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
