const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const FINGERPORI_URL = 'https://www.hs.fi/fingerpori/';
const FOK_IT_URL = 'https://www.hs.fi/nyt/fokit/';
const COMIC_SELECTOR = '.is-list.cartoons .list-item.cartoon .cartoon-content a';

const app = express();

/**
 * Naive way of getting the 1920 sized image.
 * Changing the url in the smaller image from /320/ to /1920/
 * @param {string} smallImage 
 */
const setImagesURLS = (small_url) => {
  return {
    small: small_url,
    big: small_url.replace('/320/', '/1920/')
  }
}

/**
 * Generic function to fetch comics from Helsingin Sanomat.
 * @param {string} comic_url URL where new comics are listed
 */
const getComics = async (comic_url) => {
  const { data: htmlString } = await axios(comic_url);
  const $ = cheerio.load(htmlString, { decodeEntities: false });

  const copyright = $(`${COMIC_SELECTOR} figcaption`).html();
  const date = $(`${COMIC_SELECTOR} figure [itemprop = 'datePublished']`).attr('content');
  const url = $(`${COMIC_SELECTOR} figure img`).attr("data-simple-src");

  const images = setImagesURLS(url);

  return {
    cartoon_date: date,
    image: {
      small: images.small,
      big: images.big
    },
    cartoon_copyright: copyright
  }
}

app.get('/fingerpori', async (req, res) => {
  res.set("Content-Type", "application/json; charset=utf-8");
  try {
    const data = await getComics(FINGERPORI_URL);
    res.json({
      publication_date: data.cartoon_date,
      image: {
        small: `https:${data.image.small}`,
        big: `https:${data.image.big}`
      },
      copyright: data.cartoon_copyright
    });
  } catch (err) {
    console.log(err.toString());
    res.json({ error: err.toString() });
  }
});

app.get('/fok_it', async (req, res) => {
  res.set("Content-Type", "application/json; charset=utf-8");
  try {
    const data = await getComics(FOK_IT_URL);
    res.json({
      publication_date: data.cartoon_date,
      image: {
        small: `https:${data.image.small}`,
        big: `https:${data.image.big}`
      },
      copyright: data.cartoon_copyright
    });
  } catch (err) {
    console.log(err.toString());
    res.json({ error: err.toString() });
  }
})

if (process.env.NODE_ENV === "development") {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`Development server running on port ${port}`)
  );
} else {
  app.listen();
}