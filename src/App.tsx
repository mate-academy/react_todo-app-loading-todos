/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { addTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { ErrorNotification } from './components/ErrorNotification';
import { ToggleAllButton } from './components/ToggleAllButton';
import { TodoFooter } from './components/TodoFooter';
import { Status, StatusMap } from './types/Status';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<Todo['id'] | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status>(StatusMap.All);

  useEffect(() => {
    getTodos()
      .then(todos => setTodoList(todos))
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  const todoListActive = todoList.filter(todo => !todo.completed);
  const todoListCompleted = todoList.filter(todo => todo.completed);
  const activeCount = todoListActive.length;
  const completedCount = todoListCompleted.length;
  const todoListFiltered =
    filterStatus === StatusMap.All
      ? todoList
      : filterStatus === StatusMap.Active
        ? todoListActive
        : todoListCompleted;

  function handleAddTodoSubmit(title: string) {
    addTodo(title)
      .then(todo => {
        setTodoList(prev => [...prev, todo]);
      })
      .catch(() => setErrorMessage('Unable to add a todo'));
  }

  function handleDeleteTodo(id: Todo['id']) {
    setSelectedTodoId(id);
    setErrorMessage('Unable to delete a todo');
    setSelectedTodoId(null);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todoList.length && (
            <ToggleAllButton value={false} onToggle={() => {}} />
          )}
          <AddTodo
            onChange={() => setErrorMessage('')}
            onSubmit={handleAddTodoSubmit}
            onError={setErrorMessage}
          />
        </header>

        <TodoList
          todoList={todoListFiltered}
          onDeleteTodo={handleDeleteTodo}
          selectedTodoId={selectedTodoId}
        />
        {!!todoList.length && (
          <TodoFooter
            activeCount={activeCount}
            completedCount={completedCount}
            status={filterStatus}
            onChangeFilterStatus={setFilterStatus}
          />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
