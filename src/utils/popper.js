import PopperJS from 'popper.js'

const popperMixin = {
  data() {
    return {
      popperJS: null
    }
  },
  props: {
    popperOptions: {
      type: Object,
      default() {
        return {
          modifiers: {
            // gpuAcceleration:默认为true，是否开启css3的transform来进行定位
            computeStyle: {gpuAcceleration: false},
            offset: {
              // 偏移：x,y
              offset: '0,0'
            }
          },
          // true:调用destroy方法时，顺便移除popper元素
          // removeOnDestroy: true,
          placement: 'top',
          // 箭头
          arrow: {
            element: '[x-arrow]'
          }
        };
      }
    },
  },
  methods: {
    createPopper({reference, popper, appendToBody, appendDom, fn, options}) {
      options = Object.assign(this.popperOptions, options);
      console.log('options', options)
      if (appendToBody) {
        document.body.appendChild(popper)
      }
      // 添加到某个dom
      if (appendDom) {
        document.querySelector(appendDom).appendChild(popper)
      }
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy()
      }
      this.popperJS = new PopperJS(
        reference,
        popper,
        options
      )

      if (this.popperJS.popper) {
        fn && fn(this.popperJS)
      }
    },
    updatePopper({reference, popper, appendDom, appendToBody, fn, options}) {
      const popperJS = this.popperJS;
      options = Object.assign(this.popperOptions, options);
      if (popperJS) {
        popperJS.update();
        if (popperJS.popper) {
          fn && fn(popperJS)
        }
      } else {
        this.createPopper({reference, popper, appendDom, appendToBody, fn, options});
      }
    },
    destroyPopper() {
      if (this.popperJS) {
        this.popperJS.destroy()
      }
    }
  },
  beforeDestroy() {
    this.destroyPopper()
  }
}

export default popperMixin
