import React from 'react';

async function addCode(url, data) { 
    Object.keys(data).forEach(key => url.searchParams.append(key, data[key]))
    const request = await fetch(url);
    return await request.json();
}
export default function() {
    const location = window.location;
    const search = location.search.split("?")[1]
    const params = search ? search.split('&') : [];
    let code = '';
    let wallCode = '';

    params.forEach((param) => {
        const pairs = param.split("=");
        if(pairs[0] === 'code') {
            code = pairs[1];
        }
        if(pairs[0] === 'state') {
            wallCode = pairs[1];
        }
    });
    if(code) {
        const url = new URL('https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/instaAuth');
        const data = {
            code,
            wallCode,
            returnURL: location.origin + location.pathname
        };
        addCode(url, data)
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (<div>Authorization Complete!</div>);
}