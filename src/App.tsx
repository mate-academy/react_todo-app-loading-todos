import React, { useEffect, useState } from 'react';
import { USER_ID, createTodos, getTodos, updateTodo } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

export enum StatusTodos {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusTodos>(StatusTodos.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(e => setError('Unable to load todos' + e.message));
  }, []);

  const handleAddTodo = async (title: string, completed: boolean) => {
    const newTodo: Omit<Todo, 'id'> = { title, userId: USER_ID, completed };

    try {
      const createdTodo = await createTodos(newTodo);
      setTodos(prevTodos => [...prevTodos, createdTodo]);
    } catch (error) {
      setError('Failed to create Todo');
    }
  };

  const handleUpdateTodoStatus = async (id: number, completed: boolean) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) {
      setError('Todo not found');
      return;
    }

    try {
      const updatedTodo = await updateTodo({ ...todoToUpdate, completed });
      setTodos(currentTodos =>
        currentTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      );
    } catch (e) {
      setError('Unable to update a todo: ' + e);
    }
  };

  const handleStatusChange = (newStatus: StatusTodos) => setStatus(newStatus);

  const handleErrorClose = () => setError(null);

  const filteredTodos = todos.filter(todo => {
    if (status === StatusTodos.ACTIVE) return !todo.completed;
    if (status === StatusTodos.COMPLETED) return todo.completed;
    return true;
  });

  const counterOfActiveTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header onAddTodo={handleAddTodo} />
        <TodoList todos={filteredTodos} onUpdateStatus={handleUpdateTodoStatus} />
        {todos.length > 0 && (
          <Footer
            status={status}
            onChangeStatus={handleStatusChange}
            counterOfActiveTodos={counterOfActiveTodos}
            todos={todos}
          />
        )}
      </div>
      <Error error={error} onClose={() => setError(null)}/>
    </div>
  );
};
