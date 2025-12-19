import useTripStore from '../store/useTripStore';
import {
  getTotalCost,
  getRemainingBudget,
  getRemainingPercent,
  getBudgetStatus,
} from '../utils/budget';
import EmptyState from './EmptyState';

const BudgetBar = () => {
  const activeTrip = useTripStore((state) => state.getActiveTrip());

  // TEST CODE
  // const activeTrip = {
  //   budget: 500,
  //   items: [{ price: 40 }, { price: 380 }, { price: 20 }],
  // };

  if (!activeTrip || activeTrip.budget === null) return null;
  const { budget } = activeTrip;
  const items = activeTrip.items ?? [];
  const total = getTotalCost(items);
  const remaining = getRemainingBudget(budget, total);
  const percent = getRemainingPercent(budget, remaining);
  const normalizedPercent = percent <= 1 ? percent * 100 : percent;
  const clampedPercent =
    remaining < 0 ? 100 : Math.max(0, Math.min(100, normalizedPercent));
  const status = getBudgetStatus(budget, percent);
  const safeRemaining = Number.isFinite(remaining) ? remaining : 0;

  const statusClasses = {
    ok: 'bg-green-500',
    warning: 'bg-yellow-500',
    over: 'bg-red-500',
  };

  return (
    <section className="rounded-lg border p-4 space-y-3">
      <div className="flex justify-between text-sm font-medium">
        <span>Remaining</span>
        <span>${safeRemaining.toFixed(2)}</span>
      </div>

      <div className="h-2 w-full rounded bg-gray-200 overflow-hidden flex flex-row-reverse">
        <div
          className={`h-full ${statusClasses[status]}`}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>

      {items.length === 0 && <EmptyState message="No items added yet." />}
    </section>
  );
};

export default BudgetBar;
