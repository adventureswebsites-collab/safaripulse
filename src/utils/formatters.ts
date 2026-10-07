/**
 * Formats a number as Kenyan Shillings (KSh)
 */
export function formatKSh(amount: number): string {
  return `KSh ${amount.toLocaleString('en-KE')}`;
}

/**
 * Formats a date string (YYYY-MM-DD) to a human readable format
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Calculates days countdown from current date
 */
export function getDaysUntil(dateString: string): number {
  const target = new Date(dateString).getTime();
  const now = new Date('2026-10-06').getTime();
  const diff = target - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
