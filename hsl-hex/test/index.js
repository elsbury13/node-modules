const hsl = require('../')
const { test } = require('tap')

test('pure white', ({ is, end }) => {
  const expected = '#ffffff'
  const actual = hsl(0, 100, 100)
  const it = 'max saturation and luminosity should return pure white'
  is(actual, expected, it)
  end()
})

test('medium grey', ({ is, end }) => {
  const expected = '#808080'
  const actual = hsl(0, 0, 50)
  const it = '0% saturation, 50% luminosity should be medium grey'
  is(actual, expected, it)
  end()
})

test('hue red', ({ is, end }) => {
  const expected = '#ff0000'
  const actual = hsl(0, 100, 50)
  const it = '0deg should be red'
  is(actual, expected, it)
  end()
})

test('hue blue', ({ is, end }) => {
  const expected = '#0000ff'
  const actual = hsl(240, 100, 50)
  const it = '240deg should be blue'
  is(actual, expected, it)
  end()
})

test('hue cyan', ({ is, end }) => {
  const expected = '#00ffff'
  const actual = hsl(180, 100, 50)
  const it = '180deg should be cyan'
  is(actual, expected, it)
  end()
})

test('degree overflow', ({ is, end }) => {
  const expected = hsl(1, 100, 50)
  const actual = hsl(361, 100, 50)
  const it = '361deg should be the same as 1deg'
  is(actual, expected, it)
  end()
})

test('degree underflow', ({ is, end }) => {
  const expected = hsl(-1, 100, 50)
  const actual = hsl(359, 100, 50)
  const it = '-1deg should be the same as 359deg'
  is(actual, expected, it)
  end()
})

test('max constraint', ({ is, end }) => {
  const expected = hsl(0, 101, 50)
  const actual = hsl(0, 100, 50)
  const it = '101% should be the same as 100%'
  is(actual, expected, it)
  end()
})

test('max constraint', ({ is, end }) => {
  const expected = hsl(0, -1, 50)
  const actual = hsl(0, 0, 50)
  const it = '-1% should be the same as 0%'
  is(actual, expected, it)
  end()
})
