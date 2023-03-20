<template>
  <div class="linotype-page">
    <LinotypeLoading />
    <LinotypeTemplate />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LinotypePage'
}
</script>