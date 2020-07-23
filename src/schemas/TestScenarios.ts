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
          { id: 1, value: 100, threshold: 50 },
          { id: 2, value: 100, threshold: 500 },
        ],
      },
      {
        id: 2,
        accounts: [
          { id: 21, value: 100, threshold: 50 },
          { id: 22, value: 100, threshold: 500 },
        ],
      },
    ],
  },
];
export default testScenarios;
