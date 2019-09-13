export const template = `
  <div>
    <st-table :columns="columns"
              :data="data"
              :bordered="bordered"
              :selected.sync="selected"
              :sort-by="sortBy"
              :sort-direction="sortDirection"
              :row-class="rowClass"
              custom-row-key="id"
              client-sorting
              @sort="onSort">

      <template v-slot:th-key_2="{ col, index }">
        <div style="color: red">
          <span>{{ col.label }}</span>
        </div>
      </template>

      <template v-slot:td-id="{ value }">
        <div style="padding: 2px 4px; background: red; border-radius: 4px; color: white; text-align: center;">
        {{ value }}
        </div>
      </template>

      <template v-slot:td-name_1="{ value, index }">
        <span>{{ value }}</span>
        <st-icon name="check"
                 v-if="index === 3"
                 style="color: blue" />
      </template>

      <template v-slot:td-name_3="{ value, index }">
      <span>{{ value }}</span>
        <st-icon name="cross-bold"
                 v-if="index === 6"
                 style="color: yellow" />
      </template>

      <template v-slot:footer v-if="hasFooter">
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
