export const template = `
<div class="scroll-container">
    <st-scrollbar>
        <p v-for="item in createRange(0, 100)">
            <template v-for="item2 in createRange(0, 50)">Hello {{item}} {{item2}} </template>
        </p>
    </st-scrollbar>
</div>
`;
