import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/authContext'; 
import { DarkModeContextProvider } from './context/darkModeContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
)
