
/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils"
import index from "./index.vue"
import { describe, expect, test } from "vitest"

describe("search.vue", () => {
  test("render the search block", () => {
    const wrapper = mount(index, {
      props: {
        blockId: 'search-01',
        blockType: 'search',
        blockData: {
          reference: 'test',
          title: 'hello',
          content: 'this is the content'
        }
      },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["block--search"])
    )
  })
})