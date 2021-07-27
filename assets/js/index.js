/**
 * The configuration for the OBS overlay.
 */
const config = {
    apiKey: ``, // Use /api in Hypixel to get your API key. Don't share this with anyyone!
    uuid: ``, // Enter your Minecraft account UUID here.

    display: {
        font: `Minecraft`, // The font to render with (you will need to add this to the CSS file as well).
        fontSize: 20, // Font size, in pixels.

        lineSpacing: 22.5 // Space between lines, in pixels.
    }
};

/**
 * Chat color translations.
 */
const colors = {
    0: { color: `000000`, textShadow: `000000` },
    1: { color: `0000AA`, textShadow: `00006A` },
    2: { color: `00AA00`, textShadow: `006A00` },
    3: { color: `00AAAA`, textShadow: `006A6A` },
    4: { color: `AA0000`, textShadow: `6A0000` },
    5: { color: `AA00AA`, textShadow: `6A006A` },
    6: { color: `FFAA00`, textShadow: `BF6A00` },
    7: { color: `999999`, textShadow: `595959` },
    8: { color: `3f3f3f`, textShadow: `000000` },
    9: { color: `5555FF`, textShadow: `1515BF` },

    a: { color: `55FF55`, textShadow: `15BF15` },
    b: { color: `55FFFF`, textShadow: `15BFBF` },
    c: { color: `FF5555`, textShadow: `BF1515` },
    d: { color: `FF55FF`, textShadow: `BF15BF` },
    e: { color: `FFFF55`, textShadow: `BFBF15` },
    f: { color: `FFFFFF`, textShadow: `BFBFBF` }
};

/**
 * Hypixel Rank Configuration
 */
 const RANKS = {
    NORMAL: {
        color: `&7`,
        prefix: `&7`
    },

    VIP: {
        color: `&a`,
        prefix: `&a[VIP] `
    },

    VIP_PLUS: {
        color: `&a`,
        prefix: `&a[VIP&6+&a] `
    },

    MVP: {
        color: `&b`,
        prefix: `&b[MVP] `
    },

    MVP_PLUS: {
        color: `&b`,
        prefix: `&b[MVP&c+&b] `
    },

    SUPERSTAR: {
        color: `&6`,
        prefix: `&6[MVP&c++&6] `
    },

    YOUTUBER: {
        color: `&c`,
        prefix: `&c[&fYOUTUBE&c] `
    },

    JR_HELPER: {
        color: `&9`,
        prefix: `&9[JR HELPER] `
    },

    HELPER: {
        color: `&9`,
        prefix: `&9[HELPER] `
    },

    MODERATOR: {
        color: `&2`,
        prefix: `&2[MOD] `
    },

    ADMIN: {
        color: `&c`,
        prefix: `&c[ADMIN] `
    }
};

const Player = {
    username: ``,
    rank: ``,

    prefix: ``,
    stats: {}
};

const canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext(`2d`);

/**
 * Fetch player data through the Hypixel API.
 * @returns Promise<Response>
 */
const fetchPlayerData = async () => await fetch(`https://api.hypixel.net/player?uuid=${config.uuid}&key=${config.apiKey}`).then(res => res.json());

/**
 * Measure the visual width of a text.
 * @param {string} text The text to measure.
 * @returns number
 */
const measureText = (text) => {
    const textMetrics = ctx.measureText(text);
    return Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight);
};

/**
 * Draw some text on the canvas.
 * @param {string} text The text to draw.
 * @param {number} x The x-coordinate of the starting draw position.
 * @param {number} y The y-coordinate of the starting draw position.
 */
const drawText = (text, x, y) => {
    const textChunks = text.split(`&`);

    // Text styling controllers.
    let color = colors[`7`];
    let bold = false;
    let italic = false;

    // Offset for creating the substrings.
    let offsetX = x;

    for (const string of textChunks) {
        const i = textChunks.indexOf(string);

        // Coding key.
        const key = string.charAt(0);

        // Color codes.
        color = colors[key] || color;

        // Styling codes.
        if (key === `l`) bold = true;
        else if (key === `n`) italic = true;
        else if (key === `r`) bold = false; italic = false;

        ctx.font = `${bold ? `bold` : ``} ${italic ? `italic` : ``} ${config.display.fontSize}px ${config.display.font}`

        // Draw a shadow to go behind the main text.
        ctx.fillStyle = `#${color.textShadow}`;
        ctx.fillText(i === 0 ? string : string.substring(1), offsetX + 0.25, y + 0.25);

        // Draw the overlaying text.
        ctx.fillStyle = `#${color.color}`;
        ctx.fillText(i === 0 ? string : string.substring(1), offsetX, y);

        offsetX += measureText(i === 0 ? string : string.substring(1));
    }
};

/**
 * Update the canvas with new data.
 */
const update = () => {
    const { rank, username, stats } = Player;

    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player name.
    drawText(`${RANKS[`${rank}`].prefix + username}`, 0, 20);

    // Set the color for the horizontal bar between the player name and their stats.
    ctx.strokeStyle = `#${colors[`7`].color}`;

    // Draw the horizontal bar.
    ctx.beginPath();
    ctx.moveTo(0.25, 30);
    ctx.lineTo(200, 30);
    ctx.stroke();

    /**
     * The stats to display.
     * This is customizable, feel free to add or remove as you wish.
     */
    drawText(`Kills: &e ${stats.Bedwars.kills_bedwars} &7| Finals: &a ${stats.Bedwars.final_kills_bedwars}`, 0, 30 + config.display.lineSpacing);
    drawText(`Wins: &6 ${stats.Bedwars.wins_bedwars} &7| Streak: &d ${stats.Bedwars.winstreak}`, 0, 30 + config.display.lineSpacing * 2);
};

/**
 * Parse the stats of the player.
 * @returns Promise<void>
 */
const parseStats = async () => {
    const playerData = (await fetchPlayerData())?.player;
    if (!playerData) throw new Error(`Failed to get player stats.`);

    Player.username = playerData.displayname;
    Player.prefix = playerData.prefix;

    Player.stats = playerData.stats;

    Player.rank = playerData.rank
        || playerData.monthlyPackageRank
        || playerData.newPackageRank
        || playerData.packageRank
        || `NORMAL`;

    return update();
};

/**
 * Initialize the script.
 */
const init = () => {
    parseStats();
    setInterval(parseStats, 3e3);
};

init();
