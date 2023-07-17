const { JSDOM } = require('jsdom')

function getURLs(htmlBody, baseURL){
	const urls = []
	const dom = new JSDOM(htmlBody)
	const linkElements = dom.window.document.querySelectorAll('a')
	for (const linkElement of linkElements){
		try{
			const urlObj = new URL(`${linkElement.href}`)
			console.log(urlObj.href)
		}
		catch(err){
			console.log('Invalid URL')
		}
		if(linkElement.href.slice(0, 1) === '/'){
			//relative 
			urls.push(`${baseURL}${linkElement.href}`)
		}
		else{
			//absolute 
			urls.push(linkElement.href)
		}
	}
	return urls
}

function normalizeURL(urlString) {
	const objURL = new URL(urlString)
	let hostPath = objURL.hostname + objURL.pathname
	if(hostPath.length > 0 && hostPath.slice(-1) === '/' ){
		hostPath = hostPath.slice(0, -1)
	}
	return hostPath
}

const html = `
	<html>
		<head></head>
		<body>
			<a href='invalid'>Boot.dev</a>
			<a href='https://blog.boot.dev/path2'>Boot.dev</a>
		</body>
	</html>
`

getURLs(html, 'https://blog.boot.dev')


module.exports = {
	normalizeURL,
	getURLs
}