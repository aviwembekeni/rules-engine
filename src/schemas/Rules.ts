import { Engine } from 'json-rules-engine';

interface Account {
  name: string;
  value: number;
}

interface Asset {
  name: string;
  price: number;
}

interface NotificationResponse {
  alertUser: boolean;
  message: string;
}

const portfolios = [
  {
    id: 'f7dba960-c11a-11ea-883c-d912cc75c7e9',
    name: 'main',
    preferredCurrencyId: 'c498fcf9-9810-11e9-a44f-3bbfe851b3fa',
    preferredCurrency: {
      id: 'c498fcf9-9810-11e9-a44f-3bbfe851b3fa',
      shortName: 'United States Dollar',
      assetType: 'currencies',
      displaySymbol: 'USD',
      regionName: '',
      currency: 'EUR',
      exchangeCode: '',
      exchangeName: 'CryptoCompare Current Aggregate',
      providers: [
        {
          name: 'Currencylayer',
          exchangeCode: '',
          symbol: 'USD',
          id: '',
        },
      ],
      displaySymbolShort: '&#36;',
      displayImage: '',
      isBaseCurrency: true,
      name: 'United States Dollar (USD)',
      createdAt: '2019-07-17T18:53:44.607Z',
      modifiedAt: '2019-11-11T14:39:00.704Z',
      sourceCurrencyId: 'c498d5f3-9810-11e9-a44f-3bbfe851b3fa',
      sourcePrice: 0.8780787636651008,
      convertedPrice: '',
    },
    accounts: [
      {
        id: '701cf7d0-c74c-11ea-9630-03995659219b',
        name: 'Emergency Fund',
        quantity: 1,
        type: 'tracked',
        userId: '89tBNJGvwFh9RmkRdr4DhhhAw4F3',
        asset: {
          id: 'c498fcf9-9810-11e9-a44f-3bbfe851b3fa',
          shortName: 'United States Dollar',
          assetType: 'currencies',
          displaySymbol: 'USD',
          regionName: '',
          currency: 'EUR',
          exchangeCode: '',
          exchangeName: 'CryptoCompare Current Aggregate',
          providers: [
            {
              name: 'Currencylayer',
              exchangeCode: '',
              symbol: 'USD',
              id: '',
            },
          ],
          displaySymbolShort: '&#36;',
          displayImage: '',
          isBaseCurrency: true,
          name: 'United States Dollar (USD)',
          createdAt: '2019-07-17T18:53:44.607Z',
          modifiedAt: '2019-11-11T14:39:00.704Z',
          sourceCurrencyId: 'c498d5f3-9810-11e9-a44f-3bbfe851b3fa',
          sourcePrice: 0.8780787636651008,
          convertedPrice: 1,
        },
        assetId: 'c498fcf9-9810-11e9-a44f-3bbfe851b3fa',
        convertedValue: 1,
        tags: ['currencies', 'fiat'],
      },
      {
        id: '7669b5f0-c74d-11ea-9630-03995659219b',
        name: 'Long Term',
        quantity: 1,
        type: 'tracked',
        userId: '89tBNJGvwFh9RmkRdr4DhhhAw4F3',
        asset: {
          id: '201095e4-980f-11e9-a44f-3bbfe851b3fa',
          shortName: 'Capitec Bank Holdings Limited',
          assetType: 'stocks',
          displaySymbol: 'CPI',
          regionName: 'South Africa',
          currency: 'ZAC',
          exchangeCode: 'JSE',
          exchangeName: 'Johannesburg Exchange',
          providers: [
            {
              name: 'EODHistorical',
              exchangeCode: 'JSE',
              symbol: 'CPI.JSE',
              id: '',
            },
          ],
          displaySymbolShort: '',
          displayImage: '',
          isBaseCurrency: false,
          name: 'Capitec Bank Holdings Limited (CPI) - South Africa',
          createdAt: '2019-07-17T18:53:36.674Z',
          modifiedAt: '2019-12-11T17:08:50.184Z',
          sourceCurrencyId: 'bc7a8f40-0468-11ea-921e-e7ad97220e5d',
          sourcePrice: 85672,
          convertedPrice: 51.3334583634674,
        },
        assetId: '201095e4-980f-11e9-a44f-3bbfe851b3fa',
        convertedValue: 51.3334583634674,
        tags: ['stocks'],
      },
    ],
  },
];

class Rules {
  /**
   * name
   */
  public async accountSurpassedThresholdLib(account: Account, threshold: number): Promise<NotificationResponse> {
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

    if (messages[0]) {
      return {
        alertUser: true,
        message: messages[0],
      };
    }

    return {
      alertUser: false,
      message: 'Threshold not reached',
    };
  }

  public async accountSurpassedThreshold(account: Account, threshold: number): Promise<NotificationResponse> {
    if (account.value > threshold) {
      return {
        alertUser: true,
        message: 'Threshold reached!',
      };
    }
    return {
      alertUser: false,
      message: 'Threshold not reached',
    };
  }

  public async assetSurpassedThresholdLib(asset: Asset, threshold: number): Promise<NotificationResponse> {
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
    if (messages[0]) {
      return {
        alertUser: true,
        message: messages[0],
      };
    }

    return {
      alertUser: false,
      message: 'Threshold not reached',
    };
  }

  public async assetSurpassedThreshold(asset: Asset, threshold: number): Promise<NotificationResponse> {
    if (asset.price > threshold) {
      return {
        alertUser: true,
        message: 'Threshold reached!',
      };
    }

    return {
      alertUser: true,
      message: 'Threshold not reached!',
    };
  }

  public async compareAccountsLib(account1: Account, account2: Account): Promise<NotificationResponse> {
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

    if (messages[0]) {
      return {
        alertUser: true,
        message: messages[0],
      };
    }

    return {
      alertUser: false,
      message: `account ${account1.name} is less than ${account2.name}`,
    };
  }

  public async compareAccounts(account1: Account, account2: Account): Promise<string> {
    if (account1.value > account2.value) {
      return `account ${account1.name} is greater than ${account2.name}`;
    }
    return `account ${account1.name} is less than ${account2.name}`;
  }

  public async accountSurpassedPortPerc(
    accountId: string,
    portfolioId: string,
    portfolioPercentage: number,
  ): Promise<NotificationResponse> {
    const portfolio = portfolios.find(p => p.id === portfolioId);
    const account = portfolio?.accounts.find(account => account.id === accountId);
    const portfolioTotal = portfolio?.accounts.reduce(
      (sum, currentAccount) => sum + currentAccount.quantity * currentAccount.asset.convertedPrice,
      0,
    ) as number;
    const accountValue = (account?.quantity as number) * (account?.asset?.convertedPrice as number);
    const accountPercentage = (accountValue / portfolioTotal) * 100;
    if (accountPercentage > portfolioPercentage) {
      return {
        alertUser: true,
        message: `account ${account?.name}'s percentage is greater than portfolio percentage [${portfolioPercentage}]`,
      };
    }

    return {
      alertUser: false,
      message: `account ${account?.name}'s percentage is smaller than portfolio percentage [${portfolioPercentage}]`,
    };
  }

  public async sumOfTagSurpassedPortPerc(tag: string, portfolioId: string, portfolioPercentage: number): Promise<NotificationResponse> {
    const portfolio = portfolios.find(p => p.id === portfolioId);
    const tagAccounts = portfolio?.accounts.filter(account => account.tags.includes(tag));
    const portfolioTotal = portfolio?.accounts.reduce(
      (sum, currentAccount) => sum + currentAccount.quantity * currentAccount.asset.convertedPrice,
      0,
    ) as number;
    const tagSum = tagAccounts?.reduce((sum, account) => sum + account.quantity * account.asset.convertedPrice, 0) as number;
    const tagPercentage = (tagSum / portfolioTotal) * 100;
    if (tagPercentage > portfolioPercentage) {
      return {
        alertUser: true,
        message: `Tag ${tag}'s percentage is greater than portfolio percentage [${portfolioPercentage}]`,
      };
    }

    return {
      alertUser: false,
      message: `Tag ${tag}'s percentage is smaller than portfolio percentage [${portfolioPercentage}]`,
    };
  }
}

export default Rules;
