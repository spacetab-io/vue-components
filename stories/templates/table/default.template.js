export const template = `
  <div>
    <st-table :columns="columns"
              :data="data"
              :bordered="bordered"
              :selected.sync="selected"
              :default-sort="defaultSort"
              :default-sort-direction="defaultSortDirection"
              :row-class="rowClass">

      <template v-slot:header="{ col, index }">
        <div v-if="index === 2"
             style="color: red">
             <span>{{ col.label }}</span>
        </div>
        <template v-else>
        <span>{{ col.label }}</span>
        </template>
      </template>

      <template v-slot:name_1="{ value, index }">
        <span>{{ value }}</span>
        <st-icon name="check"
                 v-if="index === 3"
                 style="color: blue" />
      </template>

      <template v-slot:name_3="{ value, index }">
      <span>{{ value }}</span>
        <st-icon name="cross-bold"
                 v-if="index === 6"
                 style="color: yellow" />
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

      <template v-slot:empty>
        <span>Data is empty</span>
      </template>

    </st-table>

    <h4>Selected</h4>
    <pre>{{ selected }}</pre>
  </div>
`;
