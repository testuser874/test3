export type CampaignType = 'pulse' | 'engagement' | 'barometer' | 'custom';
export type CampaignStatus = 'draft' | 'active' | 'closed' | 'archived';
export type Pillar = 'listen' | 'perform' | 'share' | 'lead';

export interface Campaign {
  id: string;
  title: string;
  type: CampaignType;
  status: CampaignStatus;
  pillar: Pillar;
  department: string;
  departmentName: string;
  respondents: number;
  responseRate: number;
  createdAt: string;
  closedAt: string | null;
  isAnonymous: boolean;
  tags: string[];
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterDefinition {
  id: string;
  label: string;
  type: 'multi-select' | 'single-select' | 'date-range' | 'search';
  options?: FilterOption[];
}

export type ActiveFilters = Record<string, string[]>;
