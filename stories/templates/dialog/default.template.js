export const template = `
<div>
    <st-button type="success" @click="vModel = !vModel">Open</st-button>
    <div v-for="i in 1000"
         v-if="pageLongContent">Long content</div>
    <st-dialog :key="key"
               v-model="vModel"
               :disable-overlay-close="disableOverlayClose"
               :disable-escape-close="disableEscapeClose"
               :width="width"
               :center-content="centerContent"
               :close-icon="closeIcon"
               :hide-close-icon="hideCloseIcon"
               :hide-overlay="hideOverlay"
               :placement="placement">
        <template slot="header">Deleting user "John Hadrik"</template>
        <span>Be care! You can not return this user after deleting!</span>
        <div v-if="dialogLongContent"
             v-for="i in 1000">Long content</div>
        <template slot="footer">
            <st-button type="info" @click="vModel = !vModel" plain>Cancel</st-button>
            <st-button type="danger" @click="vModel = !vModel" plain>Delete</st-button>
        </template>
    </st-dialog>  
</div>
`;
