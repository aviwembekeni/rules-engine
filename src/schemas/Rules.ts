import { Engine } from 'json-rules-engine';

interface Account {
  name: string;
  value: number;
}

interface Asset {
  name: string;
  price: number;
}

class Rules {
  constructor() {}

  /**
   * name
   */
  public async accountSurpassedThresholdLib(account: Account, threshold: number): Promise<string> {
    const engine = new Engine();

    // define a rule for detecting the account has exceeded threshold.
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
        // define the event to fire when the conditions evaluate truthy
        type: 'thresholdReached',
        params: {
          message: 'Threshold reached!',
        },
      },
    });

    const results = await engine.run(account);
    const messages = results.events.map(event => {
      return event?.params?.message;
    });
    return messages[0] || 'Threshold not reached';
  }

  public async accountSurpassedThreshold(account: Account, threshold: number): Promise<string> {
    if (account.value > threshold) {
      return 'Threshold reached!';
    }
    return 'Threshold not reached';
  }

  public async assetSurpassedThresholdLib(asset: Asset, threshold: number): Promise<string> {
    const engine = new Engine();

    // define a rule for detecting the account has exceeded threshold.
    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'price',
                operator: 'greaterThanInclusive',
                value: threshold,
              },
            ],
          },
        ],
      },
      event: {
        // define the event to fire when the conditions evaluate truthy
        type: 'thresholdReached',
        params: {
          message: 'Threshold reached!',
        },
      },
    });

    const results = await engine.run(asset);
    const messages = results.events.map(event => {
      return event?.params?.message;
    });
    return messages[0] || 'Threshold not reached';
  }

  public async assetSurpassedThreshold(asset: Asset, threshold: number): Promise<string> {
    if (asset.price > threshold) {
      return 'Threshold reached!';
    }

    return 'Threshold not reached';
  }

  public async compareAccountsLib(account1: Account, account2: Account): Promise<string> {
    const engine = new Engine();

    engine.addRule({
      conditions: {
        any: [
          {
            all: [
              {
                fact: 'value',
                operator: 'greaterThanInclusive',
                value: account2.value,
              },
              // {
              //   fact: 'personalFoulCount',
              //   operator: 'greaterThanInclusive',
              //   value: 5,
              // },
            ],
          },
        ],
      },
      event: {
        // define the event to fire when the conditions evaluate truthy
        type: 'thresholdReached',
        params: {
          message: `account ${account1.name} is greater than ${account2.name}`,
        },
      },
    });

    const results = await engine.run(account1);
    const messages = results.events.map(event => {
      return event?.params?.message;
    });
    return messages[0] || `account ${account1.name} is less than ${account2.name}`;
  }

  public async compareAccounts(account1: Account, account2: Account): Promise<string> {
    if(account1.value > account2.value){
      return `account ${account1.name} is greater than ${account2.name}`;
    }
    return `account ${account1.name} is less than ${account2.name}`;
  }
}

export default Rules;