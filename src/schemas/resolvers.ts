import { Engine } from 'json-rules-engine';

interface Account {
  name: string;
  value: number;
}

interface Asset {
  name: string;
  price: number;
}

interface Alert {
  portfolioId: string;
  alertType: string;
  tag: string;
  lastTagPercentage: number;
  lastAlertDate: string;
  tagPercentageGoal: number;
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

const alerts: Alert[] = [
  {
    portfolioId: 'f7dba960-c11a-11ea-883c-d912cc75c7e9',
    alertType: 'tag_perfomance_weekly',
    tag: 'stocks',
    lastTagPercentage: 17.7,
    lastAlertDate: '2020-07-20T14:39:00.704Z',
    tagPercentageGoal: 20,
  },
];

const resolvers = {
  Query: {
    hello(): string {
      return 'Hello back 😃';
    },
    async accountSurpassedThreshold(_obj: unknown, args: { account: Account; threshold: number }): Promise<string> {
      const { account, threshold } = args;
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
            message: 'threshold Reached!',
          },
        },
      });

      const results = await engine.run(account);
      const messages = results.events.map(event => {
        console.log(event);
        return event?.params?.message;
      });
      return messages[0] || 'Threshold not reached';
    },
    async assetSurpassedThreshold(_obj: unknown, args: { asset: Asset; threshold: number }): Promise<string> {
      const { asset, threshold } = args;
      const engine = new Engine();

      // define a rule for detecting the asset has exceeded threshold.
      engine.addRule({
        conditions: {
          any: [
            {
              all: [
                {
                  fact: 'price',
                  operator: 'lessThanInclusive',
                  value: threshold,
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
          type: 'treshedHoldReached',
          params: {
            message: 'Threshold Reached!',
          },
        },
      });

      const results = await engine.run(asset);
      const messages = results.events.map(event => {
        console.log(event);
        return event?.params?.message;
      });
      return messages[0] || 'Threshold not reached';
    },
    async compareAccounts(_obj: unknown, args: { account1: Account; account2: Account }): Promise<string> {
      const { account1, account2 } = args;

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

      const results = await engine.run(args.account1);
      const messages = results.events.map(event => {
        console.log(event);
        return event?.params?.message;
      });
      return messages[0] || 'No Alert';
    },
    async tagPerfomance(_obj: unknown, args: { portfolioId: string; tag: string }): Promise<string> {
      const { portfolioId, tag } = args;

      const portfolio = portfolios.find(p => p.id === portfolioId);
      console.log(portfolioId, tag);
      const tagAlert = alerts.find(alert => alert.portfolioId === portfolioId && alert.tag === tag) as Alert;
      console.log('tagAlert: ', tagAlert);

      const start = new Date().getMinutes();
      const oldDate = new Date(tagAlert.lastAlertDate).getMinutes();

      console.log(start);
      console.log(oldDate);

      if (oldDate - start > 2) {
        const portfolioTotal = portfolio?.accounts.reduce(
          (sum, currentAccount) => sum + currentAccount.quantity * currentAccount.asset.convertedPrice,
          0,
        ) as number;
        const tagAccounts = portfolio?.accounts.filter(account => account.tags.includes(tag));
        const tagSum = tagAccounts?.reduce((sum, account) => sum + account.quantity * account.asset.convertedPrice, 0) as number;
        const tagPercentage = (tagSum / portfolioTotal) * 100;
        return `Over the past week your tag went from ${tagAlert.lastTagPercentage}% to ${tagPercentage}%, the difference is ${
          tagPercentage - tagAlert.lastTagPercentage
        }%`;
      }
      return 'Time hasnt passed';
    },
  },
  // Mutation: {},
};

export default resolvers;
