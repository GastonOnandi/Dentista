// Input de búsqueda con icono
const SearchInput = ({ placeholder, onChange }) => {
  return (
    <div className="search-input">
      <span className="search-icon">🔍</span>
      <input 
        type="text" 
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
export default SearchInput;