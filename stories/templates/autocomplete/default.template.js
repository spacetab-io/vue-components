export const template = `
<st-autocomplete :disabled="disabled"
                 :loading="loading"
                 :required="required"
                 :clearable="clearable"
                 :readonly="readonly"
                 :placeholder="placeholder"
                 :prefix-icon="prefixIcon"
                 :suffix-icon="suffixIcon"
                 :fetch-suggestions="fetchSuggestionsExample"
                 :fetch-suggestions-delay="fetchSuggestionsDelay"
                 :fetch-on-focus="fetchOnFocus"
                 :focus-after-clear="focusAfterClear"
                 :query-min-length="queryMinLength"
                 :close-on-select="closeOnSelect"
                 :dropdown-props="{ useReferenceWidth: useReferenceWidth }"
                 :close-on-clear="closeOnClear"
                 @select="onSelect"
                 :size="size"
                 :value="value">
  <template v-slot:suggestion="{ suggestion }">
    {{ suggestion.label }}
  </template>
</st-autocomplete>
`;
