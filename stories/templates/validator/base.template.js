export const template = `
<div class="validator-base">
  <div class="validator-base__block">
    <div class="validator-base__status">
      Status value 1: {{isValid1}}
    </div>
    <button @click="validate">Force validate</button>
  </div>
  <div class="validator-base__block">
    <div class="validator-base__status">
      Status value 2: {{isValid2}}
    </div>
    <button @click="validate">Force validate</button>
  </div>
</div>
`;
