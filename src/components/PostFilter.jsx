import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

export default function PostFilter({ filter, setFilter }) {
  return (
    <div>
      <MyInput
        placeholder="Поиск..."
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По названию" },
          { value: "body", name: "По описанию" },
        ]}
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
      />
    </div>
  );
}
