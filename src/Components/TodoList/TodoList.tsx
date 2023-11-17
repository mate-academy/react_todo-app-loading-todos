import { Todo } from "../../types/Todo"
import { TodoItem } from "../TodoItem"

type Props = {
  todos: Todo[],
  edited: Todo | null,
  updateProcessing: boolean,
}

export const TodoList: React.FC<Props> = ({todos, edited, updateProcessing}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          edited={edited}
          updateProcessing={updateProcessing}
        />))}
    </section>
  )
}
