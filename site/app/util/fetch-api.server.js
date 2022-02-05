const API_URL =
  process.env.API_URL || process.env.URL || 'https://www.learnwithjason.dev';

export async function loadFromApi(endpoint) {
  return fetch(`${API_URL}${endpoint}`).then((res) => res.json());
}
