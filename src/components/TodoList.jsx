import TodoItem from './TodoItem'

/**
 * TodoList Component
 * Displays a list of todos using the TodoItem component
 * Handles the display logic for todos
 */
function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  // If there are no todos, show a message
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No todos yet. Add one above to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Map through todos and render each as a TodoItem */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default TodoList

