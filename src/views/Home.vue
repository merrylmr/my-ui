<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <my-select v-model="value" :clearable="true">
      <my-option
        v-for="i in 10"
        :label="i" :value="i"></my-option>
    </my-select>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        value: ''
      }
    }
  }
</script>
