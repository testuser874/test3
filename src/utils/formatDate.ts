/**
 * Converts an ISO date string (YYYY-MM-DD) to European numeric format (DD-MM-YYYY).
 */
export function formatDateNumeric(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}-${month}-${year}`;
}

/**
 * Converts an ISO date string to a readable European format (30 Jan 2025).
 */
export function formatDateReadable(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
