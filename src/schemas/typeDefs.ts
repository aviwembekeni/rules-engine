import { gql } from 'apollo-server-lambda';

export default gql`
  type Asset {
    id: String!
    """
    This is the shortNamae of this asset
    e.g. Bitcoin
    """
    shortName: String!
    """
    This tells us which type of asset this
    e.g. equity / commodity / cryptocurrency
    """
    assetType: String!
    """
    This is a symbol that can be used to display the asset
    e.g. BTC
    """
    displaySymbol: String!
    """
    This is the name of the region that the asset is traded/available in
    e.g. South Africa
    """
    regionName: String
    """
    This is the currency that the asset is traded/available in
    e.g. ZAR
    """
    currency: String
    """
    This is the code of the exchange that the asset is traded/available in
    e.g. JSE
    """
    exchangeCode: String
    """
    This is the name of the exchange that the asset is traded/available in
    e.g. Johannesburg Stock Exchange
    """
    exchangeName: String
    """
    This is tells us if the stocks is a featured asset on Lettuce/Appia.
    e.g. true / false
    """
    isFeatured: Boolean! @deprecated
    """
    This is tells us if the stocks is popular on Lettuce/Appia.
    This is determined by how often this asset is priced through our pricing service
    e.g. true / false
    """
    isPopular: Boolean!
    """
    This is a collection of all the providers that can be used to fetch data about this asset.
    """
    providers: [Provider!]!
    """
    This is a short symbol that can be used to display the asset
    e.g. BTC
    """
    displaySymbolShort: String
    """
    This is an image logo of this asset
    """
    displayImage: String
    """
    This tell us whether this asset is a base currency (crypto/fiat)
    """
    isBaseCurrency: Boolean! @deprecated
    """
    The name of the asset
    """
    name: String!
    """
    An internal, unique symbol that represents the asset. Now deprecated.
    """
    lettuceSymbol: String @deprecated
    """
    Date-Time at which the asset was created
    """
    createdAt: String
    """
    Date-Time at which the asset was last modified
    """
    modifiedAt: String
    """
    The AssetId of the primary currency that this asset is priced in.
    """
    sourceCurrencyId: String
    """
    The latest price in the primary currency that this asset is priced in (sourceCurrencyId). This is only populated in the context of a price query / account query / portfolio query.
    """
    sourcePrice: Float
    """
    The lates price on the asset, converted to the preferredCurrency. This is only populated in the context of a price query / account query / portfolio query.
    """
    convertedPrice: Float
    """
    The 365-day daily close-price history in the primary currency that this asset is priced in (sourceCurrencyId). This is only populated in the context of a price query / account query / portfolio query.
    """
    sourcePriceHistory: [PriceHistory]
  }

  type PriceHistory {
    date: String
    close: Float
  }

  enum AccountType {
    manual
    tracked
  }

  type Provider {
    name: String!
    exchangeCode: String
    symbol: String!
    id: String
  }

  type Account {
    id: String!
    name: String
    quantity: Float!
    userId: String!
    asset: Asset!
    assetId: String!
    convertedValue: Float
    tags: [String!]!
    type: AccountType!
  }

  type Portfolio {
    id: String!
    name: String
    preferredCurrencyId: String!
    preferredCurrency: Asset
    accounts: [Account]!
  }

  input BasicAccount {
    name: String!
    value: Int!
  }

  input AssetInput {
    name: String!
    price: Int!
  }

  type Query {
    hello: String
    accountSurpassedThreshold(account: BasicAccount!, threshold: Int!): String!
    assetSurpassedThreshold(asset: AssetInput!, threshold: Int!): String!
    compareAccounts(account1: BasicAccount!, account2: BasicAccount!): String!
    tagPerfomance(portfolioId: String!, tag: String): String!
    # portfolioTotalToReachGoal(portfolio: Portfolio!, goal: Int!): String!
  }

  # type Mutation {
  #   accountSurpassedThreshold(account: Account!, threshold: Int!): String!
  # }
`;
