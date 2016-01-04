var BASE_URL = 'http://salt.appchef.io:3000';

function formatUrl(url) {
  let formatted = url;
  const relative = /^\/.+/;
  if (relative.test(url)) {
    formatted = BASE_URL + url;
    return formatted;
  }

  const httpHeader = /https?:\/\//g;
  if (!httpHeader.test(url)) {
    formatted = 'http://' + url;
  }
  return formatted;
}

var Chef = {
  url: formatUrl,
  get(url, authEmail = '', authToken = '') {
    var url = formatUrl(url);
    var platformParam = `?platform=${global.PLATFORM}`

    if (url.contains('?')) {
      platformParam = platformParam.replace("?", "&")
    }
    return fetch(url + platformParam, {
      method: 'get',
      headers: {
        'X-User-Email': authEmail,
        'X-User-Token': authToken
      }
    }).then((res) => res.json());
  },
  post(url, body = '') {
    var url = formatUrl(url);
    return fetch(url, {
      method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  },
  put(url, body) {
    var url = formatUrl(url);
    return fetch(url, {
      method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  },
  delete(url) {
    var url = formatUrl(url);
    return fetch(url, { method: 'delete' }).then((res) => res.json());
  }
};

module.exports = Chef;
