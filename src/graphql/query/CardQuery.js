export const getCardsQuery = (slg) => {
  return `{
  cards(slugs: ${JSON.stringify(slg)}) {
      id,
  name,
      slug,
  rarity,
      player {
          displayName,
          pictureUrl,
          country {
            code
          }
      },
  season {
      name
  }
  team
    {
    ... on TeamInterface {
      name,
            pictureUrl
    }
  },
  shirtNumber,
  age,
  position
  }
}`;
};