import React from 'react';

async function addCode(url) {
    const request = await fetch(url);
    return await request.json();
}
export default function() {
    const search = window.location.search.split("?")[1]
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
        const url = `https://dxk3dp2ts2.execute-api.us-east-2.amazonaws.com/personal/instaAuth?code=${code}&wallCode=${wallCode}`;
        addCode(url)
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (<div>Authorization Complete!</div>);
}