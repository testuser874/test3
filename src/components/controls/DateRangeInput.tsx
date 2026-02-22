import styles from './DateRangeInput.module.css';

interface DateRangeInputProps {
  from: string | null;
  to: string | null;
  onChange: (from: string | null, to: string | null) => void;
}

export function DateRangeInput({ from, to, onChange }: DateRangeInputProps) {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label htmlFor="filter-date-from" className={styles.label}>
          From
        </label>
        <input
          type="date"
          id="filter-date-from"
          className={styles.input}
          value={from ?? ''}
          onChange={(e) => onChange(e.target.value || null, to)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="filter-date-to" className={styles.label}>
          To
        </label>
        <input
          type="date"
          id="filter-date-to"
          className={styles.input}
          value={to ?? ''}
          onChange={(e) => onChange(from, e.target.value || null)}
        />
      </div>
    </div>
  );
}
