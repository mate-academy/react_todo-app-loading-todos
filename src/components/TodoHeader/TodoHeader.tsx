import React from "react";
import cn from "classnames";

type Props = {
  active: boolean | undefined;
};

export const TodoHeader: React.FC<Props> = ({ active }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn("todoapp__toggle-all", { active })}
        aria-label="mark all"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
