import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  addTodos,
  deleteTodo,
  getTodos,
  patchTodos,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FormTodo } from './components/FormTodo';
import { FooterTodos } from './components/FooterTodos';
import { ErrorTodos } from './components/ErrorTodos';

type Filter = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterSelect, setFilterSelected] = useState<Filter>('All');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        throw new Error('Cant find todos');
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filterSelect === 'Active') {
      return !todo.completed;
    }

    if (filterSelect === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  function postTodos(title: string) {
    if (title.trim().length === 0) {
      setError('Title should not be empty');

      return;
    }

    addTodos({ title, completed: false, userId: 3177 })
      .then(newTodo => setTodos(prev => [...prev, newTodo]))
      .catch(() => {
        setError('Unable to add a todo');
        throw new Error('Cant create new todos');
      });
  }

  function removeTodos(todoId: number) {
    return deleteTodo(todoId)
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        setError('Unable to delete a todo');
        throw new Error('Cant delete todos');
      });
  }

  function changeTodo(todoId: number, title: string, completed: boolean) {
    return patchTodos({ id: todoId, title, completed, userId: 3177 })
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        setError('Unable to update a todo');
        throw new Error('Cant change todos');
      });
  }

  function changeComplite() {
    const isAllCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    }));

    setTodos(updatedTodos);

    Promise.all(updatedTodos.map(todo => patchTodos(todo)))
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        throw new Error('Cant change all todos');
      });
  }

  function filter(type: Filter) {
    setFilterSelected(type);
  }

  function clearCompleted() {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => deleteTodo(todo.id)))
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        setError('Unable to clear completed todos');
        throw new Error('Cant clear completed todos');
      });
  }

  function clearError() {
    setError('');
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <FormTodo
          postTodos={postTodos}
          changeComplite={changeComplite}
          todos={todos}
        />

        {todos.length > 0 && (
          <TodoList
            todos={filteredTodos}
            deleteTodo={removeTodos}
            changeTodo={changeTodo}
          />
        )}

        {todos.length > 0 && (
          <FooterTodos
            todos={todos}
            filter={filter}
            clearCompleted={clearCompleted}
            selected={filterSelect}
          />
        )}
      </div>

      <ErrorTodos error={error} clearError={clearError} />
    </div>
  );
};
