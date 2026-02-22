import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectActiveFilterBadges } from '../../store/selectors';
import { removeFilter, clearAllFilters, togglePanel } from '../../store/filtersSlice';
import { FilterBadge } from '../FilterBadge/FilterBadge';
import styles from './Header.module.css';

export function Header() {
  const dispatch = useAppDispatch();
  const badges = useAppSelector(selectActiveFilterBadges);
  const badgeCount = badges.length;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>Survey Campaigns</h1>
      </div>

      <div className={styles.badges}>
        {badges.map((badge) => (
          <FilterBadge
            key={`${badge.filterId}-${badge.value}`}
            label={badge.label}
            onRemove={() =>
              dispatch(removeFilter({ filterId: badge.filterId, value: badge.value }))
            }
          />
        ))}
        {badgeCount > 0 && (
          <button
            className={styles.clearAll}
            onClick={() => dispatch(clearAllFilters())}
          >
            Clear all
          </button>
        )}
      </div>

      <button
        className={styles.filterToggle}
        onClick={() => dispatch(togglePanel())}
        aria-label="Toggle filter panel"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filters
        {badgeCount > 0 && (
          <span className={styles.badgeCount}>{badgeCount}</span>
        )}
      </button>
    </header>
  );
}
