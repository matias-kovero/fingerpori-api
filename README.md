# fingerpori-api

Scrapes the daily Fingerpori from [Helsingin Sanomat](https://www.hs.fi/fingerpori/).

Helsingin Sanomat is currently publishing a new comic every Monday to Saturday

HTTP GET request to `https://fingerpori.vercel.app/daily` will result a response that follows:
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