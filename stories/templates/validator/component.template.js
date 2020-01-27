export const template = `
<div class="validator-base">
  <div class="validator-base__block">
    <span class="validator-base__caption">Input</span>
    <st-input v-model="inputValue"
              :validator="inputValidator"
              placeholder="Input" />
  </div>

  <div class="validator-base__block">
    <span class="validator-base__caption">Select</span>
    <st-select :options="selectOptions"
               v-model="singleSelectValue"
               :validator="singleSelectValidator"
               clearable
               placeholder="Single Select" />
    <st-select :options="selectOptions"
               multiple
               v-model="multipleSelectValue"
               :validator="multipleSelectValidator"
               clearable
               placeholder="Multiple Select" />
  </div>

  <div class="validator-base__block">
    <span class="validator-base__caption">Autocomplete</span>
    <st-autocomplete v-model="autocompleteValue"
                     :fetch-suggestions="fetchAutocompleteSuggestions"
                     :validator="autocompleteValidator"
                     placeholder="Autocomplete" />
  </div>
</div>
`;
