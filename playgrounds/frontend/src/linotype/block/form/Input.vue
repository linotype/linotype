<template>
  <div class="w-full relative p-0 border-none bg-transparent">
    <input v-if="isInput" v-bind="$attrs" :value="modelValue" class="form-control" @input="$emit('update:modelValue', $event.target.value)" />
    <div v-if="isRadio && options?.length" class="flex gap-4 items-center flex-wrap">
      <template v-for="(option, index) in options" :key="index">
        <input v-bind="$attrs" :id="option.id" :value="option.id" type="radio" :name="title" @input="$emit('update:modelValue', $event.target.value)" />
        <label :for="option.id" :class="{ selected: modelValue === option.id }"> {{ option.title }} </label>
      </template>
      <div v-if="options.find((o) => o.id === modelValue)?.informations" class="option-informations" v-html="options.find((o) => o.id === modelValue)?.informations" />
    </div>
    <textarea v-if="isTextArea" v-bind="$attrs" :value="modelValue" class="form-control" rows="4" @input="$emit('update:modelValue', $event.target.value)" />
    <Icon v-if="icon" size="20" class="absolute right-2 top-0 bottom-0 my-auto text-text-secondary" :name="icon" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | number
    icon?: string
    type?: string
    title?: string
    options?: Array<{ id: string; title: string; informations?: string }>
  }>(),
  {
    type: 'input',
    title: '',
    options: undefined,
    icon: undefined,
  },
)

const isInput = computed(() => ['input', 'email'].includes(props.type))
const isRadio = computed(() => props.type === 'radio')
const isTextArea = computed(() => props.type === 'textarea')
</script>

<style scoped>

</style>
