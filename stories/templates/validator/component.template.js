export const template = `
<div class="validator-base">
  <span class="validator-base__caption">Input</span>
  <div class="validator-base__block">
    <st-input v-model="inputValue"
              :validator="inputValidator"
              placeholder="Input" />
  </div>

  <span class="validator-base__caption">Select</span>
  <div class="validator-base__block">
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
</div>
`;
