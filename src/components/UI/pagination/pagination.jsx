import { getPagesArray } from "../../../utils/pages";
import MyButton from "../button/MyButton";

export default function Pagination({ totalPages, page, changePage }) {
  const pagesArray = getPagesArray(totalPages);

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <MyButton onClick={() => changePage(p)} key={p} isActive={p === page}>
          {p}
        </MyButton>
      ))}
    </div>
  );
}
