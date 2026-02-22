import type { CampaignStatus } from '../../types';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: CampaignStatus;
}

const statusLabels: Record<CampaignStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  closed: 'Closed',
  archived: 'Archived',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
