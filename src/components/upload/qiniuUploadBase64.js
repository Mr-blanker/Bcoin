function getBody(xhr)
{
    const text = xhr.responseText || xhr.response;
    if (!text) return text;
    try { return JSON.parse(text); } catch (e) { return text; }
}

export default function qiniuUploadBase64(base64, option) {
    let pic = base64;
    let url = option.url;
    let xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //         option.onError && option.onError(getBody(xhr));
    //     }
    // };

    // 错误回调
    xhr.onerror = function ()
    {
        option.onError && option.onError(getBody(xhr));
    };

    // 进度
    if (xhr.upload)
    {
        xhr.upload.onprogress = function progress(e)
        {
            if (e.total > 0) option.onProgress(e.percent = e.loaded / e.total * 100);
        };
    }

    // 正确回调
    xhr.onload = function () {
        // if (xhr.status < 200 || xhr.status >= 300)
        //     return option.onError && option.onError(getBody(xhr));
        option.onSuccess && option.onSuccess(getBody(xhr));
    };

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken " + option.token);
    xhr.send(pic);
};
