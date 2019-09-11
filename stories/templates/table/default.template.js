export const template = `
  <div>
    <st-table :columns="columns"
              :data="data">

      <template v-slot:header="{ column, index }">
        <div v-if="index === 2"
             style="color: red">
          {{ column.label }}
        </div>
        <template v-else>
          {{ column.label }}
        </template>
      </template>

      <template v-slot:key_1="{ value, index }">
        {{ value }}
        <st-icon name="check"
                 v-if="index === 3"
                 style="color: blue" />
      </template>

      <template v-slot:key_3="{ value, index }">
      {{ value }}
      <st-icon name="cross-bold"
               v-if="index === 6"
               style="color: pink" />
    </template>

      <template v-slot:footer>
        <div>
          <st-icon name="arrow-left-long"
                   style="color: red" />
          &nbsp;
          <b>Footer slot content</b>
          &nbsp;
          <st-icon name="arrow-right-long"
                   style="color: green" />
        </div>
      </template>

    </st-table>
  </div>
`;
