type Props = {
  title: string,
  placeholder: string;
  className: string;
  setTitle: (event: string) => void,
};

export const Form: React.FC<Props> = ({
  title,
  placeholder,
  className,
  setTitle,
}) => (
  <form>
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
