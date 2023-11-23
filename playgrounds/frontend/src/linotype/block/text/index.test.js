
/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils"
import index from "./index.vue"
import { describe, expect, test } from "vitest"

describe("text.vue", () => {
  test("render the text block", () => {
    const wrapper = mount(index, {
      props: {
        blockId: 'text-01',
        blockType: 'text',
        blockData: {
          reference: 'test',
          title: 'hello',
          content: 'this is the content'
        }
      },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["block--text"])
    )
  })
})