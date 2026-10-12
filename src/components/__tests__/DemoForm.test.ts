import { describe, expect, it, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import DemoForm from '../DemoForm.vue'

async function fill(w: ReturnType<typeof mount>) {
  await w.get('#demo-name').setValue('Ayu')
  await w.get('#demo-hotel').setValue('Hotel Contoh')
  await w.get('#demo-email').setValue('ayu@contoh.id')
}

afterEach(() => vi.restoreAllMocks())

describe('DemoForm', () => {
  it('shows no form when neither an endpoint nor an e-mail is configured', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const w = mount(DemoForm, { props: { site: { demoEndpoint: null, salesEmail: null } } })
    expect(w.find('[data-test="demo-closed"]').exists()).toBe(true)
    expect(w.find('form').exists()).toBe(false)
  })

  it('refuses to send without the required fields and says why', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const w = mount(DemoForm, { props: { site: { demoEndpoint: 'https://forms.example/x', salesEmail: null } } })
    await w.get('form').trigger('submit')
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(w.text()).toContain('Enter your name.')
    expect(w.get('#demo-email').attributes('aria-invalid')).toBe('true')
  })

  it('posts the request as JSON and confirms it', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }))
    const w = mount(DemoForm, { props: { site: { demoEndpoint: 'https://forms.example/x', salesEmail: null } } })
    await fill(w)
    await w.get('form').trigger('submit')
    await flushPromises()
    expect(fetchSpy).toHaveBeenCalledOnce()
    const [url, init] = fetchSpy.mock.calls[0]!
    expect(url).toBe('https://forms.example/x')
    expect(JSON.parse(String(init!.body))).toMatchObject({ name: 'Ayu', hotel: 'Hotel Contoh', email: 'ayu@contoh.id' })
    expect(w.find('[data-test="demo-sent"]').text()).toContain('ayu@contoh.id')
  })

  it('keeps the form and offers e-mail when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }))
    const w = mount(DemoForm, { props: { site: { demoEndpoint: 'https://forms.example/x', salesEmail: 'sales@contoh.id' } } })
    await fill(w)
    await w.get('form').trigger('submit')
    await flushPromises()
    const alert = w.get('[data-test="demo-failed"]')
    expect(alert.text()).toContain('sales@contoh.id')
    expect(w.find('form').exists()).toBe(true)
  })

  it('builds a mailto request when only an e-mail is configured', async () => {
    const w = mount(DemoForm, { props: { site: { demoEndpoint: null, salesEmail: 'sales@contoh.id' } } })
    expect(w.get('button[type="submit"]').text()).toBe('Request a demo by e-mail')
  })
})
