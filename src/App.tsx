import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Game } from './components/Game';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleStart = () => {
    setShowSplash(false);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {showSplash ? <LoadingScreen onStart={handleStart} /> : <Game />}
    </div>
  );
}

export default App;
