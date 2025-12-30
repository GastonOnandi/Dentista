// Paginador con botones numéricos
const Paginator = ({ currentPage, totalPages, totalResults }) => {
  return (
    <div className="pagination">
      <span>Showing 1 to 4 of {totalResults} results</span>
      <div className="page-buttons">
        <button>‹</button>
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i} 
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button>›</button>
      </div>
    </div>
  );
};
export default Paginator;