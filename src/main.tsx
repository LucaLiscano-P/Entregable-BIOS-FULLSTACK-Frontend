import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './AppRouter.tsx'
import { CategoryProvider } from './context/CategoryProvider.tsx'
import { PostProvider } from './context/PostProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CategoryProvider>
      <PostProvider>
      <App />
      </PostProvider>
    </CategoryProvider>
  </StrictMode>,
)
