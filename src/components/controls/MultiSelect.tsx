import type { FilterOption } from '../../types';
import styles from './MultiSelect.module.css';

interface MultiSelectProps {
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
  function handleToggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <ul className={styles.list} role="group">
      {options.map((option) => {
        const isChecked = selected.includes(option.value);
        const id = `filter-option-${option.value}`;

        return (
          <li key={option.value} className={styles.option}>
            <input
              type="checkbox"
              id={id}
              className={styles.checkbox}
              checked={isChecked}
              onChange={() => handleToggle(option.value)}
            />
            <label htmlFor={id} className={styles.label}>
              {option.label}
            </label>
            {option.count != null && (
              <span className={styles.count}>({option.count})</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
