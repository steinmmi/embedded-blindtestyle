var rp = require('request-promise');
let Deezer = {};

Deezer.apiUrl = 'https://api.deezer.com/';

Deezer.getTrack = function(id) {
    var url = 'track/' + id;
    return rp({url: this.apiUrl + url, json:true});
};

Deezer.getAlbum = function(id) {
    var url = 'album/' + id;
    return rp({url: this.apiUrl + url, json:true});
};

Deezer.getArtist = function(id) {
    var url = 'artist/' + id;
    return rp({url: this.apiUrl + url, json:true});
};

Deezer.findTracks = function(options, index, order) {
    var url = 'search?q=';
    var query = '';
    if (typeof options === 'object') {
        for (var key in options) {
            query = query + key + ':"' + options[key] + '" ';
        }
    } else {
        query = options;
    }
    url = url + query;

    if (index !== 0) url = url + '&index=' + index;
    if (order) url = url + '&order=' + order;

    return rp({url: this.apiUrl + url, json:true});
};

Deezer.findAlbums = function(query, index) {
    var url = 'search/album?q=' + query;
    if (index !== 0) url = url + '&index=' + index;

    return rp({url: this.apiUrl + url, json:true});
};

Deezer.findArtists = function(query, index) {
    var url = 'search/artist?q=' + query;
    if (index !== 0) url = url + '&index=' + index;

    return rp({url: this.apiUrl + url, json:true});
};

module.exports = Deezer;