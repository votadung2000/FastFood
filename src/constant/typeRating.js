const TYPE = {
  POSITIVE: {
    id: 1,
    name: 'Positive',
    stars: 5,
  },
  NEUTRAL_TO_POSITIVE: {
    id: 2,
    name: 'Neutral to Positive',
    stars: 4,
  },
  NEUTRAL: {
    id: 3,
    name: 'Neutral',
    stars: 3,
  },
  NEGATIVE: {
    id: 4,
    name: 'Negative',
    stars: 2,
  },
  VERY_NEGATIVE: {
    id: 5,
    name: 'Very Negative',
    stars: 1,
  },
};

export const DATA_TYPE_RATING = Object.values(TYPE);

export const findTypeRating = stars => {
  return DATA_TYPE_RATING.find(ele => ele?.stars === Math.floor(stars));
};

export default TYPE;
