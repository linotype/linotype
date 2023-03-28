<template>
  <div
    v-if="config.public.linotype.debug == 'true' || show == true"
    class="linotype-dump"
    :class="{ expend: expend }"
  >
    <div
      class="title"
      @click="expend ? (expend = false) : (expend = true)"
    >
      {{ title }}
    </div>
    <div class="content">
      <pre>{{ dump }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useDump from "./../composables/useDump"

const config = useRuntimeConfig()

const props = defineProps({
  title: {
    type: String,
    default: 'Untitled',
    require: false,
  },
  show: {
    type: Boolean,
    default: false,
    require: false,
  },
  data: {
    type: Object,
    required: true,
  },
});

const expend = ref();

const { jsonDump } = useDump();

const dump = jsonDump(props.data);
</script>

<style>
.linotype-dump {
  position: relative;
  margin-bottom: 0.1rem;
  background: #ddd;
  color: #333;
  font-family: monospace;
  font-size: 0.7rem;
  overflow: auto;
}

.linotype-dump .title {
  padding: 1rem;
  color: #333;
  font-size: 0.8rem;
  cursor: pointer;
}

.linotype-dump .content {
  padding: 0 1rem 1rem 1rem;
  display: none;
}

.linotype-dump .content:hover {
  background: #ccc;
}

.linotype-dump .content.expend {
  background: #333;
  color: #cdcbcb;
}

.linotype-dump .content.expend.title {
  color: #cdcbcb;
}

.linotype-dump .content.expend.content {
  display: inherit;
}

</style>