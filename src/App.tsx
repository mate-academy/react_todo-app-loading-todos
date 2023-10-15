/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { TodosProvider } from './Components/TodosContext/TodosContext';
import { TodoApp } from './Components/TodoApp';

export const App: React.FC = () => {
  // function addTodo({ title, completed, userId }: Todo) {
  //   todosServise.createTodos({ title, completed, userId })
  //     .then(newPost => {
  //       setTodos(currentTodos => ([
  //         ...(currentTodos || []),
  //         newPost,
  //       ]));
  //     });
  // }

  // const handleAdd = (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (text.trim()) {
  //     addTodo({
  //       id: new Date().getTime(),
  //       title: text,
  //       completed: false,
  //       userId: USER_ID,
  //     });
  //   }

  //   setText('');
  // };

  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
