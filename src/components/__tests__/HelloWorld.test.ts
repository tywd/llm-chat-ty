import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Hello Vitest'
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toContain(msg)
  })

  it('increments count when button is clicked', async () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: 'Hello Vitest' }
    })
    
    const button = wrapper.find('button')
    expect(button.text()).toBe('count is 0')
    
    await button.trigger('click')
    expect(button.text()).toBe('count is 1')
  })
})