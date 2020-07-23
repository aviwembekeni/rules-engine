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
  // 4: Filter Check matching item (id=1) in array value > threshold
  {
    portfolios: [
      { id: 1, value: 100, threshold: 50 },
      { id: 2, value: 100, threshold: 50 },
      { id: 3, value: 100, threshold: 50 },
    ],
  },
];
export default testScenarios;
