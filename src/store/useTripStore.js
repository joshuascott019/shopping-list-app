import { useEffect, useState } from 'react';
import { loadState, saveState } from '@/utils/storage';

const initialState = {
  trips: [],
  activeTrip: null,
};

export default function useTripStore() {
  const [state, setState] = useState(() => {
    return loadState() ?? initialState;
  });
  useEffect(() => {
    saveState(state);
  }, [state]);

  function createTrip({ id, name, budget }) {
    setState((prev) => ({
      ...prev,
      trips: [
        ...prev.trips,
        {
          id,
          name,
          budget: budget ?? null,
          items: [],
          createdAt: Date.now(),
        },
      ],
      activeTripId: id,
    }));
  }
  function setActiveTrip(id) {
    setState((prev) => ({
      ...prev,
      activeTripId: id,
    }));
  }
  function addItem(item) {
    setState((prev) => ({
      ...prev,
      trips: prev.trips.map((trip) =>
        trip.id === prev.activeTripId
          ? { ...trip, items: [...trip.items, item] }
          : trip
      ),
    }));
  }
  function updateItem(itemId, updater) {
    setState((prev) => ({
      ...prev,
      trips: prev.trips.map((trip) =>
        trip.id !== prev.activeTripId
          ? trip
          : {
              ...trip,
              items: trip.items.map((item) =>
                item.id === itemId ? updater(item) : item
              ),
            }
      ),
    }));
  }
  function removeItem(itemId) {
    setState((prev) => ({
      ...prev,
      trips: prev.trips.map((trip) =>
        trip.id !== prev.activeTripId
          ? trip
          : {
              ...trip,
              items: trip.items.filter((i) => i.id !== itemId),
            }
      ),
    }));
  }
  return {
    trips: state.trips,
    activeTripId: state.activeTripId,

    createTrip,
    setActiveTrip,
    addItem,
    updateItem,
    removeItem,
  };
}
