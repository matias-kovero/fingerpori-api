const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const FINGERPORI_URL = 'https://www.hs.fi/fingerpori/';
const COMIC_SELECTOR = '.is-list.cartoons.section .list-item.cartoon .cartoon-content a';

const app = express();

/**
 * Naive way of getting the 1920 sized image.
 * Changing the /320/ of the smaller url to /1920/
 * @param {string} smallImage 
 */
const setImagesURLS = (small_url) => {
  return {
    small: small_url,
    big: small_url.replace('/320/', '/1920/')
  }
}

app.get('/daily', async (req, res) => {
  res.set("Content-Type", "application/json; charset=utf-8");

  try {
    const { data: htmlString } = await axios(FINGERPORI_URL);
    const $ = cheerio.load(htmlString, { decodeEntities: false });

    const cartoon_copyright = $(`${COMIC_SELECTOR} figcaption`).html();
    const cartoon_date = $(`${COMIC_SELECTOR} figure [itemprop = 'datePublished']`).attr('content');
    const cartoon_url = $(`${COMIC_SELECTOR} figure img`).attr("data-simple-src");

    const images = setImagesURLS(cartoon_url);

    res.json({
      publication_date: cartoon_date,
      image: {
        small: `https:${images.small}`,
        big: `https:${images.big}`,
      },
      copyright: cartoon_copyright
    });
  } catch (err) {
    console.log(err.toString());
    res.json({
      error: err.toString(),
    });
  }
});

if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`Development server running on port ${port}`)
  );
} else {
  app.listen();
}