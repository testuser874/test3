import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '../../utils/debounce';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedOnChange = useRef(debounce(onChange, 300));

  // Sync local state when external value changes (e.g. hydration, clear all)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setLocalValue(next);
    debouncedOnChange.current(next);
  }, []);

  function handleClear() {
    setLocalValue('');
    onChange('');
  }

  return (
    <div className={styles.container}>
      <Search className={styles.icon} size={16} aria-hidden="true" />
      <input
        type="text"
        className={styles.input}
        placeholder="Search campaigns…"
        value={localValue}
        onChange={handleChange}
        aria-label="Search campaigns"
      />
      {localValue && (
        <button
          type="button"
          className={styles.clear}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
