export type AutocompleteValue = string;

export type Suggestion = any;

export type FetchSuggestionsCallback<T> = (data: T[]) => void;

export type FetchSuggestions<T> = (query: string, callback: FetchSuggestionsCallback<T>) => void;

export type DebounceGetSuggestions = (value: string) => void;
