
/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils"
import index from "./index.vue"
import { describe, expect, test } from "vitest"

describe("nav.vue", () => {
  test("render the nav block", () => {
    const wrapper = mount(index, {
      props: {
        blockId: 'nav-01',
        blockType: 'nav',
        blockData: {
          reference: 'test',
          title: 'hello',
          content: 'this is the content'
        }
      },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["block--nav"])
    )
  })
})