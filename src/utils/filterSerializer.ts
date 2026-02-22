import type { ActiveFilters } from '../types';

const STORAGE_KEY = 'zest-campaign-filters';

export function serializeToUrl(filters: ActiveFilters): string {
  const params = new URLSearchParams();

  for (const [filterId, values] of Object.entries(filters)) {
    if (values.length === 0) continue;

    if (filterId === 'dateRange') {
      const [from, to] = values;
      if (from) params.set('dateFrom', from);
      if (to) params.set('dateTo', to);
    } else {
      params.set(filterId, values.join(','));
    }
  }

  return params.toString();
}

export function deserializeFromUrl(search: string): ActiveFilters {
  const params = new URLSearchParams(search);
  const filters: ActiveFilters = {};

  for (const [key, value] of params.entries()) {
    if (!value) continue;

    if (key === 'dateFrom' || key === 'dateTo') {
      if (!filters.dateRange) filters.dateRange = ['', ''];
      if (key === 'dateFrom') filters.dateRange[0] = value;
      if (key === 'dateTo') filters.dateRange[1] = value;
    } else {
      filters[key] = value.split(',');
    }
  }

  return filters;
}

export function syncToUrl(filters: ActiveFilters): void {
  const serialized = serializeToUrl(filters);
  const url = serialized ? `?${serialized}` : window.location.pathname;
  window.history.replaceState(null, '', url);
}

export function syncToLocalStorage(filters: ActiveFilters): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function deserializeFromLocalStorage(): ActiveFilters | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ActiveFilters;
  } catch {
    return null;
  }
}
