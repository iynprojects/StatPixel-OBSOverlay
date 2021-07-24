import config from '../../config/config';

const canvas: HTMLCanvasElement = document.querySelector(`#ctx`);
const ctx: CanvasRenderingContext2D = canvas.getContext(`2d`);

const colors = {
    0: { color: `000000`, textshadow: `000000` },
    1: { color: `0000AA`, textshadow: `00006A` },
    2: { color: `00AA00`, textshadow: `006A00` },
    3: { color: `00AAAA`, textshadow: `006A6A` },
    4: { color: `AA0000`, textshadow: `6A0000` },
    5: { color: `AA00AA`, textshadow: `6A006A` },
    6: { color: `FFAA00`, textshadow: `BF6A00` },
    7: { color: `999999`, textshadow: `595959` },
    8: { color: `3f3f3f`, textshadow: `000000` },
    9: { color: `5555FF`, textshadow: `1515BF` },

    a: { color: `55FF55`, textshadow: `15BF15` },
    b: { color: `55FFFF`, textshadow: `15BFBF` },
    c: { color: `FF5555`, textshadow: `BF1515` },
    d: { color: `FF55FF`, textshadow: `BF15BF` },
    e: { color: `FFFF55`, textshadow: `BFBF15` },
    f: { color: `FFFFFF`, textshadow: `BFBFBF` }
};

/**
 * Measure the size of a certain text.
 * @param text The text to measure.
 * @returns The size of the text.
 */
const measureText = (text: string) => {
    const size = config.display.fontSize;
    const font = config.display.font;

    const ctx = canvas.getContext(`2d`);

    let bold = false;
    let length = size * 0.05;

    const parts = text.split(`§`);
    for (const part of parts) {
        const key = part.charAt(0);

        if (key === `l`) {
            bold = true;
        } else if (key === `r`) {
            bold = false;
        }

        ctx.font = `${bold ? `bold` : ``} ${size}px ${font}`;
        length += ctx.measureText(part.substring(1)).width;
    }

    return length;
};

/**
 * Draw some text on the canvas.
 * @param text The text to draw.
 * @param x The x-coordinate to start drawing at.
 * @param y The y-coordinate to start drawing at.
 */
const drawText = (text: string, x: number, y: number) => {
    const size = config.display.fontSize;
    const font = config.display.font;

    if (!text.startsWith(`§`)) {
        text = `§7${text}`;
    }

    ctx.fillStyle = `#ffffff`;

    const offset = Math.max(1, size * 0.02);
    const adjustedy = y + size * (5 / 6);
    let position = size * 0.05;

    let color = colors[`7`];
    let bold = false;
    let italic = false;

    const parts = text.split(`§`);
    for (const part of parts) {
        const key = part.charAt(0);
        color = colors[key] || color;

        if (key === `l`) bold = true;
        else if (key === `n`) italic = true;
        else if (key === `r`) {
            bold = false;
            italic = false;
        }

        ctx.font = `${bold ? `bold` : ``} ${italic ? `italic` : ``} ${size}px ${font}`;

        ctx.fillStyle = `#${color.textshadow}`;
        ctx.fillText(part.substring(1), Math.floor(x + position + offset), Math.floor(adjustedy + offset));

        ctx.fillStyle = `#${color.color}`;
        ctx.fillText(part.substring(1), Math.floor(x + position), Math.floor(adjustedy));

        position += ctx.measureText(part.substring(1)).width;
    }
};

const drawItem = (lines: string[], outline: boolean, background: string) => {
    const size = config.display.fontSize;
    const padding = 8;
    const height = lines.length * size + padding * 2;
    const width = padding * 2 + Math.max(...lines.map(measureText));

    canvas.width = width;
    canvas.height = height;

    if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
    }

    if (outline) {
        ctx.fillStyle = `#120211`;
        ctx.strokeStyle = `#25015b`;
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.arc(6, 6, 4, Math.PI, 1.5 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(width - 6, 6, 4, 1.5 * Math.PI, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(6, height - 6, 4, 0.5 * Math.PI, 1 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(width - 6, height - 6, 4, 0, 0.5 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 5);
        ctx.lineTo(2, height - 6);
        ctx.lineTo(6, height - 2);
        ctx.lineTo(width - 6, height - 2);
        ctx.lineTo(width - 2, height - 6);
        ctx.lineTo(width - 2, 6);
        ctx.lineTo(width - 6, 2);
        ctx.lineTo(6, 2);
        ctx.lineTo(2, 6);
        ctx.fill();
        ctx.stroke();
    }

    lines.forEach((line, index) => {
        drawText(line, padding, size * index + padding);
    });
};

export {
    measureText,
    drawText,
    drawItem
};
