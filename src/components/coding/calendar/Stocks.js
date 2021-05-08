import React from 'react'

export default () => {
    /** Load stock api */
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://s3.tradingview.com/tv.js';
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);

    const timer = setInterval(() => {
        var tradingView = window.TradingView;
        if (tradingView) {
            new tradingView.widget(
                {
                    "autosize": true,
                    "symbol": "BINANCE:DOGEUSD",
                    "interval": "5",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "2",
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_top_toolbar": true,
                    "allow_symbol_change": true,
                    "save_image": false,
                    "watchlist": [
                      "BINANCE:DOGEUSD",
                      "BINANCE:ETHUSD",
                      "BITSTAMP:BTCUSD",
                      "BITFINEX:LTCUSD",
                      "BINANCE:ETCUSD",
                      "BINANCE:ADAUSD",
                      "BINANCE:MKRUSD",
                    ],
                    "details": true,
                    "hotlist": true,
                    "container_id": "tradingview_84d39"
                  }
            )
            clearInterval(timer);
        }
    }, 500);

    return <div style={{height: '100vh'}} id="tradingview_84d39"></div>;
}