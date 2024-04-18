/* onChange позволяет реализовать двустороннее связывание с вышестоящим компонентом*/
export default function MySelect({ options, defaultValue, onChange, value }) {
  return (
    <div>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
