export async function loadFromApi(endpoint) {
	return fetch(`https://www.learnwithjason.dev${endpoint}`).then((res) =>
		res.json()
	);
}
