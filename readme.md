![Cover](https://i.imgur.com/xE1LjCM.gif)

# Shawty - A very light url shortner with expiration support
### This is a basic urlshortner from scratch. 

It takes in a long url like ``` https://www.youtube.com/watch?v=NpUuuT_EzSs ``` and return something like ``` https://biturl.top/zE3YBr ```



This is mainly solution from this coding challenge [write Your Own URL Shortener](https://codingchallenges.fyi/challenges/challenge-url-shortener)

Below are the endpoint is present

[POST]/short
request
```json
{
    "url":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects",
    "expire":"2022-10-05T14:48:00.000Z"
}
```
response
```json
{
    "key": "79f292",
    "long_url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects",
    "short_url": "http://localhost:4000/short/79f292",
    "expire": "2022-10-05T14:48:00.000Z"
}
```

When the short url is hit ,it redirected using 302 HTTP status code

## Todo
- [x] Test cases
- [x] Expiration based short links
- [x] Add Analytics
- [ ] Add redis based caching