import FullGameBoard from './components/game/FullGameBoard.tsx';
import background from './images/GrayDeskBg.jpeg'

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
      }}
      className="App"
    >
      <FullGameBoard />
    </div>
  );
}

export default App;
