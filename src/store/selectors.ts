import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Campaign } from '../types';
import { formatDateNumeric } from '../utils/formatDate';

const selectAllCampaigns = (state: RootState) => state.campaigns.items;
const selectActiveFilters = (state: RootState) => state.filters.active;
const selectFilterDefinitions = (state: RootState) => state.filters.definitions;

export { selectAllCampaigns, selectActiveFilters, selectFilterDefinitions };

export const selectFilteredCampaigns = createSelector(
  [selectAllCampaigns, selectActiveFilters],
  (campaigns, filters): Campaign[] => {
    const filterEntries = Object.entries(filters);
    if (filterEntries.length === 0) return campaigns;

    return campaigns.filter((campaign) =>
      filterEntries.every(([filterId, values]) => {
        if (values.length === 0) return true;

        switch (filterId) {
          case 'search':
            return campaign.title
              .toLowerCase()
              .includes(values[0].toLowerCase());

          case 'type':
            return values.includes(campaign.type);

          case 'status':
            return values.includes(campaign.status);

          case 'pillar':
            return values.includes(campaign.pillar);

          case 'department':
            return values.includes(campaign.department);

          case 'dateRange': {
            const [from, to] = values;
            const created = campaign.createdAt;
            if (from && created < from) return false;
            if (to && created > to) return false;
            return true;
          }

          default:
            return true;
        }
      }),
    );
  },
);

export const selectActiveFilterBadges = createSelector(
  [selectActiveFilters, selectFilterDefinitions],
  (active, definitions) => {
    const badges: { filterId: string; value: string; label: string }[] = [];

    for (const [filterId, values] of Object.entries(active)) {
      if (values.length === 0) continue;

      const definition = definitions.find((d) => d.id === filterId);

      if (filterId === 'search') {
        badges.push({ filterId, value: values[0], label: `"${values[0]}"` });
        continue;
      }

      if (filterId === 'dateRange') {
        const [from, to] = values;
        const parts: string[] = [];
        if (from) parts.push(`From ${formatDateNumeric(from)}`);
        if (to) parts.push(`To ${formatDateNumeric(to)}`);
        if (parts.length > 0) {
          const label = parts.join(' — ');
          badges.push({ filterId, value: 'dateRange', label });
        }
        continue;
      }

      for (const value of values) {
        const option = definition?.options?.find((o) => o.value === value);
        const label = option?.label ?? value;
        badges.push({ filterId, value, label });
      }
    }

    return badges;
  },
);
