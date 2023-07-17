const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){

	const baseURLObj = new URL(baseURL)
	const currentURLObj = new URL(currentURL)

	if(baseURLObj.hostname !== currentURLObj.hostname){
		return pages
	}

	const normalizeCurrentURL = normalizeURL(currentURL)

	if(pages[normalizeCurrentURL] > 0){
		pages[normalizeCurrentURL]++
		return pages
	}

	pages[normalizeCurrentURL] = 1


	console.log('Actively crawling: ' + currentURL)
	try{
		const resp = await fetch(currentURL)
		// console.log(await resp.text())

		if(resp.status > 399){
			console.log(`Error in fetching ${resp.status}status code on page ${currentURL}`)
			return pages
		}
		const contentType = resp.headers.get('content-type')
		if (!contentType.includes('text/html')){
			console.log(`Error:  non html on page ${currentURL}\n content type: ${contentType}`)
			return pages

		}
		
		const htmlBody = await resp.text()
		const nextURLs = getURLs(htmlBody, baseURL)

		for (const nextURL of nextURLs){
			pages = await crawlPage(baseURL, nextURL, pages)
		}
	}
	catch(err){
		console.log(`Error in fetching url: ${err.message} on page ${currentURL}`)
	}

	return pages

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