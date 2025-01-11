const Filter = ({ showAll, onFilterChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={showAll} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
