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
import useLinotype from "../composables/useLinotype";
import useDump from "./../composables/useDump"

const { config, ref } = useLinotype();

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

const expend = ref(false);

const { jsonDump } = useDump();

const dump = jsonDump(props.data);
</script>

<style>
.linotype-dump {
  position: relative!important;
  margin-bottom: 0.1rem!important;
  background: #ddd!important;
  color: #333!important;
  font-family: monospace!important;
  font-size: 0.7rem!important;
  overflow: auto!important;
}

.linotype-dump pre {
  margin: 0!important;
  padding: 0!important;
}

.linotype-dump .title {
  padding: 1rem!important;
  color: #333!important;
  font-size: 0.8rem!important;
  cursor: pointer!important;
}

.linotype-dump .content {
  padding: 0 1rem 1rem 1rem!important;
  display: none!important;
}

.linotype-dump .content:hover {
  background: #ccc!important;
}

.linotype-dump.expend .title {
  background: #333!important;
  color: #cdcbcb!important;
}

.linotype-dump.expend .content {
  background: #333!important;
  color: #cdcbcb!important;
  display: inherit!important;
}

</style>