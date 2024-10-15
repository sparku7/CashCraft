const CategoryModal = ({ isOpen, onClose, title, category, handleSubmit, setCategory }) => (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{title}</h2>
          <input
            type="text"
            placeholder="Category Name"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            className="modal-input"
          />
          <input
            type="number"
            placeholder="Budget Amount"
            value={category.budget}
            onChange={(e) => setCategory({ ...category, budget: e.target.value })}
            className="modal-input"
          />
          <button onClick={handleSubmit}>{title}</button>
        </div>
      </div>
    )
  );
  
  export default CategoryModal;