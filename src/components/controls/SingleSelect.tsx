import type { FilterOption } from '../../types';
import styles from './SingleSelect.module.css';

interface SingleSelectProps {
  filterId: string;
  options: FilterOption[];
  selected: string | null;
  onChange: (value: string | null) => void;
}

export function SingleSelect({
  filterId,
  options,
  selected,
  onChange,
}: SingleSelectProps) {
  function handleChange(value: string) {
    onChange(value === selected ? null : value);
  }

  const groupName = `filter-${filterId}`;

  return (
    <ul className={styles.list} role="radiogroup">
      <li className={styles.option}>
        <input
          type="radio"
          id={`${groupName}-all`}
          name={groupName}
          className={styles.radio}
          checked={selected === null}
          onChange={() => onChange(null)}
        />
        <label htmlFor={`${groupName}-all`} className={styles.label}>
          All
        </label>
      </li>
      {options.map((option) => {
        const id = `${groupName}-${option.value}`;
        return (
          <li key={option.value} className={styles.option}>
            <input
              type="radio"
              id={id}
              name={groupName}
              className={styles.radio}
              checked={selected === option.value}
              onChange={() => handleChange(option.value)}
            />
            <label htmlFor={id} className={styles.label}>
              {option.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
}
