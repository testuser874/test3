import { useAppSelector } from '../../store/hooks';
import { selectFilteredCampaigns } from '../../store/selectors';
import { CampaignCard } from '../CampaignCard/CampaignCard';
import styles from './CampaignList.module.css';

export function CampaignList() {
  const campaigns = useAppSelector(selectFilteredCampaigns);
  const loading = useAppSelector((state) => state.campaigns.loading);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <span>Loading campaigns…</span>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return null; // EmptyState component will handle this (task 19)
  }

  return (
    <div>
      <p className={styles.count}>
        {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}
      </p>
      <div className={styles.grid}>
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
