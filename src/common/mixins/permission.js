import { mapState } from 'vuex'
export default {
  install(Vue) {
    Vue.mixin({
      computed: {
        ...mapState({
          menuList: state => state.permissionStore.menuList
        })
      },
      methods: {
        hasPermission(routeCoding) {
          const boolean = this.menuList.some(it => it.coding === routeCoding)
          console.log('hasPermission: ', routeCoding, boolean)
          return boolean
        }
      }
    })
  }
}
