export interface RewardCalculationResult {
  rewardAmount: number;
  calculationDetails: string;
  breakdown: {
    baseReward: number;
    cpmReward: number;
    milestoneBonus: number;
    capApplied: boolean;
  };
}

export interface CampaignRewardConfig {
  rewardModel: 'CPM' | 'FIXED' | 'MILESTONE' | 'HYBRID' | string;
  rewardPerClip: number;       // For FIXED & HYBRID base ($)
  cpmRate: number;             // For CPM & HYBRID ($ per 1,000 views, default $0.50)
  milestoneRulesJson?: string | null;
  maxRewardPerClip: number;    // Cap per single video submission ($)
  remainingBudget: number;     // Campaign remaining balance ($)
}

/**
 * Calculates earnings for a submission based on verified views and campaign reward rules.
 * Default platform rate: $0.50 CPM ($0.50 per 1,000 verified views).
 */
export function calculateSubmissionReward(
  config: CampaignRewardConfig,
  verifiedViews: number
): RewardCalculationResult {
  let reward = 0;
  let baseReward = 0;
  let cpmReward = 0;
  let milestoneBonus = 0;
  let calculationDetails = '';

  const model = (config.rewardModel || 'CPM').toUpperCase();
  const cpmRate = config.cpmRate > 0 ? config.cpmRate : 0.5;

  switch (model) {
    case 'FIXED':
      baseReward = config.rewardPerClip || 10;
      reward = baseReward;
      calculationDetails = `Fixed reward: $${baseReward.toFixed(2)} on approval`;
      break;

    case 'CPM':
    default:
      // Model B: CPM based on verified views: (Views / 1000) * CPM Rate ($0.50 CPM)
      cpmReward = Number(((verifiedViews / 1000) * cpmRate).toFixed(2));
      reward = cpmReward;
      calculationDetails = `CPM reward: (${verifiedViews.toLocaleString()} views / 1,000) × $${cpmRate.toFixed(2)} = $${cpmReward.toFixed(2)}`;
      break;

    case 'MILESTONE':
      try {
        const milestones: Array<{ views: number; reward: number }> = config.milestoneRulesJson
          ? JSON.parse(config.milestoneRulesJson)
          : [
              { views: 10000, reward: 5 },
              { views: 50000, reward: 25 },
              { views: 100000, reward: 50 },
              { views: 500000, reward: 250 },
              { views: 1000000, reward: 500 },
            ];

        for (const m of milestones.sort((a, b) => b.views - a.views)) {
          if (verifiedViews >= m.views) {
            milestoneBonus = m.reward;
            calculationDetails = `Milestone achieved: ${m.views.toLocaleString()}+ views tier earned $${m.reward.toFixed(2)}`;
            break;
          }
        }
        reward = milestoneBonus;
        if (!calculationDetails) {
          calculationDetails = `Minimum milestone not reached yet (Requires ${milestones[0]?.views.toLocaleString() || 10000} views)`;
        }
      } catch {
        reward = 0;
        calculationDetails = 'Milestone parsing error';
      }
      break;

    case 'HYBRID':
      baseReward = config.rewardPerClip || 5;
      cpmReward = Number(((verifiedViews / 1000) * cpmRate).toFixed(2));
      reward = Number((baseReward + cpmReward).toFixed(2));
      calculationDetails = `Hybrid: Base $${baseReward.toFixed(2)} + (${verifiedViews.toLocaleString()} views / 1,000 × $${cpmRate.toFixed(2)}) = $${reward.toFixed(2)}`;
      break;
  }

  // Enforce Max Cap per clip
  let capApplied = false;
  if (config.maxRewardPerClip > 0 && reward > config.maxRewardPerClip) {
    reward = config.maxRewardPerClip;
    capApplied = true;
    calculationDetails += ` (Capped at maximum limit of $${config.maxRewardPerClip.toFixed(2)})`;
  }

  // Enforce remaining campaign budget limit
  if (config.remainingBudget !== undefined && reward > config.remainingBudget) {
    reward = Math.max(0, config.remainingBudget);
    calculationDetails += ` (Restricted by remaining campaign budget of $${reward.toFixed(2)})`;
  }

  return {
    rewardAmount: Math.max(0, Number(reward.toFixed(2))),
    calculationDetails,
    breakdown: {
      baseReward,
      cpmReward,
      milestoneBonus,
      capApplied,
    },
  };
}
