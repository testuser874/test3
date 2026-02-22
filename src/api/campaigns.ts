import type { Campaign } from '../types';
import campaignsData from './data/campaigns.json';

const SIMULATED_DELAY = 400;

export async function fetchCampaigns(): Promise<Campaign[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return campaignsData as Campaign[];
}
