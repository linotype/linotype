import { computed } from 'vue'

/**
 * @useDump
 *
 * @description
 * dump
 *
 * @author YannickArmspach
 * @since v1
 *
 */
const useDump = function () {
  const jsonDump = (value) => {
    return computed(() =>
      JSON.stringify(
        typeof value !== 'string'
          ? JSON.parse(JSON.stringify(value))
          : JSON.parse(value),
        null,
        2
      )
    );
  };

  return {
    jsonDump,
  };
};

export default useDump;
