import type { FilterDefinition } from '../types';
import departmentsData from './data/departments.json';

const SIMULATED_DELAY = 300;

export async function fetchFilterDefinitions(): Promise<FilterDefinition[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  return [
    {
      id: 'search',
      label: 'Search',
      type: 'search',
    },
    {
      id: 'type',
      label: 'Campaign Type',
      type: 'multi-select',
      options: [
        { value: 'pulse', label: 'Pulse' },
        { value: 'engagement', label: 'Engagement' },
        { value: 'barometer', label: 'Barometer' },
        { value: 'custom', label: 'Custom' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      type: 'multi-select',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'active', label: 'Active' },
        { value: 'closed', label: 'Closed' },
        { value: 'archived', label: 'Archived' },
      ],
    },
    {
      id: 'pillar',
      label: 'Pillar',
      type: 'single-select',
      options: [
        { value: 'listen', label: 'Listen' },
        { value: 'perform', label: 'Perform' },
        { value: 'share', label: 'Share' },
        { value: 'lead', label: 'Lead' },
      ],
    },
    {
      id: 'department',
      label: 'Department',
      type: 'multi-select',
      options: departmentsData.map((dept) => ({
        value: dept.id,
        label: dept.name,
      })),
    },
    {
      id: 'dateRange',
      label: 'Date Range',
      type: 'date-range',
    },
  ];
}
