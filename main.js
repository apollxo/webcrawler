function normalizeURL(urlString) {
	const objURL = new URL(urlString)
	const hostPath = objURL.hostname + objURL.pathname
	if(hostPath.length > 0 && hostPath.slice(-1) === '/' ){
		return hostPath.slice(0, -1)
	}
}

normalizeURL('https://shop.github.com/path/')