import { Engine } from 'json-rules-engine';
describe('Engine Tests', (): void => {
  it('Should support simple threshold checks', async (): Promise<void> => {
    const engine = new Engine();
    const threshold = 50;
    const account = { id: 1, name: 'Account1', value: 100 };
    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'value',
                operator: 'greaterThanInclusive',
                value: threshold,
              },
            ],
          },
        ],
      },
      event: {
        type: 'thresholdReached',
        params: {
          message: 'Threshold reached!',
        },
      },
    });
    const results = await engine.run(account);
    expect(results.events.length).toBe(1);
    const singleEvent = results.events[0];
    if (singleEvent.params) {
      expect(singleEvent.params.message).toBe('Threshold reached!');
    }
  });

  it('Should support nested value threshold checks', async (): Promise<void> => {
    const engine = new Engine();
    const threshold = 50;
    const user = { portfolio: { id: 1, value: 100 } };
    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'portfolio',
                operator: 'greaterThanInclusive',
                value: threshold,
                path: '$.value',
              },
            ],
          },
        ],
      },
      event: {
        type: 'thresholdReached',
        params: {
          message: 'Threshold reached!',
        },
      },
    });
    const results = await engine.run(user);
    expect(results.events.length).toBe(1);
    const singleEvent = results.events[0];
    if (singleEvent.params) {
      expect(singleEvent.params.message).toBe('Threshold reached!');
    }
  });

  it('Should support fact comparison in nested portfolio', async (): Promise<void> => {
    const engine = new Engine();
    const user = { portfolio: { id: 1, value: 100, threshold: 50 } };
    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'portfolio',
                operator: 'greaterThanInclusive',
                path: '$.value',
                value: { fact: 'portfolio', operator: 'greaterThanInclusive', path: '$.threshold' },
              },
            ],
          },
        ],
      },
      event: {
        type: 'thresholdReached',
        params: {
          message: 'Threshold reached!',
        },
      },
    });
    const results = await engine.run(user);
    expect(results.events.length).toBe(1);
    const singleEvent = results.events[0];
    if (singleEvent.params) {
      expect(singleEvent.params.message).toBe('Threshold reached!');
    }
  });
  it('Should check each portfolio in array', async (): Promise<void> => {
    // Check all portfolios against their thresholds.
    // { portfolios: [ { id: 1, value: 100, threshold: 50}, { id: 2, value: 100, threshold: 50}, { id: 2, value: 100, threshold: 5000} ]}
    expect('This to be implemented').toBe('');
  });

  it('Should deal with arrays', async (): Promise<void> => {
    // Check portfolio id 1 against its threshold. Ignore portfolio 2
    // { portfolios: [ { id: 1, value: 100, threshold: 50}, { id: 2, value: 100, threshold: 50} ]}
    expect('This to be implemented').toBe('');
  });

  it('Should allow accessing account within portfolio', async (): Promise<void> => {
    // Check account id 1 against threshold
    // { portfolios: [ { id: 1, value: 100, accounts: [id: 1, value: 100, threshold: 50] } ]}
    expect('This to be implemented').toBe('');
  });

  it('Should allow named portfolio comparisson', async (): Promise<void> => {
    // Compare portfolio 1 with portfolio 2:
    // { portfolios: [ { id: 1, value: 100 }, { id: 2, value: 200 } ]}
    expect('This to be implemented').toBe('');
  });
});
