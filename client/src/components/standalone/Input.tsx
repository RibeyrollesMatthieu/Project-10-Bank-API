import {
  ChangeEvent,
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
  useId,
} from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: Dispatch<SetStateAction<any>>;
}

export const Input = ({ type = 'text', label, setValue, value, id, ...args }: Props) => {
  const generatedId = useId();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(type === 'checkbox' ? e.target.checked : e.target.value);
    },
    [setValue, type]
  );

  return (
    <div className='input-wrapper'>
      <label htmlFor={id ?? generatedId}>{label}</label>
      <input type={type} value={value} onChange={handleChange} id={id ?? generatedId} {...args} />
    </div>
  );
};
