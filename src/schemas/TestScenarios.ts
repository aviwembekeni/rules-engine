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
  { id: 1, name: 'Account1', value: 100 },
];
export default testScenarios;
