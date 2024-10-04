import { defineStore } from "pinia";

const useHeaderStore = defineStore("isCollapse", {
    persist: true,
    state: () => {
        return {
            isCollapse: false,
            selectMenu: [],
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
    },
    getters: {},
});
export default useHeaderStore;
