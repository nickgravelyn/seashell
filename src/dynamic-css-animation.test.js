import { DynamicCssAnimation } from './dynamic-css-animation'

beforeEach(() => {
  for (const style of document.querySelectorAll('style')) {
    style.parentNode.removeChild(style)
  }
})

test('can get animation name', () => {
  const animation = new DynamicCssAnimation()
  expect(animation.name).toContain('seashell-')
})

test('animation names are unique', () => {
  const animation1 = new DynamicCssAnimation()
  const animation2 = new DynamicCssAnimation()
  expect(animation1.name).not.toEqual(animation2.name)
})

test('can create blank CSS', () => {
  const animation = new DynamicCssAnimation()
  const name = animation.name
  const css = animation.createCssString()
  expect(css).toEqual(
    `.${name} {
  animation-delay: 0s;
  animation-direction: normal;
  animation-duration: 0s;
  animation-fill-mode: none;
  animation-iteration-count: 1;
  animation-name: ${name};
  animation-timing-function: ease;
}
@keyframes ${name} {
}`)
})

test('can set delay', () => {
  const animation = new DynamicCssAnimation()
  animation.delay = 1.5
  expect(animation.createCssString()).toContain('animation-delay: 1.5s')
})

test('can set direction', () => {
  const animation = new DynamicCssAnimation()
  animation.direction = 'reverse'
  expect(animation.createCssString()).toContain('animation-direction: reverse')
})

test('can set fill mode', () => {
  const animation = new DynamicCssAnimation()
  animation.fillMode = 'both'
  expect(animation.createCssString()).toContain('animation-fill-mode: both')
})

test('can set timing function', () => {
  const animation = new DynamicCssAnimation()
  animation.timingFunction = 'ease-in-out'
  expect(animation.createCssString()).toContain('animation-timing-function: ease-in-out')
})

test('can set iteration count', () => {
  const animation = new DynamicCssAnimation()
  animation.iterationCount = '15'
  expect(animation.createCssString()).toContain('animation-iteration-count: 15')
})

test('can put css into a style tag in the head', () => {
  const animation = new DynamicCssAnimation()
  animation.generateStyle()

  const styles = document.head.querySelectorAll('style')
  expect(styles.length).toEqual(1)
  expect(styles[0].dataset.seashell).toEqual(animation.name)
  expect(styles[0].textContent).toEqual(animation.createCssString())
})

test('does not put multiple style blocks in head', () => {
  const animation = new DynamicCssAnimation()
  animation.generateStyle()
  animation.generateStyle()
  animation.generateStyle()
  animation.generateStyle()
  expect(document.head.querySelectorAll('style').length).toEqual(1)
})

test('can remove style block', () => {
  const animation = new DynamicCssAnimation()
  animation.generateStyle()
  animation.destroyStyle()
  expect(document.head.querySelectorAll('style').length).toEqual(0)
})

test("destroyStyle doesn't crash or throw if style wasn't generated", () => {
  const animation = new DynamicCssAnimation()
  expect(() => animation.destroyStyle()).not.toThrow()
})

test("destroyStyle doesn't crash or throw if called multiple times", () => {
  const animation = new DynamicCssAnimation()
  animation.generateStyle()
  animation.destroyStyle()
  expect(() => { animation.destroyStyle() }).not.toThrow()
})

test('can add keyframe', () => {
  const animation = new DynamicCssAnimation()
  animation.addKeyFrame(0, { left: '5px', top: '8px' })
  expect(animation.createCssString()).toContain(
    `  0% {
    left: 5px;
    top: 8px;
  }`)
})

test('adding multiple keyframes with duration adds keyframes and sets duration', () => {
  const animation = new DynamicCssAnimation()
  animation.addKeyFrame(0, { left: '5px', top: '8px' })
  animation.addKeyFrame(1, { left: '8px', top: '10px' })

  const css = animation.createCssString()
  expect(css).toContain('animation-duration: 1s')
  expect(css).toContain(
    `  0% {
    left: 5px;
    top: 8px;
  }
  100% {
    left: 8px;
    top: 10px;
  }`)
})

test('percentages are computed correctly for multiple keyframes', () => {
  const animation = new DynamicCssAnimation()
  animation.addKeyFrame(0, {})
  animation.addKeyFrame(0.5, {})
  animation.addKeyFrame(2.0, {})

  const css = animation.createCssString()
  expect(css).toContain('0%')
  expect(css).toContain('20%')
  expect(css).toContain('100%')
})

test('addKeyFrame returns self for chaining', () => {
  const animation = new DynamicCssAnimation()
  const returned = animation.addKeyFrame(0, {})
  expect(returned).toBe(animation)
})
