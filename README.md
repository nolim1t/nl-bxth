# BX.in.th api

[![npm version](https://badge.fury.io/js/nl-bxth.svg)](https://badge.fury.io/js/nl-bxth)

## About

My own API Library for [BX.in.th](https://bx.in.th). Reference library [here](https://bx.in.th/info/api/)


## Installing

```bash
npm i nl-bxth
```

## Contributing

All contributions are welcome and appreciated. Open Source is a meritocracy who doesn't care who you are.

Issues
Pull Requests
Donations (BTC: [14qd36n1viYAWzajZgaTQq4tPUZcEUtfcz](http://blockr.io/address/info/14qd36n1viYAWzajZgaTQq4tPUZcEUtfcz) / LTC: [LSGfxUoJSC3qYsTC6DwyvKvYfDwTVXrcE2](http://ltc.blockr.io/address/info/LSGfxUoJSC3qYsTC6DwyvKvYfDwTVXrcE2) / [Dollars](https://donate.nolim1t.co))

## Examples

### Get Balance

The following returns a list of all the balances

```javascript
i.private.balance({apikey: '', apisecret: '', endpoint: 'balance'}, function(cb) {
  console.log(cb);
});
```

### Transaction History

```javascript
i.private.transactions({apikey: '', apisecret: ''}, function(cb) {
  console.log(cb);
})
```

### Orderbook

```javascript
i.public.orderbook({pairing: '1'}, (cb) => {console.log(cb.orderbook);});
```

### Create order

#### Create sell order 1 bitcoin for 1 million baht :D

```javascript
i.private.customendpoint({apikey: '', apisecret: '', pairing: '1', type: 'sell', amount: '1.0', rate: '1000000'}, 'order', (cb) => {
  console.log(cb);
});
```

#### Create buy order 1 bitcoin for 1 thousand baht :)

```javascript
i.private.customendpoint({apikey: '', apisecret: '', pairing: '1', type: 'buy', amount: '1.0', rate: '1000'}, 'order', (cb) => {
  console.log(cb);
});
```
