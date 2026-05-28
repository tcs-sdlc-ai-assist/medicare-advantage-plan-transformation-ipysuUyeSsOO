import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

/**
 * Gamification.jsx
 * Gamification UI. Shows rewards, badges, leaderboards (mocked).
 */
function Gamification() {
  const { user } = useContext(AppContext);

  // Mocked badges
  const badges = [
    {
      id: 1,
      name: 'Wellness Champion',
      description: 'Completed annual wellness visit.',
      icon: '🏆',
      earned: true,
    },
    {
      id: 2,
      name: 'Engagement Star',
      description: 'Posted 5 times in the community feed.',
      icon: '⭐',
      earned: false,
    },
    {
      id: 3,
      name: 'Care Team Collaborator',
      description: 'Assigned a provider to your care team.',
      icon: '🤝',
      earned: true,
    },
    {
      id: 4,
      name: 'Prescription Pro',
      description: 'Refilled a prescription on time.',
      icon: '💊',
      earned: false,
    },
  ];

  // Mocked rewards
  const rewards = [
    {
      id: 1,
      name: 'Gift Card',
      description: '$10 gift card for completing wellness visit.',
      points: 100,
      claimed: true,
    },
    {
      id: 2,
      name: 'Fitness Tracker',
      description: 'Earn a fitness tracker for 500 points.',
      points: 500,
      claimed: false,
    },
    {
      id: 3,
      name: 'Healthy Meal Kit',
      description: 'Redeem for a meal kit at 300 points.',
      points: 300,
      claimed: false,
    },
  ];

  // Mocked leaderboard
  const leaderboard = [
    { rank: 1, name: 'Jane Smith', points: 620 },
    { rank: 2, name: 'John Doe', points: 580 },
    { rank: 3, name: 'Robert Lee', points: 470 },
    { rank: 4, name: user?.displayName || 'You', points: 350 },
    { rank: 5, name: 'Priya Patel', points: 320 },
  ];

  // Claim reward state
  const [claimingRewardId, setClaimingRewardId] = useState(null);
  const [claimError, setClaimError] = useState('');
  const [claimedRewards, setClaimedRewards] = useState(
    rewards.filter(r => r.claimed).map(r => r.id)
  );

  // Handle claim reward
  const handleClaimReward = async rewardId => {
    setClaimError('');
    setClaimingRewardId(rewardId);
    try {
      // Simulate async claim
      await new Promise(resolve => setTimeout(resolve, 700));
      if (claimedRewards.includes(rewardId)) {
        setClaimError('Reward already claimed.');
        setClaimingRewardId(null);
        return;
      }
      setClaimedRewards(prev => [...prev, rewardId]);
      setClaimingRewardId(null);
    } catch (err) {
      setClaimError('Failed to claim reward. Please try again.');
      setClaimingRewardId(null);
    }
  };

  // Calculate user points (mock: based on leaderboard)
  const userEntry = leaderboard.find(l => l.name === (user?.displayName || 'You'));
  const userPoints = userEntry ? userEntry.points : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Gamification & Rewards
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Your Points</h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-blue-600">{userPoints}</span>
            <span className="text-gray-600 text-sm">points</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Badges</h3>
          <div className="flex flex-wrap gap-4">
            {badges.map(badge => (
              <div
                key={badge.id}
                className={`flex flex-col items-center px-4 py-3 rounded shadow-sm ${
                  badge.earned
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-100 border border-gray-200 opacity-70'
                }`}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="font-semibold text-blue-700 mt-1 text-sm">{badge.name}</span>
                <span className="text-xs text-gray-600 mt-1">{badge.description}</span>
                <span className={`mt-2 text-xs font-semibold ${
                  badge.earned ? 'text-green-700' : 'text-gray-400'
                }`}>
                  {badge.earned ? 'Earned' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Rewards</h3>
          <ul className="divide-y divide-gray-200">
            {rewards.map(reward => (
              <li key={reward.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-blue-700">{reward.name}</div>
                  <div className="text-gray-700 text-xs">{reward.description}</div>
                  <div className="text-gray-500 text-xs">Points required: {reward.points}</div>
                </div>
                <div>
                  {claimedRewards.includes(reward.id) ? (
                    <span className="px-3 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                      Claimed
                    </span>
                  ) : userPoints >= reward.points ? (
                    <button
                      className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold text-xs transition-colors ${
                        claimingRewardId === reward.id
                          ? 'opacity-60 cursor-not-allowed'
                          : 'hover:bg-blue-700'
                      }`}
                      disabled={claimingRewardId === reward.id}
                      onClick={() => handleClaimReward(reward.id)}
                    >
                      {claimingRewardId === reward.id ? 'Claiming...' : 'Claim'}
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded bg-gray-200 text-gray-500 text-xs font-semibold">
                      Not enough points
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {claimError && (
            <div className="text-red-600 text-sm mt-2">{claimError}</div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Leaderboard</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Rank</th>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Name</th>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map(entry => (
                <tr
                  key={entry.rank}
                  className={`${
                    entry.name === (user?.displayName || 'You')
                      ? 'bg-blue-50'
                      : ''
                  }`}
                >
                  <td className="py-2 px-3 text-sm font-bold text-blue-700">{entry.rank}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{entry.name}</td>
                  <td className="py-2 px-3 text-sm text-gray-600">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Gamification.propTypes = {};

export default Gamification;