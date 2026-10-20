
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model AssetItem
 * 
 */
export type AssetItem = $Result.DefaultSelection<Prisma.$AssetItemPayload>
/**
 * Model RentalOrder
 * 
 */
export type RentalOrder = $Result.DefaultSelection<Prisma.$RentalOrderPayload>
/**
 * Model RentalInspection
 * 
 */
export type RentalInspection = $Result.DefaultSelection<Prisma.$RentalInspectionPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.assetItem`: Exposes CRUD operations for the **AssetItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssetItems
    * const assetItems = await prisma.assetItem.findMany()
    * ```
    */
  get assetItem(): Prisma.AssetItemDelegate<ExtArgs>;

  /**
   * `prisma.rentalOrder`: Exposes CRUD operations for the **RentalOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RentalOrders
    * const rentalOrders = await prisma.rentalOrder.findMany()
    * ```
    */
  get rentalOrder(): Prisma.RentalOrderDelegate<ExtArgs>;

  /**
   * `prisma.rentalInspection`: Exposes CRUD operations for the **RentalInspection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RentalInspections
    * const rentalInspections = await prisma.rentalInspection.findMany()
    * ```
    */
  get rentalInspection(): Prisma.RentalInspectionDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Category: 'Category',
    Product: 'Product',
    AssetItem: 'AssetItem',
    RentalOrder: 'RentalOrder',
    RentalInspection: 'RentalInspection',
    AuditLog: 'AuditLog',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "category" | "product" | "assetItem" | "rentalOrder" | "rentalInspection" | "auditLog" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      AssetItem: {
        payload: Prisma.$AssetItemPayload<ExtArgs>
        fields: Prisma.AssetItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload>
          }
          findFirst: {
            args: Prisma.AssetItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload>
          }
          findMany: {
            args: Prisma.AssetItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload>[]
          }
          create: {
            args: Prisma.AssetItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload>
          }
          createMany: {
            args: Prisma.AssetItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload>[]
          }
          delete: {
            args: Prisma.AssetItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload>
          }
          update: {
            args: Prisma.AssetItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload>
          }
          deleteMany: {
            args: Prisma.AssetItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssetItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetItemPayload>
          }
          aggregate: {
            args: Prisma.AssetItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssetItem>
          }
          groupBy: {
            args: Prisma.AssetItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetItemCountArgs<ExtArgs>
            result: $Utils.Optional<AssetItemCountAggregateOutputType> | number
          }
        }
      }
      RentalOrder: {
        payload: Prisma.$RentalOrderPayload<ExtArgs>
        fields: Prisma.RentalOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RentalOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RentalOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload>
          }
          findFirst: {
            args: Prisma.RentalOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RentalOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload>
          }
          findMany: {
            args: Prisma.RentalOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload>[]
          }
          create: {
            args: Prisma.RentalOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload>
          }
          createMany: {
            args: Prisma.RentalOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RentalOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload>[]
          }
          delete: {
            args: Prisma.RentalOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload>
          }
          update: {
            args: Prisma.RentalOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload>
          }
          deleteMany: {
            args: Prisma.RentalOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RentalOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RentalOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalOrderPayload>
          }
          aggregate: {
            args: Prisma.RentalOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRentalOrder>
          }
          groupBy: {
            args: Prisma.RentalOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<RentalOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.RentalOrderCountArgs<ExtArgs>
            result: $Utils.Optional<RentalOrderCountAggregateOutputType> | number
          }
        }
      }
      RentalInspection: {
        payload: Prisma.$RentalInspectionPayload<ExtArgs>
        fields: Prisma.RentalInspectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RentalInspectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RentalInspectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload>
          }
          findFirst: {
            args: Prisma.RentalInspectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RentalInspectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload>
          }
          findMany: {
            args: Prisma.RentalInspectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload>[]
          }
          create: {
            args: Prisma.RentalInspectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload>
          }
          createMany: {
            args: Prisma.RentalInspectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RentalInspectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload>[]
          }
          delete: {
            args: Prisma.RentalInspectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload>
          }
          update: {
            args: Prisma.RentalInspectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload>
          }
          deleteMany: {
            args: Prisma.RentalInspectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RentalInspectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RentalInspectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalInspectionPayload>
          }
          aggregate: {
            args: Prisma.RentalInspectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRentalInspection>
          }
          groupBy: {
            args: Prisma.RentalInspectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RentalInspectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RentalInspectionCountArgs<ExtArgs>
            result: $Utils.Optional<RentalInspectionCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    orders: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalOrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    assets: number
    orders: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | ProductCountOutputTypeCountAssetsArgs
    orders?: boolean | ProductCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalOrderWhereInput
  }


  /**
   * Count Type AssetItemCountOutputType
   */

  export type AssetItemCountOutputType = {
    orders: number
  }

  export type AssetItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | AssetItemCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * AssetItemCountOutputType without action
   */
  export type AssetItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItemCountOutputType
     */
    select?: AssetItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssetItemCountOutputType without action
   */
  export type AssetItemCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalOrderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    phone: string | null
    address: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    kycStatus: string | null
    kycIdCardImage: string | null
    kycStudentIdImage: string | null
    kycRejectReason: string | null
    kycVerifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    phone: string | null
    address: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    kycStatus: string | null
    kycIdCardImage: string | null
    kycStudentIdImage: string | null
    kycRejectReason: string | null
    kycVerifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    phone: number
    address: number
    emergencyContactName: number
    emergencyContactPhone: number
    kycStatus: number
    kycIdCardImage: number
    kycStudentIdImage: number
    kycRejectReason: number
    kycVerifiedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    phone?: true
    address?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    kycStatus?: true
    kycIdCardImage?: true
    kycStudentIdImage?: true
    kycRejectReason?: true
    kycVerifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    phone?: true
    address?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    kycStatus?: true
    kycIdCardImage?: true
    kycStudentIdImage?: true
    kycRejectReason?: true
    kycVerifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    phone?: true
    address?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    kycStatus?: true
    kycIdCardImage?: true
    kycStudentIdImage?: true
    kycRejectReason?: true
    kycVerifiedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    role: string
    phone: string | null
    address: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    kycStatus: string
    kycIdCardImage: string | null
    kycStudentIdImage: string | null
    kycRejectReason: string | null
    kycVerifiedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    kycStatus?: boolean
    kycIdCardImage?: boolean
    kycStudentIdImage?: boolean
    kycRejectReason?: boolean
    kycVerifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orders?: boolean | User$ordersArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    kycStatus?: boolean
    kycIdCardImage?: boolean
    kycStudentIdImage?: boolean
    kycRejectReason?: boolean
    kycVerifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    phone?: boolean
    address?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    kycStatus?: boolean
    kycIdCardImage?: boolean
    kycStudentIdImage?: boolean
    kycRejectReason?: boolean
    kycVerifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | User$ordersArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      orders: Prisma.$RentalOrderPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      role: string
      phone: string | null
      address: string | null
      emergencyContactName: string | null
      emergencyContactPhone: string | null
      kycStatus: string
      kycIdCardImage: string | null
      kycStudentIdImage: string | null
      kycRejectReason: string | null
      kycVerifiedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly emergencyContactName: FieldRef<"User", 'String'>
    readonly emergencyContactPhone: FieldRef<"User", 'String'>
    readonly kycStatus: FieldRef<"User", 'String'>
    readonly kycIdCardImage: FieldRef<"User", 'String'>
    readonly kycStudentIdImage: FieldRef<"User", 'String'>
    readonly kycRejectReason: FieldRef<"User", 'String'>
    readonly kycVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    where?: RentalOrderWhereInput
    orderBy?: RentalOrderOrderByWithRelationInput | RentalOrderOrderByWithRelationInput[]
    cursor?: RentalOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RentalOrderScalarFieldEnum | RentalOrderScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    icon: string | null
    description: string | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    icon: string | null
    description: string | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    icon: number
    description: number
    createdAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    description?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    description?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    icon: string | null
    description: string | null
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    description?: boolean
    createdAt?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      icon: string | null
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly icon: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    dailyRate: number | null
    weeklyRate: number | null
    depositAmount: number | null
    minRentalDays: number | null
  }

  export type ProductSumAggregateOutputType = {
    dailyRate: number | null
    weeklyRate: number | null
    depositAmount: number | null
    minRentalDays: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    brand: string | null
    categoryId: string | null
    model: string | null
    description: string | null
    specs: string | null
    accessoriesIncluded: string | null
    dailyRate: number | null
    weeklyRate: number | null
    depositAmount: number | null
    imageUrl: string | null
    galleryImages: string | null
    minRentalDays: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    brand: string | null
    categoryId: string | null
    model: string | null
    description: string | null
    specs: string | null
    accessoriesIncluded: string | null
    dailyRate: number | null
    weeklyRate: number | null
    depositAmount: number | null
    imageUrl: string | null
    galleryImages: string | null
    minRentalDays: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    brand: number
    categoryId: number
    model: number
    description: number
    specs: number
    accessoriesIncluded: number
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: number
    galleryImages: number
    minRentalDays: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    dailyRate?: true
    weeklyRate?: true
    depositAmount?: true
    minRentalDays?: true
  }

  export type ProductSumAggregateInputType = {
    dailyRate?: true
    weeklyRate?: true
    depositAmount?: true
    minRentalDays?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    brand?: true
    categoryId?: true
    model?: true
    description?: true
    specs?: true
    accessoriesIncluded?: true
    dailyRate?: true
    weeklyRate?: true
    depositAmount?: true
    imageUrl?: true
    galleryImages?: true
    minRentalDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    brand?: true
    categoryId?: true
    model?: true
    description?: true
    specs?: true
    accessoriesIncluded?: true
    dailyRate?: true
    weeklyRate?: true
    depositAmount?: true
    imageUrl?: true
    galleryImages?: true
    minRentalDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    brand?: true
    categoryId?: true
    model?: true
    description?: true
    specs?: true
    accessoriesIncluded?: true
    dailyRate?: true
    weeklyRate?: true
    depositAmount?: true
    imageUrl?: true
    galleryImages?: true
    minRentalDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    brand: string
    categoryId: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages: string | null
    minRentalDays: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    brand?: boolean
    categoryId?: boolean
    model?: boolean
    description?: boolean
    specs?: boolean
    accessoriesIncluded?: boolean
    dailyRate?: boolean
    weeklyRate?: boolean
    depositAmount?: boolean
    imageUrl?: boolean
    galleryImages?: boolean
    minRentalDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    assets?: boolean | Product$assetsArgs<ExtArgs>
    orders?: boolean | Product$ordersArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    brand?: boolean
    categoryId?: boolean
    model?: boolean
    description?: boolean
    specs?: boolean
    accessoriesIncluded?: boolean
    dailyRate?: boolean
    weeklyRate?: boolean
    depositAmount?: boolean
    imageUrl?: boolean
    galleryImages?: boolean
    minRentalDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    brand?: boolean
    categoryId?: boolean
    model?: boolean
    description?: boolean
    specs?: boolean
    accessoriesIncluded?: boolean
    dailyRate?: boolean
    weeklyRate?: boolean
    depositAmount?: boolean
    imageUrl?: boolean
    galleryImages?: boolean
    minRentalDays?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    assets?: boolean | Product$assetsArgs<ExtArgs>
    orders?: boolean | Product$ordersArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      assets: Prisma.$AssetItemPayload<ExtArgs>[]
      orders: Prisma.$RentalOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      brand: string
      categoryId: string
      model: string
      description: string
      specs: string
      accessoriesIncluded: string
      dailyRate: number
      weeklyRate: number
      depositAmount: number
      imageUrl: string
      galleryImages: string | null
      minRentalDays: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    assets<T extends Product$assetsArgs<ExtArgs> = {}>(args?: Subset<T, Product$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "findMany"> | Null>
    orders<T extends Product$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Product$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly brand: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly model: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly specs: FieldRef<"Product", 'String'>
    readonly accessoriesIncluded: FieldRef<"Product", 'String'>
    readonly dailyRate: FieldRef<"Product", 'Float'>
    readonly weeklyRate: FieldRef<"Product", 'Float'>
    readonly depositAmount: FieldRef<"Product", 'Float'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly galleryImages: FieldRef<"Product", 'String'>
    readonly minRentalDays: FieldRef<"Product", 'Int'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.assets
   */
  export type Product$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    where?: AssetItemWhereInput
    orderBy?: AssetItemOrderByWithRelationInput | AssetItemOrderByWithRelationInput[]
    cursor?: AssetItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetItemScalarFieldEnum | AssetItemScalarFieldEnum[]
  }

  /**
   * Product.orders
   */
  export type Product$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    where?: RentalOrderWhereInput
    orderBy?: RentalOrderOrderByWithRelationInput | RentalOrderOrderByWithRelationInput[]
    cursor?: RentalOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RentalOrderScalarFieldEnum | RentalOrderScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model AssetItem
   */

  export type AggregateAssetItem = {
    _count: AssetItemCountAggregateOutputType | null
    _min: AssetItemMinAggregateOutputType | null
    _max: AssetItemMaxAggregateOutputType | null
  }

  export type AssetItemMinAggregateOutputType = {
    id: string | null
    productId: string | null
    serialNumber: string | null
    status: string | null
    conditionNotes: string | null
    purchaseDate: Date | null
    lastInspectedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetItemMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    serialNumber: string | null
    status: string | null
    conditionNotes: string | null
    purchaseDate: Date | null
    lastInspectedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssetItemCountAggregateOutputType = {
    id: number
    productId: number
    serialNumber: number
    status: number
    conditionNotes: number
    purchaseDate: number
    lastInspectedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssetItemMinAggregateInputType = {
    id?: true
    productId?: true
    serialNumber?: true
    status?: true
    conditionNotes?: true
    purchaseDate?: true
    lastInspectedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetItemMaxAggregateInputType = {
    id?: true
    productId?: true
    serialNumber?: true
    status?: true
    conditionNotes?: true
    purchaseDate?: true
    lastInspectedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssetItemCountAggregateInputType = {
    id?: true
    productId?: true
    serialNumber?: true
    status?: true
    conditionNotes?: true
    purchaseDate?: true
    lastInspectedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssetItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssetItem to aggregate.
     */
    where?: AssetItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetItems to fetch.
     */
    orderBy?: AssetItemOrderByWithRelationInput | AssetItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssetItems
    **/
    _count?: true | AssetItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetItemMaxAggregateInputType
  }

  export type GetAssetItemAggregateType<T extends AssetItemAggregateArgs> = {
        [P in keyof T & keyof AggregateAssetItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssetItem[P]>
      : GetScalarType<T[P], AggregateAssetItem[P]>
  }




  export type AssetItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetItemWhereInput
    orderBy?: AssetItemOrderByWithAggregationInput | AssetItemOrderByWithAggregationInput[]
    by: AssetItemScalarFieldEnum[] | AssetItemScalarFieldEnum
    having?: AssetItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetItemCountAggregateInputType | true
    _min?: AssetItemMinAggregateInputType
    _max?: AssetItemMaxAggregateInputType
  }

  export type AssetItemGroupByOutputType = {
    id: string
    productId: string
    serialNumber: string
    status: string
    conditionNotes: string | null
    purchaseDate: Date | null
    lastInspectedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AssetItemCountAggregateOutputType | null
    _min: AssetItemMinAggregateOutputType | null
    _max: AssetItemMaxAggregateOutputType | null
  }

  type GetAssetItemGroupByPayload<T extends AssetItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetItemGroupByOutputType[P]>
            : GetScalarType<T[P], AssetItemGroupByOutputType[P]>
        }
      >
    >


  export type AssetItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    serialNumber?: boolean
    status?: boolean
    conditionNotes?: boolean
    purchaseDate?: boolean
    lastInspectedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    orders?: boolean | AssetItem$ordersArgs<ExtArgs>
    _count?: boolean | AssetItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assetItem"]>

  export type AssetItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    serialNumber?: boolean
    status?: boolean
    conditionNotes?: boolean
    purchaseDate?: boolean
    lastInspectedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assetItem"]>

  export type AssetItemSelectScalar = {
    id?: boolean
    productId?: boolean
    serialNumber?: boolean
    status?: boolean
    conditionNotes?: boolean
    purchaseDate?: boolean
    lastInspectedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssetItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    orders?: boolean | AssetItem$ordersArgs<ExtArgs>
    _count?: boolean | AssetItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AssetItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $AssetItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssetItem"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      orders: Prisma.$RentalOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      serialNumber: string
      status: string
      conditionNotes: string | null
      purchaseDate: Date | null
      lastInspectedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assetItem"]>
    composites: {}
  }

  type AssetItemGetPayload<S extends boolean | null | undefined | AssetItemDefaultArgs> = $Result.GetResult<Prisma.$AssetItemPayload, S>

  type AssetItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AssetItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AssetItemCountAggregateInputType | true
    }

  export interface AssetItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssetItem'], meta: { name: 'AssetItem' } }
    /**
     * Find zero or one AssetItem that matches the filter.
     * @param {AssetItemFindUniqueArgs} args - Arguments to find a AssetItem
     * @example
     * // Get one AssetItem
     * const assetItem = await prisma.assetItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetItemFindUniqueArgs>(args: SelectSubset<T, AssetItemFindUniqueArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AssetItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AssetItemFindUniqueOrThrowArgs} args - Arguments to find a AssetItem
     * @example
     * // Get one AssetItem
     * const assetItem = await prisma.assetItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetItemFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AssetItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetItemFindFirstArgs} args - Arguments to find a AssetItem
     * @example
     * // Get one AssetItem
     * const assetItem = await prisma.assetItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetItemFindFirstArgs>(args?: SelectSubset<T, AssetItemFindFirstArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AssetItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetItemFindFirstOrThrowArgs} args - Arguments to find a AssetItem
     * @example
     * // Get one AssetItem
     * const assetItem = await prisma.assetItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetItemFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AssetItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssetItems
     * const assetItems = await prisma.assetItem.findMany()
     * 
     * // Get first 10 AssetItems
     * const assetItems = await prisma.assetItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetItemWithIdOnly = await prisma.assetItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetItemFindManyArgs>(args?: SelectSubset<T, AssetItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AssetItem.
     * @param {AssetItemCreateArgs} args - Arguments to create a AssetItem.
     * @example
     * // Create one AssetItem
     * const AssetItem = await prisma.assetItem.create({
     *   data: {
     *     // ... data to create a AssetItem
     *   }
     * })
     * 
     */
    create<T extends AssetItemCreateArgs>(args: SelectSubset<T, AssetItemCreateArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AssetItems.
     * @param {AssetItemCreateManyArgs} args - Arguments to create many AssetItems.
     * @example
     * // Create many AssetItems
     * const assetItem = await prisma.assetItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetItemCreateManyArgs>(args?: SelectSubset<T, AssetItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssetItems and returns the data saved in the database.
     * @param {AssetItemCreateManyAndReturnArgs} args - Arguments to create many AssetItems.
     * @example
     * // Create many AssetItems
     * const assetItem = await prisma.assetItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssetItems and only return the `id`
     * const assetItemWithIdOnly = await prisma.assetItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetItemCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AssetItem.
     * @param {AssetItemDeleteArgs} args - Arguments to delete one AssetItem.
     * @example
     * // Delete one AssetItem
     * const AssetItem = await prisma.assetItem.delete({
     *   where: {
     *     // ... filter to delete one AssetItem
     *   }
     * })
     * 
     */
    delete<T extends AssetItemDeleteArgs>(args: SelectSubset<T, AssetItemDeleteArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AssetItem.
     * @param {AssetItemUpdateArgs} args - Arguments to update one AssetItem.
     * @example
     * // Update one AssetItem
     * const assetItem = await prisma.assetItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetItemUpdateArgs>(args: SelectSubset<T, AssetItemUpdateArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AssetItems.
     * @param {AssetItemDeleteManyArgs} args - Arguments to filter AssetItems to delete.
     * @example
     * // Delete a few AssetItems
     * const { count } = await prisma.assetItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetItemDeleteManyArgs>(args?: SelectSubset<T, AssetItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssetItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssetItems
     * const assetItem = await prisma.assetItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetItemUpdateManyArgs>(args: SelectSubset<T, AssetItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AssetItem.
     * @param {AssetItemUpsertArgs} args - Arguments to update or create a AssetItem.
     * @example
     * // Update or create a AssetItem
     * const assetItem = await prisma.assetItem.upsert({
     *   create: {
     *     // ... data to create a AssetItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssetItem we want to update
     *   }
     * })
     */
    upsert<T extends AssetItemUpsertArgs>(args: SelectSubset<T, AssetItemUpsertArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AssetItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetItemCountArgs} args - Arguments to filter AssetItems to count.
     * @example
     * // Count the number of AssetItems
     * const count = await prisma.assetItem.count({
     *   where: {
     *     // ... the filter for the AssetItems we want to count
     *   }
     * })
    **/
    count<T extends AssetItemCountArgs>(
      args?: Subset<T, AssetItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssetItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssetItemAggregateArgs>(args: Subset<T, AssetItemAggregateArgs>): Prisma.PrismaPromise<GetAssetItemAggregateType<T>>

    /**
     * Group by AssetItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssetItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetItemGroupByArgs['orderBy'] }
        : { orderBy?: AssetItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssetItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssetItem model
   */
  readonly fields: AssetItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssetItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    orders<T extends AssetItem$ordersArgs<ExtArgs> = {}>(args?: Subset<T, AssetItem$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssetItem model
   */ 
  interface AssetItemFieldRefs {
    readonly id: FieldRef<"AssetItem", 'String'>
    readonly productId: FieldRef<"AssetItem", 'String'>
    readonly serialNumber: FieldRef<"AssetItem", 'String'>
    readonly status: FieldRef<"AssetItem", 'String'>
    readonly conditionNotes: FieldRef<"AssetItem", 'String'>
    readonly purchaseDate: FieldRef<"AssetItem", 'DateTime'>
    readonly lastInspectedAt: FieldRef<"AssetItem", 'DateTime'>
    readonly createdAt: FieldRef<"AssetItem", 'DateTime'>
    readonly updatedAt: FieldRef<"AssetItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssetItem findUnique
   */
  export type AssetItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * Filter, which AssetItem to fetch.
     */
    where: AssetItemWhereUniqueInput
  }

  /**
   * AssetItem findUniqueOrThrow
   */
  export type AssetItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * Filter, which AssetItem to fetch.
     */
    where: AssetItemWhereUniqueInput
  }

  /**
   * AssetItem findFirst
   */
  export type AssetItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * Filter, which AssetItem to fetch.
     */
    where?: AssetItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetItems to fetch.
     */
    orderBy?: AssetItemOrderByWithRelationInput | AssetItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssetItems.
     */
    cursor?: AssetItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssetItems.
     */
    distinct?: AssetItemScalarFieldEnum | AssetItemScalarFieldEnum[]
  }

  /**
   * AssetItem findFirstOrThrow
   */
  export type AssetItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * Filter, which AssetItem to fetch.
     */
    where?: AssetItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetItems to fetch.
     */
    orderBy?: AssetItemOrderByWithRelationInput | AssetItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssetItems.
     */
    cursor?: AssetItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssetItems.
     */
    distinct?: AssetItemScalarFieldEnum | AssetItemScalarFieldEnum[]
  }

  /**
   * AssetItem findMany
   */
  export type AssetItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * Filter, which AssetItems to fetch.
     */
    where?: AssetItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssetItems to fetch.
     */
    orderBy?: AssetItemOrderByWithRelationInput | AssetItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssetItems.
     */
    cursor?: AssetItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssetItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssetItems.
     */
    skip?: number
    distinct?: AssetItemScalarFieldEnum | AssetItemScalarFieldEnum[]
  }

  /**
   * AssetItem create
   */
  export type AssetItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * The data needed to create a AssetItem.
     */
    data: XOR<AssetItemCreateInput, AssetItemUncheckedCreateInput>
  }

  /**
   * AssetItem createMany
   */
  export type AssetItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssetItems.
     */
    data: AssetItemCreateManyInput | AssetItemCreateManyInput[]
  }

  /**
   * AssetItem createManyAndReturn
   */
  export type AssetItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AssetItems.
     */
    data: AssetItemCreateManyInput | AssetItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssetItem update
   */
  export type AssetItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * The data needed to update a AssetItem.
     */
    data: XOR<AssetItemUpdateInput, AssetItemUncheckedUpdateInput>
    /**
     * Choose, which AssetItem to update.
     */
    where: AssetItemWhereUniqueInput
  }

  /**
   * AssetItem updateMany
   */
  export type AssetItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssetItems.
     */
    data: XOR<AssetItemUpdateManyMutationInput, AssetItemUncheckedUpdateManyInput>
    /**
     * Filter which AssetItems to update
     */
    where?: AssetItemWhereInput
  }

  /**
   * AssetItem upsert
   */
  export type AssetItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * The filter to search for the AssetItem to update in case it exists.
     */
    where: AssetItemWhereUniqueInput
    /**
     * In case the AssetItem found by the `where` argument doesn't exist, create a new AssetItem with this data.
     */
    create: XOR<AssetItemCreateInput, AssetItemUncheckedCreateInput>
    /**
     * In case the AssetItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetItemUpdateInput, AssetItemUncheckedUpdateInput>
  }

  /**
   * AssetItem delete
   */
  export type AssetItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    /**
     * Filter which AssetItem to delete.
     */
    where: AssetItemWhereUniqueInput
  }

  /**
   * AssetItem deleteMany
   */
  export type AssetItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssetItems to delete
     */
    where?: AssetItemWhereInput
  }

  /**
   * AssetItem.orders
   */
  export type AssetItem$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    where?: RentalOrderWhereInput
    orderBy?: RentalOrderOrderByWithRelationInput | RentalOrderOrderByWithRelationInput[]
    cursor?: RentalOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RentalOrderScalarFieldEnum | RentalOrderScalarFieldEnum[]
  }

  /**
   * AssetItem without action
   */
  export type AssetItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
  }


  /**
   * Model RentalOrder
   */

  export type AggregateRentalOrder = {
    _count: RentalOrderCountAggregateOutputType | null
    _avg: RentalOrderAvgAggregateOutputType | null
    _sum: RentalOrderSumAggregateOutputType | null
    _min: RentalOrderMinAggregateOutputType | null
    _max: RentalOrderMaxAggregateOutputType | null
  }

  export type RentalOrderAvgAggregateOutputType = {
    totalDays: number | null
    dailyRate: number | null
    rentTotal: number | null
    depositAmount: number | null
    discountAmount: number | null
    grandTotal: number | null
  }

  export type RentalOrderSumAggregateOutputType = {
    totalDays: number | null
    dailyRate: number | null
    rentTotal: number | null
    depositAmount: number | null
    discountAmount: number | null
    grandTotal: number | null
  }

  export type RentalOrderMinAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    customerId: string | null
    productId: string | null
    assignedAssetId: string | null
    startDate: Date | null
    endDate: Date | null
    totalDays: number | null
    dailyRate: number | null
    rentTotal: number | null
    depositAmount: number | null
    discountAmount: number | null
    grandTotal: number | null
    status: string | null
    paymentStatus: string | null
    paymentMethod: string | null
    paymentSlipUrl: string | null
    paymentReference: string | null
    paidAt: Date | null
    paymentVerifiedAt: Date | null
    paymentVerifiedBy: string | null
    termsAccepted: boolean | null
    termsAcceptedAt: Date | null
    deliveryAddress: string | null
    customerNotes: string | null
    adminNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RentalOrderMaxAggregateOutputType = {
    id: string | null
    orderNumber: string | null
    customerId: string | null
    productId: string | null
    assignedAssetId: string | null
    startDate: Date | null
    endDate: Date | null
    totalDays: number | null
    dailyRate: number | null
    rentTotal: number | null
    depositAmount: number | null
    discountAmount: number | null
    grandTotal: number | null
    status: string | null
    paymentStatus: string | null
    paymentMethod: string | null
    paymentSlipUrl: string | null
    paymentReference: string | null
    paidAt: Date | null
    paymentVerifiedAt: Date | null
    paymentVerifiedBy: string | null
    termsAccepted: boolean | null
    termsAcceptedAt: Date | null
    deliveryAddress: string | null
    customerNotes: string | null
    adminNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RentalOrderCountAggregateOutputType = {
    id: number
    orderNumber: number
    customerId: number
    productId: number
    assignedAssetId: number
    startDate: number
    endDate: number
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount: number
    grandTotal: number
    status: number
    paymentStatus: number
    paymentMethod: number
    paymentSlipUrl: number
    paymentReference: number
    paidAt: number
    paymentVerifiedAt: number
    paymentVerifiedBy: number
    termsAccepted: number
    termsAcceptedAt: number
    deliveryAddress: number
    customerNotes: number
    adminNotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RentalOrderAvgAggregateInputType = {
    totalDays?: true
    dailyRate?: true
    rentTotal?: true
    depositAmount?: true
    discountAmount?: true
    grandTotal?: true
  }

  export type RentalOrderSumAggregateInputType = {
    totalDays?: true
    dailyRate?: true
    rentTotal?: true
    depositAmount?: true
    discountAmount?: true
    grandTotal?: true
  }

  export type RentalOrderMinAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    productId?: true
    assignedAssetId?: true
    startDate?: true
    endDate?: true
    totalDays?: true
    dailyRate?: true
    rentTotal?: true
    depositAmount?: true
    discountAmount?: true
    grandTotal?: true
    status?: true
    paymentStatus?: true
    paymentMethod?: true
    paymentSlipUrl?: true
    paymentReference?: true
    paidAt?: true
    paymentVerifiedAt?: true
    paymentVerifiedBy?: true
    termsAccepted?: true
    termsAcceptedAt?: true
    deliveryAddress?: true
    customerNotes?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RentalOrderMaxAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    productId?: true
    assignedAssetId?: true
    startDate?: true
    endDate?: true
    totalDays?: true
    dailyRate?: true
    rentTotal?: true
    depositAmount?: true
    discountAmount?: true
    grandTotal?: true
    status?: true
    paymentStatus?: true
    paymentMethod?: true
    paymentSlipUrl?: true
    paymentReference?: true
    paidAt?: true
    paymentVerifiedAt?: true
    paymentVerifiedBy?: true
    termsAccepted?: true
    termsAcceptedAt?: true
    deliveryAddress?: true
    customerNotes?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RentalOrderCountAggregateInputType = {
    id?: true
    orderNumber?: true
    customerId?: true
    productId?: true
    assignedAssetId?: true
    startDate?: true
    endDate?: true
    totalDays?: true
    dailyRate?: true
    rentTotal?: true
    depositAmount?: true
    discountAmount?: true
    grandTotal?: true
    status?: true
    paymentStatus?: true
    paymentMethod?: true
    paymentSlipUrl?: true
    paymentReference?: true
    paidAt?: true
    paymentVerifiedAt?: true
    paymentVerifiedBy?: true
    termsAccepted?: true
    termsAcceptedAt?: true
    deliveryAddress?: true
    customerNotes?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RentalOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RentalOrder to aggregate.
     */
    where?: RentalOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalOrders to fetch.
     */
    orderBy?: RentalOrderOrderByWithRelationInput | RentalOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RentalOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RentalOrders
    **/
    _count?: true | RentalOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RentalOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RentalOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RentalOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RentalOrderMaxAggregateInputType
  }

  export type GetRentalOrderAggregateType<T extends RentalOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateRentalOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRentalOrder[P]>
      : GetScalarType<T[P], AggregateRentalOrder[P]>
  }




  export type RentalOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalOrderWhereInput
    orderBy?: RentalOrderOrderByWithAggregationInput | RentalOrderOrderByWithAggregationInput[]
    by: RentalOrderScalarFieldEnum[] | RentalOrderScalarFieldEnum
    having?: RentalOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RentalOrderCountAggregateInputType | true
    _avg?: RentalOrderAvgAggregateInputType
    _sum?: RentalOrderSumAggregateInputType
    _min?: RentalOrderMinAggregateInputType
    _max?: RentalOrderMaxAggregateInputType
  }

  export type RentalOrderGroupByOutputType = {
    id: string
    orderNumber: string
    customerId: string
    productId: string
    assignedAssetId: string | null
    startDate: Date
    endDate: Date
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount: number
    grandTotal: number
    status: string
    paymentStatus: string
    paymentMethod: string
    paymentSlipUrl: string | null
    paymentReference: string | null
    paidAt: Date | null
    paymentVerifiedAt: Date | null
    paymentVerifiedBy: string | null
    termsAccepted: boolean
    termsAcceptedAt: Date
    deliveryAddress: string | null
    customerNotes: string | null
    adminNotes: string | null
    createdAt: Date
    updatedAt: Date
    _count: RentalOrderCountAggregateOutputType | null
    _avg: RentalOrderAvgAggregateOutputType | null
    _sum: RentalOrderSumAggregateOutputType | null
    _min: RentalOrderMinAggregateOutputType | null
    _max: RentalOrderMaxAggregateOutputType | null
  }

  type GetRentalOrderGroupByPayload<T extends RentalOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RentalOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RentalOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RentalOrderGroupByOutputType[P]>
            : GetScalarType<T[P], RentalOrderGroupByOutputType[P]>
        }
      >
    >


  export type RentalOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    productId?: boolean
    assignedAssetId?: boolean
    startDate?: boolean
    endDate?: boolean
    totalDays?: boolean
    dailyRate?: boolean
    rentTotal?: boolean
    depositAmount?: boolean
    discountAmount?: boolean
    grandTotal?: boolean
    status?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    paymentSlipUrl?: boolean
    paymentReference?: boolean
    paidAt?: boolean
    paymentVerifiedAt?: boolean
    paymentVerifiedBy?: boolean
    termsAccepted?: boolean
    termsAcceptedAt?: boolean
    deliveryAddress?: boolean
    customerNotes?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    assignedAsset?: boolean | RentalOrder$assignedAssetArgs<ExtArgs>
    inspection?: boolean | RentalOrder$inspectionArgs<ExtArgs>
  }, ExtArgs["result"]["rentalOrder"]>

  export type RentalOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    productId?: boolean
    assignedAssetId?: boolean
    startDate?: boolean
    endDate?: boolean
    totalDays?: boolean
    dailyRate?: boolean
    rentTotal?: boolean
    depositAmount?: boolean
    discountAmount?: boolean
    grandTotal?: boolean
    status?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    paymentSlipUrl?: boolean
    paymentReference?: boolean
    paidAt?: boolean
    paymentVerifiedAt?: boolean
    paymentVerifiedBy?: boolean
    termsAccepted?: boolean
    termsAcceptedAt?: boolean
    deliveryAddress?: boolean
    customerNotes?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    assignedAsset?: boolean | RentalOrder$assignedAssetArgs<ExtArgs>
  }, ExtArgs["result"]["rentalOrder"]>

  export type RentalOrderSelectScalar = {
    id?: boolean
    orderNumber?: boolean
    customerId?: boolean
    productId?: boolean
    assignedAssetId?: boolean
    startDate?: boolean
    endDate?: boolean
    totalDays?: boolean
    dailyRate?: boolean
    rentTotal?: boolean
    depositAmount?: boolean
    discountAmount?: boolean
    grandTotal?: boolean
    status?: boolean
    paymentStatus?: boolean
    paymentMethod?: boolean
    paymentSlipUrl?: boolean
    paymentReference?: boolean
    paidAt?: boolean
    paymentVerifiedAt?: boolean
    paymentVerifiedBy?: boolean
    termsAccepted?: boolean
    termsAcceptedAt?: boolean
    deliveryAddress?: boolean
    customerNotes?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RentalOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    assignedAsset?: boolean | RentalOrder$assignedAssetArgs<ExtArgs>
    inspection?: boolean | RentalOrder$inspectionArgs<ExtArgs>
  }
  export type RentalOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    assignedAsset?: boolean | RentalOrder$assignedAssetArgs<ExtArgs>
  }

  export type $RentalOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RentalOrder"
    objects: {
      customer: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
      assignedAsset: Prisma.$AssetItemPayload<ExtArgs> | null
      inspection: Prisma.$RentalInspectionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderNumber: string
      customerId: string
      productId: string
      assignedAssetId: string | null
      startDate: Date
      endDate: Date
      totalDays: number
      dailyRate: number
      rentTotal: number
      depositAmount: number
      discountAmount: number
      grandTotal: number
      status: string
      paymentStatus: string
      paymentMethod: string
      paymentSlipUrl: string | null
      paymentReference: string | null
      paidAt: Date | null
      paymentVerifiedAt: Date | null
      paymentVerifiedBy: string | null
      termsAccepted: boolean
      termsAcceptedAt: Date
      deliveryAddress: string | null
      customerNotes: string | null
      adminNotes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rentalOrder"]>
    composites: {}
  }

  type RentalOrderGetPayload<S extends boolean | null | undefined | RentalOrderDefaultArgs> = $Result.GetResult<Prisma.$RentalOrderPayload, S>

  type RentalOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RentalOrderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RentalOrderCountAggregateInputType | true
    }

  export interface RentalOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RentalOrder'], meta: { name: 'RentalOrder' } }
    /**
     * Find zero or one RentalOrder that matches the filter.
     * @param {RentalOrderFindUniqueArgs} args - Arguments to find a RentalOrder
     * @example
     * // Get one RentalOrder
     * const rentalOrder = await prisma.rentalOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RentalOrderFindUniqueArgs>(args: SelectSubset<T, RentalOrderFindUniqueArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RentalOrder that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RentalOrderFindUniqueOrThrowArgs} args - Arguments to find a RentalOrder
     * @example
     * // Get one RentalOrder
     * const rentalOrder = await prisma.rentalOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RentalOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, RentalOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RentalOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalOrderFindFirstArgs} args - Arguments to find a RentalOrder
     * @example
     * // Get one RentalOrder
     * const rentalOrder = await prisma.rentalOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RentalOrderFindFirstArgs>(args?: SelectSubset<T, RentalOrderFindFirstArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RentalOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalOrderFindFirstOrThrowArgs} args - Arguments to find a RentalOrder
     * @example
     * // Get one RentalOrder
     * const rentalOrder = await prisma.rentalOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RentalOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, RentalOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RentalOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RentalOrders
     * const rentalOrders = await prisma.rentalOrder.findMany()
     * 
     * // Get first 10 RentalOrders
     * const rentalOrders = await prisma.rentalOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rentalOrderWithIdOnly = await prisma.rentalOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RentalOrderFindManyArgs>(args?: SelectSubset<T, RentalOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RentalOrder.
     * @param {RentalOrderCreateArgs} args - Arguments to create a RentalOrder.
     * @example
     * // Create one RentalOrder
     * const RentalOrder = await prisma.rentalOrder.create({
     *   data: {
     *     // ... data to create a RentalOrder
     *   }
     * })
     * 
     */
    create<T extends RentalOrderCreateArgs>(args: SelectSubset<T, RentalOrderCreateArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RentalOrders.
     * @param {RentalOrderCreateManyArgs} args - Arguments to create many RentalOrders.
     * @example
     * // Create many RentalOrders
     * const rentalOrder = await prisma.rentalOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RentalOrderCreateManyArgs>(args?: SelectSubset<T, RentalOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RentalOrders and returns the data saved in the database.
     * @param {RentalOrderCreateManyAndReturnArgs} args - Arguments to create many RentalOrders.
     * @example
     * // Create many RentalOrders
     * const rentalOrder = await prisma.rentalOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RentalOrders and only return the `id`
     * const rentalOrderWithIdOnly = await prisma.rentalOrder.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RentalOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, RentalOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RentalOrder.
     * @param {RentalOrderDeleteArgs} args - Arguments to delete one RentalOrder.
     * @example
     * // Delete one RentalOrder
     * const RentalOrder = await prisma.rentalOrder.delete({
     *   where: {
     *     // ... filter to delete one RentalOrder
     *   }
     * })
     * 
     */
    delete<T extends RentalOrderDeleteArgs>(args: SelectSubset<T, RentalOrderDeleteArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RentalOrder.
     * @param {RentalOrderUpdateArgs} args - Arguments to update one RentalOrder.
     * @example
     * // Update one RentalOrder
     * const rentalOrder = await prisma.rentalOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RentalOrderUpdateArgs>(args: SelectSubset<T, RentalOrderUpdateArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RentalOrders.
     * @param {RentalOrderDeleteManyArgs} args - Arguments to filter RentalOrders to delete.
     * @example
     * // Delete a few RentalOrders
     * const { count } = await prisma.rentalOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RentalOrderDeleteManyArgs>(args?: SelectSubset<T, RentalOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RentalOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RentalOrders
     * const rentalOrder = await prisma.rentalOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RentalOrderUpdateManyArgs>(args: SelectSubset<T, RentalOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RentalOrder.
     * @param {RentalOrderUpsertArgs} args - Arguments to update or create a RentalOrder.
     * @example
     * // Update or create a RentalOrder
     * const rentalOrder = await prisma.rentalOrder.upsert({
     *   create: {
     *     // ... data to create a RentalOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RentalOrder we want to update
     *   }
     * })
     */
    upsert<T extends RentalOrderUpsertArgs>(args: SelectSubset<T, RentalOrderUpsertArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RentalOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalOrderCountArgs} args - Arguments to filter RentalOrders to count.
     * @example
     * // Count the number of RentalOrders
     * const count = await prisma.rentalOrder.count({
     *   where: {
     *     // ... the filter for the RentalOrders we want to count
     *   }
     * })
    **/
    count<T extends RentalOrderCountArgs>(
      args?: Subset<T, RentalOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RentalOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RentalOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RentalOrderAggregateArgs>(args: Subset<T, RentalOrderAggregateArgs>): Prisma.PrismaPromise<GetRentalOrderAggregateType<T>>

    /**
     * Group by RentalOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RentalOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RentalOrderGroupByArgs['orderBy'] }
        : { orderBy?: RentalOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RentalOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRentalOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RentalOrder model
   */
  readonly fields: RentalOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RentalOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RentalOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    assignedAsset<T extends RentalOrder$assignedAssetArgs<ExtArgs> = {}>(args?: Subset<T, RentalOrder$assignedAssetArgs<ExtArgs>>): Prisma__AssetItemClient<$Result.GetResult<Prisma.$AssetItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    inspection<T extends RentalOrder$inspectionArgs<ExtArgs> = {}>(args?: Subset<T, RentalOrder$inspectionArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RentalOrder model
   */ 
  interface RentalOrderFieldRefs {
    readonly id: FieldRef<"RentalOrder", 'String'>
    readonly orderNumber: FieldRef<"RentalOrder", 'String'>
    readonly customerId: FieldRef<"RentalOrder", 'String'>
    readonly productId: FieldRef<"RentalOrder", 'String'>
    readonly assignedAssetId: FieldRef<"RentalOrder", 'String'>
    readonly startDate: FieldRef<"RentalOrder", 'DateTime'>
    readonly endDate: FieldRef<"RentalOrder", 'DateTime'>
    readonly totalDays: FieldRef<"RentalOrder", 'Int'>
    readonly dailyRate: FieldRef<"RentalOrder", 'Float'>
    readonly rentTotal: FieldRef<"RentalOrder", 'Float'>
    readonly depositAmount: FieldRef<"RentalOrder", 'Float'>
    readonly discountAmount: FieldRef<"RentalOrder", 'Float'>
    readonly grandTotal: FieldRef<"RentalOrder", 'Float'>
    readonly status: FieldRef<"RentalOrder", 'String'>
    readonly paymentStatus: FieldRef<"RentalOrder", 'String'>
    readonly paymentMethod: FieldRef<"RentalOrder", 'String'>
    readonly paymentSlipUrl: FieldRef<"RentalOrder", 'String'>
    readonly paymentReference: FieldRef<"RentalOrder", 'String'>
    readonly paidAt: FieldRef<"RentalOrder", 'DateTime'>
    readonly paymentVerifiedAt: FieldRef<"RentalOrder", 'DateTime'>
    readonly paymentVerifiedBy: FieldRef<"RentalOrder", 'String'>
    readonly termsAccepted: FieldRef<"RentalOrder", 'Boolean'>
    readonly termsAcceptedAt: FieldRef<"RentalOrder", 'DateTime'>
    readonly deliveryAddress: FieldRef<"RentalOrder", 'String'>
    readonly customerNotes: FieldRef<"RentalOrder", 'String'>
    readonly adminNotes: FieldRef<"RentalOrder", 'String'>
    readonly createdAt: FieldRef<"RentalOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"RentalOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RentalOrder findUnique
   */
  export type RentalOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * Filter, which RentalOrder to fetch.
     */
    where: RentalOrderWhereUniqueInput
  }

  /**
   * RentalOrder findUniqueOrThrow
   */
  export type RentalOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * Filter, which RentalOrder to fetch.
     */
    where: RentalOrderWhereUniqueInput
  }

  /**
   * RentalOrder findFirst
   */
  export type RentalOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * Filter, which RentalOrder to fetch.
     */
    where?: RentalOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalOrders to fetch.
     */
    orderBy?: RentalOrderOrderByWithRelationInput | RentalOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RentalOrders.
     */
    cursor?: RentalOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RentalOrders.
     */
    distinct?: RentalOrderScalarFieldEnum | RentalOrderScalarFieldEnum[]
  }

  /**
   * RentalOrder findFirstOrThrow
   */
  export type RentalOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * Filter, which RentalOrder to fetch.
     */
    where?: RentalOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalOrders to fetch.
     */
    orderBy?: RentalOrderOrderByWithRelationInput | RentalOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RentalOrders.
     */
    cursor?: RentalOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RentalOrders.
     */
    distinct?: RentalOrderScalarFieldEnum | RentalOrderScalarFieldEnum[]
  }

  /**
   * RentalOrder findMany
   */
  export type RentalOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * Filter, which RentalOrders to fetch.
     */
    where?: RentalOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalOrders to fetch.
     */
    orderBy?: RentalOrderOrderByWithRelationInput | RentalOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RentalOrders.
     */
    cursor?: RentalOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalOrders.
     */
    skip?: number
    distinct?: RentalOrderScalarFieldEnum | RentalOrderScalarFieldEnum[]
  }

  /**
   * RentalOrder create
   */
  export type RentalOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a RentalOrder.
     */
    data: XOR<RentalOrderCreateInput, RentalOrderUncheckedCreateInput>
  }

  /**
   * RentalOrder createMany
   */
  export type RentalOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RentalOrders.
     */
    data: RentalOrderCreateManyInput | RentalOrderCreateManyInput[]
  }

  /**
   * RentalOrder createManyAndReturn
   */
  export type RentalOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RentalOrders.
     */
    data: RentalOrderCreateManyInput | RentalOrderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RentalOrder update
   */
  export type RentalOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a RentalOrder.
     */
    data: XOR<RentalOrderUpdateInput, RentalOrderUncheckedUpdateInput>
    /**
     * Choose, which RentalOrder to update.
     */
    where: RentalOrderWhereUniqueInput
  }

  /**
   * RentalOrder updateMany
   */
  export type RentalOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RentalOrders.
     */
    data: XOR<RentalOrderUpdateManyMutationInput, RentalOrderUncheckedUpdateManyInput>
    /**
     * Filter which RentalOrders to update
     */
    where?: RentalOrderWhereInput
  }

  /**
   * RentalOrder upsert
   */
  export type RentalOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the RentalOrder to update in case it exists.
     */
    where: RentalOrderWhereUniqueInput
    /**
     * In case the RentalOrder found by the `where` argument doesn't exist, create a new RentalOrder with this data.
     */
    create: XOR<RentalOrderCreateInput, RentalOrderUncheckedCreateInput>
    /**
     * In case the RentalOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RentalOrderUpdateInput, RentalOrderUncheckedUpdateInput>
  }

  /**
   * RentalOrder delete
   */
  export type RentalOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
    /**
     * Filter which RentalOrder to delete.
     */
    where: RentalOrderWhereUniqueInput
  }

  /**
   * RentalOrder deleteMany
   */
  export type RentalOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RentalOrders to delete
     */
    where?: RentalOrderWhereInput
  }

  /**
   * RentalOrder.assignedAsset
   */
  export type RentalOrder$assignedAssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetItem
     */
    select?: AssetItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetItemInclude<ExtArgs> | null
    where?: AssetItemWhereInput
  }

  /**
   * RentalOrder.inspection
   */
  export type RentalOrder$inspectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    where?: RentalInspectionWhereInput
  }

  /**
   * RentalOrder without action
   */
  export type RentalOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalOrder
     */
    select?: RentalOrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalOrderInclude<ExtArgs> | null
  }


  /**
   * Model RentalInspection
   */

  export type AggregateRentalInspection = {
    _count: RentalInspectionCountAggregateOutputType | null
    _avg: RentalInspectionAvgAggregateOutputType | null
    _sum: RentalInspectionSumAggregateOutputType | null
    _min: RentalInspectionMinAggregateOutputType | null
    _max: RentalInspectionMaxAggregateOutputType | null
  }

  export type RentalInspectionAvgAggregateOutputType = {
    overdueDays: number | null
    lateFeePerDay: number | null
    totalLateFee: number | null
    damageFee: number | null
    originalDeposit: number | null
    totalDeductions: number | null
    finalRefundAmount: number | null
  }

  export type RentalInspectionSumAggregateOutputType = {
    overdueDays: number | null
    lateFeePerDay: number | null
    totalLateFee: number | null
    damageFee: number | null
    originalDeposit: number | null
    totalDeductions: number | null
    finalRefundAmount: number | null
  }

  export type RentalInspectionMinAggregateOutputType = {
    id: string | null
    rentalOrderId: string | null
    checkoutDate: Date | null
    checkoutStaffName: string | null
    checkoutNotes: string | null
    checkoutImages: string | null
    checkinDate: Date | null
    checkinStaffName: string | null
    checkinNotes: string | null
    checkinImages: string | null
    overdueDays: number | null
    lateFeePerDay: number | null
    totalLateFee: number | null
    damageFee: number | null
    damageDescription: string | null
    originalDeposit: number | null
    totalDeductions: number | null
    finalRefundAmount: number | null
    refundStatus: string | null
    refundSlipUrl: string | null
    refundBankName: string | null
    refundBankAccount: string | null
    refundPaidAt: Date | null
    refundProcessedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RentalInspectionMaxAggregateOutputType = {
    id: string | null
    rentalOrderId: string | null
    checkoutDate: Date | null
    checkoutStaffName: string | null
    checkoutNotes: string | null
    checkoutImages: string | null
    checkinDate: Date | null
    checkinStaffName: string | null
    checkinNotes: string | null
    checkinImages: string | null
    overdueDays: number | null
    lateFeePerDay: number | null
    totalLateFee: number | null
    damageFee: number | null
    damageDescription: string | null
    originalDeposit: number | null
    totalDeductions: number | null
    finalRefundAmount: number | null
    refundStatus: string | null
    refundSlipUrl: string | null
    refundBankName: string | null
    refundBankAccount: string | null
    refundPaidAt: Date | null
    refundProcessedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RentalInspectionCountAggregateOutputType = {
    id: number
    rentalOrderId: number
    checkoutDate: number
    checkoutStaffName: number
    checkoutNotes: number
    checkoutImages: number
    checkinDate: number
    checkinStaffName: number
    checkinNotes: number
    checkinImages: number
    overdueDays: number
    lateFeePerDay: number
    totalLateFee: number
    damageFee: number
    damageDescription: number
    originalDeposit: number
    totalDeductions: number
    finalRefundAmount: number
    refundStatus: number
    refundSlipUrl: number
    refundBankName: number
    refundBankAccount: number
    refundPaidAt: number
    refundProcessedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RentalInspectionAvgAggregateInputType = {
    overdueDays?: true
    lateFeePerDay?: true
    totalLateFee?: true
    damageFee?: true
    originalDeposit?: true
    totalDeductions?: true
    finalRefundAmount?: true
  }

  export type RentalInspectionSumAggregateInputType = {
    overdueDays?: true
    lateFeePerDay?: true
    totalLateFee?: true
    damageFee?: true
    originalDeposit?: true
    totalDeductions?: true
    finalRefundAmount?: true
  }

  export type RentalInspectionMinAggregateInputType = {
    id?: true
    rentalOrderId?: true
    checkoutDate?: true
    checkoutStaffName?: true
    checkoutNotes?: true
    checkoutImages?: true
    checkinDate?: true
    checkinStaffName?: true
    checkinNotes?: true
    checkinImages?: true
    overdueDays?: true
    lateFeePerDay?: true
    totalLateFee?: true
    damageFee?: true
    damageDescription?: true
    originalDeposit?: true
    totalDeductions?: true
    finalRefundAmount?: true
    refundStatus?: true
    refundSlipUrl?: true
    refundBankName?: true
    refundBankAccount?: true
    refundPaidAt?: true
    refundProcessedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RentalInspectionMaxAggregateInputType = {
    id?: true
    rentalOrderId?: true
    checkoutDate?: true
    checkoutStaffName?: true
    checkoutNotes?: true
    checkoutImages?: true
    checkinDate?: true
    checkinStaffName?: true
    checkinNotes?: true
    checkinImages?: true
    overdueDays?: true
    lateFeePerDay?: true
    totalLateFee?: true
    damageFee?: true
    damageDescription?: true
    originalDeposit?: true
    totalDeductions?: true
    finalRefundAmount?: true
    refundStatus?: true
    refundSlipUrl?: true
    refundBankName?: true
    refundBankAccount?: true
    refundPaidAt?: true
    refundProcessedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RentalInspectionCountAggregateInputType = {
    id?: true
    rentalOrderId?: true
    checkoutDate?: true
    checkoutStaffName?: true
    checkoutNotes?: true
    checkoutImages?: true
    checkinDate?: true
    checkinStaffName?: true
    checkinNotes?: true
    checkinImages?: true
    overdueDays?: true
    lateFeePerDay?: true
    totalLateFee?: true
    damageFee?: true
    damageDescription?: true
    originalDeposit?: true
    totalDeductions?: true
    finalRefundAmount?: true
    refundStatus?: true
    refundSlipUrl?: true
    refundBankName?: true
    refundBankAccount?: true
    refundPaidAt?: true
    refundProcessedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RentalInspectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RentalInspection to aggregate.
     */
    where?: RentalInspectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalInspections to fetch.
     */
    orderBy?: RentalInspectionOrderByWithRelationInput | RentalInspectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RentalInspectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalInspections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalInspections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RentalInspections
    **/
    _count?: true | RentalInspectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RentalInspectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RentalInspectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RentalInspectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RentalInspectionMaxAggregateInputType
  }

  export type GetRentalInspectionAggregateType<T extends RentalInspectionAggregateArgs> = {
        [P in keyof T & keyof AggregateRentalInspection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRentalInspection[P]>
      : GetScalarType<T[P], AggregateRentalInspection[P]>
  }




  export type RentalInspectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalInspectionWhereInput
    orderBy?: RentalInspectionOrderByWithAggregationInput | RentalInspectionOrderByWithAggregationInput[]
    by: RentalInspectionScalarFieldEnum[] | RentalInspectionScalarFieldEnum
    having?: RentalInspectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RentalInspectionCountAggregateInputType | true
    _avg?: RentalInspectionAvgAggregateInputType
    _sum?: RentalInspectionSumAggregateInputType
    _min?: RentalInspectionMinAggregateInputType
    _max?: RentalInspectionMaxAggregateInputType
  }

  export type RentalInspectionGroupByOutputType = {
    id: string
    rentalOrderId: string
    checkoutDate: Date | null
    checkoutStaffName: string | null
    checkoutNotes: string | null
    checkoutImages: string | null
    checkinDate: Date | null
    checkinStaffName: string | null
    checkinNotes: string | null
    checkinImages: string | null
    overdueDays: number
    lateFeePerDay: number
    totalLateFee: number
    damageFee: number
    damageDescription: string | null
    originalDeposit: number
    totalDeductions: number
    finalRefundAmount: number
    refundStatus: string
    refundSlipUrl: string | null
    refundBankName: string | null
    refundBankAccount: string | null
    refundPaidAt: Date | null
    refundProcessedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: RentalInspectionCountAggregateOutputType | null
    _avg: RentalInspectionAvgAggregateOutputType | null
    _sum: RentalInspectionSumAggregateOutputType | null
    _min: RentalInspectionMinAggregateOutputType | null
    _max: RentalInspectionMaxAggregateOutputType | null
  }

  type GetRentalInspectionGroupByPayload<T extends RentalInspectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RentalInspectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RentalInspectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RentalInspectionGroupByOutputType[P]>
            : GetScalarType<T[P], RentalInspectionGroupByOutputType[P]>
        }
      >
    >


  export type RentalInspectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rentalOrderId?: boolean
    checkoutDate?: boolean
    checkoutStaffName?: boolean
    checkoutNotes?: boolean
    checkoutImages?: boolean
    checkinDate?: boolean
    checkinStaffName?: boolean
    checkinNotes?: boolean
    checkinImages?: boolean
    overdueDays?: boolean
    lateFeePerDay?: boolean
    totalLateFee?: boolean
    damageFee?: boolean
    damageDescription?: boolean
    originalDeposit?: boolean
    totalDeductions?: boolean
    finalRefundAmount?: boolean
    refundStatus?: boolean
    refundSlipUrl?: boolean
    refundBankName?: boolean
    refundBankAccount?: boolean
    refundPaidAt?: boolean
    refundProcessedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rentalOrder?: boolean | RentalOrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rentalInspection"]>

  export type RentalInspectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rentalOrderId?: boolean
    checkoutDate?: boolean
    checkoutStaffName?: boolean
    checkoutNotes?: boolean
    checkoutImages?: boolean
    checkinDate?: boolean
    checkinStaffName?: boolean
    checkinNotes?: boolean
    checkinImages?: boolean
    overdueDays?: boolean
    lateFeePerDay?: boolean
    totalLateFee?: boolean
    damageFee?: boolean
    damageDescription?: boolean
    originalDeposit?: boolean
    totalDeductions?: boolean
    finalRefundAmount?: boolean
    refundStatus?: boolean
    refundSlipUrl?: boolean
    refundBankName?: boolean
    refundBankAccount?: boolean
    refundPaidAt?: boolean
    refundProcessedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rentalOrder?: boolean | RentalOrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rentalInspection"]>

  export type RentalInspectionSelectScalar = {
    id?: boolean
    rentalOrderId?: boolean
    checkoutDate?: boolean
    checkoutStaffName?: boolean
    checkoutNotes?: boolean
    checkoutImages?: boolean
    checkinDate?: boolean
    checkinStaffName?: boolean
    checkinNotes?: boolean
    checkinImages?: boolean
    overdueDays?: boolean
    lateFeePerDay?: boolean
    totalLateFee?: boolean
    damageFee?: boolean
    damageDescription?: boolean
    originalDeposit?: boolean
    totalDeductions?: boolean
    finalRefundAmount?: boolean
    refundStatus?: boolean
    refundSlipUrl?: boolean
    refundBankName?: boolean
    refundBankAccount?: boolean
    refundPaidAt?: boolean
    refundProcessedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RentalInspectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rentalOrder?: boolean | RentalOrderDefaultArgs<ExtArgs>
  }
  export type RentalInspectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rentalOrder?: boolean | RentalOrderDefaultArgs<ExtArgs>
  }

  export type $RentalInspectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RentalInspection"
    objects: {
      rentalOrder: Prisma.$RentalOrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rentalOrderId: string
      checkoutDate: Date | null
      checkoutStaffName: string | null
      checkoutNotes: string | null
      checkoutImages: string | null
      checkinDate: Date | null
      checkinStaffName: string | null
      checkinNotes: string | null
      checkinImages: string | null
      overdueDays: number
      lateFeePerDay: number
      totalLateFee: number
      damageFee: number
      damageDescription: string | null
      originalDeposit: number
      totalDeductions: number
      finalRefundAmount: number
      refundStatus: string
      refundSlipUrl: string | null
      refundBankName: string | null
      refundBankAccount: string | null
      refundPaidAt: Date | null
      refundProcessedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rentalInspection"]>
    composites: {}
  }

  type RentalInspectionGetPayload<S extends boolean | null | undefined | RentalInspectionDefaultArgs> = $Result.GetResult<Prisma.$RentalInspectionPayload, S>

  type RentalInspectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RentalInspectionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RentalInspectionCountAggregateInputType | true
    }

  export interface RentalInspectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RentalInspection'], meta: { name: 'RentalInspection' } }
    /**
     * Find zero or one RentalInspection that matches the filter.
     * @param {RentalInspectionFindUniqueArgs} args - Arguments to find a RentalInspection
     * @example
     * // Get one RentalInspection
     * const rentalInspection = await prisma.rentalInspection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RentalInspectionFindUniqueArgs>(args: SelectSubset<T, RentalInspectionFindUniqueArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RentalInspection that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RentalInspectionFindUniqueOrThrowArgs} args - Arguments to find a RentalInspection
     * @example
     * // Get one RentalInspection
     * const rentalInspection = await prisma.rentalInspection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RentalInspectionFindUniqueOrThrowArgs>(args: SelectSubset<T, RentalInspectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RentalInspection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalInspectionFindFirstArgs} args - Arguments to find a RentalInspection
     * @example
     * // Get one RentalInspection
     * const rentalInspection = await prisma.rentalInspection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RentalInspectionFindFirstArgs>(args?: SelectSubset<T, RentalInspectionFindFirstArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RentalInspection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalInspectionFindFirstOrThrowArgs} args - Arguments to find a RentalInspection
     * @example
     * // Get one RentalInspection
     * const rentalInspection = await prisma.rentalInspection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RentalInspectionFindFirstOrThrowArgs>(args?: SelectSubset<T, RentalInspectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RentalInspections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalInspectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RentalInspections
     * const rentalInspections = await prisma.rentalInspection.findMany()
     * 
     * // Get first 10 RentalInspections
     * const rentalInspections = await prisma.rentalInspection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rentalInspectionWithIdOnly = await prisma.rentalInspection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RentalInspectionFindManyArgs>(args?: SelectSubset<T, RentalInspectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RentalInspection.
     * @param {RentalInspectionCreateArgs} args - Arguments to create a RentalInspection.
     * @example
     * // Create one RentalInspection
     * const RentalInspection = await prisma.rentalInspection.create({
     *   data: {
     *     // ... data to create a RentalInspection
     *   }
     * })
     * 
     */
    create<T extends RentalInspectionCreateArgs>(args: SelectSubset<T, RentalInspectionCreateArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RentalInspections.
     * @param {RentalInspectionCreateManyArgs} args - Arguments to create many RentalInspections.
     * @example
     * // Create many RentalInspections
     * const rentalInspection = await prisma.rentalInspection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RentalInspectionCreateManyArgs>(args?: SelectSubset<T, RentalInspectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RentalInspections and returns the data saved in the database.
     * @param {RentalInspectionCreateManyAndReturnArgs} args - Arguments to create many RentalInspections.
     * @example
     * // Create many RentalInspections
     * const rentalInspection = await prisma.rentalInspection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RentalInspections and only return the `id`
     * const rentalInspectionWithIdOnly = await prisma.rentalInspection.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RentalInspectionCreateManyAndReturnArgs>(args?: SelectSubset<T, RentalInspectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RentalInspection.
     * @param {RentalInspectionDeleteArgs} args - Arguments to delete one RentalInspection.
     * @example
     * // Delete one RentalInspection
     * const RentalInspection = await prisma.rentalInspection.delete({
     *   where: {
     *     // ... filter to delete one RentalInspection
     *   }
     * })
     * 
     */
    delete<T extends RentalInspectionDeleteArgs>(args: SelectSubset<T, RentalInspectionDeleteArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RentalInspection.
     * @param {RentalInspectionUpdateArgs} args - Arguments to update one RentalInspection.
     * @example
     * // Update one RentalInspection
     * const rentalInspection = await prisma.rentalInspection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RentalInspectionUpdateArgs>(args: SelectSubset<T, RentalInspectionUpdateArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RentalInspections.
     * @param {RentalInspectionDeleteManyArgs} args - Arguments to filter RentalInspections to delete.
     * @example
     * // Delete a few RentalInspections
     * const { count } = await prisma.rentalInspection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RentalInspectionDeleteManyArgs>(args?: SelectSubset<T, RentalInspectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RentalInspections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalInspectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RentalInspections
     * const rentalInspection = await prisma.rentalInspection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RentalInspectionUpdateManyArgs>(args: SelectSubset<T, RentalInspectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RentalInspection.
     * @param {RentalInspectionUpsertArgs} args - Arguments to update or create a RentalInspection.
     * @example
     * // Update or create a RentalInspection
     * const rentalInspection = await prisma.rentalInspection.upsert({
     *   create: {
     *     // ... data to create a RentalInspection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RentalInspection we want to update
     *   }
     * })
     */
    upsert<T extends RentalInspectionUpsertArgs>(args: SelectSubset<T, RentalInspectionUpsertArgs<ExtArgs>>): Prisma__RentalInspectionClient<$Result.GetResult<Prisma.$RentalInspectionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RentalInspections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalInspectionCountArgs} args - Arguments to filter RentalInspections to count.
     * @example
     * // Count the number of RentalInspections
     * const count = await prisma.rentalInspection.count({
     *   where: {
     *     // ... the filter for the RentalInspections we want to count
     *   }
     * })
    **/
    count<T extends RentalInspectionCountArgs>(
      args?: Subset<T, RentalInspectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RentalInspectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RentalInspection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalInspectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RentalInspectionAggregateArgs>(args: Subset<T, RentalInspectionAggregateArgs>): Prisma.PrismaPromise<GetRentalInspectionAggregateType<T>>

    /**
     * Group by RentalInspection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalInspectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RentalInspectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RentalInspectionGroupByArgs['orderBy'] }
        : { orderBy?: RentalInspectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RentalInspectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRentalInspectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RentalInspection model
   */
  readonly fields: RentalInspectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RentalInspection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RentalInspectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rentalOrder<T extends RentalOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RentalOrderDefaultArgs<ExtArgs>>): Prisma__RentalOrderClient<$Result.GetResult<Prisma.$RentalOrderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RentalInspection model
   */ 
  interface RentalInspectionFieldRefs {
    readonly id: FieldRef<"RentalInspection", 'String'>
    readonly rentalOrderId: FieldRef<"RentalInspection", 'String'>
    readonly checkoutDate: FieldRef<"RentalInspection", 'DateTime'>
    readonly checkoutStaffName: FieldRef<"RentalInspection", 'String'>
    readonly checkoutNotes: FieldRef<"RentalInspection", 'String'>
    readonly checkoutImages: FieldRef<"RentalInspection", 'String'>
    readonly checkinDate: FieldRef<"RentalInspection", 'DateTime'>
    readonly checkinStaffName: FieldRef<"RentalInspection", 'String'>
    readonly checkinNotes: FieldRef<"RentalInspection", 'String'>
    readonly checkinImages: FieldRef<"RentalInspection", 'String'>
    readonly overdueDays: FieldRef<"RentalInspection", 'Int'>
    readonly lateFeePerDay: FieldRef<"RentalInspection", 'Float'>
    readonly totalLateFee: FieldRef<"RentalInspection", 'Float'>
    readonly damageFee: FieldRef<"RentalInspection", 'Float'>
    readonly damageDescription: FieldRef<"RentalInspection", 'String'>
    readonly originalDeposit: FieldRef<"RentalInspection", 'Float'>
    readonly totalDeductions: FieldRef<"RentalInspection", 'Float'>
    readonly finalRefundAmount: FieldRef<"RentalInspection", 'Float'>
    readonly refundStatus: FieldRef<"RentalInspection", 'String'>
    readonly refundSlipUrl: FieldRef<"RentalInspection", 'String'>
    readonly refundBankName: FieldRef<"RentalInspection", 'String'>
    readonly refundBankAccount: FieldRef<"RentalInspection", 'String'>
    readonly refundPaidAt: FieldRef<"RentalInspection", 'DateTime'>
    readonly refundProcessedBy: FieldRef<"RentalInspection", 'String'>
    readonly createdAt: FieldRef<"RentalInspection", 'DateTime'>
    readonly updatedAt: FieldRef<"RentalInspection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RentalInspection findUnique
   */
  export type RentalInspectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * Filter, which RentalInspection to fetch.
     */
    where: RentalInspectionWhereUniqueInput
  }

  /**
   * RentalInspection findUniqueOrThrow
   */
  export type RentalInspectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * Filter, which RentalInspection to fetch.
     */
    where: RentalInspectionWhereUniqueInput
  }

  /**
   * RentalInspection findFirst
   */
  export type RentalInspectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * Filter, which RentalInspection to fetch.
     */
    where?: RentalInspectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalInspections to fetch.
     */
    orderBy?: RentalInspectionOrderByWithRelationInput | RentalInspectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RentalInspections.
     */
    cursor?: RentalInspectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalInspections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalInspections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RentalInspections.
     */
    distinct?: RentalInspectionScalarFieldEnum | RentalInspectionScalarFieldEnum[]
  }

  /**
   * RentalInspection findFirstOrThrow
   */
  export type RentalInspectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * Filter, which RentalInspection to fetch.
     */
    where?: RentalInspectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalInspections to fetch.
     */
    orderBy?: RentalInspectionOrderByWithRelationInput | RentalInspectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RentalInspections.
     */
    cursor?: RentalInspectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalInspections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalInspections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RentalInspections.
     */
    distinct?: RentalInspectionScalarFieldEnum | RentalInspectionScalarFieldEnum[]
  }

  /**
   * RentalInspection findMany
   */
  export type RentalInspectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * Filter, which RentalInspections to fetch.
     */
    where?: RentalInspectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RentalInspections to fetch.
     */
    orderBy?: RentalInspectionOrderByWithRelationInput | RentalInspectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RentalInspections.
     */
    cursor?: RentalInspectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RentalInspections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RentalInspections.
     */
    skip?: number
    distinct?: RentalInspectionScalarFieldEnum | RentalInspectionScalarFieldEnum[]
  }

  /**
   * RentalInspection create
   */
  export type RentalInspectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * The data needed to create a RentalInspection.
     */
    data: XOR<RentalInspectionCreateInput, RentalInspectionUncheckedCreateInput>
  }

  /**
   * RentalInspection createMany
   */
  export type RentalInspectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RentalInspections.
     */
    data: RentalInspectionCreateManyInput | RentalInspectionCreateManyInput[]
  }

  /**
   * RentalInspection createManyAndReturn
   */
  export type RentalInspectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RentalInspections.
     */
    data: RentalInspectionCreateManyInput | RentalInspectionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RentalInspection update
   */
  export type RentalInspectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * The data needed to update a RentalInspection.
     */
    data: XOR<RentalInspectionUpdateInput, RentalInspectionUncheckedUpdateInput>
    /**
     * Choose, which RentalInspection to update.
     */
    where: RentalInspectionWhereUniqueInput
  }

  /**
   * RentalInspection updateMany
   */
  export type RentalInspectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RentalInspections.
     */
    data: XOR<RentalInspectionUpdateManyMutationInput, RentalInspectionUncheckedUpdateManyInput>
    /**
     * Filter which RentalInspections to update
     */
    where?: RentalInspectionWhereInput
  }

  /**
   * RentalInspection upsert
   */
  export type RentalInspectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * The filter to search for the RentalInspection to update in case it exists.
     */
    where: RentalInspectionWhereUniqueInput
    /**
     * In case the RentalInspection found by the `where` argument doesn't exist, create a new RentalInspection with this data.
     */
    create: XOR<RentalInspectionCreateInput, RentalInspectionUncheckedCreateInput>
    /**
     * In case the RentalInspection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RentalInspectionUpdateInput, RentalInspectionUncheckedUpdateInput>
  }

  /**
   * RentalInspection delete
   */
  export type RentalInspectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
    /**
     * Filter which RentalInspection to delete.
     */
    where: RentalInspectionWhereUniqueInput
  }

  /**
   * RentalInspection deleteMany
   */
  export type RentalInspectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RentalInspections to delete
     */
    where?: RentalInspectionWhereInput
  }

  /**
   * RentalInspection without action
   */
  export type RentalInspectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalInspection
     */
    select?: RentalInspectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInspectionInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    userName: string | null
    userRole: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    details: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    userName: string | null
    userRole: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    details: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    userName: number
    userRole: number
    action: number
    entityType: number
    entityId: number
    details: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    userRole?: true
    action?: true
    entityType?: true
    entityId?: true
    details?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    userRole?: true
    action?: true
    entityType?: true
    entityId?: true
    details?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    userRole?: true
    action?: true
    entityType?: true
    entityId?: true
    details?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    userName: string
    userRole: string
    action: string
    entityType: string
    entityId: string
    details: string
    ipAddress: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userName?: boolean
    userRole?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userName?: boolean
    userRole?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    userName?: boolean
    userRole?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      userName: string
      userRole: string
      action: string
      entityType: string
      entityId: string
      details: string
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly userName: FieldRef<"AuditLog", 'String'>
    readonly userRole: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    link: string | null
    isRead: boolean | null
    channel: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    link: string | null
    isRead: boolean | null
    channel: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    type: number
    link: number
    isRead: number
    channel: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    isRead?: true
    channel?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    isRead?: true
    channel?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    isRead?: true
    channel?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    type: string
    link: string | null
    isRead: boolean
    channel: string
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    isRead?: boolean
    channel?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    isRead?: boolean
    channel?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    isRead?: boolean
    channel?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      type: string
      link: string | null
      isRead: boolean
      channel: string
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly link: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly channel: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    phone: 'phone',
    address: 'address',
    emergencyContactName: 'emergencyContactName',
    emergencyContactPhone: 'emergencyContactPhone',
    kycStatus: 'kycStatus',
    kycIdCardImage: 'kycIdCardImage',
    kycStudentIdImage: 'kycStudentIdImage',
    kycRejectReason: 'kycRejectReason',
    kycVerifiedAt: 'kycVerifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    icon: 'icon',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    brand: 'brand',
    categoryId: 'categoryId',
    model: 'model',
    description: 'description',
    specs: 'specs',
    accessoriesIncluded: 'accessoriesIncluded',
    dailyRate: 'dailyRate',
    weeklyRate: 'weeklyRate',
    depositAmount: 'depositAmount',
    imageUrl: 'imageUrl',
    galleryImages: 'galleryImages',
    minRentalDays: 'minRentalDays',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const AssetItemScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    serialNumber: 'serialNumber',
    status: 'status',
    conditionNotes: 'conditionNotes',
    purchaseDate: 'purchaseDate',
    lastInspectedAt: 'lastInspectedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssetItemScalarFieldEnum = (typeof AssetItemScalarFieldEnum)[keyof typeof AssetItemScalarFieldEnum]


  export const RentalOrderScalarFieldEnum: {
    id: 'id',
    orderNumber: 'orderNumber',
    customerId: 'customerId',
    productId: 'productId',
    assignedAssetId: 'assignedAssetId',
    startDate: 'startDate',
    endDate: 'endDate',
    totalDays: 'totalDays',
    dailyRate: 'dailyRate',
    rentTotal: 'rentTotal',
    depositAmount: 'depositAmount',
    discountAmount: 'discountAmount',
    grandTotal: 'grandTotal',
    status: 'status',
    paymentStatus: 'paymentStatus',
    paymentMethod: 'paymentMethod',
    paymentSlipUrl: 'paymentSlipUrl',
    paymentReference: 'paymentReference',
    paidAt: 'paidAt',
    paymentVerifiedAt: 'paymentVerifiedAt',
    paymentVerifiedBy: 'paymentVerifiedBy',
    termsAccepted: 'termsAccepted',
    termsAcceptedAt: 'termsAcceptedAt',
    deliveryAddress: 'deliveryAddress',
    customerNotes: 'customerNotes',
    adminNotes: 'adminNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RentalOrderScalarFieldEnum = (typeof RentalOrderScalarFieldEnum)[keyof typeof RentalOrderScalarFieldEnum]


  export const RentalInspectionScalarFieldEnum: {
    id: 'id',
    rentalOrderId: 'rentalOrderId',
    checkoutDate: 'checkoutDate',
    checkoutStaffName: 'checkoutStaffName',
    checkoutNotes: 'checkoutNotes',
    checkoutImages: 'checkoutImages',
    checkinDate: 'checkinDate',
    checkinStaffName: 'checkinStaffName',
    checkinNotes: 'checkinNotes',
    checkinImages: 'checkinImages',
    overdueDays: 'overdueDays',
    lateFeePerDay: 'lateFeePerDay',
    totalLateFee: 'totalLateFee',
    damageFee: 'damageFee',
    damageDescription: 'damageDescription',
    originalDeposit: 'originalDeposit',
    totalDeductions: 'totalDeductions',
    finalRefundAmount: 'finalRefundAmount',
    refundStatus: 'refundStatus',
    refundSlipUrl: 'refundSlipUrl',
    refundBankName: 'refundBankName',
    refundBankAccount: 'refundBankAccount',
    refundPaidAt: 'refundPaidAt',
    refundProcessedBy: 'refundProcessedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RentalInspectionScalarFieldEnum = (typeof RentalInspectionScalarFieldEnum)[keyof typeof RentalInspectionScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    userName: 'userName',
    userRole: 'userRole',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    details: 'details',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    link: 'link',
    isRead: 'isRead',
    channel: 'channel',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    emergencyContactName?: StringNullableFilter<"User"> | string | null
    emergencyContactPhone?: StringNullableFilter<"User"> | string | null
    kycStatus?: StringFilter<"User"> | string
    kycIdCardImage?: StringNullableFilter<"User"> | string | null
    kycStudentIdImage?: StringNullableFilter<"User"> | string | null
    kycRejectReason?: StringNullableFilter<"User"> | string | null
    kycVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    orders?: RentalOrderListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    kycStatus?: SortOrder
    kycIdCardImage?: SortOrderInput | SortOrder
    kycStudentIdImage?: SortOrderInput | SortOrder
    kycRejectReason?: SortOrderInput | SortOrder
    kycVerifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orders?: RentalOrderOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    emergencyContactName?: StringNullableFilter<"User"> | string | null
    emergencyContactPhone?: StringNullableFilter<"User"> | string | null
    kycStatus?: StringFilter<"User"> | string
    kycIdCardImage?: StringNullableFilter<"User"> | string | null
    kycStudentIdImage?: StringNullableFilter<"User"> | string | null
    kycRejectReason?: StringNullableFilter<"User"> | string | null
    kycVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    orders?: RentalOrderListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    kycStatus?: SortOrder
    kycIdCardImage?: SortOrderInput | SortOrder
    kycStudentIdImage?: SortOrderInput | SortOrder
    kycRejectReason?: SortOrderInput | SortOrder
    kycVerifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    emergencyContactName?: StringNullableWithAggregatesFilter<"User"> | string | null
    emergencyContactPhone?: StringNullableWithAggregatesFilter<"User"> | string | null
    kycStatus?: StringWithAggregatesFilter<"User"> | string
    kycIdCardImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    kycStudentIdImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    kycRejectReason?: StringNullableWithAggregatesFilter<"User"> | string | null
    kycVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    icon?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    icon?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
  }, "id" | "name" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    icon?: StringNullableWithAggregatesFilter<"Category"> | string | null
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    brand?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    model?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    specs?: StringFilter<"Product"> | string
    accessoriesIncluded?: StringFilter<"Product"> | string
    dailyRate?: FloatFilter<"Product"> | number
    weeklyRate?: FloatFilter<"Product"> | number
    depositAmount?: FloatFilter<"Product"> | number
    imageUrl?: StringFilter<"Product"> | string
    galleryImages?: StringNullableFilter<"Product"> | string | null
    minRentalDays?: IntFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    assets?: AssetItemListRelationFilter
    orders?: RentalOrderListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    categoryId?: SortOrder
    model?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    accessoriesIncluded?: SortOrder
    dailyRate?: SortOrder
    weeklyRate?: SortOrder
    depositAmount?: SortOrder
    imageUrl?: SortOrder
    galleryImages?: SortOrderInput | SortOrder
    minRentalDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    assets?: AssetItemOrderByRelationAggregateInput
    orders?: RentalOrderOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    brand?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    model?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    specs?: StringFilter<"Product"> | string
    accessoriesIncluded?: StringFilter<"Product"> | string
    dailyRate?: FloatFilter<"Product"> | number
    weeklyRate?: FloatFilter<"Product"> | number
    depositAmount?: FloatFilter<"Product"> | number
    imageUrl?: StringFilter<"Product"> | string
    galleryImages?: StringNullableFilter<"Product"> | string | null
    minRentalDays?: IntFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    assets?: AssetItemListRelationFilter
    orders?: RentalOrderListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    categoryId?: SortOrder
    model?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    accessoriesIncluded?: SortOrder
    dailyRate?: SortOrder
    weeklyRate?: SortOrder
    depositAmount?: SortOrder
    imageUrl?: SortOrder
    galleryImages?: SortOrderInput | SortOrder
    minRentalDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    brand?: StringWithAggregatesFilter<"Product"> | string
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    model?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    specs?: StringWithAggregatesFilter<"Product"> | string
    accessoriesIncluded?: StringWithAggregatesFilter<"Product"> | string
    dailyRate?: FloatWithAggregatesFilter<"Product"> | number
    weeklyRate?: FloatWithAggregatesFilter<"Product"> | number
    depositAmount?: FloatWithAggregatesFilter<"Product"> | number
    imageUrl?: StringWithAggregatesFilter<"Product"> | string
    galleryImages?: StringNullableWithAggregatesFilter<"Product"> | string | null
    minRentalDays?: IntWithAggregatesFilter<"Product"> | number
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type AssetItemWhereInput = {
    AND?: AssetItemWhereInput | AssetItemWhereInput[]
    OR?: AssetItemWhereInput[]
    NOT?: AssetItemWhereInput | AssetItemWhereInput[]
    id?: StringFilter<"AssetItem"> | string
    productId?: StringFilter<"AssetItem"> | string
    serialNumber?: StringFilter<"AssetItem"> | string
    status?: StringFilter<"AssetItem"> | string
    conditionNotes?: StringNullableFilter<"AssetItem"> | string | null
    purchaseDate?: DateTimeNullableFilter<"AssetItem"> | Date | string | null
    lastInspectedAt?: DateTimeNullableFilter<"AssetItem"> | Date | string | null
    createdAt?: DateTimeFilter<"AssetItem"> | Date | string
    updatedAt?: DateTimeFilter<"AssetItem"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    orders?: RentalOrderListRelationFilter
  }

  export type AssetItemOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    conditionNotes?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    lastInspectedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    orders?: RentalOrderOrderByRelationAggregateInput
  }

  export type AssetItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    serialNumber?: string
    AND?: AssetItemWhereInput | AssetItemWhereInput[]
    OR?: AssetItemWhereInput[]
    NOT?: AssetItemWhereInput | AssetItemWhereInput[]
    productId?: StringFilter<"AssetItem"> | string
    status?: StringFilter<"AssetItem"> | string
    conditionNotes?: StringNullableFilter<"AssetItem"> | string | null
    purchaseDate?: DateTimeNullableFilter<"AssetItem"> | Date | string | null
    lastInspectedAt?: DateTimeNullableFilter<"AssetItem"> | Date | string | null
    createdAt?: DateTimeFilter<"AssetItem"> | Date | string
    updatedAt?: DateTimeFilter<"AssetItem"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    orders?: RentalOrderListRelationFilter
  }, "id" | "serialNumber">

  export type AssetItemOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    conditionNotes?: SortOrderInput | SortOrder
    purchaseDate?: SortOrderInput | SortOrder
    lastInspectedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssetItemCountOrderByAggregateInput
    _max?: AssetItemMaxOrderByAggregateInput
    _min?: AssetItemMinOrderByAggregateInput
  }

  export type AssetItemScalarWhereWithAggregatesInput = {
    AND?: AssetItemScalarWhereWithAggregatesInput | AssetItemScalarWhereWithAggregatesInput[]
    OR?: AssetItemScalarWhereWithAggregatesInput[]
    NOT?: AssetItemScalarWhereWithAggregatesInput | AssetItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AssetItem"> | string
    productId?: StringWithAggregatesFilter<"AssetItem"> | string
    serialNumber?: StringWithAggregatesFilter<"AssetItem"> | string
    status?: StringWithAggregatesFilter<"AssetItem"> | string
    conditionNotes?: StringNullableWithAggregatesFilter<"AssetItem"> | string | null
    purchaseDate?: DateTimeNullableWithAggregatesFilter<"AssetItem"> | Date | string | null
    lastInspectedAt?: DateTimeNullableWithAggregatesFilter<"AssetItem"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AssetItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AssetItem"> | Date | string
  }

  export type RentalOrderWhereInput = {
    AND?: RentalOrderWhereInput | RentalOrderWhereInput[]
    OR?: RentalOrderWhereInput[]
    NOT?: RentalOrderWhereInput | RentalOrderWhereInput[]
    id?: StringFilter<"RentalOrder"> | string
    orderNumber?: StringFilter<"RentalOrder"> | string
    customerId?: StringFilter<"RentalOrder"> | string
    productId?: StringFilter<"RentalOrder"> | string
    assignedAssetId?: StringNullableFilter<"RentalOrder"> | string | null
    startDate?: DateTimeFilter<"RentalOrder"> | Date | string
    endDate?: DateTimeFilter<"RentalOrder"> | Date | string
    totalDays?: IntFilter<"RentalOrder"> | number
    dailyRate?: FloatFilter<"RentalOrder"> | number
    rentTotal?: FloatFilter<"RentalOrder"> | number
    depositAmount?: FloatFilter<"RentalOrder"> | number
    discountAmount?: FloatFilter<"RentalOrder"> | number
    grandTotal?: FloatFilter<"RentalOrder"> | number
    status?: StringFilter<"RentalOrder"> | string
    paymentStatus?: StringFilter<"RentalOrder"> | string
    paymentMethod?: StringFilter<"RentalOrder"> | string
    paymentSlipUrl?: StringNullableFilter<"RentalOrder"> | string | null
    paymentReference?: StringNullableFilter<"RentalOrder"> | string | null
    paidAt?: DateTimeNullableFilter<"RentalOrder"> | Date | string | null
    paymentVerifiedAt?: DateTimeNullableFilter<"RentalOrder"> | Date | string | null
    paymentVerifiedBy?: StringNullableFilter<"RentalOrder"> | string | null
    termsAccepted?: BoolFilter<"RentalOrder"> | boolean
    termsAcceptedAt?: DateTimeFilter<"RentalOrder"> | Date | string
    deliveryAddress?: StringNullableFilter<"RentalOrder"> | string | null
    customerNotes?: StringNullableFilter<"RentalOrder"> | string | null
    adminNotes?: StringNullableFilter<"RentalOrder"> | string | null
    createdAt?: DateTimeFilter<"RentalOrder"> | Date | string
    updatedAt?: DateTimeFilter<"RentalOrder"> | Date | string
    customer?: XOR<UserRelationFilter, UserWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    assignedAsset?: XOR<AssetItemNullableRelationFilter, AssetItemWhereInput> | null
    inspection?: XOR<RentalInspectionNullableRelationFilter, RentalInspectionWhereInput> | null
  }

  export type RentalOrderOrderByWithRelationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    assignedAssetId?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    dailyRate?: SortOrder
    rentTotal?: SortOrder
    depositAmount?: SortOrder
    discountAmount?: SortOrder
    grandTotal?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    paymentSlipUrl?: SortOrderInput | SortOrder
    paymentReference?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    paymentVerifiedAt?: SortOrderInput | SortOrder
    paymentVerifiedBy?: SortOrderInput | SortOrder
    termsAccepted?: SortOrder
    termsAcceptedAt?: SortOrder
    deliveryAddress?: SortOrderInput | SortOrder
    customerNotes?: SortOrderInput | SortOrder
    adminNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    assignedAsset?: AssetItemOrderByWithRelationInput
    inspection?: RentalInspectionOrderByWithRelationInput
  }

  export type RentalOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderNumber?: string
    AND?: RentalOrderWhereInput | RentalOrderWhereInput[]
    OR?: RentalOrderWhereInput[]
    NOT?: RentalOrderWhereInput | RentalOrderWhereInput[]
    customerId?: StringFilter<"RentalOrder"> | string
    productId?: StringFilter<"RentalOrder"> | string
    assignedAssetId?: StringNullableFilter<"RentalOrder"> | string | null
    startDate?: DateTimeFilter<"RentalOrder"> | Date | string
    endDate?: DateTimeFilter<"RentalOrder"> | Date | string
    totalDays?: IntFilter<"RentalOrder"> | number
    dailyRate?: FloatFilter<"RentalOrder"> | number
    rentTotal?: FloatFilter<"RentalOrder"> | number
    depositAmount?: FloatFilter<"RentalOrder"> | number
    discountAmount?: FloatFilter<"RentalOrder"> | number
    grandTotal?: FloatFilter<"RentalOrder"> | number
    status?: StringFilter<"RentalOrder"> | string
    paymentStatus?: StringFilter<"RentalOrder"> | string
    paymentMethod?: StringFilter<"RentalOrder"> | string
    paymentSlipUrl?: StringNullableFilter<"RentalOrder"> | string | null
    paymentReference?: StringNullableFilter<"RentalOrder"> | string | null
    paidAt?: DateTimeNullableFilter<"RentalOrder"> | Date | string | null
    paymentVerifiedAt?: DateTimeNullableFilter<"RentalOrder"> | Date | string | null
    paymentVerifiedBy?: StringNullableFilter<"RentalOrder"> | string | null
    termsAccepted?: BoolFilter<"RentalOrder"> | boolean
    termsAcceptedAt?: DateTimeFilter<"RentalOrder"> | Date | string
    deliveryAddress?: StringNullableFilter<"RentalOrder"> | string | null
    customerNotes?: StringNullableFilter<"RentalOrder"> | string | null
    adminNotes?: StringNullableFilter<"RentalOrder"> | string | null
    createdAt?: DateTimeFilter<"RentalOrder"> | Date | string
    updatedAt?: DateTimeFilter<"RentalOrder"> | Date | string
    customer?: XOR<UserRelationFilter, UserWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    assignedAsset?: XOR<AssetItemNullableRelationFilter, AssetItemWhereInput> | null
    inspection?: XOR<RentalInspectionNullableRelationFilter, RentalInspectionWhereInput> | null
  }, "id" | "orderNumber">

  export type RentalOrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    assignedAssetId?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    dailyRate?: SortOrder
    rentTotal?: SortOrder
    depositAmount?: SortOrder
    discountAmount?: SortOrder
    grandTotal?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    paymentSlipUrl?: SortOrderInput | SortOrder
    paymentReference?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    paymentVerifiedAt?: SortOrderInput | SortOrder
    paymentVerifiedBy?: SortOrderInput | SortOrder
    termsAccepted?: SortOrder
    termsAcceptedAt?: SortOrder
    deliveryAddress?: SortOrderInput | SortOrder
    customerNotes?: SortOrderInput | SortOrder
    adminNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RentalOrderCountOrderByAggregateInput
    _avg?: RentalOrderAvgOrderByAggregateInput
    _max?: RentalOrderMaxOrderByAggregateInput
    _min?: RentalOrderMinOrderByAggregateInput
    _sum?: RentalOrderSumOrderByAggregateInput
  }

  export type RentalOrderScalarWhereWithAggregatesInput = {
    AND?: RentalOrderScalarWhereWithAggregatesInput | RentalOrderScalarWhereWithAggregatesInput[]
    OR?: RentalOrderScalarWhereWithAggregatesInput[]
    NOT?: RentalOrderScalarWhereWithAggregatesInput | RentalOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RentalOrder"> | string
    orderNumber?: StringWithAggregatesFilter<"RentalOrder"> | string
    customerId?: StringWithAggregatesFilter<"RentalOrder"> | string
    productId?: StringWithAggregatesFilter<"RentalOrder"> | string
    assignedAssetId?: StringNullableWithAggregatesFilter<"RentalOrder"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"RentalOrder"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"RentalOrder"> | Date | string
    totalDays?: IntWithAggregatesFilter<"RentalOrder"> | number
    dailyRate?: FloatWithAggregatesFilter<"RentalOrder"> | number
    rentTotal?: FloatWithAggregatesFilter<"RentalOrder"> | number
    depositAmount?: FloatWithAggregatesFilter<"RentalOrder"> | number
    discountAmount?: FloatWithAggregatesFilter<"RentalOrder"> | number
    grandTotal?: FloatWithAggregatesFilter<"RentalOrder"> | number
    status?: StringWithAggregatesFilter<"RentalOrder"> | string
    paymentStatus?: StringWithAggregatesFilter<"RentalOrder"> | string
    paymentMethod?: StringWithAggregatesFilter<"RentalOrder"> | string
    paymentSlipUrl?: StringNullableWithAggregatesFilter<"RentalOrder"> | string | null
    paymentReference?: StringNullableWithAggregatesFilter<"RentalOrder"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"RentalOrder"> | Date | string | null
    paymentVerifiedAt?: DateTimeNullableWithAggregatesFilter<"RentalOrder"> | Date | string | null
    paymentVerifiedBy?: StringNullableWithAggregatesFilter<"RentalOrder"> | string | null
    termsAccepted?: BoolWithAggregatesFilter<"RentalOrder"> | boolean
    termsAcceptedAt?: DateTimeWithAggregatesFilter<"RentalOrder"> | Date | string
    deliveryAddress?: StringNullableWithAggregatesFilter<"RentalOrder"> | string | null
    customerNotes?: StringNullableWithAggregatesFilter<"RentalOrder"> | string | null
    adminNotes?: StringNullableWithAggregatesFilter<"RentalOrder"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RentalOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RentalOrder"> | Date | string
  }

  export type RentalInspectionWhereInput = {
    AND?: RentalInspectionWhereInput | RentalInspectionWhereInput[]
    OR?: RentalInspectionWhereInput[]
    NOT?: RentalInspectionWhereInput | RentalInspectionWhereInput[]
    id?: StringFilter<"RentalInspection"> | string
    rentalOrderId?: StringFilter<"RentalInspection"> | string
    checkoutDate?: DateTimeNullableFilter<"RentalInspection"> | Date | string | null
    checkoutStaffName?: StringNullableFilter<"RentalInspection"> | string | null
    checkoutNotes?: StringNullableFilter<"RentalInspection"> | string | null
    checkoutImages?: StringNullableFilter<"RentalInspection"> | string | null
    checkinDate?: DateTimeNullableFilter<"RentalInspection"> | Date | string | null
    checkinStaffName?: StringNullableFilter<"RentalInspection"> | string | null
    checkinNotes?: StringNullableFilter<"RentalInspection"> | string | null
    checkinImages?: StringNullableFilter<"RentalInspection"> | string | null
    overdueDays?: IntFilter<"RentalInspection"> | number
    lateFeePerDay?: FloatFilter<"RentalInspection"> | number
    totalLateFee?: FloatFilter<"RentalInspection"> | number
    damageFee?: FloatFilter<"RentalInspection"> | number
    damageDescription?: StringNullableFilter<"RentalInspection"> | string | null
    originalDeposit?: FloatFilter<"RentalInspection"> | number
    totalDeductions?: FloatFilter<"RentalInspection"> | number
    finalRefundAmount?: FloatFilter<"RentalInspection"> | number
    refundStatus?: StringFilter<"RentalInspection"> | string
    refundSlipUrl?: StringNullableFilter<"RentalInspection"> | string | null
    refundBankName?: StringNullableFilter<"RentalInspection"> | string | null
    refundBankAccount?: StringNullableFilter<"RentalInspection"> | string | null
    refundPaidAt?: DateTimeNullableFilter<"RentalInspection"> | Date | string | null
    refundProcessedBy?: StringNullableFilter<"RentalInspection"> | string | null
    createdAt?: DateTimeFilter<"RentalInspection"> | Date | string
    updatedAt?: DateTimeFilter<"RentalInspection"> | Date | string
    rentalOrder?: XOR<RentalOrderRelationFilter, RentalOrderWhereInput>
  }

  export type RentalInspectionOrderByWithRelationInput = {
    id?: SortOrder
    rentalOrderId?: SortOrder
    checkoutDate?: SortOrderInput | SortOrder
    checkoutStaffName?: SortOrderInput | SortOrder
    checkoutNotes?: SortOrderInput | SortOrder
    checkoutImages?: SortOrderInput | SortOrder
    checkinDate?: SortOrderInput | SortOrder
    checkinStaffName?: SortOrderInput | SortOrder
    checkinNotes?: SortOrderInput | SortOrder
    checkinImages?: SortOrderInput | SortOrder
    overdueDays?: SortOrder
    lateFeePerDay?: SortOrder
    totalLateFee?: SortOrder
    damageFee?: SortOrder
    damageDescription?: SortOrderInput | SortOrder
    originalDeposit?: SortOrder
    totalDeductions?: SortOrder
    finalRefundAmount?: SortOrder
    refundStatus?: SortOrder
    refundSlipUrl?: SortOrderInput | SortOrder
    refundBankName?: SortOrderInput | SortOrder
    refundBankAccount?: SortOrderInput | SortOrder
    refundPaidAt?: SortOrderInput | SortOrder
    refundProcessedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rentalOrder?: RentalOrderOrderByWithRelationInput
  }

  export type RentalInspectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rentalOrderId?: string
    AND?: RentalInspectionWhereInput | RentalInspectionWhereInput[]
    OR?: RentalInspectionWhereInput[]
    NOT?: RentalInspectionWhereInput | RentalInspectionWhereInput[]
    checkoutDate?: DateTimeNullableFilter<"RentalInspection"> | Date | string | null
    checkoutStaffName?: StringNullableFilter<"RentalInspection"> | string | null
    checkoutNotes?: StringNullableFilter<"RentalInspection"> | string | null
    checkoutImages?: StringNullableFilter<"RentalInspection"> | string | null
    checkinDate?: DateTimeNullableFilter<"RentalInspection"> | Date | string | null
    checkinStaffName?: StringNullableFilter<"RentalInspection"> | string | null
    checkinNotes?: StringNullableFilter<"RentalInspection"> | string | null
    checkinImages?: StringNullableFilter<"RentalInspection"> | string | null
    overdueDays?: IntFilter<"RentalInspection"> | number
    lateFeePerDay?: FloatFilter<"RentalInspection"> | number
    totalLateFee?: FloatFilter<"RentalInspection"> | number
    damageFee?: FloatFilter<"RentalInspection"> | number
    damageDescription?: StringNullableFilter<"RentalInspection"> | string | null
    originalDeposit?: FloatFilter<"RentalInspection"> | number
    totalDeductions?: FloatFilter<"RentalInspection"> | number
    finalRefundAmount?: FloatFilter<"RentalInspection"> | number
    refundStatus?: StringFilter<"RentalInspection"> | string
    refundSlipUrl?: StringNullableFilter<"RentalInspection"> | string | null
    refundBankName?: StringNullableFilter<"RentalInspection"> | string | null
    refundBankAccount?: StringNullableFilter<"RentalInspection"> | string | null
    refundPaidAt?: DateTimeNullableFilter<"RentalInspection"> | Date | string | null
    refundProcessedBy?: StringNullableFilter<"RentalInspection"> | string | null
    createdAt?: DateTimeFilter<"RentalInspection"> | Date | string
    updatedAt?: DateTimeFilter<"RentalInspection"> | Date | string
    rentalOrder?: XOR<RentalOrderRelationFilter, RentalOrderWhereInput>
  }, "id" | "rentalOrderId">

  export type RentalInspectionOrderByWithAggregationInput = {
    id?: SortOrder
    rentalOrderId?: SortOrder
    checkoutDate?: SortOrderInput | SortOrder
    checkoutStaffName?: SortOrderInput | SortOrder
    checkoutNotes?: SortOrderInput | SortOrder
    checkoutImages?: SortOrderInput | SortOrder
    checkinDate?: SortOrderInput | SortOrder
    checkinStaffName?: SortOrderInput | SortOrder
    checkinNotes?: SortOrderInput | SortOrder
    checkinImages?: SortOrderInput | SortOrder
    overdueDays?: SortOrder
    lateFeePerDay?: SortOrder
    totalLateFee?: SortOrder
    damageFee?: SortOrder
    damageDescription?: SortOrderInput | SortOrder
    originalDeposit?: SortOrder
    totalDeductions?: SortOrder
    finalRefundAmount?: SortOrder
    refundStatus?: SortOrder
    refundSlipUrl?: SortOrderInput | SortOrder
    refundBankName?: SortOrderInput | SortOrder
    refundBankAccount?: SortOrderInput | SortOrder
    refundPaidAt?: SortOrderInput | SortOrder
    refundProcessedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RentalInspectionCountOrderByAggregateInput
    _avg?: RentalInspectionAvgOrderByAggregateInput
    _max?: RentalInspectionMaxOrderByAggregateInput
    _min?: RentalInspectionMinOrderByAggregateInput
    _sum?: RentalInspectionSumOrderByAggregateInput
  }

  export type RentalInspectionScalarWhereWithAggregatesInput = {
    AND?: RentalInspectionScalarWhereWithAggregatesInput | RentalInspectionScalarWhereWithAggregatesInput[]
    OR?: RentalInspectionScalarWhereWithAggregatesInput[]
    NOT?: RentalInspectionScalarWhereWithAggregatesInput | RentalInspectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RentalInspection"> | string
    rentalOrderId?: StringWithAggregatesFilter<"RentalInspection"> | string
    checkoutDate?: DateTimeNullableWithAggregatesFilter<"RentalInspection"> | Date | string | null
    checkoutStaffName?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    checkoutNotes?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    checkoutImages?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    checkinDate?: DateTimeNullableWithAggregatesFilter<"RentalInspection"> | Date | string | null
    checkinStaffName?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    checkinNotes?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    checkinImages?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    overdueDays?: IntWithAggregatesFilter<"RentalInspection"> | number
    lateFeePerDay?: FloatWithAggregatesFilter<"RentalInspection"> | number
    totalLateFee?: FloatWithAggregatesFilter<"RentalInspection"> | number
    damageFee?: FloatWithAggregatesFilter<"RentalInspection"> | number
    damageDescription?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    originalDeposit?: FloatWithAggregatesFilter<"RentalInspection"> | number
    totalDeductions?: FloatWithAggregatesFilter<"RentalInspection"> | number
    finalRefundAmount?: FloatWithAggregatesFilter<"RentalInspection"> | number
    refundStatus?: StringWithAggregatesFilter<"RentalInspection"> | string
    refundSlipUrl?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    refundBankName?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    refundBankAccount?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    refundPaidAt?: DateTimeNullableWithAggregatesFilter<"RentalInspection"> | Date | string | null
    refundProcessedBy?: StringNullableWithAggregatesFilter<"RentalInspection"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RentalInspection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RentalInspection"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    userName?: StringFilter<"AuditLog"> | string
    userRole?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    details?: StringFilter<"AuditLog"> | string
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    userName?: StringFilter<"AuditLog"> | string
    userRole?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    details?: StringFilter<"AuditLog"> | string
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userName?: StringWithAggregatesFilter<"AuditLog"> | string
    userRole?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringWithAggregatesFilter<"AuditLog"> | string
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    channel?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrderInput | SortOrder
    isRead?: SortOrder
    channel?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    channel?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrderInput | SortOrder
    isRead?: SortOrder
    channel?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    link?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    channel?: StringWithAggregatesFilter<"Notification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    phone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    kycStatus?: string
    kycIdCardImage?: string | null
    kycStudentIdImage?: string | null
    kycRejectReason?: string | null
    kycVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: RentalOrderCreateNestedManyWithoutCustomerInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    phone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    kycStatus?: string
    kycIdCardImage?: string | null
    kycStudentIdImage?: string | null
    kycRejectReason?: string | null
    kycVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: RentalOrderUncheckedCreateNestedManyWithoutCustomerInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    kycIdCardImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycStudentIdImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycRejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: RentalOrderUpdateManyWithoutCustomerNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    kycIdCardImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycStudentIdImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycRejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: RentalOrderUncheckedUpdateManyWithoutCustomerNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    phone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    kycStatus?: string
    kycIdCardImage?: string | null
    kycStudentIdImage?: string | null
    kycRejectReason?: string | null
    kycVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    kycIdCardImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycStudentIdImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycRejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    kycIdCardImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycStudentIdImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycRejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    brand: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    assets?: AssetItemCreateNestedManyWithoutProductInput
    orders?: RentalOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    brand: string
    categoryId: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assets?: AssetItemUncheckedCreateNestedManyWithoutProductInput
    orders?: RentalOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    assets?: AssetItemUpdateManyWithoutProductNestedInput
    orders?: RentalOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assets?: AssetItemUncheckedUpdateManyWithoutProductNestedInput
    orders?: RentalOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    brand: string
    categoryId: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetItemCreateInput = {
    id?: string
    serialNumber: string
    status?: string
    conditionNotes?: string | null
    purchaseDate?: Date | string | null
    lastInspectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutAssetsInput
    orders?: RentalOrderCreateNestedManyWithoutAssignedAssetInput
  }

  export type AssetItemUncheckedCreateInput = {
    id?: string
    productId: string
    serialNumber: string
    status?: string
    conditionNotes?: string | null
    purchaseDate?: Date | string | null
    lastInspectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: RentalOrderUncheckedCreateNestedManyWithoutAssignedAssetInput
  }

  export type AssetItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutAssetsNestedInput
    orders?: RentalOrderUpdateManyWithoutAssignedAssetNestedInput
  }

  export type AssetItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: RentalOrderUncheckedUpdateManyWithoutAssignedAssetNestedInput
  }

  export type AssetItemCreateManyInput = {
    id?: string
    productId: string
    serialNumber: string
    status?: string
    conditionNotes?: string | null
    purchaseDate?: Date | string | null
    lastInspectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalOrderCreateInput = {
    id?: string
    orderNumber: string
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: UserCreateNestedOneWithoutOrdersInput
    product: ProductCreateNestedOneWithoutOrdersInput
    assignedAsset?: AssetItemCreateNestedOneWithoutOrdersInput
    inspection?: RentalInspectionCreateNestedOneWithoutRentalOrderInput
  }

  export type RentalOrderUncheckedCreateInput = {
    id?: string
    orderNumber: string
    customerId: string
    productId: string
    assignedAssetId?: string | null
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inspection?: RentalInspectionUncheckedCreateNestedOneWithoutRentalOrderInput
  }

  export type RentalOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: UserUpdateOneRequiredWithoutOrdersNestedInput
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    assignedAsset?: AssetItemUpdateOneWithoutOrdersNestedInput
    inspection?: RentalInspectionUpdateOneWithoutRentalOrderNestedInput
  }

  export type RentalOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    assignedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inspection?: RentalInspectionUncheckedUpdateOneWithoutRentalOrderNestedInput
  }

  export type RentalOrderCreateManyInput = {
    id?: string
    orderNumber: string
    customerId: string
    productId: string
    assignedAssetId?: string | null
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    assignedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalInspectionCreateInput = {
    id?: string
    checkoutDate?: Date | string | null
    checkoutStaffName?: string | null
    checkoutNotes?: string | null
    checkoutImages?: string | null
    checkinDate?: Date | string | null
    checkinStaffName?: string | null
    checkinNotes?: string | null
    checkinImages?: string | null
    overdueDays?: number
    lateFeePerDay?: number
    totalLateFee?: number
    damageFee?: number
    damageDescription?: string | null
    originalDeposit?: number
    totalDeductions?: number
    finalRefundAmount?: number
    refundStatus?: string
    refundSlipUrl?: string | null
    refundBankName?: string | null
    refundBankAccount?: string | null
    refundPaidAt?: Date | string | null
    refundProcessedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rentalOrder: RentalOrderCreateNestedOneWithoutInspectionInput
  }

  export type RentalInspectionUncheckedCreateInput = {
    id?: string
    rentalOrderId: string
    checkoutDate?: Date | string | null
    checkoutStaffName?: string | null
    checkoutNotes?: string | null
    checkoutImages?: string | null
    checkinDate?: Date | string | null
    checkinStaffName?: string | null
    checkinNotes?: string | null
    checkinImages?: string | null
    overdueDays?: number
    lateFeePerDay?: number
    totalLateFee?: number
    damageFee?: number
    damageDescription?: string | null
    originalDeposit?: number
    totalDeductions?: number
    finalRefundAmount?: number
    refundStatus?: string
    refundSlipUrl?: string | null
    refundBankName?: string | null
    refundBankAccount?: string | null
    refundPaidAt?: Date | string | null
    refundProcessedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalInspectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutImages?: NullableStringFieldUpdateOperationsInput | string | null
    checkinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkinStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkinNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkinImages?: NullableStringFieldUpdateOperationsInput | string | null
    overdueDays?: IntFieldUpdateOperationsInput | number
    lateFeePerDay?: FloatFieldUpdateOperationsInput | number
    totalLateFee?: FloatFieldUpdateOperationsInput | number
    damageFee?: FloatFieldUpdateOperationsInput | number
    damageDescription?: NullableStringFieldUpdateOperationsInput | string | null
    originalDeposit?: FloatFieldUpdateOperationsInput | number
    totalDeductions?: FloatFieldUpdateOperationsInput | number
    finalRefundAmount?: FloatFieldUpdateOperationsInput | number
    refundStatus?: StringFieldUpdateOperationsInput | string
    refundSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankName?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    refundPaidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundProcessedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rentalOrder?: RentalOrderUpdateOneRequiredWithoutInspectionNestedInput
  }

  export type RentalInspectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rentalOrderId?: StringFieldUpdateOperationsInput | string
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutImages?: NullableStringFieldUpdateOperationsInput | string | null
    checkinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkinStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkinNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkinImages?: NullableStringFieldUpdateOperationsInput | string | null
    overdueDays?: IntFieldUpdateOperationsInput | number
    lateFeePerDay?: FloatFieldUpdateOperationsInput | number
    totalLateFee?: FloatFieldUpdateOperationsInput | number
    damageFee?: FloatFieldUpdateOperationsInput | number
    damageDescription?: NullableStringFieldUpdateOperationsInput | string | null
    originalDeposit?: FloatFieldUpdateOperationsInput | number
    totalDeductions?: FloatFieldUpdateOperationsInput | number
    finalRefundAmount?: FloatFieldUpdateOperationsInput | number
    refundStatus?: StringFieldUpdateOperationsInput | string
    refundSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankName?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    refundPaidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundProcessedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalInspectionCreateManyInput = {
    id?: string
    rentalOrderId: string
    checkoutDate?: Date | string | null
    checkoutStaffName?: string | null
    checkoutNotes?: string | null
    checkoutImages?: string | null
    checkinDate?: Date | string | null
    checkinStaffName?: string | null
    checkinNotes?: string | null
    checkinImages?: string | null
    overdueDays?: number
    lateFeePerDay?: number
    totalLateFee?: number
    damageFee?: number
    damageDescription?: string | null
    originalDeposit?: number
    totalDeductions?: number
    finalRefundAmount?: number
    refundStatus?: string
    refundSlipUrl?: string | null
    refundBankName?: string | null
    refundBankAccount?: string | null
    refundPaidAt?: Date | string | null
    refundProcessedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalInspectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutImages?: NullableStringFieldUpdateOperationsInput | string | null
    checkinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkinStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkinNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkinImages?: NullableStringFieldUpdateOperationsInput | string | null
    overdueDays?: IntFieldUpdateOperationsInput | number
    lateFeePerDay?: FloatFieldUpdateOperationsInput | number
    totalLateFee?: FloatFieldUpdateOperationsInput | number
    damageFee?: FloatFieldUpdateOperationsInput | number
    damageDescription?: NullableStringFieldUpdateOperationsInput | string | null
    originalDeposit?: FloatFieldUpdateOperationsInput | number
    totalDeductions?: FloatFieldUpdateOperationsInput | number
    finalRefundAmount?: FloatFieldUpdateOperationsInput | number
    refundStatus?: StringFieldUpdateOperationsInput | string
    refundSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankName?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    refundPaidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundProcessedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalInspectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rentalOrderId?: StringFieldUpdateOperationsInput | string
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutImages?: NullableStringFieldUpdateOperationsInput | string | null
    checkinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkinStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkinNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkinImages?: NullableStringFieldUpdateOperationsInput | string | null
    overdueDays?: IntFieldUpdateOperationsInput | number
    lateFeePerDay?: FloatFieldUpdateOperationsInput | number
    totalLateFee?: FloatFieldUpdateOperationsInput | number
    damageFee?: FloatFieldUpdateOperationsInput | number
    damageDescription?: NullableStringFieldUpdateOperationsInput | string | null
    originalDeposit?: FloatFieldUpdateOperationsInput | number
    totalDeductions?: FloatFieldUpdateOperationsInput | number
    finalRefundAmount?: FloatFieldUpdateOperationsInput | number
    refundStatus?: StringFieldUpdateOperationsInput | string
    refundSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankName?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    refundPaidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundProcessedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    userId?: string | null
    userName: string
    userRole: string
    action: string
    entityType: string
    entityId: string
    details: string
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    userName: string
    userRole: string
    action: string
    entityType: string
    entityId: string
    details: string
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    userName: string
    userRole: string
    action: string
    entityType: string
    entityId: string
    details: string
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    details?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    channel?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    channel?: string
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    channel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    channel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    channel?: string
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    channel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    channel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RentalOrderListRelationFilter = {
    every?: RentalOrderWhereInput
    some?: RentalOrderWhereInput
    none?: RentalOrderWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RentalOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    kycStatus?: SortOrder
    kycIdCardImage?: SortOrder
    kycStudentIdImage?: SortOrder
    kycRejectReason?: SortOrder
    kycVerifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    kycStatus?: SortOrder
    kycIdCardImage?: SortOrder
    kycStudentIdImage?: SortOrder
    kycRejectReason?: SortOrder
    kycVerifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    kycStatus?: SortOrder
    kycIdCardImage?: SortOrder
    kycStudentIdImage?: SortOrder
    kycRejectReason?: SortOrder
    kycVerifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type AssetItemListRelationFilter = {
    every?: AssetItemWhereInput
    some?: AssetItemWhereInput
    none?: AssetItemWhereInput
  }

  export type AssetItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    categoryId?: SortOrder
    model?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    accessoriesIncluded?: SortOrder
    dailyRate?: SortOrder
    weeklyRate?: SortOrder
    depositAmount?: SortOrder
    imageUrl?: SortOrder
    galleryImages?: SortOrder
    minRentalDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    dailyRate?: SortOrder
    weeklyRate?: SortOrder
    depositAmount?: SortOrder
    minRentalDays?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    categoryId?: SortOrder
    model?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    accessoriesIncluded?: SortOrder
    dailyRate?: SortOrder
    weeklyRate?: SortOrder
    depositAmount?: SortOrder
    imageUrl?: SortOrder
    galleryImages?: SortOrder
    minRentalDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    brand?: SortOrder
    categoryId?: SortOrder
    model?: SortOrder
    description?: SortOrder
    specs?: SortOrder
    accessoriesIncluded?: SortOrder
    dailyRate?: SortOrder
    weeklyRate?: SortOrder
    depositAmount?: SortOrder
    imageUrl?: SortOrder
    galleryImages?: SortOrder
    minRentalDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    dailyRate?: SortOrder
    weeklyRate?: SortOrder
    depositAmount?: SortOrder
    minRentalDays?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type AssetItemCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    conditionNotes?: SortOrder
    purchaseDate?: SortOrder
    lastInspectedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetItemMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    conditionNotes?: SortOrder
    purchaseDate?: SortOrder
    lastInspectedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssetItemMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    serialNumber?: SortOrder
    status?: SortOrder
    conditionNotes?: SortOrder
    purchaseDate?: SortOrder
    lastInspectedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AssetItemNullableRelationFilter = {
    is?: AssetItemWhereInput | null
    isNot?: AssetItemWhereInput | null
  }

  export type RentalInspectionNullableRelationFilter = {
    is?: RentalInspectionWhereInput | null
    isNot?: RentalInspectionWhereInput | null
  }

  export type RentalOrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    assignedAssetId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    dailyRate?: SortOrder
    rentTotal?: SortOrder
    depositAmount?: SortOrder
    discountAmount?: SortOrder
    grandTotal?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    paymentSlipUrl?: SortOrder
    paymentReference?: SortOrder
    paidAt?: SortOrder
    paymentVerifiedAt?: SortOrder
    paymentVerifiedBy?: SortOrder
    termsAccepted?: SortOrder
    termsAcceptedAt?: SortOrder
    deliveryAddress?: SortOrder
    customerNotes?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalOrderAvgOrderByAggregateInput = {
    totalDays?: SortOrder
    dailyRate?: SortOrder
    rentTotal?: SortOrder
    depositAmount?: SortOrder
    discountAmount?: SortOrder
    grandTotal?: SortOrder
  }

  export type RentalOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    assignedAssetId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    dailyRate?: SortOrder
    rentTotal?: SortOrder
    depositAmount?: SortOrder
    discountAmount?: SortOrder
    grandTotal?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    paymentSlipUrl?: SortOrder
    paymentReference?: SortOrder
    paidAt?: SortOrder
    paymentVerifiedAt?: SortOrder
    paymentVerifiedBy?: SortOrder
    termsAccepted?: SortOrder
    termsAcceptedAt?: SortOrder
    deliveryAddress?: SortOrder
    customerNotes?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalOrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    customerId?: SortOrder
    productId?: SortOrder
    assignedAssetId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    dailyRate?: SortOrder
    rentTotal?: SortOrder
    depositAmount?: SortOrder
    discountAmount?: SortOrder
    grandTotal?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    paymentMethod?: SortOrder
    paymentSlipUrl?: SortOrder
    paymentReference?: SortOrder
    paidAt?: SortOrder
    paymentVerifiedAt?: SortOrder
    paymentVerifiedBy?: SortOrder
    termsAccepted?: SortOrder
    termsAcceptedAt?: SortOrder
    deliveryAddress?: SortOrder
    customerNotes?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalOrderSumOrderByAggregateInput = {
    totalDays?: SortOrder
    dailyRate?: SortOrder
    rentTotal?: SortOrder
    depositAmount?: SortOrder
    discountAmount?: SortOrder
    grandTotal?: SortOrder
  }

  export type RentalOrderRelationFilter = {
    is?: RentalOrderWhereInput
    isNot?: RentalOrderWhereInput
  }

  export type RentalInspectionCountOrderByAggregateInput = {
    id?: SortOrder
    rentalOrderId?: SortOrder
    checkoutDate?: SortOrder
    checkoutStaffName?: SortOrder
    checkoutNotes?: SortOrder
    checkoutImages?: SortOrder
    checkinDate?: SortOrder
    checkinStaffName?: SortOrder
    checkinNotes?: SortOrder
    checkinImages?: SortOrder
    overdueDays?: SortOrder
    lateFeePerDay?: SortOrder
    totalLateFee?: SortOrder
    damageFee?: SortOrder
    damageDescription?: SortOrder
    originalDeposit?: SortOrder
    totalDeductions?: SortOrder
    finalRefundAmount?: SortOrder
    refundStatus?: SortOrder
    refundSlipUrl?: SortOrder
    refundBankName?: SortOrder
    refundBankAccount?: SortOrder
    refundPaidAt?: SortOrder
    refundProcessedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalInspectionAvgOrderByAggregateInput = {
    overdueDays?: SortOrder
    lateFeePerDay?: SortOrder
    totalLateFee?: SortOrder
    damageFee?: SortOrder
    originalDeposit?: SortOrder
    totalDeductions?: SortOrder
    finalRefundAmount?: SortOrder
  }

  export type RentalInspectionMaxOrderByAggregateInput = {
    id?: SortOrder
    rentalOrderId?: SortOrder
    checkoutDate?: SortOrder
    checkoutStaffName?: SortOrder
    checkoutNotes?: SortOrder
    checkoutImages?: SortOrder
    checkinDate?: SortOrder
    checkinStaffName?: SortOrder
    checkinNotes?: SortOrder
    checkinImages?: SortOrder
    overdueDays?: SortOrder
    lateFeePerDay?: SortOrder
    totalLateFee?: SortOrder
    damageFee?: SortOrder
    damageDescription?: SortOrder
    originalDeposit?: SortOrder
    totalDeductions?: SortOrder
    finalRefundAmount?: SortOrder
    refundStatus?: SortOrder
    refundSlipUrl?: SortOrder
    refundBankName?: SortOrder
    refundBankAccount?: SortOrder
    refundPaidAt?: SortOrder
    refundProcessedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalInspectionMinOrderByAggregateInput = {
    id?: SortOrder
    rentalOrderId?: SortOrder
    checkoutDate?: SortOrder
    checkoutStaffName?: SortOrder
    checkoutNotes?: SortOrder
    checkoutImages?: SortOrder
    checkinDate?: SortOrder
    checkinStaffName?: SortOrder
    checkinNotes?: SortOrder
    checkinImages?: SortOrder
    overdueDays?: SortOrder
    lateFeePerDay?: SortOrder
    totalLateFee?: SortOrder
    damageFee?: SortOrder
    damageDescription?: SortOrder
    originalDeposit?: SortOrder
    totalDeductions?: SortOrder
    finalRefundAmount?: SortOrder
    refundStatus?: SortOrder
    refundSlipUrl?: SortOrder
    refundBankName?: SortOrder
    refundBankAccount?: SortOrder
    refundPaidAt?: SortOrder
    refundProcessedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalInspectionSumOrderByAggregateInput = {
    overdueDays?: SortOrder
    lateFeePerDay?: SortOrder
    totalLateFee?: SortOrder
    damageFee?: SortOrder
    originalDeposit?: SortOrder
    totalDeductions?: SortOrder
    finalRefundAmount?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    isRead?: SortOrder
    channel?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    isRead?: SortOrder
    channel?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    isRead?: SortOrder
    channel?: SortOrder
    createdAt?: SortOrder
  }

  export type RentalOrderCreateNestedManyWithoutCustomerInput = {
    create?: XOR<RentalOrderCreateWithoutCustomerInput, RentalOrderUncheckedCreateWithoutCustomerInput> | RentalOrderCreateWithoutCustomerInput[] | RentalOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutCustomerInput | RentalOrderCreateOrConnectWithoutCustomerInput[]
    createMany?: RentalOrderCreateManyCustomerInputEnvelope
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type RentalOrderUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<RentalOrderCreateWithoutCustomerInput, RentalOrderUncheckedCreateWithoutCustomerInput> | RentalOrderCreateWithoutCustomerInput[] | RentalOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutCustomerInput | RentalOrderCreateOrConnectWithoutCustomerInput[]
    createMany?: RentalOrderCreateManyCustomerInputEnvelope
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RentalOrderUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<RentalOrderCreateWithoutCustomerInput, RentalOrderUncheckedCreateWithoutCustomerInput> | RentalOrderCreateWithoutCustomerInput[] | RentalOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutCustomerInput | RentalOrderCreateOrConnectWithoutCustomerInput[]
    upsert?: RentalOrderUpsertWithWhereUniqueWithoutCustomerInput | RentalOrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: RentalOrderCreateManyCustomerInputEnvelope
    set?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    disconnect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    delete?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    update?: RentalOrderUpdateWithWhereUniqueWithoutCustomerInput | RentalOrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: RentalOrderUpdateManyWithWhereWithoutCustomerInput | RentalOrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: RentalOrderScalarWhereInput | RentalOrderScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type RentalOrderUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<RentalOrderCreateWithoutCustomerInput, RentalOrderUncheckedCreateWithoutCustomerInput> | RentalOrderCreateWithoutCustomerInput[] | RentalOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutCustomerInput | RentalOrderCreateOrConnectWithoutCustomerInput[]
    upsert?: RentalOrderUpsertWithWhereUniqueWithoutCustomerInput | RentalOrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: RentalOrderCreateManyCustomerInputEnvelope
    set?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    disconnect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    delete?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    update?: RentalOrderUpdateWithWhereUniqueWithoutCustomerInput | RentalOrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: RentalOrderUpdateManyWithWhereWithoutCustomerInput | RentalOrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: RentalOrderScalarWhereInput | RentalOrderScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type AssetItemCreateNestedManyWithoutProductInput = {
    create?: XOR<AssetItemCreateWithoutProductInput, AssetItemUncheckedCreateWithoutProductInput> | AssetItemCreateWithoutProductInput[] | AssetItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AssetItemCreateOrConnectWithoutProductInput | AssetItemCreateOrConnectWithoutProductInput[]
    createMany?: AssetItemCreateManyProductInputEnvelope
    connect?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
  }

  export type RentalOrderCreateNestedManyWithoutProductInput = {
    create?: XOR<RentalOrderCreateWithoutProductInput, RentalOrderUncheckedCreateWithoutProductInput> | RentalOrderCreateWithoutProductInput[] | RentalOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutProductInput | RentalOrderCreateOrConnectWithoutProductInput[]
    createMany?: RentalOrderCreateManyProductInputEnvelope
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
  }

  export type AssetItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<AssetItemCreateWithoutProductInput, AssetItemUncheckedCreateWithoutProductInput> | AssetItemCreateWithoutProductInput[] | AssetItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AssetItemCreateOrConnectWithoutProductInput | AssetItemCreateOrConnectWithoutProductInput[]
    createMany?: AssetItemCreateManyProductInputEnvelope
    connect?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
  }

  export type RentalOrderUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<RentalOrderCreateWithoutProductInput, RentalOrderUncheckedCreateWithoutProductInput> | RentalOrderCreateWithoutProductInput[] | RentalOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutProductInput | RentalOrderCreateOrConnectWithoutProductInput[]
    createMany?: RentalOrderCreateManyProductInputEnvelope
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type AssetItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<AssetItemCreateWithoutProductInput, AssetItemUncheckedCreateWithoutProductInput> | AssetItemCreateWithoutProductInput[] | AssetItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AssetItemCreateOrConnectWithoutProductInput | AssetItemCreateOrConnectWithoutProductInput[]
    upsert?: AssetItemUpsertWithWhereUniqueWithoutProductInput | AssetItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: AssetItemCreateManyProductInputEnvelope
    set?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
    disconnect?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
    delete?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
    connect?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
    update?: AssetItemUpdateWithWhereUniqueWithoutProductInput | AssetItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: AssetItemUpdateManyWithWhereWithoutProductInput | AssetItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: AssetItemScalarWhereInput | AssetItemScalarWhereInput[]
  }

  export type RentalOrderUpdateManyWithoutProductNestedInput = {
    create?: XOR<RentalOrderCreateWithoutProductInput, RentalOrderUncheckedCreateWithoutProductInput> | RentalOrderCreateWithoutProductInput[] | RentalOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutProductInput | RentalOrderCreateOrConnectWithoutProductInput[]
    upsert?: RentalOrderUpsertWithWhereUniqueWithoutProductInput | RentalOrderUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: RentalOrderCreateManyProductInputEnvelope
    set?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    disconnect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    delete?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    update?: RentalOrderUpdateWithWhereUniqueWithoutProductInput | RentalOrderUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: RentalOrderUpdateManyWithWhereWithoutProductInput | RentalOrderUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: RentalOrderScalarWhereInput | RentalOrderScalarWhereInput[]
  }

  export type AssetItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<AssetItemCreateWithoutProductInput, AssetItemUncheckedCreateWithoutProductInput> | AssetItemCreateWithoutProductInput[] | AssetItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: AssetItemCreateOrConnectWithoutProductInput | AssetItemCreateOrConnectWithoutProductInput[]
    upsert?: AssetItemUpsertWithWhereUniqueWithoutProductInput | AssetItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: AssetItemCreateManyProductInputEnvelope
    set?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
    disconnect?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
    delete?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
    connect?: AssetItemWhereUniqueInput | AssetItemWhereUniqueInput[]
    update?: AssetItemUpdateWithWhereUniqueWithoutProductInput | AssetItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: AssetItemUpdateManyWithWhereWithoutProductInput | AssetItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: AssetItemScalarWhereInput | AssetItemScalarWhereInput[]
  }

  export type RentalOrderUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<RentalOrderCreateWithoutProductInput, RentalOrderUncheckedCreateWithoutProductInput> | RentalOrderCreateWithoutProductInput[] | RentalOrderUncheckedCreateWithoutProductInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutProductInput | RentalOrderCreateOrConnectWithoutProductInput[]
    upsert?: RentalOrderUpsertWithWhereUniqueWithoutProductInput | RentalOrderUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: RentalOrderCreateManyProductInputEnvelope
    set?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    disconnect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    delete?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    update?: RentalOrderUpdateWithWhereUniqueWithoutProductInput | RentalOrderUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: RentalOrderUpdateManyWithWhereWithoutProductInput | RentalOrderUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: RentalOrderScalarWhereInput | RentalOrderScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutAssetsInput = {
    create?: XOR<ProductCreateWithoutAssetsInput, ProductUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAssetsInput
    connect?: ProductWhereUniqueInput
  }

  export type RentalOrderCreateNestedManyWithoutAssignedAssetInput = {
    create?: XOR<RentalOrderCreateWithoutAssignedAssetInput, RentalOrderUncheckedCreateWithoutAssignedAssetInput> | RentalOrderCreateWithoutAssignedAssetInput[] | RentalOrderUncheckedCreateWithoutAssignedAssetInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutAssignedAssetInput | RentalOrderCreateOrConnectWithoutAssignedAssetInput[]
    createMany?: RentalOrderCreateManyAssignedAssetInputEnvelope
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
  }

  export type RentalOrderUncheckedCreateNestedManyWithoutAssignedAssetInput = {
    create?: XOR<RentalOrderCreateWithoutAssignedAssetInput, RentalOrderUncheckedCreateWithoutAssignedAssetInput> | RentalOrderCreateWithoutAssignedAssetInput[] | RentalOrderUncheckedCreateWithoutAssignedAssetInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutAssignedAssetInput | RentalOrderCreateOrConnectWithoutAssignedAssetInput[]
    createMany?: RentalOrderCreateManyAssignedAssetInputEnvelope
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutAssetsNestedInput = {
    create?: XOR<ProductCreateWithoutAssetsInput, ProductUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAssetsInput
    upsert?: ProductUpsertWithoutAssetsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutAssetsInput, ProductUpdateWithoutAssetsInput>, ProductUncheckedUpdateWithoutAssetsInput>
  }

  export type RentalOrderUpdateManyWithoutAssignedAssetNestedInput = {
    create?: XOR<RentalOrderCreateWithoutAssignedAssetInput, RentalOrderUncheckedCreateWithoutAssignedAssetInput> | RentalOrderCreateWithoutAssignedAssetInput[] | RentalOrderUncheckedCreateWithoutAssignedAssetInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutAssignedAssetInput | RentalOrderCreateOrConnectWithoutAssignedAssetInput[]
    upsert?: RentalOrderUpsertWithWhereUniqueWithoutAssignedAssetInput | RentalOrderUpsertWithWhereUniqueWithoutAssignedAssetInput[]
    createMany?: RentalOrderCreateManyAssignedAssetInputEnvelope
    set?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    disconnect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    delete?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    update?: RentalOrderUpdateWithWhereUniqueWithoutAssignedAssetInput | RentalOrderUpdateWithWhereUniqueWithoutAssignedAssetInput[]
    updateMany?: RentalOrderUpdateManyWithWhereWithoutAssignedAssetInput | RentalOrderUpdateManyWithWhereWithoutAssignedAssetInput[]
    deleteMany?: RentalOrderScalarWhereInput | RentalOrderScalarWhereInput[]
  }

  export type RentalOrderUncheckedUpdateManyWithoutAssignedAssetNestedInput = {
    create?: XOR<RentalOrderCreateWithoutAssignedAssetInput, RentalOrderUncheckedCreateWithoutAssignedAssetInput> | RentalOrderCreateWithoutAssignedAssetInput[] | RentalOrderUncheckedCreateWithoutAssignedAssetInput[]
    connectOrCreate?: RentalOrderCreateOrConnectWithoutAssignedAssetInput | RentalOrderCreateOrConnectWithoutAssignedAssetInput[]
    upsert?: RentalOrderUpsertWithWhereUniqueWithoutAssignedAssetInput | RentalOrderUpsertWithWhereUniqueWithoutAssignedAssetInput[]
    createMany?: RentalOrderCreateManyAssignedAssetInputEnvelope
    set?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    disconnect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    delete?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    connect?: RentalOrderWhereUniqueInput | RentalOrderWhereUniqueInput[]
    update?: RentalOrderUpdateWithWhereUniqueWithoutAssignedAssetInput | RentalOrderUpdateWithWhereUniqueWithoutAssignedAssetInput[]
    updateMany?: RentalOrderUpdateManyWithWhereWithoutAssignedAssetInput | RentalOrderUpdateManyWithWhereWithoutAssignedAssetInput[]
    deleteMany?: RentalOrderScalarWhereInput | RentalOrderScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrdersInput
    connect?: ProductWhereUniqueInput
  }

  export type AssetItemCreateNestedOneWithoutOrdersInput = {
    create?: XOR<AssetItemCreateWithoutOrdersInput, AssetItemUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AssetItemCreateOrConnectWithoutOrdersInput
    connect?: AssetItemWhereUniqueInput
  }

  export type RentalInspectionCreateNestedOneWithoutRentalOrderInput = {
    create?: XOR<RentalInspectionCreateWithoutRentalOrderInput, RentalInspectionUncheckedCreateWithoutRentalOrderInput>
    connectOrCreate?: RentalInspectionCreateOrConnectWithoutRentalOrderInput
    connect?: RentalInspectionWhereUniqueInput
  }

  export type RentalInspectionUncheckedCreateNestedOneWithoutRentalOrderInput = {
    create?: XOR<RentalInspectionCreateWithoutRentalOrderInput, RentalInspectionUncheckedCreateWithoutRentalOrderInput>
    connectOrCreate?: RentalInspectionCreateOrConnectWithoutRentalOrderInput
    connect?: RentalInspectionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type ProductUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrdersInput
    upsert?: ProductUpsertWithoutOrdersInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrdersInput, ProductUpdateWithoutOrdersInput>, ProductUncheckedUpdateWithoutOrdersInput>
  }

  export type AssetItemUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<AssetItemCreateWithoutOrdersInput, AssetItemUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AssetItemCreateOrConnectWithoutOrdersInput
    upsert?: AssetItemUpsertWithoutOrdersInput
    disconnect?: AssetItemWhereInput | boolean
    delete?: AssetItemWhereInput | boolean
    connect?: AssetItemWhereUniqueInput
    update?: XOR<XOR<AssetItemUpdateToOneWithWhereWithoutOrdersInput, AssetItemUpdateWithoutOrdersInput>, AssetItemUncheckedUpdateWithoutOrdersInput>
  }

  export type RentalInspectionUpdateOneWithoutRentalOrderNestedInput = {
    create?: XOR<RentalInspectionCreateWithoutRentalOrderInput, RentalInspectionUncheckedCreateWithoutRentalOrderInput>
    connectOrCreate?: RentalInspectionCreateOrConnectWithoutRentalOrderInput
    upsert?: RentalInspectionUpsertWithoutRentalOrderInput
    disconnect?: RentalInspectionWhereInput | boolean
    delete?: RentalInspectionWhereInput | boolean
    connect?: RentalInspectionWhereUniqueInput
    update?: XOR<XOR<RentalInspectionUpdateToOneWithWhereWithoutRentalOrderInput, RentalInspectionUpdateWithoutRentalOrderInput>, RentalInspectionUncheckedUpdateWithoutRentalOrderInput>
  }

  export type RentalInspectionUncheckedUpdateOneWithoutRentalOrderNestedInput = {
    create?: XOR<RentalInspectionCreateWithoutRentalOrderInput, RentalInspectionUncheckedCreateWithoutRentalOrderInput>
    connectOrCreate?: RentalInspectionCreateOrConnectWithoutRentalOrderInput
    upsert?: RentalInspectionUpsertWithoutRentalOrderInput
    disconnect?: RentalInspectionWhereInput | boolean
    delete?: RentalInspectionWhereInput | boolean
    connect?: RentalInspectionWhereUniqueInput
    update?: XOR<XOR<RentalInspectionUpdateToOneWithWhereWithoutRentalOrderInput, RentalInspectionUpdateWithoutRentalOrderInput>, RentalInspectionUncheckedUpdateWithoutRentalOrderInput>
  }

  export type RentalOrderCreateNestedOneWithoutInspectionInput = {
    create?: XOR<RentalOrderCreateWithoutInspectionInput, RentalOrderUncheckedCreateWithoutInspectionInput>
    connectOrCreate?: RentalOrderCreateOrConnectWithoutInspectionInput
    connect?: RentalOrderWhereUniqueInput
  }

  export type RentalOrderUpdateOneRequiredWithoutInspectionNestedInput = {
    create?: XOR<RentalOrderCreateWithoutInspectionInput, RentalOrderUncheckedCreateWithoutInspectionInput>
    connectOrCreate?: RentalOrderCreateOrConnectWithoutInspectionInput
    upsert?: RentalOrderUpsertWithoutInspectionInput
    connect?: RentalOrderWhereUniqueInput
    update?: XOR<XOR<RentalOrderUpdateToOneWithWhereWithoutInspectionInput, RentalOrderUpdateWithoutInspectionInput>, RentalOrderUncheckedUpdateWithoutInspectionInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type RentalOrderCreateWithoutCustomerInput = {
    id?: string
    orderNumber: string
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutOrdersInput
    assignedAsset?: AssetItemCreateNestedOneWithoutOrdersInput
    inspection?: RentalInspectionCreateNestedOneWithoutRentalOrderInput
  }

  export type RentalOrderUncheckedCreateWithoutCustomerInput = {
    id?: string
    orderNumber: string
    productId: string
    assignedAssetId?: string | null
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inspection?: RentalInspectionUncheckedCreateNestedOneWithoutRentalOrderInput
  }

  export type RentalOrderCreateOrConnectWithoutCustomerInput = {
    where: RentalOrderWhereUniqueInput
    create: XOR<RentalOrderCreateWithoutCustomerInput, RentalOrderUncheckedCreateWithoutCustomerInput>
  }

  export type RentalOrderCreateManyCustomerInputEnvelope = {
    data: RentalOrderCreateManyCustomerInput | RentalOrderCreateManyCustomerInput[]
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    channel?: string
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    channel?: string
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
  }

  export type RentalOrderUpsertWithWhereUniqueWithoutCustomerInput = {
    where: RentalOrderWhereUniqueInput
    update: XOR<RentalOrderUpdateWithoutCustomerInput, RentalOrderUncheckedUpdateWithoutCustomerInput>
    create: XOR<RentalOrderCreateWithoutCustomerInput, RentalOrderUncheckedCreateWithoutCustomerInput>
  }

  export type RentalOrderUpdateWithWhereUniqueWithoutCustomerInput = {
    where: RentalOrderWhereUniqueInput
    data: XOR<RentalOrderUpdateWithoutCustomerInput, RentalOrderUncheckedUpdateWithoutCustomerInput>
  }

  export type RentalOrderUpdateManyWithWhereWithoutCustomerInput = {
    where: RentalOrderScalarWhereInput
    data: XOR<RentalOrderUpdateManyMutationInput, RentalOrderUncheckedUpdateManyWithoutCustomerInput>
  }

  export type RentalOrderScalarWhereInput = {
    AND?: RentalOrderScalarWhereInput | RentalOrderScalarWhereInput[]
    OR?: RentalOrderScalarWhereInput[]
    NOT?: RentalOrderScalarWhereInput | RentalOrderScalarWhereInput[]
    id?: StringFilter<"RentalOrder"> | string
    orderNumber?: StringFilter<"RentalOrder"> | string
    customerId?: StringFilter<"RentalOrder"> | string
    productId?: StringFilter<"RentalOrder"> | string
    assignedAssetId?: StringNullableFilter<"RentalOrder"> | string | null
    startDate?: DateTimeFilter<"RentalOrder"> | Date | string
    endDate?: DateTimeFilter<"RentalOrder"> | Date | string
    totalDays?: IntFilter<"RentalOrder"> | number
    dailyRate?: FloatFilter<"RentalOrder"> | number
    rentTotal?: FloatFilter<"RentalOrder"> | number
    depositAmount?: FloatFilter<"RentalOrder"> | number
    discountAmount?: FloatFilter<"RentalOrder"> | number
    grandTotal?: FloatFilter<"RentalOrder"> | number
    status?: StringFilter<"RentalOrder"> | string
    paymentStatus?: StringFilter<"RentalOrder"> | string
    paymentMethod?: StringFilter<"RentalOrder"> | string
    paymentSlipUrl?: StringNullableFilter<"RentalOrder"> | string | null
    paymentReference?: StringNullableFilter<"RentalOrder"> | string | null
    paidAt?: DateTimeNullableFilter<"RentalOrder"> | Date | string | null
    paymentVerifiedAt?: DateTimeNullableFilter<"RentalOrder"> | Date | string | null
    paymentVerifiedBy?: StringNullableFilter<"RentalOrder"> | string | null
    termsAccepted?: BoolFilter<"RentalOrder"> | boolean
    termsAcceptedAt?: DateTimeFilter<"RentalOrder"> | Date | string
    deliveryAddress?: StringNullableFilter<"RentalOrder"> | string | null
    customerNotes?: StringNullableFilter<"RentalOrder"> | string | null
    adminNotes?: StringNullableFilter<"RentalOrder"> | string | null
    createdAt?: DateTimeFilter<"RentalOrder"> | Date | string
    updatedAt?: DateTimeFilter<"RentalOrder"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    channel?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    name: string
    brand: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assets?: AssetItemCreateNestedManyWithoutProductInput
    orders?: RentalOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    brand: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assets?: AssetItemUncheckedCreateNestedManyWithoutProductInput
    orders?: RentalOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    brand?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    model?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    specs?: StringFilter<"Product"> | string
    accessoriesIncluded?: StringFilter<"Product"> | string
    dailyRate?: FloatFilter<"Product"> | number
    weeklyRate?: FloatFilter<"Product"> | number
    depositAmount?: FloatFilter<"Product"> | number
    imageUrl?: StringFilter<"Product"> | string
    galleryImages?: StringNullableFilter<"Product"> | string | null
    minRentalDays?: IntFilter<"Product"> | number
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type AssetItemCreateWithoutProductInput = {
    id?: string
    serialNumber: string
    status?: string
    conditionNotes?: string | null
    purchaseDate?: Date | string | null
    lastInspectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: RentalOrderCreateNestedManyWithoutAssignedAssetInput
  }

  export type AssetItemUncheckedCreateWithoutProductInput = {
    id?: string
    serialNumber: string
    status?: string
    conditionNotes?: string | null
    purchaseDate?: Date | string | null
    lastInspectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: RentalOrderUncheckedCreateNestedManyWithoutAssignedAssetInput
  }

  export type AssetItemCreateOrConnectWithoutProductInput = {
    where: AssetItemWhereUniqueInput
    create: XOR<AssetItemCreateWithoutProductInput, AssetItemUncheckedCreateWithoutProductInput>
  }

  export type AssetItemCreateManyProductInputEnvelope = {
    data: AssetItemCreateManyProductInput | AssetItemCreateManyProductInput[]
  }

  export type RentalOrderCreateWithoutProductInput = {
    id?: string
    orderNumber: string
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: UserCreateNestedOneWithoutOrdersInput
    assignedAsset?: AssetItemCreateNestedOneWithoutOrdersInput
    inspection?: RentalInspectionCreateNestedOneWithoutRentalOrderInput
  }

  export type RentalOrderUncheckedCreateWithoutProductInput = {
    id?: string
    orderNumber: string
    customerId: string
    assignedAssetId?: string | null
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inspection?: RentalInspectionUncheckedCreateNestedOneWithoutRentalOrderInput
  }

  export type RentalOrderCreateOrConnectWithoutProductInput = {
    where: RentalOrderWhereUniqueInput
    create: XOR<RentalOrderCreateWithoutProductInput, RentalOrderUncheckedCreateWithoutProductInput>
  }

  export type RentalOrderCreateManyProductInputEnvelope = {
    data: RentalOrderCreateManyProductInput | RentalOrderCreateManyProductInput[]
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetItemUpsertWithWhereUniqueWithoutProductInput = {
    where: AssetItemWhereUniqueInput
    update: XOR<AssetItemUpdateWithoutProductInput, AssetItemUncheckedUpdateWithoutProductInput>
    create: XOR<AssetItemCreateWithoutProductInput, AssetItemUncheckedCreateWithoutProductInput>
  }

  export type AssetItemUpdateWithWhereUniqueWithoutProductInput = {
    where: AssetItemWhereUniqueInput
    data: XOR<AssetItemUpdateWithoutProductInput, AssetItemUncheckedUpdateWithoutProductInput>
  }

  export type AssetItemUpdateManyWithWhereWithoutProductInput = {
    where: AssetItemScalarWhereInput
    data: XOR<AssetItemUpdateManyMutationInput, AssetItemUncheckedUpdateManyWithoutProductInput>
  }

  export type AssetItemScalarWhereInput = {
    AND?: AssetItemScalarWhereInput | AssetItemScalarWhereInput[]
    OR?: AssetItemScalarWhereInput[]
    NOT?: AssetItemScalarWhereInput | AssetItemScalarWhereInput[]
    id?: StringFilter<"AssetItem"> | string
    productId?: StringFilter<"AssetItem"> | string
    serialNumber?: StringFilter<"AssetItem"> | string
    status?: StringFilter<"AssetItem"> | string
    conditionNotes?: StringNullableFilter<"AssetItem"> | string | null
    purchaseDate?: DateTimeNullableFilter<"AssetItem"> | Date | string | null
    lastInspectedAt?: DateTimeNullableFilter<"AssetItem"> | Date | string | null
    createdAt?: DateTimeFilter<"AssetItem"> | Date | string
    updatedAt?: DateTimeFilter<"AssetItem"> | Date | string
  }

  export type RentalOrderUpsertWithWhereUniqueWithoutProductInput = {
    where: RentalOrderWhereUniqueInput
    update: XOR<RentalOrderUpdateWithoutProductInput, RentalOrderUncheckedUpdateWithoutProductInput>
    create: XOR<RentalOrderCreateWithoutProductInput, RentalOrderUncheckedCreateWithoutProductInput>
  }

  export type RentalOrderUpdateWithWhereUniqueWithoutProductInput = {
    where: RentalOrderWhereUniqueInput
    data: XOR<RentalOrderUpdateWithoutProductInput, RentalOrderUncheckedUpdateWithoutProductInput>
  }

  export type RentalOrderUpdateManyWithWhereWithoutProductInput = {
    where: RentalOrderScalarWhereInput
    data: XOR<RentalOrderUpdateManyMutationInput, RentalOrderUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductCreateWithoutAssetsInput = {
    id?: string
    name: string
    brand: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    orders?: RentalOrderCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutAssetsInput = {
    id?: string
    name: string
    brand: string
    categoryId: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: RentalOrderUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutAssetsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutAssetsInput, ProductUncheckedCreateWithoutAssetsInput>
  }

  export type RentalOrderCreateWithoutAssignedAssetInput = {
    id?: string
    orderNumber: string
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: UserCreateNestedOneWithoutOrdersInput
    product: ProductCreateNestedOneWithoutOrdersInput
    inspection?: RentalInspectionCreateNestedOneWithoutRentalOrderInput
  }

  export type RentalOrderUncheckedCreateWithoutAssignedAssetInput = {
    id?: string
    orderNumber: string
    customerId: string
    productId: string
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inspection?: RentalInspectionUncheckedCreateNestedOneWithoutRentalOrderInput
  }

  export type RentalOrderCreateOrConnectWithoutAssignedAssetInput = {
    where: RentalOrderWhereUniqueInput
    create: XOR<RentalOrderCreateWithoutAssignedAssetInput, RentalOrderUncheckedCreateWithoutAssignedAssetInput>
  }

  export type RentalOrderCreateManyAssignedAssetInputEnvelope = {
    data: RentalOrderCreateManyAssignedAssetInput | RentalOrderCreateManyAssignedAssetInput[]
  }

  export type ProductUpsertWithoutAssetsInput = {
    update: XOR<ProductUpdateWithoutAssetsInput, ProductUncheckedUpdateWithoutAssetsInput>
    create: XOR<ProductCreateWithoutAssetsInput, ProductUncheckedCreateWithoutAssetsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutAssetsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutAssetsInput, ProductUncheckedUpdateWithoutAssetsInput>
  }

  export type ProductUpdateWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    orders?: RentalOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: RentalOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type RentalOrderUpsertWithWhereUniqueWithoutAssignedAssetInput = {
    where: RentalOrderWhereUniqueInput
    update: XOR<RentalOrderUpdateWithoutAssignedAssetInput, RentalOrderUncheckedUpdateWithoutAssignedAssetInput>
    create: XOR<RentalOrderCreateWithoutAssignedAssetInput, RentalOrderUncheckedCreateWithoutAssignedAssetInput>
  }

  export type RentalOrderUpdateWithWhereUniqueWithoutAssignedAssetInput = {
    where: RentalOrderWhereUniqueInput
    data: XOR<RentalOrderUpdateWithoutAssignedAssetInput, RentalOrderUncheckedUpdateWithoutAssignedAssetInput>
  }

  export type RentalOrderUpdateManyWithWhereWithoutAssignedAssetInput = {
    where: RentalOrderScalarWhereInput
    data: XOR<RentalOrderUpdateManyMutationInput, RentalOrderUncheckedUpdateManyWithoutAssignedAssetInput>
  }

  export type UserCreateWithoutOrdersInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    phone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    kycStatus?: string
    kycIdCardImage?: string | null
    kycStudentIdImage?: string | null
    kycRejectReason?: string | null
    kycVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    phone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    kycStatus?: string
    kycIdCardImage?: string | null
    kycStudentIdImage?: string | null
    kycRejectReason?: string | null
    kycVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type ProductCreateWithoutOrdersInput = {
    id?: string
    name: string
    brand: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    assets?: AssetItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    brand: string
    categoryId: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assets?: AssetItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrdersInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
  }

  export type AssetItemCreateWithoutOrdersInput = {
    id?: string
    serialNumber: string
    status?: string
    conditionNotes?: string | null
    purchaseDate?: Date | string | null
    lastInspectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutAssetsInput
  }

  export type AssetItemUncheckedCreateWithoutOrdersInput = {
    id?: string
    productId: string
    serialNumber: string
    status?: string
    conditionNotes?: string | null
    purchaseDate?: Date | string | null
    lastInspectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetItemCreateOrConnectWithoutOrdersInput = {
    where: AssetItemWhereUniqueInput
    create: XOR<AssetItemCreateWithoutOrdersInput, AssetItemUncheckedCreateWithoutOrdersInput>
  }

  export type RentalInspectionCreateWithoutRentalOrderInput = {
    id?: string
    checkoutDate?: Date | string | null
    checkoutStaffName?: string | null
    checkoutNotes?: string | null
    checkoutImages?: string | null
    checkinDate?: Date | string | null
    checkinStaffName?: string | null
    checkinNotes?: string | null
    checkinImages?: string | null
    overdueDays?: number
    lateFeePerDay?: number
    totalLateFee?: number
    damageFee?: number
    damageDescription?: string | null
    originalDeposit?: number
    totalDeductions?: number
    finalRefundAmount?: number
    refundStatus?: string
    refundSlipUrl?: string | null
    refundBankName?: string | null
    refundBankAccount?: string | null
    refundPaidAt?: Date | string | null
    refundProcessedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalInspectionUncheckedCreateWithoutRentalOrderInput = {
    id?: string
    checkoutDate?: Date | string | null
    checkoutStaffName?: string | null
    checkoutNotes?: string | null
    checkoutImages?: string | null
    checkinDate?: Date | string | null
    checkinStaffName?: string | null
    checkinNotes?: string | null
    checkinImages?: string | null
    overdueDays?: number
    lateFeePerDay?: number
    totalLateFee?: number
    damageFee?: number
    damageDescription?: string | null
    originalDeposit?: number
    totalDeductions?: number
    finalRefundAmount?: number
    refundStatus?: string
    refundSlipUrl?: string | null
    refundBankName?: string | null
    refundBankAccount?: string | null
    refundPaidAt?: Date | string | null
    refundProcessedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalInspectionCreateOrConnectWithoutRentalOrderInput = {
    where: RentalInspectionWhereUniqueInput
    create: XOR<RentalInspectionCreateWithoutRentalOrderInput, RentalInspectionUncheckedCreateWithoutRentalOrderInput>
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    kycIdCardImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycStudentIdImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycRejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    kycIdCardImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycStudentIdImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycRejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProductUpsertWithoutOrdersInput = {
    update: XOR<ProductUpdateWithoutOrdersInput, ProductUncheckedUpdateWithoutOrdersInput>
    create: XOR<ProductCreateWithoutOrdersInput, ProductUncheckedCreateWithoutOrdersInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrdersInput, ProductUncheckedUpdateWithoutOrdersInput>
  }

  export type ProductUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    assets?: AssetItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assets?: AssetItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type AssetItemUpsertWithoutOrdersInput = {
    update: XOR<AssetItemUpdateWithoutOrdersInput, AssetItemUncheckedUpdateWithoutOrdersInput>
    create: XOR<AssetItemCreateWithoutOrdersInput, AssetItemUncheckedCreateWithoutOrdersInput>
    where?: AssetItemWhereInput
  }

  export type AssetItemUpdateToOneWithWhereWithoutOrdersInput = {
    where?: AssetItemWhereInput
    data: XOR<AssetItemUpdateWithoutOrdersInput, AssetItemUncheckedUpdateWithoutOrdersInput>
  }

  export type AssetItemUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutAssetsNestedInput
  }

  export type AssetItemUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalInspectionUpsertWithoutRentalOrderInput = {
    update: XOR<RentalInspectionUpdateWithoutRentalOrderInput, RentalInspectionUncheckedUpdateWithoutRentalOrderInput>
    create: XOR<RentalInspectionCreateWithoutRentalOrderInput, RentalInspectionUncheckedCreateWithoutRentalOrderInput>
    where?: RentalInspectionWhereInput
  }

  export type RentalInspectionUpdateToOneWithWhereWithoutRentalOrderInput = {
    where?: RentalInspectionWhereInput
    data: XOR<RentalInspectionUpdateWithoutRentalOrderInput, RentalInspectionUncheckedUpdateWithoutRentalOrderInput>
  }

  export type RentalInspectionUpdateWithoutRentalOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutImages?: NullableStringFieldUpdateOperationsInput | string | null
    checkinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkinStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkinNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkinImages?: NullableStringFieldUpdateOperationsInput | string | null
    overdueDays?: IntFieldUpdateOperationsInput | number
    lateFeePerDay?: FloatFieldUpdateOperationsInput | number
    totalLateFee?: FloatFieldUpdateOperationsInput | number
    damageFee?: FloatFieldUpdateOperationsInput | number
    damageDescription?: NullableStringFieldUpdateOperationsInput | string | null
    originalDeposit?: FloatFieldUpdateOperationsInput | number
    totalDeductions?: FloatFieldUpdateOperationsInput | number
    finalRefundAmount?: FloatFieldUpdateOperationsInput | number
    refundStatus?: StringFieldUpdateOperationsInput | string
    refundSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankName?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    refundPaidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundProcessedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalInspectionUncheckedUpdateWithoutRentalOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutImages?: NullableStringFieldUpdateOperationsInput | string | null
    checkinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkinStaffName?: NullableStringFieldUpdateOperationsInput | string | null
    checkinNotes?: NullableStringFieldUpdateOperationsInput | string | null
    checkinImages?: NullableStringFieldUpdateOperationsInput | string | null
    overdueDays?: IntFieldUpdateOperationsInput | number
    lateFeePerDay?: FloatFieldUpdateOperationsInput | number
    totalLateFee?: FloatFieldUpdateOperationsInput | number
    damageFee?: FloatFieldUpdateOperationsInput | number
    damageDescription?: NullableStringFieldUpdateOperationsInput | string | null
    originalDeposit?: FloatFieldUpdateOperationsInput | number
    totalDeductions?: FloatFieldUpdateOperationsInput | number
    finalRefundAmount?: FloatFieldUpdateOperationsInput | number
    refundStatus?: StringFieldUpdateOperationsInput | string
    refundSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankName?: NullableStringFieldUpdateOperationsInput | string | null
    refundBankAccount?: NullableStringFieldUpdateOperationsInput | string | null
    refundPaidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundProcessedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalOrderCreateWithoutInspectionInput = {
    id?: string
    orderNumber: string
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: UserCreateNestedOneWithoutOrdersInput
    product: ProductCreateNestedOneWithoutOrdersInput
    assignedAsset?: AssetItemCreateNestedOneWithoutOrdersInput
  }

  export type RentalOrderUncheckedCreateWithoutInspectionInput = {
    id?: string
    orderNumber: string
    customerId: string
    productId: string
    assignedAssetId?: string | null
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalOrderCreateOrConnectWithoutInspectionInput = {
    where: RentalOrderWhereUniqueInput
    create: XOR<RentalOrderCreateWithoutInspectionInput, RentalOrderUncheckedCreateWithoutInspectionInput>
  }

  export type RentalOrderUpsertWithoutInspectionInput = {
    update: XOR<RentalOrderUpdateWithoutInspectionInput, RentalOrderUncheckedUpdateWithoutInspectionInput>
    create: XOR<RentalOrderCreateWithoutInspectionInput, RentalOrderUncheckedCreateWithoutInspectionInput>
    where?: RentalOrderWhereInput
  }

  export type RentalOrderUpdateToOneWithWhereWithoutInspectionInput = {
    where?: RentalOrderWhereInput
    data: XOR<RentalOrderUpdateWithoutInspectionInput, RentalOrderUncheckedUpdateWithoutInspectionInput>
  }

  export type RentalOrderUpdateWithoutInspectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: UserUpdateOneRequiredWithoutOrdersNestedInput
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    assignedAsset?: AssetItemUpdateOneWithoutOrdersNestedInput
  }

  export type RentalOrderUncheckedUpdateWithoutInspectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    assignedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    phone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    kycStatus?: string
    kycIdCardImage?: string | null
    kycStudentIdImage?: string | null
    kycRejectReason?: string | null
    kycVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: RentalOrderCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    phone?: string | null
    address?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    kycStatus?: string
    kycIdCardImage?: string | null
    kycStudentIdImage?: string | null
    kycRejectReason?: string | null
    kycVerifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: RentalOrderUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    kycIdCardImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycStudentIdImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycRejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: RentalOrderUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    kycStatus?: StringFieldUpdateOperationsInput | string
    kycIdCardImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycStudentIdImage?: NullableStringFieldUpdateOperationsInput | string | null
    kycRejectReason?: NullableStringFieldUpdateOperationsInput | string | null
    kycVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: RentalOrderUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type RentalOrderCreateManyCustomerInput = {
    id?: string
    orderNumber: string
    productId: string
    assignedAssetId?: string | null
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    type?: string
    link?: string | null
    isRead?: boolean
    channel?: string
    createdAt?: Date | string
  }

  export type RentalOrderUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    assignedAsset?: AssetItemUpdateOneWithoutOrdersNestedInput
    inspection?: RentalInspectionUpdateOneWithoutRentalOrderNestedInput
  }

  export type RentalOrderUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    assignedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inspection?: RentalInspectionUncheckedUpdateOneWithoutRentalOrderNestedInput
  }

  export type RentalOrderUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    assignedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    channel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    channel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    channel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    name: string
    brand: string
    model: string
    description: string
    specs: string
    accessoriesIncluded: string
    dailyRate: number
    weeklyRate: number
    depositAmount: number
    imageUrl: string
    galleryImages?: string | null
    minRentalDays?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assets?: AssetItemUpdateManyWithoutProductNestedInput
    orders?: RentalOrderUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assets?: AssetItemUncheckedUpdateManyWithoutProductNestedInput
    orders?: RentalOrderUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    specs?: StringFieldUpdateOperationsInput | string
    accessoriesIncluded?: StringFieldUpdateOperationsInput | string
    dailyRate?: FloatFieldUpdateOperationsInput | number
    weeklyRate?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    galleryImages?: NullableStringFieldUpdateOperationsInput | string | null
    minRentalDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetItemCreateManyProductInput = {
    id?: string
    serialNumber: string
    status?: string
    conditionNotes?: string | null
    purchaseDate?: Date | string | null
    lastInspectedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalOrderCreateManyProductInput = {
    id?: string
    orderNumber: string
    customerId: string
    assignedAssetId?: string | null
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssetItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: RentalOrderUpdateManyWithoutAssignedAssetNestedInput
  }

  export type AssetItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: RentalOrderUncheckedUpdateManyWithoutAssignedAssetNestedInput
  }

  export type AssetItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    conditionNotes?: NullableStringFieldUpdateOperationsInput | string | null
    purchaseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastInspectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalOrderUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: UserUpdateOneRequiredWithoutOrdersNestedInput
    assignedAsset?: AssetItemUpdateOneWithoutOrdersNestedInput
    inspection?: RentalInspectionUpdateOneWithoutRentalOrderNestedInput
  }

  export type RentalOrderUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inspection?: RentalInspectionUncheckedUpdateOneWithoutRentalOrderNestedInput
  }

  export type RentalOrderUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    assignedAssetId?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalOrderCreateManyAssignedAssetInput = {
    id?: string
    orderNumber: string
    customerId: string
    productId: string
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    dailyRate: number
    rentTotal: number
    depositAmount: number
    discountAmount?: number
    grandTotal: number
    status?: string
    paymentStatus?: string
    paymentMethod?: string
    paymentSlipUrl?: string | null
    paymentReference?: string | null
    paidAt?: Date | string | null
    paymentVerifiedAt?: Date | string | null
    paymentVerifiedBy?: string | null
    termsAccepted?: boolean
    termsAcceptedAt?: Date | string
    deliveryAddress?: string | null
    customerNotes?: string | null
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalOrderUpdateWithoutAssignedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: UserUpdateOneRequiredWithoutOrdersNestedInput
    product?: ProductUpdateOneRequiredWithoutOrdersNestedInput
    inspection?: RentalInspectionUpdateOneWithoutRentalOrderNestedInput
  }

  export type RentalOrderUncheckedUpdateWithoutAssignedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inspection?: RentalInspectionUncheckedUpdateOneWithoutRentalOrderNestedInput
  }

  export type RentalOrderUncheckedUpdateManyWithoutAssignedAssetInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: IntFieldUpdateOperationsInput | number
    dailyRate?: FloatFieldUpdateOperationsInput | number
    rentTotal?: FloatFieldUpdateOperationsInput | number
    depositAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    grandTotal?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentSlipUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentVerifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    termsAcceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    customerNotes?: NullableStringFieldUpdateOperationsInput | string | null
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AssetItemCountOutputTypeDefaultArgs instead
     */
    export type AssetItemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AssetItemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AssetItemDefaultArgs instead
     */
    export type AssetItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AssetItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RentalOrderDefaultArgs instead
     */
    export type RentalOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RentalOrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RentalInspectionDefaultArgs instead
     */
    export type RentalInspectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RentalInspectionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}