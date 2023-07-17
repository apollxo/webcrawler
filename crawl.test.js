const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

//Normalizing by getting only hostname and pathname
test('normalizeURL', () => {
	const input = 'https://blog.boot.dev/path/'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

// changing capital letters
test('normalizeURL capitalize words', () => {
	const input = 'https://BLOG.boot.dev/path/'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

//stripping http off of url
test('normalizeURL strip http', () => {
	const input = 'http://blog.boot.dev/path/'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})