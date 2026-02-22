import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Campaign } from '../types';
import { fetchCampaigns as fetchCampaignsApi } from '../api/campaigns';

interface CampaignsState {
  items: Campaign[];
  loading: boolean;
  error: string | null;
}

const initialState: CampaignsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async () => {
    return await fetchCampaignsApi();
  },
);

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch campaigns';
      });
  },
});

export default campaignsSlice.reducer;
