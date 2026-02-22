import { useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectFilterDefinitions, selectActiveFilters } from '../../store/selectors';
import { closePanel } from '../../store/filtersSlice';
import { useClickOutside } from '../../hooks/useClickOutside';
import { FilterGroup } from '../FilterGroup/FilterGroup';
import styles from './SidePanel.module.css';

export function SidePanel() {
  const dispatch = useAppDispatch();
  const isPanelOpen = useAppSelector((state) => state.filters.isPanelOpen);
  const definitions = useAppSelector(selectFilterDefinitions);
  const activeFilters = useAppSelector(selectActiveFilters);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    dispatch(closePanel());
  }, [dispatch]);

  useClickOutside(panelRef, () => {
    if (isPanelOpen) handleClose();
  });

  // Focus management: focus the close button when panel opens
  useEffect(() => {
    if (isPanelOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isPanelOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isPanelOpen) {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, handleClose]);

  return (
    <div
      ref={panelRef}
      className={`${styles.panel} ${isPanelOpen ? styles.open : ''}`}
      role="dialog"
      aria-label="Filter panel"
      aria-hidden={!isPanelOpen}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close filter panel"
          tabIndex={isPanelOpen ? 0 : -1}
        >
          <X size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.content}>
        {definitions.map((definition) => (
          <FilterGroup
            key={definition.id}
            definition={definition}
            activeValues={activeFilters[definition.id] ?? []}
          />
        ))}
      </div>
    </div>
  );
}
