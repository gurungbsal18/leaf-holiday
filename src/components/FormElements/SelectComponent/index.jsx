export default function SelectComponent({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="">
      <p className=" ">{label}</p>
      <select value={value} onChange={onChange} className="">
        {options && options.length ? (
          options.map((optionItem) => (
            <option
              id={optionItem.id}
              value={optionItem.id}
              key={optionItem.id}>
              {optionItem.label}
            </option>
          ))
        ) : (
          <option id="" value={""}>
            Select
          </option>
        )}
      </select>
    </div>
  );
}
