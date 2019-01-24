export const ajax = (target, data, progress, callback) => {

    const request = new XMLHttpRequest();
    request.addEventListener('load',() => {
        callback(request.responseText);
    });
    if(progress){
        request.addEventListener('progress',() => {
            if(event.lengthComputable){
                let percent = event.loaded / event.total;
                progress(percent);
            }
        })
    }
    request.open("POST", target);
    request.send(createForm(data));
};

const createForm = (data) => {
    const oForm = new FormData();
    for(let key in data){
        oForm.append(key,data[key]);
    }
    return oForm;
};