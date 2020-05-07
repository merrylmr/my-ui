<template>
  <div class="zz-select"
       v-clickoutside="handleClose">
    <div class="zz-input zz-input--suffix"
         @mouseenter="inputHovering = true"
         @mouseleave="inputHovering = false">
      <input
        @focus="handleFocus"
        @blur="handleBlur"
        type="text"
        ref="reference"
        autocomplete="off"
        :placeholder="placeholder"
        readonly="readonly"
        v-model="selectedLabel"
        class="zz-input__inner">
      <span class="zz-input__suffix">
        <span class="zz-input__suffix-inner">
          <i v-if="!showClose"
             :class="{'is-reverse':visible}"
             class="zz-input__icon zz-select__caret  iconfont icon-jiantou1"></i>
         <i
           v-if="showClose"
           @click="handleClearClick"
           class="zz-input__icon zz-select__clear iconfont icon-iconfontzhizuobiaozhun46"></i>
        </span>
      </span>
    </div>
    <div class="zz-select-dropdown zz-popper"
         v-show="visible"
         ref="popper"
         :style="{ minWidth: inputWidth+'px' }"
         :class="popperClass">
      <div class="zz-scrollbar zz-select-dropdown__wrap">
        <ul class="zz-select-dropdown__list">
          <slot>
          </slot>
        </ul>
      </div>
      <!--arrow-->
      <div x-arrow
           class="popper__arrow"></div>
    </div>
  </div>
</template>
<script>
  import Popper from '../../../src/utils/popper.js'
  import Clickoutside from '../../../src/utils/clickoutside';

  export default {
    name: 'my-select',
    componentName: 'mySelect',
    provide() {
      return {
        'select': this
      };
    },
    data() {
      return {
        visible: false,
        inputWidth: 0,
        selectedLabel: '',
        cachedOptions: [],
        options: [],
        inputHovering: false
      }
    },
    props: {
      placeholder: {
        type: String
      },
      popperClass: {
        type: String
      },
      value: {
        required: true
      },
      clearable: {
        type: Boolean,
      }
    },
    computed: {
      showClose() {
        let hasValue = this.value !== undefined && this.value !== null && this.value !== '';
        let criteria = this.clearable &&
          this.inputHovering &&
          hasValue;
        return criteria;
      },
    },
    mixins: [Popper],
    directives: {Clickoutside},
    methods: {
      handleFocus() {
        this.visible = true
      },
      handleBlur() {
        // this.
      },
      handleClose() {
        this.visible = false;
      },
      resetInputWidth() {
        const reference = this.$refs.reference;
        if (reference) {
          this.inputWidth = reference.getBoundingClientRect().width;
        }
      },
      handleOptionSelect(option, byClick) {
        this.$emit('input', option.value);
        this.visible = false;
        this.selectedLabel = option.currentLabel
      },
      getOption(value) {
        let option = {value: '', label: ''};
        for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
          const cachedOption = this.cachedOptions[i];
          const isEqual = cachedOption.value === value;
          if (isEqual) {
            option = cachedOption;
            break;
          }
        }
        return option;
      },
      setSelected() {
        console.log('this.value', this.value);
        let option = this.getOption(this.value);
        this.selectedLabel = option.currentLabel;
        this.selected = option;
      },
      handleClearClick(event) {
        this.deleteSelected(event);
      },
      deleteSelected(event) {
        event.stopPropagation();
        this.selectedLabel = '';
        const value = '';
        this.$emit('input', value);
        this.visible = false;
        this.$emit('clear');
      },
    },
    mounted() {
      this.$on('handleOptionClick', this.handleOptionSelect)
      this.$nextTick(() => {
        this.resetInputWidth()
      })
      this.setSelected()
    }
  }
</script>