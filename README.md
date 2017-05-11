# BX.in.th api

## About

My own API Library for [BX.in.th](https://bx.in.th). Reference library [here](https://bx.in.th/info/api/)

## Contributing

All contributions are welcome and appreciated. Open Source is a meritocracy who doesn't care who you are.

Issues
Pull Requests
Donations (BTC: [14qd36n1viYAWzajZgaTQq4tPUZcEUtfcz](http://blockr.io/address/info/14qd36n1viYAWzajZgaTQq4tPUZcEUtfcz) / LTC: [LSGfxUoJSC3qYsTC6DwyvKvYfDwTVXrcE2](http://ltc.blockr.io/address/info/LSGfxUoJSC3qYsTC6DwyvKvYfDwTVXrcE2) / [Dollars](https://donate.nolim1t.co))

## Examples

### Get Balance

The following returns a list of all the balances

```javascript
i.balance({apikey: '', apisecret: '', endpoint: 'balance'}, function(cb) {
  console.log(cb);
});
```

### Transaction History

```javascript
i.transactions({apikey: '', apisecret: ''}, function(cb) {
  console.log(cb);
})
```
