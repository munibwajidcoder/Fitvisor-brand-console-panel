const sharp = require('sharp');

async function fixLogosPerfect() {
  // 1. Process dark-background logo (for hero & dark sidebar)
  const { data: dData, info: dInfo } = await sharp('public/fitvisor-logo-darkbg.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: dw, height: dh, channels: dc } = dInfo;

  // For the darkbg logo:
  // Text is on the right (x > 110).
  // "Fit" is red (r > 160, g < 100, b < 100).
  // "Visor" is white (r > 180, g > 180, b > 180).
  // Anything else in the text area (including the inside hole of 'o') is the dark background (r < 40, g < 50, b < 90)!
  // In the icon area (x <= 110): the background is outside the rounded rectangle.
  // We can flood-fill from (0,0) for the icon area, AND for any dark pixel in the text area (x > 110), make it transparent!

  const visited = new Uint8Array(dw * dh);
  const queue = [];

  function isBgColor(idx) {
    const r = dData[idx];
    const g = dData[idx + 1];
    const b = dData[idx + 2];
    // Dark navy background is ~ (11, 26, 62)
    return r < 40 && g < 55 && b < 95;
  }

  // Push border pixels
  for (let x = 0; x < dw; x++) {
    queue.push([x, 0], [x, dh - 1]);
  }
  for (let y = 0; y < dh; y++) {
    queue.push([0, y], [dw - 1, y]);
  }

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    const pixelIndex = y * dw + x;
    if (x < 0 || x >= dw || y < 0 || y >= dh) continue;
    if (visited[pixelIndex]) continue;
    visited[pixelIndex] = 1;

    const dataIdx = pixelIndex * dc;
    if (isBgColor(dataIdx)) {
      dData[dataIdx + 3] = 0; // transparent
      if (x > 0 && !visited[pixelIndex - 1]) queue.push([x - 1, y]);
      if (x < dw - 1 && !visited[pixelIndex + 1]) queue.push([x + 1, y]);
      if (y > 0 && !visited[pixelIndex - dw]) queue.push([x, y - 1]);
      if (y < dh - 1 && !visited[pixelIndex + dw]) queue.push([x, y + 1]);
    }
  }

  // Now, in the text area (x > 110), clear ANY enclosed dark background pixels (like inside 'o'!)
  for (let y = 0; y < dh; y++) {
    for (let x = 110; x < dw; x++) {
      const idx = (y * dw + x) * dc;
      if (isBgColor(idx)) {
        dData[idx + 3] = 0; // Transparent! Clears inside 'o'!
      }
    }
  }

  await sharp(dData, { raw: { width: dw, height: dh, channels: dc } })
    .trim()
    .png()
    .toFile('public/fitvisor-logo-light.png');

  // 2. Process light-background logo (for white header/forms)
  const { data: oData, info: oInfo } = await sharp('public/fitvisor-logo-original.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: ow, height: oh, channels: oc } = oInfo;

  function isLightBgColor(idx) {
    const r = oData[idx];
    const g = oData[idx + 1];
    const b = oData[idx + 2];
    return r > 230 && g > 230 && b > 230;
  }

  const oVisited = new Uint8Array(ow * oh);
  const oQueue = [];

  for (let x = 0; x < ow; x++) {
    oQueue.push([x, 0], [x, oh - 1]);
  }
  for (let y = 0; y < oh; y++) {
    oQueue.push([0, y], [ow - 1, y]);
  }

  while (oQueue.length > 0) {
    const [x, y] = oQueue.pop();
    const pixelIndex = y * ow + x;
    if (x < 0 || x >= ow || y < 0 || y >= oh) continue;
    if (oVisited[pixelIndex]) continue;
    oVisited[pixelIndex] = 1;

    const dataIdx = pixelIndex * oc;
    if (isLightBgColor(dataIdx)) {
      oData[dataIdx + 3] = 0;
      if (x > 0 && !oVisited[pixelIndex - 1]) oQueue.push([x - 1, y]);
      if (x < ow - 1 && !oVisited[pixelIndex + 1]) oQueue.push([x + 1, y]);
      if (y > 0 && !oVisited[pixelIndex - ow]) oQueue.push([x, y - 1]);
      if (y < oh - 1 && !oVisited[pixelIndex + ow]) oQueue.push([x, y + 1]);
    }
  }

  // Clear enclosed light pixels inside letters like 'o', 'e', 'a' in text area
  for (let y = 0; y < oh; y++) {
    for (let x = Math.floor(ow * 0.28); x < ow; x++) {
      const idx = (y * ow + x) * oc;
      if (isLightBgColor(idx)) {
        oData[idx + 3] = 0;
      }
    }
  }

  await sharp(oData, { raw: { width: ow, height: oh, channels: oc } })
    .trim()
    .png()
    .toFile('public/fitvisor-logo-dark.png');

  console.log('Logo perfected! Hole inside letter "o" is now 100% transparent on all surfaces!');
}

fixLogosPerfect().catch(console.error);
