# React + Supabase Todo App

A clean, production-quality Todo application built with React, Vite, and Supabase. This app demonstrates full CRUD (Create, Read, Update, Delete) operations with a modern, responsive UI.

## 📋 Overview

This Todo App allows users to:
- ✅ Create new todos
- 📖 View all todos
- ✏️ Edit existing todos
- ✅ Toggle todo completion status
- 🗑️ Delete todos

All data is stored and managed through Supabase, providing a real-time, scalable backend solution.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete todos
- **Real-time Database**: Powered by Supabase
- **Modern UI**: Clean and responsive design with Tailwind CSS
- **Edit Functionality**: Inline editing of todo items
- **Error Handling**: Comprehensive error handling and loading states
- **Optimistic Updates**: Instant UI updates for better user experience

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Supabase** - Backend as a Service (Database)
- **Tailwind CSS** - Utility-first CSS framework

## 📁 Project Structure

```
src/
  components/
    TodoItem.jsx    # Individual todo item component
    TodoList.jsx    # List of todos component
  App.jsx           # Main app component with CRUD logic
  supabaseClient.js # Supabase client configuration
  index.css         # Global styles with Tailwind
  main.jsx          # App entry point
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account (free tier works)

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Set Up Supabase

#### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `todo-app` (or any name you prefer)
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Click "Create new project" and wait for it to initialize

#### Step 2: Create the Todos Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Run the following SQL to create the `todos` table:

```sql
-- Create todos table
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  is_done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for simplicity)
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow all operations on todos"
ON todos
FOR ALL
USING (true)
WITH CHECK (true);
```

4. Click "Run" to execute the query

#### Step 3: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

### 3. Configure Environment Variables

1. Create a `.env` file in the root directory:

```bash
# .env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values you copied from Supabase

**Alternative**: You can also directly edit `src/supabaseClient.js` and replace the placeholder values:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 4. Run the Application

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📦 Build for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist` directory.

## 🚀 Deploy on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```
   **Note**: You may see a warning about Express during installation - this is normal and can be ignored. Verify installation with:
   ```bash
   vercel --version
   ```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

5. Redeploy to apply environment variables:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Important Notes for Deployment

- Make sure to add your environment variables in Vercel's project settings
- After adding environment variables, you may need to trigger a new deployment
- The app will be available at a URL like `https://your-project.vercel.app`

### Troubleshooting Vercel Installation

If you encounter issues installing Vercel CLI:

1. **Try with administrator privileges** (Windows):
   - Right-click PowerShell/Command Prompt → "Run as Administrator"
   - Then run: `npm i -g vercel`

2. **Alternative: Use npx** (no installation needed):
   ```bash
   npx vercel
   ```

3. **Use the web dashboard instead** (Option 2 above) - no CLI needed!

## 📸 Screenshots

<!-- Add screenshots here -->
_Coming soon..._

## 🎯 How It Works

### Component Architecture

- **App.jsx**: Main component that manages state and handles all CRUD operations
- **TodoList.jsx**: Displays the list of todos
- **TodoItem.jsx**: Individual todo item with edit/delete functionality

### Data Flow

1. **Create**: User enters text → `handleAddTodo` → Supabase insert → Update state
2. **Read**: Component mounts → `fetchTodos` → Supabase select → Update state
3. **Update**: User toggles/edit → `handleToggleTodo`/`handleUpdateTodo` → Supabase update → Update state
4. **Delete**: User clicks delete → `handleDeleteTodo` → Supabase delete → Update state

### Key Concepts

- **useState**: Manages component state (todos, loading, error, input)
- **useEffect**: Fetches todos when component mounts
- **Optimistic Updates**: UI updates immediately, then syncs with database
- **Error Handling**: Try-catch blocks with user-friendly error messages

## 🔒 Security Notes

- The anon key is safe to expose in client-side code (it's designed for this)
- Row Level Security (RLS) policies control database access
- For production, implement proper RLS policies based on user authentication

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is an internship assignment project. Feel free to use it as a reference or starting point for your own projects!

---

**Built with ❤️ using React + Supabase**

