import clsx from "clsx";

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  helperText?: string;
  hideLabel?: boolean;
  id: string;
}

export function TextInput(props: TextInputProps) {
  const { value, onChange, label, helperText, hideLabel, id } = props;

  return (
    <div className={""}>
      <label className={clsx("text-gray-700", hideLabel && "sr-only")}>
        {label}
      </label>
      <input
        value={value}
        onChange={(evt) => onChange(evt.currentTarget.value)}
        className={"p-2 border rounded-sm focus:border-primary-400 w-full focus:outline-none"}
      />
      {helperText && (
        <span className={"text-gray-600 text-sm"}>{helperText}</span>
      )}
    </div>
  );
}
