import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { router } from './router';
import { Toaster } from './components/ui/sonner';
import AuthContextProvider from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { queryClient } from './react-query/config';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="school-portal-theme">
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <WebSocketProvider>
            <Toaster />
            <RouterProvider router={router} />
          </WebSocketProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
