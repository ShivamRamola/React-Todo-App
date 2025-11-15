import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import TodoList from './components/TodoList'

/**
 * Main App Component
 * Manages the state and CRUD operations for todos
 */
function App() {
  // State to store all todos
  const [todos, setTodos] = useState([])
  
  // State to manage loading and error states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // State for the new todo input
  const [newTodo, setNewTodo] = useState('')

  /**
   * Fetch all todos from Supabase
   * This runs when the component mounts (useEffect with empty dependency array)
   */
  useEffect(() => {
    fetchTodos()
  }, [])

  /**
   * Fetch todos from the Supabase database
   * Orders them by creation date (newest first)
   */
  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)

      // Query the todos table, order by created_at descending
      const { data, error: fetchError } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      // Update state with fetched todos
      setTodos(data || [])
    } catch (err) {
      console.error('Error fetching todos:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Create a new todo
   * Inserts a new row into the todos table
   */
  const handleAddTodo = async (e) => {
    e.preventDefault()

    // Don't add empty todos
    if (!newTodo.trim()) return

    try {
      setError(null)

      // Insert new todo into Supabase
      // Supabase automatically sets created_at and id
      const { data, error: insertError } = await supabase
        .from('todos')
        .insert([{ title: newTodo.trim(), is_done: false }])
        .select()

      if (insertError) throw insertError

      // Add the new todo to the state (optimistic update)
      // Supabase returns the inserted row, so we can add it directly
      setTodos([data[0], ...todos])
      setNewTodo('') // Clear the input
    } catch (err) {
      console.error('Error adding todo:', err)
      setError(err.message)
    }
  }

  /**
   * Toggle the completion status of a todo
   * Updates the is_done field in the database
   */
  const handleToggleTodo = async (id) => {
    try {
      // Find the todo to get its current state
      const todo = todos.find((t) => t.id === id)
      if (!todo) return

      // Update the todo in Supabase
      const { error: updateError } = await supabase
        .from('todos')
        .update({ is_done: !todo.is_done })
        .eq('id', id)

      if (updateError) throw updateError

      // Update the local state (optimistic update)
      setTodos(
        todos.map((t) =>
          t.id === id ? { ...t, is_done: !t.is_done } : t
        )
      )
    } catch (err) {
      console.error('Error toggling todo:', err)
      setError(err.message)
      // Refetch todos to sync with database
      fetchTodos()
    }
  }

  /**
   * Delete a todo
   * Removes the todo from the database
   */
  const handleDeleteTodo = async (id) => {
    try {
      // Delete from Supabase
      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      // Remove from local state (optimistic update)
      setTodos(todos.filter((t) => t.id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError(err.message)
      // Refetch todos to sync with database
      fetchTodos()
    }
  }

  /**
   * Update a todo's title
   * Updates the title field in the database
   */
  const handleUpdateTodo = async (id, newTitle) => {
    try {
      // Update in Supabase
      const { error: updateError } = await supabase
        .from('todos')
        .update({ title: newTitle })
        .eq('id', id)

      if (updateError) throw updateError

      // Update local state (optimistic update)
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
      )
    } catch (err) {
      console.error('Error updating todo:', err)
      setError(err.message)
      // Refetch todos to sync with database
      fetchTodos()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
             Todo App
          </h1>
          <p className="text-gray-600">
            Manage your tasks with ease
          </p>
        </div>

        {/* Error message display */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Add Todo Form */}
        <form onSubmit={handleAddTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter a new todo..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold"
            >
              Add Todo
            </button>
          </div>
        </form>

        {/* Todos List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading todos...</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Built with ❤️ by Shivam Ramola</p>
        </div>
      </div>
    </div>
  )
}

export default App

