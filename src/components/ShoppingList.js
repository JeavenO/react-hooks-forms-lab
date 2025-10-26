import React, { useState } from 'react';
// Removed lucide-react imports: ChevronDown, ShoppingBag, Sun, Moon, Plus

// --- DATA & HELPERS ---
const initialItems = [
  // Added isPurchased: false to the initial state
  { id: '1', name: "Organic Milk (1 Gal)", category: "Dairy", isPurchased: false },
  { id: '2', name: "Fuji Apples (3 lbs)", category: "Produce", isPurchased: false },
  { id: '3', name: "Vanilla Bean Ice Cream", category: "Dessert", isPurchased: false },
  { id: '4', name: "Cheddar Cheese Block", category: "Dairy", isPurchased: false },
  { id: '5', name: "Ripe Bananas", category: "Produce", isPurchased: false },
  { id: '6', name: "Chocolate Lava Cake", category: "Dessert", isPurchased: false },
  { id: '7', name: "Broccoli Crowns", category: "Produce", isPurchased: false },
];

const categories = ["All", "Produce", "Dairy", "Dessert"];

// Simple UUID generator for new items (as recommended)
const generateUuid = () => Math.random().toString(36).substring(2, 9);

// --- 1. Item Component ---
function Item({ name, category, isPurchased, onTogglePurchased }) { // <-- NEW PROPS
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Produce':
        return 'text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-800';
      case 'Dairy':
        return 'text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-800';
      case 'Dessert':
        return 'text-pink-600 bg-pink-100 dark:text-pink-300 dark:bg-pink-800';
      default:
        return 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-600';
    }
  };

  // Conditional classes for purchased state
  const itemClasses = isPurchased 
    ? "opacity-50 line-through text-gray-400 dark:text-gray-500" 
    : "text-gray-800 dark:text-gray-100";

  return (
    <li className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 border-b last:border-b-0 border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        {/* Toggle Purchased Button/Checkbox */}
        <button
          onClick={onTogglePurchased} // <-- Call the handler from App
          className={`w-6 h-6 rounded-full border-2 transition duration-200 flex items-center justify-center flex-shrink-0 ${
            isPurchased 
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label={isPurchased ? "Mark as not purchased" : "Mark as purchased"}
        >
          {/* Simple checkmark */}
          {isPurchased && <span className="text-sm leading-none font-bold">✓</span>}
        </button>
        <span className={`font-medium text-lg text-left ${itemClasses}`}>{name}</span>
      </div>
      <span
        className={`px-3 py-1 text-xs font-semibold uppercase rounded-full tracking-wider ${getCategoryColor(category)}`}
      >
        {category}
      </span>
    </li>
  );
}

// --- 2. Filter Component (Controlled Search Input & Category Select) ---
function Filter({ selectedCategory, onCategoryChange, searchTerm, onSearchChange }) {
  return (
    <div className="Filter flex flex-col sm:flex-row gap-4 items-center mb-6">
      {/* Search Input Field (Controlled Component) */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm} // Controlled value
        onChange={onSearchChange} // Callback to update parent state
        className="w-full sm:w-auto flex-grow bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-xl leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
      />

      {/* Category Dropdown (Controlled Component) */}
      <div className="relative inline-block w-full sm:w-auto">
        <select
          name="filter"
          onChange={onCategoryChange} // Callback to update parent state
          value={selectedCategory} // Controlled value
          className="appearance-none block w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
        >
          <option value="All">All Categories</option>
          {categories.filter(c => c !== "All").map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
          {/* Replaced ChevronDown with inline arrow character */}
          <span className="text-xl leading-none">▼</span>
        </div>
      </div>
    </div>
  );
}

// --- 3. ItemForm Component (Controlled Form) ---
function ItemForm({ onItemFormSubmit }) {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("Produce"); // Initial value "Produce"

  // Handlers for controlled inputs
  const handleNameChange = (e) => setItemName(e.target.value);
  const handleCategoryChange = (e) => setItemCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    const newItem = {
      id: generateUuid(),
      name: itemName.trim(),
      category: itemCategory,
      isPurchased: false, // Default status for new items
    };

    onItemFormSubmit(newItem); // Call parent callback to update the list

    // Reset form state
    setItemName("");
    setItemCategory("Produce");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl mt-8">
      <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center">
        {/* Replaced Plus icon with emoji */}
        <span className="mr-2 text-lg">➕</span>
        Add New Item
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Name Input (Controlled) */}
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={handleNameChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition duration-150"
          required
        />

        {/* Category Select (Controlled) */}
        <select
          name="category"
          value={itemCategory}
          onChange={handleCategoryChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition duration-150"
        >
          {categories.filter(c => c !== "All").map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-md"
        >
          Add Item to List
        </button>
      </form>
    </div>
  );
}


// --- 4. ShoppingList Component (Receives all state and handlers as props) ---
function ShoppingList({ 
    items, 
    selectedCategory, 
    onCategoryChange, 
    searchTerm, 
    onSearchChange,
    onTogglePurchased // <-- NEW PROP
  }) {
  
  // Combined Filtering Logic
  const itemsToDisplay = items
    .filter((item) => {
      // 1. Filter by category
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // 2. Filter by search term (case-insensitive)
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center mb-4 sm:mb-0">
          {/* Replaced ShoppingBag icon with emoji */}
          <span className="mr-2 text-3xl leading-none text-indigo-600">🛒</span>
          Shopping List
        </h2>
      </div>

      {/* Use the Filter component and pass down all filtering state/callbacks from App */}
      <Filter 
        selectedCategory={selectedCategory} 
        onCategoryChange={onCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      {/* Item List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <ul className="Items divide-y divide-gray-100 dark:divide-gray-700">
          {itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                category={item.category}
                isPurchased={item.isPurchased} // <-- PASS NEW PROP
                onTogglePurchased={() => onTogglePurchased(item.id)} // <-- PASS NEW HANDLER
              />
            ))
          ) : (
            <li className="p-6 text-center text-gray-500 dark:text-gray-400 italic">
              No items found matching your criteria.
            </li>
          )}
        </ul>
      </div>
      
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Showing {itemsToDisplay.length} of {items.length} total items.
      </p>
    </div>
  );
}

// --- 5. Main App Component (Root - State lifted here) ---
export default function App() {
  // LIFTED STATE: List of items
  const [items, setItems] = useState(initialItems); 
  
  // FILTER STATE (LIFTED): Category
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // NEW STATE: Search Term
  const [searchTerm, setSearchTerm] = useState("");

  // Dark Mode Toggle remains here
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Handlers (Callbacks to be passed down)
  const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const handleCategoryChange = (event) => setSelectedCategory(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  // NEW HANDLER: Add Item Callback (onItemFormSubmit)
  const handleAddItem = (newItem) => {
    // Add the new item to the list by updating state immutably
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  // NEW HANDLER: Toggle Purchased status
  const handleTogglePurchased = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        // Find the item by ID and toggle its isPurchased status immutably
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
      )
    );
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className="bg-indigo-600 dark:bg-gray-800 p-4 shadow-xl">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-white tracking-wider">
            Shopster
          </h2>
          <button 
            onClick={handleToggleDarkMode}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 dark:bg-indigo-500 dark:text-white rounded-xl font-semibold shadow-lg hover:bg-gray-100 dark:hover:bg-indigo-600 transition duration-200"
          >
            {isDarkMode ? (
                <>
                    {/* Replaced Sun icon with emoji */}
                    <span className="text-xl leading-none">☀️</span>
                    <span>Light Mode</span>
                </>
            ) : (
                <>
                    {/* Replaced Moon icon with emoji */}
                    <span className="text-xl leading-none">🌙</span>
                    <span>Dark Mode</span>
                </>
            )}
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-0">
        {/* Pass the addItem callback to the ItemForm component */}
        <ItemForm onItemFormSubmit={handleAddItem} />

        {/* ShoppingList receives the item list state and filtering state/callbacks */}
        <ShoppingList 
          items={items} 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onTogglePurchased={handleTogglePurchased} // <-- PASS NEW HANDLER
        />
      </main>
    </div>
  );
}
