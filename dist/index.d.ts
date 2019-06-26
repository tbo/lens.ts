export declare type Lens<T, U> = LensImpl<T, U> & LensProxy<T, U>;
export declare type LensProxy<T, U> = {
    readonly [K in keyof U]: Lens<T, U[K]>;
};
export declare class LensImpl<T, U> {
    private _get;
    private _set;
    constructor(_get: Getter<T, U>, _set: (value: U) => Setter<T>);
    k<K extends keyof U>(key: K): Lens<T, U[K]>;
    compose<V>(other: Lens<U, V>): Lens<T, V>;
    get(): Getter<T, U>;
    get<V>(f: Getter<U, V>): Getter<T, V>;
    set(value: U): Setter<T>;
    set(f: Setter<U>): Setter<T>;
}
export declare type Getter<T, V> = (target: T) => V;
export declare type Setter<T> = (target: T) => T;
export declare function lens<T>(): Lens<T, T>;
export declare function lens<T, U>(_get: Getter<T, U>, _set: (value: U) => Setter<T>): Lens<T, U>;
export declare type Prism<T, U> = LensImpl<T, U | undefined> & PrismProxy<T, U | undefined>;
export declare type PrismProxy<T, U> = {
    readonly [K in keyof U]-?: Prism<T, U[K]>;
};
export declare function prism<T>(): Prism<T, T>;
export declare function prism<T, U>(_get: Getter<T, U>, _set: (value: U) => Setter<T>): Prism<T, U>;
