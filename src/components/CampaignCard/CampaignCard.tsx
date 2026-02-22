import type { Campaign } from '../../types';
import { formatDateReadable } from '../../utils/formatDate';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import styles from './CampaignCard.module.css';

interface CampaignCardProps {
  campaign: Campaign;
}

const pillarLabels: Record<string, string> = {
  listen: 'Listen',
  perform: 'Perform',
  share: 'Share',
  lead: 'Lead',
};

const typeLabels: Record<string, string> = {
  pulse: 'Pulse',
  engagement: 'Engagement',
  barometer: 'Barometer',
  custom: 'Custom',
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const responsePercent = Math.round(campaign.responseRate * 100);

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={`${styles.typeBadge} ${styles[campaign.type]}`}>
          {typeLabels[campaign.type]}
        </span>
        <StatusBadge status={campaign.status} />
      </div>

      <h3 className={styles.title}>{campaign.title}</h3>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          {pillarLabels[campaign.pillar]}
        </span>
        <span className={styles.separator} aria-hidden="true">·</span>
        <span className={styles.metaItem}>{campaign.departmentName}</span>
        {campaign.isAnonymous && (
          <>
            <span className={styles.separator} aria-hidden="true">·</span>
            <span className={styles.anonymous}>Anonymous</span>
          </>
        )}
      </div>

      <div className={styles.stats}>
        <div className={styles.responseRate}>
          <div className={styles.rateHeader}>
            <span className={styles.rateLabel}>Response rate</span>
            <span className={styles.rateValue}>{responsePercent}%</span>
          </div>
          <div className={styles.rateBar}>
            <div
              className={styles.rateFill}
              style={{ width: `${responsePercent}%` }}
            />
          </div>
        </div>
        <span className={styles.respondents}>
          {campaign.respondents} respondents
        </span>
      </div>

      <div className={styles.dates}>
        <span>Created {formatDateReadable(campaign.createdAt)}</span>
        {campaign.closedAt && (
          <span>Closed {formatDateReadable(campaign.closedAt)}</span>
        )}
      </div>
    </article>
  );
}
