import { Engine } from 'json-rules-engine';
import testScenarios from './TestScenarios';
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
                value: { fact: 'portfolio', operator: 'greaterThanInclusive', path: '$.threshold' },
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
  it('3: Check all items in array value > threshold', async (): Promise<void> => {
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
