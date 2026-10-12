import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  
  // Task 01 Step 3: Read API base URL from the environment variable
  const API = import.meta.env.VITE_API_URL;
  const menuUrl = API ? `${API}/api/menu` : "/menu.json";

  // Using our fetch hook with the dynamic environment-configured endpoint
  const { data: dishes, isLoading, error } = useFetch(menuUrl);

  // Handle the 3 states
  if (isLoading) return <p>Loading menu...</p>;
  if (error) return <p>Could not load menu: {error}</p>;

  // Filter the fetched dishes
  const filtered = (dishes || []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search dishes..."
        style={{ padding: '8px', margin: '10px 0', width: '200px' }}
      />
      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;