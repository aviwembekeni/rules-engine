const testScenarios = [
  // 0: Compare value > hard-coded amount e.g. > 50
  { value: 100 },
  // 1: Compare value > threshold
  { value: 100, threshold: 50 },
  // 2: Simple nesting selection value > threshold
  { portfolio: { value: 100, threshold: 50 } },
  // 3: Check all items in array value > threshold
  {
    portfolios: [
      { value: 100, threshold: 50 },
      { value: 100, threshold: 50 },
      { value: 100, threshold: 5000 },
    ],
  },
  // 4: Array Filter matching (id=1) value > threshold
  {
    portfolios: [
      { id: 1, value: 100, threshold: 50 },
      { id: 2, value: 100, threshold: 50 },
      { id: 3, value: 100, threshold: 50 },
    ],
  },
  // 5: Array-in-Array with filters
  {
    portfolios: [
      {
        id: 1,
        accounts: [
          { id: 11, value: 100, threshold: 50 },
          { id: 22, value: 100, threshold: 500 },
        ],
      },
      {
        id: 2,
        accounts: [
          { id: 33, value: 100, threshold: 50 },
          { id: 44, value: 100, threshold: 500 },
        ],
      },
    ],
  },
  // 6: Compare two account values
  {
    portfolios: [
      {
        id: 1,
        accounts: [
          { id: 11, value: 500 },
          { id: 22, value: 50 },
        ],
      },
      {
        id: 2,
        accounts: [
          { id: 33, value: 50 },
          { id: 44, value: 500 },
        ],
      },
    ],
  },
  // 7. Portfolio accounts sum
  {
    portfolios: [
      {
        id: 1,
        accounts: [
          { id: 11, value: 500 },
          { id: 22, value: 50 },
        ],
      },
      {
        id: 2,
        accounts: [
          { id: 33, value: 50 },
          { id: 44, value: 500 },
        ],
      },
    ],
  },
  // 8. Account value is larger than a percentage (25% in this example) of portfolio total
  {
    portfolios: [
      {
        id: 1,
        accounts: [
          { id: 11, value: 500 },
          { id: 22, value: 50 },
          { id: 44, value: 900 },
        ],
      },
      {
        id: 2,
        accounts: [
          { id: 33, value: 50 },
          { id: 44, value: 500 },
        ],
      },
    ],
  },
  // 9. Summing of portfolio accounts by tag
  {
    portfolios: [
      {
        id: 1,
        accounts: [
          { id: 11, value: 500, tags: ['crypto'] },
          { id: 22, value: 50, tags: ['etfs'] },
          { id: 44, value: 900, tags: ['crypto'] },
        ],
      },
      {
        id: 2,
        accounts: [
          { id: 33, value: 50 },
          { id: 44, value: 500 },
        ],
      },
    ],
  },
];
export default testScenarios;
