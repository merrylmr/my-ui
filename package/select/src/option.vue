<template>
  <li class="zz-select-dropdown__item"
      :class="{ 'selected': itemSelected}"
      @click.stop="selectOptionClick">
    <slot>
      <span>{{currentLabel}}</span>
    </slot>
  </li>
</template>

<script>
  import Emitter from '../../../src/mixins/emitter';

  export default {
    name: 'my-option',
    props: {
      value: {
        require: true
      },
      label: [String, Number]
    },
    inject: ['select'],
    mixins: [Emitter],
    computed: {
      isObject() {
        return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]';
      },
      currentLabel() {
        return this.label || (this.isObject ? '' : this.value);
      },
      itemSelected() {
        return this.isEqual(this.value, this.select.value);
      },
    },
    methods: {
      isEqual(a, b) {
        if (!this.isObject) {
          return a === b;
        } else {

        }
      },
      selectOptionClick() {
        this.dispatch('mySelect', 'handleOptionClick', [this, true]);
      }
    },
    created() {
      this.select.options.push(this);
      this.select.cachedOptions.push(this);
    }
  }
</script>