# hs-comic-api

Scrapes the daily comics from [Helsingin Sanomat](https://www.hs.fi/sarjakuvat/).

Currently supporting:
- [/fingerpori](https://www.hs.fi/fingerpori/)
- [/fok_it](https://www.hs.fi/nyt/fokit/)

HTTP GET request to `https://hs-comics.vercel.app/fingerpori` will result a response that follows:
```
{
  "publication_date":"2020-09-11",
  "image":{
    "small":"https://hs.mediadelivery.fi/img/320/96fc3a786cb4470c9b68a0472f83550c.jpg",
    "big":"https://hs.mediadelivery.fi/img/1920/96fc3a786cb4470c9b68a0472f83550c.jpg"
  },
  "copyright":"©Pertti Jarla"
}
```