export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface Portfolio {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  preferredCurrencyId: Scalars['String'];
  preferredCurrency?: Maybe<Asset>;
  accounts?: Maybe<Array<Maybe<Account>>>;
}

export interface Account {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  userId: Scalars['String'];
  asset: Asset;
  assetId: Scalars['String'];
  convertedValue?: Maybe<Scalars['Float']>;
  tags: Array<Scalars['String']>;
  type: AccountType;
}

export enum AccountType {
  Manual = 'manual',
  Tracked = 'tracked',
}

export interface Asset {
  id: Scalars['String'];
  /**
   * This is the shortNamae of this asset
   * e.g. Bitcoin
   */
  shortName: Scalars['String'];
  /**
   * This tells us which type of asset this
   * e.g. equity / commodity / cryptocurrency
   */
  assetType: Scalars['String'];
  /**
   * This is a symbol that can be used to display the asset
   * e.g. BTC
   */
  displaySymbol: Scalars['String'];
  /**
   * This is the name of the region that the asset is traded/available in
   * e.g. South Africa
   */
  regionName?: Maybe<Scalars['String']>;
  /**
   * This is the currency that the asset is traded/available in
   * e.g. ZAR
   */
  currency?: Maybe<Scalars['String']>;
  /**
   * This is the code of the exchange that the asset is traded/available in
   * e.g. JSE
   */
  exchangeCode?: Maybe<Scalars['String']>;
  /**
   * This is the name of the exchange that the asset is traded/available in
   * e.g. Johannesburg Stock Exchange
   */
  exchangeName?: Maybe<Scalars['String']>;
  /**
   * This is tells us if the stocks is a featured asset on Lettuce/Appia.
   * e.g. true / false
   * @deprecated Field no longer supported
   */
  isFeatured: Scalars['Boolean'];
  /**
   * This is tells us if the stocks is popular on Lettuce/Appia.
   * This is determined by how often this asset is priced through our pricing service
   * e.g. true / false
   */
  isPopular: Scalars['Boolean'];
  /** This is a collection of all the providers that can be used to fetch data about this asset. */
  providers: Array<Provider>;
  /**
   * This is a short symbol that can be used to display the asset
   * e.g. BTC
   */
  displaySymbolShort?: Maybe<Scalars['String']>;
  /** This is an image logo of this asset */
  displayImage?: Maybe<Scalars['String']>;
  /**
   * This tell us whether this asset is a base currency (crypto/fiat)
   * @deprecated Field no longer supported
   */
  isBaseCurrency: Scalars['Boolean'];
  /** The name of the asset */
  name: Scalars['String'];
  /**
   * An internal, unique symbol that represents the asset. Now deprecated.
   * @deprecated Field no longer supported
   */
  lettuceSymbol?: Maybe<Scalars['String']>;
  /** Date-Time at which the asset was created */
  createdAt?: Maybe<Scalars['String']>;
  /** Date-Time at which the asset was last modified */
  modifiedAt?: Maybe<Scalars['String']>;
  /** The AssetId of the primary currency that this asset is priced in. */
  sourceCurrencyId?: Maybe<Scalars['String']>;
  /** The latest price in the primary currency that this asset is priced in (sourceCurrencyId). This is only populated in the context of a price query / account query / portfolio query. */
  sourcePrice?: Maybe<Scalars['Float']>;
  /** The lates price on the asset, converted to the preferredCurrency. This is only populated in the context of a price query / account query / portfolio query. */
  convertedPrice?: Maybe<Scalars['Float']>;
  /** The 365-day daily close-price history in the primary currency that this asset is priced in (sourceCurrencyId). This is only populated in the context of a price query / account query / portfolio query. */
  sourcePriceHistory?: Maybe<Array<Maybe<PriceHistory>>>;
}

export interface Provider {
  name: Scalars['String'];
  exchangeCode?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
  id?: Maybe<Scalars['String']>;
}

export interface PriceHistory {
  date?: Maybe<Scalars['String']>;
  close?: Maybe<Scalars['Float']>;
}
