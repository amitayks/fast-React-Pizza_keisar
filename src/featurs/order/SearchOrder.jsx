import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='search order #'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='searchBar'
      />
    </form>
  );
}

export default SearchOrder;
