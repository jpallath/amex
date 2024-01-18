interface PaginationProps {
  updatePage: Function;
  totalCount: number;
  current: number;
}

interface PageProp {
  location: number | string;
  updatePage: Function;
  current: number;
}

const Pagination: React.FC<PaginationProps> = ({
  updatePage,
  totalCount,
  current,
}) => {
  const PageItem: React.FC<PageProp> = ({ location, updatePage, current }) => {
    return (
      <div
        className={
          "cursor-pointer " +
          (current === location ? "underline decoration-2" : "")
        }
        onClick={() => updatePage(location)}
      >
        {location}
      </div>
    );
  };
  const pageNumbers = Array.from(
    { length: totalCount },
    (_, index) => index + 1
  );
  return (
    <div className="flex gap-2 w-full justify-center">
      {current > 1 ? (
        <PageItem
          location={"Previous"}
          updatePage={() => updatePage(current - 1)}
          key={0}
          current={current}
        />
      ) : null}
      {pageNumbers.map((pageNumber) => (
        <PageItem
          location={pageNumber}
          updatePage={() => updatePage(pageNumber)}
          key={pageNumber}
          current={current}
        />
      ))}
    </div>
  );
};

export { Pagination };
