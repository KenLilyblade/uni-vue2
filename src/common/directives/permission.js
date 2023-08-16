import store from '@/store/index'

export default Vue => {
  Vue.directive('permission', {
    inserted: function (el, { value } = binding) {
      if (value.length <= 0 || !value) throw new Error('有权限没有设置')
      //   const roles = store.state.pageRoles
      //   !roles.some(it => value.includes(it)) && el.remove()
      const roles = store.state.permissionStore.menuList
      console.log(el)
      !roles.find(it => value.includes(it.coding)) && el.remove()
    }
  })
}
