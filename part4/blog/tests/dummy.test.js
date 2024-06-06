const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummyTest} = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = []

  const result = dummyTest(blogs)
  assert.strictEqual(result, 1)
})