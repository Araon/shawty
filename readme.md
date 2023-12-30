This is a basic urlshortner from scratch. It takes in a long url like ``` https://www.youtube.com/watch?v=NpUuuT_EzSs ``` and return something like ``` https://biturl.top/zE3YBr ```

This is mainly solution from this coding challenge [write Your Own URL Shortener](https://codingchallenges.fyi/challenges/challenge-url-shortener)

Below are the endpoint is present

[POST]/short
request
```json
{
    "url":""
}
```
response
```json
{
    "key":"zE3YBr",
    "long_url":"https://www.youtube.com/watch?v=NpUuuT_EzSs",
    "short_url":"https://localhost:3305/zE3YBr"
}
```

When the short url is hit ,it redirected using 302 HTTP status code

## Todo
- Add Analytics
- Expiration based short links
- Add redis based caching
- Test cases
