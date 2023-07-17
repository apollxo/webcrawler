const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')


//Normalizing by getting only hostname and pathname
test('sortPages', () => {
	const input = {
		"https://github.com" : 1,
		"https://github.com/path1" : 3,
		"https://github.com/path2" : 8,
		"https://github.com/path3" : 9,
		"https://github.com/path4" : 5
	}
	const actual = sortPages(input)
	const expected = [
		["https://github.com/path3", 9],
		["https://github.com/path2", 8],
		["https://github.com/path4", 5],
		["https://github.com/path1", 3],
		["https://github.com", 1]
	]
	expect(actual).toEqual(expected)
})