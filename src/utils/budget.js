export function getTotalCost(items) {
  if (!Array.isArray(items)) return 0;

  return items.reduce((sum, item) => {
    if (item.price == null) return sum;
    return sum + item.price;
  }, 0);
}

export function getRemainingBudget(budget, totalCost) {
  if (budget == null) return null;
  return budget - totalCost;
}

export function getRemainingPercent(budget, remaining) {
  if (budget == null) return null;
  if (budget <= 0) return 0;
  return remaining / budget;
}

export function getBudgetStatus(budget, remainingPercent) {
  if (budget == null) return 'disabled';

  if (remainingPercent <= 0) return 'over';
  if (remainingPercent <= 0.25) return 'warning';

  return 'ok';
}
