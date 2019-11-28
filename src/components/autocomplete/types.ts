export type Suggestion = any;

export interface FetchSuggestions {
  (query: string, callback: FetchSuggestionsCallback): void
}

interface FetchSuggestionsCallback {
  (data: Suggestion[]): void;
}
