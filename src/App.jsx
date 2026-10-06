import React, { useEffect } from 'react';
import BookLayout from './components/BookLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { useAppState } from './hooks/useAppState';
import { useAudioTTS } from './hooks/useAudioTTS';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  const appState = useAppState();
  const audio = useAudioTTS();

  // Synchronize data-theme to root html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appState.state.theme);
  }, [appState.state.theme]);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="book-app-root">
          <BookLayout appState={appState} audio={audio} />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}
