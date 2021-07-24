/**
 * Send a request to the Hypixel API.
 * @param endpoint A string representation of the endpoint to send the payload to.
 * @returns An HTTP response pertaining to the request sent.
 */
const fetchAPI = async (endpoint: string) => await fetch(`https://api.hypixel.net${endpoint}`);

export default fetchAPI;
