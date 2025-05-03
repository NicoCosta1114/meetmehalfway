import { mediaToCity } from '../data/mediaToCity';

export const matchDestinations = (users, destinations) => {
  return destinations
    .map(dest => {
      const matchScore = users.reduce((score, user) => {
        const interestMatch = dest.tags.filter(t => user.interests.includes(t)).length;
        const budgetFit = user.budget >= dest.avgPrice ? 1 : 0;
        const nightlifeBonus = user.nightlife && dest.tags.includes('Nightlife') ? 1 : 0;
        const envMatch = user.environment && dest.tags.includes(user.environment) ? 1 : 0;
        const explorerBonus = user.explorer && dest.isAlternative ? 1 : 0;

        const favorites = user.favorites.toLowerCase().split(/[,\n]+/).map(f => f.trim());
        let mediaBonus = 0;
        favorites.forEach(fav => {
          if (mediaToCity[fav] === dest.name) {
            mediaBonus += 2;
          }
        });

        return score
          + interestMatch * 2
          + budgetFit
          + nightlifeBonus
          + envMatch
          + explorerBonus
          + mediaBonus;
      }, 0);

      return { ...dest, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
};