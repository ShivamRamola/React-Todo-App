import { useState } from 'react'

/**
 * TodoItem Component
 * Displays a single todo item with options to:
 * - Toggle completion status
 * - Edit the todo title
 * - Delete the todo
 */
function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  // State to manage edit mode and the edited title
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)

  // Handle saving the edited todo
  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(todo.id, editedTitle)
      setIsEditing(false)
    }
  }

  // Handle canceling the edit
  const handleCancel = () => {
    setEditedTitle(todo.title) // Reset to original title
    setIsEditing(false)
  }

  // Handle Enter key press to save
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        checked={todo.is_done}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />

      {/* Todo content - either in edit mode or display mode */}
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          {/* Display the todo title with strikethrough if completed */}
          <span
            className={`flex-1 ${
              todo.is_done
                ? 'line-through text-gray-500'
                : 'text-gray-800'
            }`}
          >
            {todo.title}
          </span>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TodoItem

