import Vue from 'vue'


export default Vue.prototype.$func = {
    /**
     * 滑动网页
     * @param {String} position 定位
     * @param {Object} els 需要滑动的元素
     */
    scrollInto: (position, els) => {
        const el = els || document.documentElement
        el.scrollIntoView({
            block: position ||'start',
            behavior: 'smooth',
        })
    },

    /**
     * 本地时区
     * @param {Date} date 
     * @returns 
     */
    localDate: (date) => {
        const d = new Date(date || Date.now());
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString();
    }
}