import { defineStore } from "pinia";

const useHeaderStore = defineStore("isCollapse", {
    persist: true,
    state: () => {
        return {
            isCollapse: false,
            selectMenu: [],
            menuActive: "1-1",
        };
    },
    actions: {
        addMenu(payload) {
            if (
                this.selectMenu.findIndex(
                    (item) => item.path === payload.path
                ) === -1
            ) {
                this.selectMenu.push(payload);
            }
        },
        closeTag(payload) {
            const index = this.selectMenu.findIndex(
                (item) => item.name === payload.name
            );
            this.selectMenu.splice(index, 1);
        },
        updateMenuActive(val) {
            this.menuActive = val;
        },
    },
    getters: {},
});
export default useHeaderStore;
