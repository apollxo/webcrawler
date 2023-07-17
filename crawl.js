const { JSDOM } = require('jsdom')

async function crawlPage(currentURL){
	console.log('Actively crawling: ' + currentURL)
	try{
		const resp = await fetch(currentURL)
		// console.log(await resp.text())

		if(resp.status > 399){
			console.log(`Error in fetching ${resp.status}status code on page ${currentURL}`)
			return
		}
		const contentType = resp.headers.get('content-type')
		if (!contentType.includes('text/html')){
			console.log(`Error:  non html on page ${currentURL}\n content type: ${contentType}`)
			return

		}
	}
	catch(err){
		console.log(`Error in fetching url: ${err.message} on page ${currentURL}`)
	}

}

function getURLs(htmlBody, baseURL){
	const urls = []
	const dom = new JSDOM(htmlBody)
	const linkElements = dom.window.document.querySelectorAll('a')
	for (const linkElement of linkElements){
		if(linkElement.href.slice(0, 1) === '/'){
			//testing

			try{
				const urlObj = new URL(`${baseURL}${linkElement.href}`)
				urls.push(urlObj.href)
			}
			catch(err){
				console.log('Invalid URL')
			}
			//relative 
		}
		else{
			//testing 
			try{
				const urlObj = new URL(linkElement.href)
				urls.push(urlObj.href)
			}
			catch(err){
				console.log('Invalid URL')
			}
			//absolute 
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

module.exports = {
	normalizeURL,
	getURLs,
	crawlPage
}