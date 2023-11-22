
/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils"
import index from "./index.vue"
import { describe, expect, test } from "vitest"

describe("loop.vue", () => {
  test("render the loop block", () => {
    const wrapper = mount(index, {
      props: {
        blockId: 'loop-01',
        blockType: 'loop',
        blockData: {
          reference: 'test',
          title: 'hello',
          content: 'this is the content'
        }
      },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["block--loop"])
    )
  })
})