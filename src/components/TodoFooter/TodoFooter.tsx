import React from 'react';
import { TodoFilter } from './TodoFilter/TodoFilter';
import { Todo } from '../../types/Todo';
import { TodoCounter } from './TodoCounter';

type Props = {
  todos: Todo[]
  setTodo: (currentTodo: Todo[]) => void,

};

export const TodoFooter: React.FC<Props> = ({ todos, setTodo }) => {
  return (
    <footer className="todoapp__footer">
      <TodoCounter todos={todos} />
      <TodoFilter
        todos={todos}
        setTodo={setTodo}
      />
    </footer>
  );
};
