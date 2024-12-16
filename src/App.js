import React, { useState } from 'react';
import './App.css';

function App() {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', quantity: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle input change for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update item in inventory
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setInventory(
        inventory.map((item) =>
          item.id === formData.id ? { ...formData, id: formData.id } : item
        )
      );
      setIsEditMode(false);
    } else {
      setInventory([...inventory, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  // Delete item
  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  // Edit item
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditMode(true);
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({ id: '', name: '', quantity: '' });
    setIsEditMode(false);
  };

  // Filter inventory based on search term
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Home Inventory Manager</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>

      {/* Inventory List */}
      <ul>
        {filteredInventory.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
