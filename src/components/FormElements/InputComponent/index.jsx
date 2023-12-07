export default function InputComponent({
  label,
  placeholder,
  onChange,
  value,
  type,
}) {
  return (
    <div className="">
      <p className="">{label}</p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className=""
      />
    </div>
  );
}
