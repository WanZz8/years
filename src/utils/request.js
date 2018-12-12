const GUID = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const throwError = (json) => {
    const error = new Error(json.code);
    error.message = json.msg;
    error.code = json.code;
    throw error;
};

const checkStatus = ({ resp, json, }) => {
    // 如果 返回结果中包含 code 和 message, 则认为出错了
    if (resp.status >= 200 && resp.status < 300) {
        return json;
    } if (resp.status >= 500) {
        throwError(json);
    } else {
        throwError(json);
    }

    return json;
};

const encodeQuery = (path, data = {}) => {
    // console.log(path);
    let url = path;
    if (!data || !Object.keys(data).length) {
        return url;
    }

    url = url.indexOf('?') === -1 ? `${url}?` : `${url}&`;
    const query = Object.keys(data)
        .map(key => `${key}=${data[key]}`)
        .join('&');

    return `${url}${query}`;
};

const FETCH = (url, options, noHeaders = false) => {
    const { headers, ...others } = options;
    let combineHeaders = { ...headers, };
    if (!noHeaders) {
        combineHeaders = { 'X-Request-Id': GUID(), ...headers, };
    }

    return fetch(url, {
        credentials: 'include',
        ...others,
        headers: combineHeaders,
    })
        .then(resp => resp
            .json()
            .then(json => ({ resp, json, }))
            .catch(error => ({ resp, json: {}, error, })), )
        .then(checkStatus);
};

const POST = (url, data = {}, options = {}) => {
    // console.log(url);
    const dataCopy = { ...data, _: new Date().getTime(), };
    // console.log(dataCopy);

    return FETCH(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataCopy),
        ...options,
    })
        .then(resp => resp)
        .catch((error) => { console.log(error); });
};

const GET = (url, data = {}, options = {}) => {
    // console.log(url);
    const requestUrl = encodeQuery(url, data);
    // console.log(options);
    return FETCH(requestUrl, {
        method: 'GET',
        contentType: 'application/json',
        ...options,
    })
        .then(res => res)
        .catch((error) => {
            throw error;
        });
};

module.exports = {
    POST,
    GET,
};
