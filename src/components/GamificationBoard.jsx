import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * GamificationBoard.jsx
 * Displays rewards, badges, leaderboards (mocked).
 * Used in Gamification page.
 * @param {Object} props
 * @param {Array<Object>} props.badges - Array of badge objects.
 * @param {Array<Object>} props.rewards - Array of reward objects.
 * @param {Array<Object>} props.leaderboard - Array of leaderboard entries.
 * @param {number} props.userPoints - Current user's points.
 * @param {Array<number>} props.claimedRewards - Array of claimed reward IDs.
 * @param {Function} props.onClaimReward - Handler for claiming a reward (rewardId).
 * @param {number} props.claimingRewardId - Currently claiming reward ID.
 * @param {string} props.claimError - Error message for claiming reward.
 */
function GamificationBoard({
  badges = [],
  rewards = [],
  leaderboard = [],
  userPoints = 0,
  claimedRewards = [],
  onClaimReward,
  claimingRewardId = null,
  claimError = '',
}) {
  return (
    <div>
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
          {badges.length === 0 ? (
            <span className="text-gray-500 text-sm">No badges yet.</span>
          ) : (
            badges.map(badge => (
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
            ))
          )}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Rewards</h3>
        <ul className="divide-y divide-gray-200">
          {rewards.length === 0 ? (
            <li className="text-gray-500 text-sm py-3">No rewards available.</li>
          ) : (
            rewards.map(reward => (
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
                      onClick={() => typeof onClaimReward === 'function' && onClaimReward(reward.id)}
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
            ))
          )}
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
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500 text-sm">
                  No leaderboard data.
                </td>
              </tr>
            ) : (
              leaderboard.map(entry => (
                <tr
                  key={entry.rank}
                  className={`${
                    entry.isCurrentUser ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="py-2 px-3 text-sm font-bold text-blue-700">{entry.rank}</td>
                  <td className="py-2 px-3 text-sm text-gray-700">{entry.name}</td>
                  <td className="py-2 px-3 text-sm text-gray-600">{entry.points}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-gray-500 text-xs">
        Gamification data is simulated for demonstration purposes. No real rewards or points are distributed.
      </div>
    </div>
  );
}

GamificationBoard.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      earned: PropTypes.bool.isRequired,
    })
  ),
  rewards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      claimed: PropTypes.bool,
    })
  ),
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      isCurrentUser: PropTypes.bool,
    })
  ),
  userPoints: PropTypes.number,
  claimedRewards: PropTypes.arrayOf(PropTypes.number),
  onClaimReward: PropTypes.func,
  claimingRewardId: PropTypes.number,
  claimError: PropTypes.string,
};

export default GamificationBoard;