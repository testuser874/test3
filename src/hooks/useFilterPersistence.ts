import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectActiveFilters } from '../store/selectors';
import { hydrateFilters } from '../store/filtersSlice';
import {
  deserializeFromUrl,
  deserializeFromLocalStorage,
  syncToUrl,
  syncToLocalStorage,
} from '../utils/filterSerializer';
import { debounce } from '../utils/debounce';

const debouncedSyncToUrl = debounce(syncToUrl, 300);

export function useFilterPersistence(): void {
  const dispatch = useAppDispatch();
  const activeFilters = useAppSelector(selectActiveFilters);
  const isHydrated = useRef(false);

  useEffect(() => {
    const fromUrl = deserializeFromUrl(window.location.search);
    if (Object.keys(fromUrl).length > 0) {
      dispatch(hydrateFilters(fromUrl));
      isHydrated.current = true;
      return;
    }

    const fromStorage = deserializeFromLocalStorage();
    if (fromStorage && Object.keys(fromStorage).length > 0) {
      dispatch(hydrateFilters(fromStorage));
      syncToUrl(fromStorage);
    }
    isHydrated.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated.current) return;
    debouncedSyncToUrl(activeFilters);
    syncToLocalStorage(activeFilters);
  }, [activeFilters]);
}
