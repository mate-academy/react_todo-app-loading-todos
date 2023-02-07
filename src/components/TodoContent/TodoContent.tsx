import { Todo } from '../../types/Todo';
import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { TodoMain } from '../TodoMain';

export const TodoContent: React.FC<{ todos: Todo[] | null }> = ({ todos }) => {
  return (
    <div className="todoapp__content">
      <TodoHeader />
      <TodoMain todos={todos} />
      {todos && <TodoFooter />}
    </div>
  );
};
