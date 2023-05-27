interface InputProps {
  type: "text" | "textarea";
  label: string;
  placeholder: string;
  onBlur: (arg0: React.FocusEvent) => void;
  onChange: (arg0: React.ChangeEvent) => void;
  value: string;
  hasError: boolean;
  errorMessage: string;
}

const Input = ({
  type,
  label,
  placeholder,
  onBlur,
  onChange,
  value,
  hasError,
  errorMessage = "invalid",
}: InputProps) => {
  return (
    <div className="flex flex-col w-full my-2 text-xl">
      <label htmlFor={label}>{label}</label>
      {type == "text" ? (
        <input
          value={value}
          onBlur={(event) => onBlur(event)}
          onChange={(event) => {
            onChange(event);
          }}
          type="text"
          className={`rounded-xl border text-xl  ${
            hasError ? "border-red-500" : "border-black"
          }`}
          name={label}
          placeholder={placeholder}
        />
      ) : type == "textarea" ? (
        <textarea
          onBlur={(event) => onBlur(event)}
          onChange={(event) => onChange(event)}
          value={value}
          rows={8}
          className={`rounded-xl border text-xl ${
            hasError ? "border-red-500" : "border-black"
          }`}
          placeholder={placeholder}
          name={label}
        />
      ) : null}
      {hasError ? (
        <span className="text-base text-red-500">{errorMessage}</span>
      ) : null}
    </div>
  );
};

export default Input;
