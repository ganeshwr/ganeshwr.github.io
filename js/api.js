const API_TOKEN = '0883303bbb2b471db162defef7dcd4b6'

const fetchAPI = function (url) {
    let options = {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
            'X-Auth-Token': API_TOKEN
        })
    }
    
    return fetch(url, options)
}

function getClassement(league) {
    return new Promise(function (resolve, reject) {
        let URL = `https://api.football-data.org/v2/competitions/${league}/standings?standingType=TOTAL`
        
        if ('caches' in window) {
            caches.match(URL).then(function (response) {
                if (response) {
                    resolve(response.json())
                } else {
                    fetchAPI(URL)
                        .then(function (response) {
                            if (response.status == 200) {
                                return response
                            } else {
                                return reject(new Error(response.statusText))
                            }
                        })
                        .then(function (response) {
                            resolve(response.json())
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                }
            })
        }
    })
}

function getTeamInformation(teamId) {
    return new Promise(function (resolve, reject) {
        let URL = `https://api.football-data.org/v2/teams/${teamId}`

        if ('caches' in window) {
            caches.match(URL).then(function (response) {
                if (response) {
                    resolve(response.json())
                } else {
                    fetchAPI(URL)
                        .then(function (response) {
                            if (response.status == 200) {
                                return response
                            } else {
                                return reject(new Error(response.statusText))
                            }
                        })
                        .then(function (response) {
                            resolve(response.json())
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                }
            })
        }
    })
}