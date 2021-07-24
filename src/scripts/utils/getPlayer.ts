import fetchAPI from './fetchAPI';
import config from '../../../config/config';

/**
 * Get the stats of a player from Hypixel.
 * @param uuid The UUID of the player to get.
 */
const getPlayer = async (uuid: string) => await fetchAPI(`/player?uuid=${uuid}&key=${config.apiKey}`).then(data => data.json());

export default getPlayer;
