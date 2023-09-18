import React from 'react';
import { Todo } from '../Todo';
import { useTodoContext } from '../TodoContextProvider';

export const TodoList: React.FC = () => {
  const { visibleTodos, setError } = useTodoContext();

  const deleteTodo = (todoId: number) => {
    if (!todoId) {
      setError(
        'Unable to delete a todo',
      );
    }

    // console.log('Delete todo', todoId);
  };

  const editTodo = (todoId: number, newTitle: string) => {
    if (!todoId || !newTitle) {
      setError('Unable to update a todo');
    }

    // console.log('Edit todo', todoId, newTitle);
  };

  const toggleTodoStatus = (todoId: number) => {
    if (!todoId) {
      setError('Unable to toggle todo status');
    }

    // console.log('Toggle todo status', todoId);
  };

  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleTodoStatus={toggleTodoStatus}

        />
      ))}
    </section>
  );
};
