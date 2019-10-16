export const template = `
<div class="storybook-components storybook-components--pagination">
  <st-pagination v-model="currentPage"
                 :total="rows.length" 
                 :per-page="perPage"
                 :grouped-pages="groupedPages" 
                 :show-empty="showEmpty" 
                 :show-boundary="showBoundary" 
                 :prev-step-icon="prevStepIcon" 
                 :next-step-icon="nextStepIcon" 
                 :first-page-Icon="firstPageIcon" 
                 :last-page-icon="lastPageIcon" 
                 :prev-step-label="prevStepLabel" 
                 :next-step-label="nextStepLabel" 
                 :first-page-label="firstPageLabel" 
                 :last-page-label="lastPageLabel" 
                 :show-step="showStep" 
                 @change:extended="onPageSelect" />
  <div class="example-section">
    <span class="example-section__label">This is an example with random data</span>
    <div class="example-section__block">
      <st-button @click="showPageData = !showPageData" type="info">
        {{ showPageData ? 'Hide' : 'Show' }} current page data      
      </st-button>
      <table v-if="showPageData">
        <thead>
          <tr>
            <th>number</th>
            <th>anyData</th>
          </tr>
        </thead>
        <tr v-for="item in currentPageData">
          <td>{{ item.number }}</td>
          <td>{{ item.anyData }}</td>
        </tr>
      </table>
    </div>
    
    <div class="example-section__block">
      <st-button @click="showAllData = !showAllData" type="info">
        {{ showAllData ? 'Hide' : 'Show' }} all data      
      </st-button>
      <table v-if="showAllData">
        <thead>
          <tr>
            <th>number</th>
            <th>anyData</th>
          </tr>
        </thead>
        <tr v-for="item in rows">
          <td>{{ item.number }}</td>
          <td>{{ item.anyData }}</td>
        </tr>
      </table>
    </div>
  </div>
</div>
`;
