import { Engine } from 'json-rules-engine';
import testScenarios from './TestScenarios';
import { Portfolio } from '../models/Portfolio.model';

describe('Engine Tests', (): void => {
  it('0: Compare value > hard-coded amount e.g. > 50', async (): Promise<void> => {
    const engine = new Engine();
    const data = testScenarios[0];
    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'value',
                operator: 'greaterThanInclusive',
                value: 50,
              },
            ],
          },
        ],
      },
      event: {
        type: 'thresholdReached',
        params: {
          message: 'Triggered',
        },
      },
    });
    const results = await engine.run(data);
    expect(results.events.length).toBe(1);
    const singleEvent = results.events[0];
    if (singleEvent.params) {
      expect(singleEvent.params.message).toBe('Triggered');
    }
  });

  it('1: Compare value > threshold', async (): Promise<void> => {
    const engine = new Engine();
    const data = testScenarios[1];
    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'value',
                operator: 'greaterThanInclusive',
                value: { fact: 'threshold' },
              },
            ],
          },
        ],
      },
      event: {
        type: 'thresholdReached',
        params: {
          message: 'Triggered',
        },
      },
    });
    const results = await engine.run(data);
    expect(results.events.length).toBe(1);
    const singleEvent = results.events[0];
    if (singleEvent.params) {
      expect(singleEvent.params.message).toBe('Triggered');
    }
  });

  it('2: Simple nesting selection value > threshold', async (): Promise<void> => {
    const engine = new Engine();
    const data = testScenarios[2];
    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'portfolio',
                operator: 'greaterThanInclusive',
                path: '$.value',
                value: { fact: 'portfolio', path: '$.threshold' },
              },
            ],
          },
        ],
      },
      event: {
        type: 'thresholdReached',
        params: {
          message: 'Triggered',
        },
      },
    });
    const results = await engine.run(data);
    expect(results.events.length).toBe(1);
    const singleEvent = results.events[0];
    if (singleEvent.params) {
      expect(singleEvent.params.message).toBe('Triggered');
    }
  });

  // it('3: Check all items in array value > threshold', async (): Promise<void> => {
  // const engine = new Engine();
  // const data = testScenarios[3];

  // engine.addFact('account', (params, almanac) => {
  //   return almanac.factValue('portfolios').then(portfolios => {
  //     const typedPortyfolios = portfolios as Portfolio[];
  //     const portfolio = typedPortyfolios.find(portfolio => portfolio.id == params.portfolioId) as Portfolio;
  //     return portfolio.accounts?.find(account => account?.id == params.id);
  //   });
  // });

  // engine.addRule({
  //   conditions: {
  //     any: [
  //       {
  //         all: [
  //           {
  //             fact: 'account',
  //             params: {
  //               portfolioId: 1,
  //               id: 1,
  //             },
  //             path: '$.value',
  //             operator: 'lessThanInclusive',
  //             value: {
  //               fact: 'account',
  //               params: {
  //                 portfolioId: 1,
  //                 id: 2,
  //               },
  //               path: '$.value',
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   event: {
  //     type: 'thresholdReached',
  //     params: {
  //       message: 'Triggered',
  //     },
  //   },
  // });
  // Check all portfolios against their thresholds.
  // { portfolios: [ { id: 1, value: 100, threshold: 50}, { id: 2, value: 100, threshold: 50}, { id: 2, value: 100, threshold: 5000} ]}
  //   expect('This to be implemented').toBe('');
  // });

  // it('4: Array Filter matching (id=1) value > threshold', async (): Promise<void> => {
  //   // Check portfolio id 1 against its threshold. Ignore portfolio 2
  //   // { portfolios: [ { id: 1, value: 100, threshold: 50}, { id: 2, value: 100, threshold: 50} ]}
  //   expect('This to be implemented').toBe('');
  // });

  // it('5: Should allow accessing account within portfolio', async (): Promise<void> => {
  //   // Check account id 1 against threshold
  //   // { portfolios: [ { id: 1, value: 100, accounts: [id: 1, value: 100, threshold: 50] } ]}
  //   expect('This to be implemented').toBe('');
  // });

  it('6: Should allow 2 account comparisson', async (): Promise<void> => {
    // Compare portfolio 1 with portfolio 2:
    // {
    // portfolios: [
    //     {
    //       id: 1,
    //       accounts: [
    //         { id: 1, value: 70 },
    //         { id: 2, value: 50 },
    //       ],
    //     },
    //     {
    //       id: 2,
    //       accounts: [
    //         { id: 33, value: 50 },
    //         { id: 44, value: 500 },
    //       ],
    //     },
    //   ],
    // },

    const engine = new Engine();
    const data = testScenarios[5];

    engine.addFact('account', (params, almanac) => {
      return almanac.factValue('portfolios').then(portfolios => {
        const typedPortyfolios = portfolios as Portfolio[];
        const portfolio = typedPortyfolios.find(portfolio => portfolio.id == params.portfolioId) as Portfolio;
        const account = portfolio.accounts?.find(account => account?.id == params.id);
        return account;
      });
    });

    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'account',
                params: {
                  portfolioId: 1,
                  id: 11,
                },
                path: '$.value',
                operator: 'greaterThanInclusive',
                value: {
                  fact: 'account',
                  params: {
                    portfolioId: 1,
                    id: 22,
                  },
                  path: '$.value',
                },
              },
            ],
          },
        ],
      },
      event: {
        type: 'thresholdReached',
        params: {
          message: 'Triggered',
        },
      },
    });

    const results = await engine.run(data);
    expect(results.events.length).toBe(1);
    const singleEvent = results.events[0];
    if (singleEvent.params) {
      expect(singleEvent.params.message).toBe('Triggered');
    }
  });

  // it('7: Should allow named portfolio comparisson', async (): Promise<void> => {
  //   // Compare portfolio 1 with portfolio 2:
  //   // { portfolios: [ { id: 1, value: 100 }, { id: 2, value: 200 } ]}
  //   expect('This to be implemented').toBe('');
  // });
});
