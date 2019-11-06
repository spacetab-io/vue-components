export const template = `
<div class="scroll-container">
    <st-scrollbar :minimum-scroll-size="minimumScrollSize"
                  :key="key">
        <p v-for="item in createRange(0, rows)">
            <template v-for="item2 in createRange(0, cols)">Hello {{item}} {{item2}} </template>
        </p>
    </st-scrollbar>
</div>
`;
