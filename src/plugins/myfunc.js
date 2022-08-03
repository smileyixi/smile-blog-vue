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
    }
}