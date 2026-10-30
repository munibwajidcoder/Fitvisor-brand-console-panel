const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const inputPath = 'public/fitvisor-logo.png';
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  
  // Buffer for transparent dark-text logo (for light bg)
  const transparentDark = Buffer.from(data);
  // Buffer for transparent white-text logo (for dark bg)
  const transparentLight = Buffer.from(data);

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Background is near white/light gray (r > 235, g > 235, b > 235)
    if (r > 232 && g > 232 && b > 232) {
      transparentDark[i + 3] = 0;
      transparentLight[i + 3] = 0;
    } else {
      // For the dark-bg version, change navy text (low r, low g, mid/high b or dark colors) to crisp white
      // Navy text in logo is roughly: r < 60, g < 60, b < 90
      // Red color is roughly: r > 180, g < 100, b < 100
      const isRed = r > 160 && g < 100 && b < 100;
      if (!isRed) {
        // This is the dark navy "Visor" or icon navy parts
        // On dark background, make it white so it pops
        transparentLight[i] = 255;
        transparentLight[i + 1] = 255;
        transparentLight[i + 2] = 255;
      }
    }
  }

  // Trim transparent edges and save
  await sharp(transparentDark, { raw: { width, height, channels } })
    .trim()
    .png()
    .toFile('public/fitvisor-logo-dark.png');

  await sharp(transparentLight, { raw: { width, height, channels } })
    .trim()
    .png()
    .toFile('public/fitvisor-logo-light.png');

  // Also replace public/fitvisor-logo.png with the transparent one
  await sharp(transparentDark, { raw: { width, height, channels } })
    .trim()
    .png()
    .toFile('public/fitvisor-logo.png');

  console.log('Successfully generated transparent logos: dark and light!');
}

processLogo().catch(console.error);
