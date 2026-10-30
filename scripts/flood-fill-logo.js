const sharp = require('sharp');

async function processLogosWithFloodFill() {
  // 1. Process darkbg logo (media_1792966152491.png -> fitvisor-logo-darkbg.png)
  const { data: dData, info: dInfo } = await sharp('public/fitvisor-logo-darkbg.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: dw, height: dh, channels: dc } = dInfo;
  const targetR = dData[0];
  const targetG = dData[1];
  const targetB = dData[2];

  // Visited array
  const visited = new Uint8Array(dw * dh);
  const queue = [];

  // Push all border pixels that match background
  function colorMatch(idx, r0, g0, b0, tol = 25) {
    const r = dData[idx];
    const g = dData[idx + 1];
    const b = dData[idx + 2];
    return Math.abs(r - r0) <= tol && Math.abs(g - g0) <= tol && Math.abs(b - b0) <= tol;
  }

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
    if (colorMatch(dataIdx, targetR, targetG, targetB, 28)) {
      dData[dataIdx + 3] = 0; // Transparent!

      // Push 4 neighbors
      if (x > 0 && !visited[pixelIndex - 1]) queue.push([x - 1, y]);
      if (x < dw - 1 && !visited[pixelIndex + 1]) queue.push([x + 1, y]);
      if (y > 0 && !visited[pixelIndex - dw]) queue.push([x, y - 1]);
      if (y < dh - 1 && !visited[pixelIndex + dw]) queue.push([x, y + 1]);
    }
  }

  await sharp(dData, { raw: { width: dw, height: dh, channels: dc } })
    .trim()
    .png()
    .toFile('public/fitvisor-logo-light.png');

  // 2. Process original light-bg logo (fitvisor-logo-original.png)
  const { data: oData, info: oInfo } = await sharp('public/fitvisor-logo-original.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: ow, height: oh, channels: oc } = oInfo;
  const oTargetR = oData[0];
  const oTargetG = oData[1];
  const oTargetB = oData[2];

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
    const r = oData[dataIdx];
    const g = oData[dataIdx + 1];
    const b = oData[dataIdx + 2];
    // Background is near white/light gray
    if (Math.abs(r - oTargetR) <= 20 && Math.abs(g - oTargetG) <= 20 && Math.abs(b - oTargetB) <= 20) {
      oData[dataIdx + 3] = 0; // Transparent!

      if (x > 0 && !oVisited[pixelIndex - 1]) oQueue.push([x - 1, y]);
      if (x < ow - 1 && !oVisited[pixelIndex + 1]) oQueue.push([x + 1, y]);
      if (y > 0 && !oVisited[pixelIndex - ow]) oQueue.push([x, y - 1]);
      if (y < oh - 1 && !oVisited[pixelIndex + ow]) oQueue.push([x, y + 1]);
    }
  }

  await sharp(oData, { raw: { width: ow, height: oh, channels: oc } })
    .trim()
    .png()
    .toFile('public/fitvisor-logo-dark.png');

  console.log('Clean flood-fill transparency generated successfully for both logos without any artifacts!');
}

processLogosWithFloodFill().catch(console.error);
