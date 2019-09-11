export const template = `
    <st-pagination :list="list" 
                   :limit="size"
                   :initialPage="pageNumber" 
                   :groupedPages="groupSize" 
                   :showEmpty="showEmpty" 
                   :showBoundary="showBoundary" 
                   :prevStepIcon="prevStepIcon" 
                   :nextStepIcon="nextStepIcon" 
                   :firstPageIcon="firstPageIcon" 
                   :lastPageIcon="lastPageIcon" 
                   :prevStepLabel="prevStepLabel" 
                   :nextStepLabel="nextStepLabel" 
                   :firstPageLabel="firstPageLabel" 
                   :lastPageLabel="lastPageLabel" 
                   :showStep="showStep"></st-pagination>
`;
