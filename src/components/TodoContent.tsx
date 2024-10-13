import { useEffect, useState } from 'react';

import { TodoFooter } from './TodoFooter';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';

import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  errorFunction?: (message: string) => void;
};

export const TodoContent: React.FC<Props> = ({
  todos,
  errorFunction = () => {},
}) => {
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  return (
    <div className="todoapp__content">
      <TodoHeader todos={todos} errorFunction={errorFunction} />

      {todos.length > 0 && (
        <>
          <TodoList todoList={todoList} />
          <TodoFooter filterTodos={setTodoList} todos={todos} />
        </>
      )}
    </div>
  );
};
