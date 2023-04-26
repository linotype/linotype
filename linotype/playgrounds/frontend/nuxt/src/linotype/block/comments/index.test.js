
/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils"
import index from "./index.vue"
import { describe, expect, test } from "vitest"

describe("comments.vue", () => {
  test("render the comments block", () => {
    const wrapper = mount(index, {
      props: {
        blockId: 'comments-01',
        blockType: 'comments',
        blockData: {
          reference: 'test',
          collection: '',
          view: 'all',
        }
      },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["block--comments"])
    )
  })
})