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
  rewardPerClip: number;       // For FIXED & HYBRID base
  cpmRate: number;             // For CPM & HYBRID (₹ per 1,000 views)
  milestoneRulesJson?: string | null;
  maxRewardPerClip: number;    // Cap per single video submission
  remainingBudget: number;     // Campaign remaining balance
}

/**
 * Calculates earnings for a submission based on verified views and campaign reward rules.
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

  const model = config.rewardModel.toUpperCase();

  switch (model) {
    case 'FIXED':
      // Model A: Fixed bounty per approved clip
      baseReward = config.rewardPerClip;
      reward = baseReward;
      calculationDetails = `Fixed reward: ₹${baseReward.toLocaleString('en-IN')} on approval`;
      break;

    case 'CPM':
      // Model B: CPM based on verified views: (Views / 1000) * CPM Rate
      cpmReward = Math.floor((verifiedViews / 1000) * config.cpmRate);
      reward = cpmReward;
      calculationDetails = `CPM reward: (${verifiedViews.toLocaleString()} views / 1,000) × ₹${config.cpmRate} = ₹${cpmReward.toLocaleString('en-IN')}`;
      break;

    case 'MILESTONE':
      // Model C: Tiered milestone bonuses
      try {
        const milestones: Array<{ views: number; reward: number }> = config.milestoneRulesJson
          ? JSON.parse(config.milestoneRulesJson)
          : [
              { views: 10000, reward: 200 },
              { views: 50000, reward: 800 },
              { views: 100000, reward: 2000 },
              { views: 500000, reward: 8000 },
              { views: 1000000, reward: 20000 },
            ];

        // Find highest achieved milestone
        for (const m of milestones.sort((a, b) => b.views - a.views)) {
          if (verifiedViews >= m.views) {
            milestoneBonus = m.reward;
            calculationDetails = `Milestone achieved: ${m.views.toLocaleString()}+ views tier earned ₹${m.reward.toLocaleString('en-IN')}`;
            break;
          }
        }
        reward = milestoneBonus;
        if (!calculationDetails) {
          calculationDetails = `Minimum milestone not reached yet (Requires ${milestones[0]?.views.toLocaleString() || 10000} views)`;
        }
      } catch (err) {
        reward = 0;
        calculationDetails = 'Milestone parsing error';
      }
      break;

    case 'HYBRID':
    default:
      // Model D: Fixed base bounty + CPM performance bonus
      baseReward = config.rewardPerClip;
      cpmReward = Math.floor((verifiedViews / 1000) * config.cpmRate);
      reward = baseReward + cpmReward;
      calculationDetails = `Hybrid: Base ₹${baseReward} + (${verifiedViews.toLocaleString()} views / 1,000 × ₹${config.cpmRate}) = ₹${reward.toLocaleString('en-IN')}`;
      break;
  }

  // Enforce Max Cap per clip
  let capApplied = false;
  if (config.maxRewardPerClip > 0 && reward > config.maxRewardPerClip) {
    reward = config.maxRewardPerClip;
    capApplied = true;
    calculationDetails += ` (Capped at maximum limit of ₹${config.maxRewardPerClip.toLocaleString('en-IN')})`;
  }

  // Enforce remaining campaign budget limit
  if (reward > config.remainingBudget) {
    reward = Math.max(0, config.remainingBudget);
    calculationDetails += ` (Restricted by remaining campaign budget of ₹${reward.toLocaleString('en-IN')})`;
  }

  return {
    rewardAmount: Math.max(0, reward),
    calculationDetails,
    breakdown: {
      baseReward,
      cpmReward,
      milestoneBonus,
      capApplied,
    },
  };
}
