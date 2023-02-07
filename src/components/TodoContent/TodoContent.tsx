import { useState } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { TodoMain } from '../TodoMain';

export const TodoContent: React.FC<{ todos: Todo[] | null }> = ({ todos }) => {
  const [filter, setFilter] = useState<Filter>(Filter.all);

  return (
    <div className="todoapp__content">
      <TodoHeader />
      <TodoMain todos={todos} />
      {todos && (
        <TodoFooter todos={todos} filter={filter} onChange={setFilter} />
      )}
    </div>
  );
};
