
/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils"
import index from "./index.vue"
import { describe, expect, test } from "vitest"

describe("loop_item.vue", () => {
  test("render the loop_item block", () => {
    const wrapper = mount(index, {
      props: {
        blockId: 'loop_item-01',
        blockType: 'loop_item',
        blockData: {
          reference: 'test',
          title: 'hello',
          content: 'this is the content'
        }
      },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["block--loop_item"])
    )
  })
})