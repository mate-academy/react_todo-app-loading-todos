interface Props {
  newTodoField: any;
}
export const Form: React.FC<Props> = ({ newTodoField }) => (
  <form>
    <input
      data-cy="NewTodoField"
      type="text"
      ref={newTodoField}
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
    />
  </form>
);
