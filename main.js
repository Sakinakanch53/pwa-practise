let fetchJSONButton = document.getElementById('fetchJSON');
fetchJSONButton.addEventListener('click', fetchJSON);

function fetchJSON() {

    fetch('girl.png').then(result => {
        return result.blob()
    }).then(res => {
        let container = document.getElementById('container');
        let img = document.createElement('img');
        container.appendChild(img);
        const imgURL = URL.createObjectURL(res);
        img.src = imgURL
    }).catch(error => {
        console.error(error);

    })

}

/*let fetchJSONButton = document.getElementById('fetchJSON');
fetchJSONButton.addEventListener('click', fetchJSON);

function fetchJSON() {

    fetch('animal.json').then(logResult).catch(logError);
}*/