/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6279;

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState('All');

  const addTodo = (newTodo: Todo) => {
    return setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      userId: USER_ID,
      title: newTitle,
      completed: false,
    };

    if (newTitle) {
      addTodo(newTodo);
      setNewTitle('');
    }
  };

  const deleteTodo = (todoId: number) => {
    setTodos(current => current.filter(todo => todo.id !== todoId));
  };

  const updateTodo = (todoUpdated: Todo) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === todoUpdated.id) {
          return todoUpdated;
        }

        return todo;
      }),
    );
  };

  const visibileTodos = todos.filter(todo => {
    switch (selected) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;

      default: return todo;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        {/* Hide the footer if there are no todos */}
        <Header
          onNewTitle={newTitle}
          onSetNewTitle={setNewTitle}
          onHandle={handleSubmit}
        />

        <Main
          onTodos={visibileTodos}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />

        {todos.length !== 0 && (

          <Footer
            onSelected={selected}
            onSetSelected={setSelected}
            Todos={todos}
            onDeleteTodo={deleteTodo}
          />

        )}
      </div>
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />
      </div>
    </div>
  );
};
