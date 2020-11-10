async function getCampsite() {
    let response = await fetch('https://developer.nps.gov/api/v1/campgrounds?api_key=n3XStmBBXPlXWvV3RAiS4osGpcSnwcPwjgYMQLNg');
    let campsiteData = await response.json();
    return campsiteData;
}

var dogSearcher = function(param) {
    const paramType = typeof param;
    if(paramType == 'object') {
        return dogSearcherObj(param);
    }
    if(paramType == 'string') {
        if(param.indexOf('dog') !== -1 || param.indexOf('pet') !== -1 || param.indexOf('leash') !== -1) {
            return true;
        }
    }
    return false;
};
var dogSearcherObj = function(obj) {
    let foundDog = false;
    for(var key in obj) {
        if(dogSearcher(key) || dogSearcher(obj[key])) {
            foundDog = true;
            break;
        }
    }
    return foundDog;
};

let checkCampsites = async() => {
    const campsites = await getCampsite();
    let counter = 0;
    campsites.data.forEach((site) => {
        for(var key in site) {
            if(dogSearcher(site[key])) {
                counter++;
                console.log(key);
                console.log(site[key]);
            }
        }
    });
    console.log(counter);
}

checkCampsites();