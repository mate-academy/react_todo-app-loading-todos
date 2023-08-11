import { useContext } from 'react';

import { AppContext } from '../../context';
import { TodoItemComponent } from '../TodoItemComponent';

export const MainComponent:React.FC = () => {
  const { state } = useContext(AppContext);
  const todos = state.getVisibleTodos();

  return (
    <section className="todoapp__main">
      {todos.length > 0 && (
        todos.map((todo) => (
          <TodoItemComponent todo={todo} key={todo.id} />
        ))
      )}
    </section>
  );
};
