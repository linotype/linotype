<template>
  <div :id="`${props.blockType}-${props.blockId}`" :class="`block-${props.blockType}`" :data-reference="props.blockData.reference">

    <div class="lg:w-8/12">
      <h1 class="block-forms__title">{{ blockData.title }}</h1>
      <div v-if="blockData.description" class="block-forms__content" v-html="blockData.description" />
      <form class="block-forms__form" @submit.prevent.stop="onSubmit">
        <template v-for="(field, index) in blockData.form.fields" :key="index">
          <Input v-model="form[field.id]" :type="field.type" :placeholder="field.title" :title="field.title" :options="field.options" :class="[field.fullwidth ? 'lg:col-span-2' : 'col-span-1', { error: hasError(field.id) }]" />
        </template>
        <span v-if="blockData.infos" class="text-sm text-white lg:col-span-2" v-html="blockData.infos" />
        <div v-if="error" class="rounded-lg bg-red-100 text-red-500 lg:col-span-2 p-4">Un ou plusieurs champs sont manquants ou erronés.</div>
        <div>
          <Button type="submit" :disabled="pendingMailer">Envoyer ma demande</Button>
        </div>
      </form>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const props = defineProps<{
  blockId: number
  blockType: string
  blockData: {
    reference: string
    title: string
    description?: string
    form: { 
      id: number 
      fields: Array<any>
    }
    infos?: string
    background: {
      id: string
    }
    breadcrumbs: boolean
  }
}>()



const config = useRuntimeConfig()

const error = ref(false)

const form = reactive(
  props.blockData.form.fields.reduce((acc, field) => {
    acc[field.id] = null
    return acc
  }, {}),
)

const rules = computed(() =>
  props.blockData.form.fields.reduce((acc, field) => {
    if (field.id === 'email') {
      acc[field.id] = { required, email }
    }
    if (field.id !== 'societe') {
      acc[field.id] = { required }
    }
    return acc
  }, {}),
)

const v$ = useVuelidate(rules, form)

const hasError = (fieldId: string) => {
  if (fieldId && v$.value[fieldId]) {
    return v$.value[fieldId].$error
  }
  return false
}
  
const { data: dataMailer, error: errorMailer, execute: executeMailer, pending: pendingMailer } = await useFetch(`${config.public.linotype.backend_url}/linotype/send`, {
  method: 'post',
  lazy: true,
  immediate: false,
  watch: false,
  dedupe: 'defer',
  body: {
    form: props.blockData.form.id,
    subject: form.value?.subject,
    message: form.value?.message,
    data: form.value
  },
})

//[Nuxt Issue] Force the pending state to false when the immediate option is set to false
pendingMailer.value = false

const onSubmit = async () => {
  await v$.value.$validate()
  error.value = false
  if (v$.value.$error) {
    error.value = true
  }
  executeMailer()
  if ( errorMailer ) {
    console.log('errorMailer', errorMailer)
    error.value = true
  } else {
    console.log('dataMailer', dataMailer)
  }
}
</script>

<style scoped>
.block-forms {
  text-align: left;
  background:
    linear-gradient(
      90deg,
      rgba(49, 34, 58, 0.78) 26.6%,
      rgba(49, 34, 58, 0.46) 63.68%,
      rgba(49, 34, 58, 0) 99.06%
    ),
    var(--form-bg),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  background-position: center;
}
.block-forms .block-forms__content {
  font-size: 1.25rem;
}
@media (min-width: 1024px) {
  .block-forms .block-forms__content {
    font-size: 2rem;
  }
}
.block-forms__title {
  text-transform: uppercase;
  white-space: pre-wrap;
  font-size: 2.25rem;
  margin-bottom: 30px;
}
@media (min-width: 1024px) {
  .block-forms__title {
    font-size: 3rem;
  }
}
.block-forms__form {
  margin-top: 1.75rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  color: #1f2937;
}
@media (min-width: 1024px) {
  .block-forms__form {
    grid-template-columns: 1fr 1fr;
  }
}
.block-forms__form :deep(input) {
  height: 3rem;
}
.block-forms__form :deep(input[type='radio']) {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: none;
}
.block-forms__form :deep(input[type='radio']) ~ label {
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}
.block-forms__form :deep(input[type='radio']) ~ label::before {
  display: block;
  background: transparent;
  transition: background 0.15s ease-in-out;
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  border: 1px solid #6366f1;
  content: '';
}
.block-forms__form :deep(input[type='radio']) ~ label.selected {
  color: #6366f1;
}
.block-forms__form :deep(input[type='radio']) ~ label.selected::after {
  position: absolute;
  display: block;
  background: #6366f1;
  transition: background 0.15s ease-in-out;
  flex-shrink: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  border: 1px solid #6366f1;
  margin-left: 0.5rem;
  content: '';
}
.block-forms__form :deep(.error) {
  border: 1px solid #ef4444;
}
.block-forms__form :deep(.error) input,
.block-forms__form :deep(.error) textarea {
  background: #fef2f2;
}
.block-forms__form :deep(.error) input ~ label {
  color: #ef4444;
}
</style>
