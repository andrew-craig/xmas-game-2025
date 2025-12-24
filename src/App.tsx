import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Game } from './components/Game';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {isLoading ? <LoadingScreen /> : <Game />}
    </div>
  );
}

export default App;
