import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FilterDefinition, ActiveFilters } from '../types';
import { fetchFilterDefinitions as fetchFilterDefinitionsApi } from '../api/filters';

interface FiltersState {
  definitions: FilterDefinition[];
  active: ActiveFilters;
  isPanelOpen: boolean;
  definitionsLoading: boolean;
}

const initialState: FiltersState = {
  definitions: [],
  active: {},
  isPanelOpen: false,
  definitionsLoading: false,
};

export const fetchFilterDefinitions = createAsyncThunk(
  'filters/fetchFilterDefinitions',
  async () => {
    return await fetchFilterDefinitionsApi();
  },
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<{ filterId: string; values: string[] }>,
    ) {
      const { filterId, values } = action.payload;
      if (values.length === 0) {
        delete state.active[filterId];
      } else {
        state.active[filterId] = values;
      }
    },
    removeFilter(
      state,
      action: PayloadAction<{ filterId: string; value: string }>,
    ) {
      const { filterId, value } = action.payload;
      const current = state.active[filterId];
      if (!current) return;
      const next = current.filter((v) => v !== value);
      if (next.length === 0) {
        delete state.active[filterId];
      } else {
        state.active[filterId] = next;
      }
    },
    clearAllFilters(state) {
      state.active = {};
    },
    hydrateFilters(state, action: PayloadAction<ActiveFilters>) {
      state.active = action.payload;
    },
    togglePanel(state) {
      state.isPanelOpen = !state.isPanelOpen;
    },
    closePanel(state) {
      state.isPanelOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterDefinitions.pending, (state) => {
        state.definitionsLoading = true;
      })
      .addCase(fetchFilterDefinitions.fulfilled, (state, action) => {
        state.definitionsLoading = false;
        state.definitions = action.payload;
      })
      .addCase(fetchFilterDefinitions.rejected, (state) => {
        state.definitionsLoading = false;
      });
  },
});

export const {
  setFilter,
  removeFilter,
  clearAllFilters,
  hydrateFilters,
  togglePanel,
  closePanel,
} = filtersSlice.actions;

export default filtersSlice.reducer;
