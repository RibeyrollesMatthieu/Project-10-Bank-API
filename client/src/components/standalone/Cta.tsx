interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  color?: 'white';
}

export const Cta = ({ label, className, color, ...args }: Props) => {
  return (
    <button className={`cta ${color ? `cta--${color}` : ''} ${className ?? ''}`} {...args}>
      {label}
    </button>
  );
};
