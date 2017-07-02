'use strict';
var numberFormat = new Intl.NumberFormat('ru-RU');

new Vue({
  el: '#blockchain-rate-table',
  data: {
    ticker_data: {},
    ticker_error_text: '',
    ticker_url: 'https://blockchain.info/ru/ticker?cors=true'
  },
  filters: {
    moneyFormat: function(value) {
      return numberFormat.format(value);
    }
  },
  methods: {
    updateRates: function(event) {
      var $component = this;
      fetch($component.ticker_url)
        .then(function(response){
          if (response.status !== 200)
            throw new Error('Error get rates');
          return response.json()
        })
        .then(function(data){
          $component.ticker_data = data;
          $component.ticker_error_text = '';
        })
        .catch(function(error){
          $component.ticker_error_text = error.message;
        });
    }
  },
  mounted: function() {
    this.updateRates();
  }
});