import dialog from './dialog'

const install = function(Vue) {
  Vue.directive('dialogDrag', dialog)
}

dialog.install = install
export default dialog
