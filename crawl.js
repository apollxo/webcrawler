function normalizeURL(urlString) {
	const objURL = new URL(urlString)
	let hostPath = objURL.hostname + objURL.pathname
	if(hostPath.length > 0 && hostPath.slice(-1) === '/' ){
		hostPath = hostPath.slice(0, -1)
	}
	return hostPath
}

module.exports = {
	normalizeURL
}