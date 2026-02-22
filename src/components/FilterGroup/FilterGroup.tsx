import type { FilterDefinition } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { setFilter } from '../../store/filtersSlice';
import { MultiSelect } from '../controls/MultiSelect';
import { SingleSelect } from '../controls/SingleSelect';
import { DateRangeInput } from '../controls/DateRangeInput';
import { SearchInput } from '../controls/SearchInput';
import styles from './FilterGroup.module.css';

interface FilterGroupProps {
  definition: FilterDefinition;
  activeValues: string[];
}

export function FilterGroup({ definition, activeValues }: FilterGroupProps) {
  const dispatch = useAppDispatch();

  function handleMultiChange(values: string[]) {
    dispatch(setFilter({ filterId: definition.id, values }));
  }

  function handleSingleChange(value: string | null) {
    dispatch(setFilter({ filterId: definition.id, values: value ? [value] : [] }));
  }

  function handleDateRangeChange(from: string | null, to: string | null) {
    const values = [from ?? '', to ?? ''].filter(Boolean);
    dispatch(setFilter({ filterId: definition.id, values }));
  }

  function handleSearchChange(value: string) {
    dispatch(setFilter({ filterId: definition.id, values: value ? [value] : [] }));
  }

  function renderControl() {
    switch (definition.type) {
      case 'multi-select':
        return (
          <MultiSelect
            options={definition.options ?? []}
            selected={activeValues}
            onChange={handleMultiChange}
          />
        );
      case 'single-select':
        return (
          <SingleSelect
            filterId={definition.id}
            options={definition.options ?? []}
            selected={activeValues[0] ?? null}
            onChange={handleSingleChange}
          />
        );
      case 'date-range':
        return (
          <DateRangeInput
            from={activeValues[0] ?? null}
            to={activeValues[1] ?? null}
            onChange={handleDateRangeChange}
          />
        );
      case 'search':
        return (
          <SearchInput
            value={activeValues[0] ?? ''}
            onChange={handleSearchChange}
          />
        );
    }
  }

  return (
    <div className={styles.group}>
      <h3 className={styles.label}>{definition.label}</h3>
      {renderControl()}
    </div>
  );
}
