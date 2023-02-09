/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import {
  createTodo, deleteTodo, getTodo, getTodos, updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { NewTodoForm } from './components/NewTodoForm';
import { FormMain } from './components/FormMain';
import { FormFooter } from './components/FormFooter';
import { FormErrors } from './components/FormErrors';

const USER_ID = 6146;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [filter, setFilter] = useState('All');
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError(true);
        setErrorMsg('Unable to load todos');

        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    if (todo) {
      getTodo(todo.id).then(setTodo);
    }
  }, [todo]);

  const addTodo = (todoData: Omit<Todo, 'id'>) => {
    createTodo(todoData)
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(() => setErrorMsg('Unable to add todo'));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({
      title: newTodoTitle,
      completed: false,
      userId: USER_ID,
    });

    setNewTodoTitle('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter((td) => {
    switch (filter) {
      case 'active':
        return !td.completed;
      case 'completed':
        return td.completed;
      default:
        return true;
    }
  });

  const removeTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => {
        setTodos(todos.filter(td => td.id !== todoId));
      })
      .catch(() => setErrorMsg('Unable to delete todo'));
  };

  const todoUpdate = (todoToUpdate: Todo) => {
    updateTodo(todoToUpdate)
      .then(() => {
        setTodos(
          todos.map(td => {
            if (td.id === todoToUpdate.id) {
              return todoToUpdate;
            }

            return td;
          }),
        );
      })
      .catch(() => setErrorMsg('Unable to update todo'));
  };

  const completedTodos = todos.filter(td => td.completed);
  const clearCompleted = () => {
    completedTodos.forEach(td => {
      removeTodo(td.id);
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoForm
          todos={visibleTodos}
          onSubmit={handleSubmit}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
        />
        {todos.length > 0 && (
          <FormMain
            todos={visibleTodos}
            onRemove={removeTodo}
            onTodoUpdate={todoUpdate}
          />
        )}

        {todos.length > 0 && (
          <FormFooter
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && (
        <FormErrors errorMsg={errorMsg} error={error} setError={setError} />)}
    </div>
  );
};
