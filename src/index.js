import Select from '../package/select/index.js'
import Option from '../package/option/index.js'

const components = [Select, Option];
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install