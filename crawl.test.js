const { normalizeURL, getURLs } = require('./crawl.js')
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


// getting absolute url from html

test('getURLs absolute urls', () => {
	const inputHTML = `
	<html>
		<head></head>
		<body>
			<a href='https://blog.boot.dev/path'>Boot.dev</a>
		</body>
	</html>
`
	const inputBaseURL = 'https://blog.boot.dev/path'
	const actual = getURLs(inputHTML, inputBaseURL)
	const expected = ['https://blog.boot.dev/path']
	expect(actual).toEqual(expected)
})


// getting relative urls from html
test('getURLs relative urls', () => {
	const inputHTML = `
	<html>
		<head></head>
		<body>
			<a href='/path'>Boot.dev</a>
		</body>
	</html>
`
	const inputBaseURL = 'https://blog.boot.dev'
	const actual = getURLs(inputHTML, inputBaseURL)
	const expected = ['https://blog.boot.dev/path']
	expect(actual).toEqual(expected)
})

// getting both absolute and relative urls
test('getURLs both urls', () => {
	const inputHTML = `
	<html>
		<head></head>
		<body>
			<a href='/path1'>Boot.dev</a>
			<a href='https://blog.boot.dev/path2'>Boot.dev</a>
		</body>
	</html>
`
	const inputBaseURL = 'https://blog.boot.dev'
	const actual = getURLs(inputHTML, inputBaseURL)
	const expected = ['https://blog.boot.dev/path1', 'https://blog.boot.dev/path2']
	expect(actual).toEqual(expected)
})
// getting invalid urls
test('getURLs both urls', () => {
	const inputHTML = `
	<html>
		<head></head>
		<body>
			<a href='invalid'>Boot.dev</a>
		</body>
	</html>
`
	const inputBaseURL = 'https://blog.boot.dev'
	const actual = getURLs(inputHTML, inputBaseURL)
	const expected = []
	expect(actual).toEqual(expected)
})

// // getting invalid urls
// test('getURLs both urls', () => {
// 	const inputHTML = `
// 	<html>
// 		<head></head>
// 		<body>
// 			<a href='invalid'>Boot.dev</a>
// 		</body>
// 	</html>
// `
// 	const inputBaseURL = 'https://blog.boot.dev'
// 	const actual = getURLs(inputHTML, inputBaseURL)
// 	const expected = []
// 	expect(actual).toEqual(expected)
// })
