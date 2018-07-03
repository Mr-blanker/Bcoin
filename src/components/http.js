function getError(action, option, xhr) 
{
    let msg;
    if (xhr.response) {
        msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
        msg = `${xhr.responseText}`;
    } else {
        msg = `fail to post ${action} ${xhr.status}`;
    }

    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
}

function getBody(xhr)
{
    const text = xhr.responseText || xhr.response;
    if (!text) return text;
    try { return JSON.parse(text); } catch (e) { return text; }
}

export default function (url, option)
{
    if (typeof XMLHttpRequest === 'undefined') return;

    const xhr    = new XMLHttpRequest();
    const action = url;


    const formData = new FormData();

    if (option.data)
    {
        Object.keys(option.data).forEach(key => {
            formData.append(key, option.data[key]);
        });
    }

    // 错误回调
    xhr.onerror = function error(e)
    {
        option.onError(e);
    };


    xhr.onload = function onload()
    {
        if (xhr.status < 200 || xhr.status >= 300)
            return option.onError(getError(action, option, xhr));
        option.onSuccess(getBody(xhr));
    };


    xhr.open(option.method ? option.method:'get', action, true);

    if (option.withCredentials && 'withCredentials' in xhr) xhr.withCredentials = true;

    const headers = option.headers || {};

    for (let item in headers)
    {
        if (headers.hasOwnProperty(item) && headers[item] !== null) xhr.setRequestHeader(item, headers[item]);
    }

    xhr.send(formData);
    return xhr;
}