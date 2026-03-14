/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo, TodoErrorMessages, TodosFilterStatus } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { UIEditingStates } from './types/States';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';

export const App: React.FC = () => {
  const [editingStates, setEditingStates] = useState<UIEditingStates>({
    isFocusTitle: false,
    selectedTodo: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<TodoErrorMessages>('');
  const [todosFilterStatus, setFilterTodosStatus] =
    useState<TodosFilterStatus>('All');
  const [todoTitle, setTodoTitle] = useState('');
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState('');
  const remainedTodos = todos.filter(todo => !todo.completed).length;

  async function getTodosFromServer() {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setErrorMessage('Unable to load todos');
      await new Promise(() => setTimeout(() => setErrorMessage(''), 3000));
    } finally {
      setIsLoading(false);
    }
  }

  function deleteSelectedTodo(currentTodos: Todo[], todoToDelete: Todo) {
    const newTodos = [...currentTodos];
    const indexTodoToDelete = newTodos.findIndex(todo => todo === todoToDelete);

    newTodos.splice(indexTodoToDelete, 1);

    return newTodos;
  }

  useEffect(() => {
    getTodosFromServer();
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTodos(currentTodos => {
      const maxId = Math.max(0, ...currentTodos.map(todo => todo.id));

      return [
        ...currentTodos,
        {
          title: todoTitle,
          completed: false,
          userId: USER_ID,
          id: maxId + 1,
        },
      ];
    });
    setTodoTitle('');
  }

  function toggleTodo(todo: Todo) {
    const index = todos.findIndex(currentTodo => currentTodo === todo);

    return setTodos(currentTodos => {
      const newTodos = [...currentTodos];

      newTodos[index].completed = !newTodos[index].completed;

      return newTodos;
    });
  }

  const visibleTodos = todos.filter(todo => {
    switch (todosFilterStatus) {
      case 'All':
        return true;
      case 'Completed':
        return todo.completed;
      case 'Active':
        return !todo.completed;
      default:
        return true;
    }
  });

  function isAllTodosComplete() {
    return visibleTodos ? visibleTodos.every(todo => todo.completed) : false;
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          handleSubmit={handleSubmit}
          isAllTodosComplete={isAllTodosComplete}
          setTodoTitle={setTodoTitle}
          todoTitle={todoTitle}
        />

        <TodoList
          deleteSelectedTodo={deleteSelectedTodo}
          isLoading={isLoading}
          setTodoTitle={setTodoTitle}
          editingStates={editingStates}
          setEditingStates={setEditingStates}
          setTodos={setTodos}
          setUpdatedTodoTitle={setUpdatedTodoTitle}
          updatedTodoTitle={updatedTodoTitle}
          todos={visibleTodos}
          toggleTodo={toggleTodo}
        />

        {todos.length !== 0 && (
          <TodoFooter
            isAllTodosComplete={isAllTodosComplete}
            remainedTodos={remainedTodos}
            setFilterTodosStatus={setFilterTodosStatus}
            todosFilterStatus={todosFilterStatus}
          />
        )}
      </div>
      <TodoError errorMessage={errorMessage} />
    </div>
  );
};
