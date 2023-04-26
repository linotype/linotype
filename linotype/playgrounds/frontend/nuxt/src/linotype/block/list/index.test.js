
/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils"
import index from "./index.vue"
import { describe, expect, test } from "vitest"

describe("list.vue", () => {
  test("render the list block", () => {
    const wrapper = mount(index, {
      props: {
        blockId: 'list-01',
        blockType: 'list',
        blockData: {
          reference: 'test',
          title: 'hello',
          content: 'this is the content'
        }
      },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["block--list"])
    )
  })
})