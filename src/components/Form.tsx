type Props = {
  title: string,
  onSubmit: () => void
  setTitle: (event: string) => void
  placeholder: string
  className: string
};

export const Form: React.FC<Props> = ({
  title,
  onSubmit,
  setTitle,
  placeholder,
  className,
}) => (
  <form
    onSubmit={onSubmit}
  >
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={title}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
  </form>
);
