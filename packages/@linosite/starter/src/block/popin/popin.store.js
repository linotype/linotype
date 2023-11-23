const popins = ref([]);
const popinState = ref(false);

export function usePopin() {
  const popinToggle = () => {
    if (popinState.value == false) {
      popinState.value = true;
    } else {
      popinState.value = false;
    }
  };

  return {
    popinState,
    popinToggle,
  };
}
