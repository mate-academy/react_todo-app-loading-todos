/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import { getTodos, postTodo, deleteTodo, updateTodo } from './api/todos';
import { USER_ID } from './api/todos';
import { UserWarning } from './UserWarning';

import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addTodo, setAddTodo] = useState<string>('');
  const [toggleAllButton, setToggleAllButton] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<Filter>('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorVisible(true);
  };

  const beforeRequest = () => {
    setErrorVisible(false);
  };

  async function getTodo() {
    beforeRequest();

    try {
      const response = await getTodos();

      setTodos(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      showError('Unable to load todos');
    }
  }

  useEffect(() => {
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddTodo() {
    beforeRequest();
    if (!addTodo.trim()) {
      showError('Title should not be empty');

      return;
    }

    setActiveTodoId(todos.length + 1);

    postTodo({
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      userId: USER_ID,
      title: addTodo,
      completed: false,
    })
      .then(() => getTodo())
      .catch(() => showError('Unable to add a todo'))
      .finally(() => {
        setTimeout(() => setActiveTodoId(null), 1000);
      });

    // очистка інпуту після відправки
    setAddTodo('');
  }

  function handleDeleteTodo(todoId: number) {
    beforeRequest();
    if (!todoId) {
      showError('Unable to delete a todo');

      return;
    }

    setActiveTodoId(todoId);

    deleteTodo(todoId)
      .then(() => getTodo())
      .catch(() => showError('Unable to delete a todo'))
      .finally(() => {
        setTimeout(() => setActiveTodoId(null), 1000);
      });
  }

  function handleUpdateTodoText(todoId: number, newTitle: string) {
    if (!todoId) {
      return;
    }

    const trimmedTitle = newTitle.trim();

    // Якщо пустий текст — видаляємо
    if (!trimmedTitle) {
      handleDeleteTodo(todoId);

      return;
    }

    setActiveTodoId(todoId);

    // Тут імітуємо API-запит на оновлення
    updateTodo(todoId, {
      id: todoId,
      userId: USER_ID,
      title: trimmedTitle,
      completed: todos.find(todo => todo.id === todoId)?.completed || false,
    })
      .then(() => getTodo()) // отримуємо оновлений список
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        setErrorMessage('Unable to update todo');
        setErrorVisible(true);
      })
      .finally(() => {
        setTimeout(() => setActiveTodoId(null), 500);
        setEditingId(null); // виходимо з режиму редагування
      });
  }

  function handleUpdateTodoStatus(
    todoId: number,
    title: string,
    newStatus: boolean,
  ) {
    if (!todoId) {
      showError('Unable to update todo status');

      return;
    }

    setActiveTodoId(todoId);

    // Тут імітуємо API-запит на оновлення
    updateTodo(todoId, {
      id: todoId,
      userId: USER_ID,
      title: title,
      completed: newStatus,
    })
      .then(() => getTodo()) // отримуємо оновлений список
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        setErrorMessage('Unable to update todo');
        setErrorVisible(true);
      })
      .finally(() => {
        setTimeout(() => setActiveTodoId(null), 500);
      });
  }

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    if (event.key === 'Enter') {
      const todo = todos.find(t => t.id === todoId);

      if (todo && todo.title.trim() === '') {
        // якщо пусте значення → видаляємо
        handleDeleteTodo(todoId);
      } else {
        handleUpdateTodoText(todoId, event.currentTarget.value);
        // закінчуємо редагування
        setEditingId(null);
      }
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <TodoHeader
        haveTodos={todos.length > 0}
        addTodo={addTodo}
        setAddTodo={setAddTodo}
        handleAddTodo={handleAddTodo}
        setToggleAllButton={setToggleAllButton}
        toggleAllButton={toggleAllButton}
      />
      <TodoList
        todos={filteredTodos}
        editingId={editingId}
        setEditingId={setEditingId}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodoStatus={handleUpdateTodoStatus}
        handleUpdateTodoText={handleUpdateTodoText}
        handleKeyDown={handleKeyDown}
        setTodos={setTodos}
        activeTodoId={activeTodoId}
      />
      <TodoFooter
        todosLength={todos.length}
        filterType={filterType}
        setFilterType={setFilterType}
        remainingTodos={todos.filter(t => !t.completed).length}
      />
      <ErrorNotification
        message={errorMessage}
        visible={errorVisible}
        onClose={() => setErrorVisible(false)}
      />
    </div>
  );
};
