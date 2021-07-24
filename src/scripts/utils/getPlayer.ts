import fetchAPI from './fetchAPI';
import config from '../../../config/config';

/**
 * Get the stats of a player from Hypixel.
 */
const getPlayer = async () => await fetchAPI(`/player?uuid=${config.uuid}&key=${config.apiKey}`).then(data => data.json());

export default getPlayer;
