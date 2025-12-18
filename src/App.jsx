import useTripStore from '@/store/useTripStore';
import { v4 as uuid } from 'uuid';

function App() {
  const { trips, activeTripId, createTrip, setActiveTrip, addItem } =
    useTripStore();

  return <div className="p-4 space-y-4"></div>;
}

export default App;
