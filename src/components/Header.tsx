import { Component } from 'react';

type State = {
  hasTodos: boolean;
};

export class Header extends Component<{}, State> {
  state = {
    hasTodos: true,
  }

  render() {
    const { hasTodos } = this.state;

    return (
      <header className="todoapp__header">
        {hasTodos && (
          /* eslint-disable jsx-a11y/control-has-associated-label */
          <button
            type="button"
            className="todoapp__toggle-all"
          />
        )}

        <form>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
    );
  }
}
