let firstModal = document.getElementById("firstModal");
let secondModal = document.getElementById("secondModal");
let main = document.body;
let uploadArea = document.getElementById("upload");
let transferFile;
let fileURL;

//open modal for upload
document.getElementById("nav-add").onclick = function (e) {
    if (transferFile) {
        console.log('transferFile exists');
        console.log('fileURL: ' + fileURL);
        window.URL.revokeObjectURL(fileURL);
        console.log('fileURL: ' + fileURL);
        transferFile = null;
        console.log('transferFile is now null');
    } else {
        console.log('transferFile null');
        console.log('fileURL: ' + fileURL);
    }

    document.getElementById("drop-image").style.display = "block";
    document.getElementById("select-image").style.display = "block";
    document.getElementById("modal-next").style.display = "none";

    uploadArea.style.backgroundImage = "none";

    firstModal.style.display = "flex";
    main.style.overflow = "hidden";
}

//close modal
document.getElementById("modal-close").onclick = function (e) {
    e.target.files = null;
    firstModal.style.display = "none";
    main.style.overflow = "scroll";
}

//close modal
document.getElementById("modal-close-2").onclick = function (e) {
    e.target.files = null;
    secondModal.style.display = "none";
    main.style.overflow = "scroll";
}

window.onclick = function (e) {
    if (e.target == firstModal) {
        e.target.files = null;
        firstModal.style.display = "none";
        main.style.overflow = "scroll";
    }

    if (e.target == secondModal) {
        console.log('second modal window clicked');
        e.target.files = null;
        secondModal.style.display = "none";
        main.style.overflow = "scroll";
    }
}

//image drop
uploadArea.ondrop = function (e) {
    console.log('file(s) dropped');

    e.stopPropagation();
    e.preventDefault();

    if (e.dataTransfer.items.length > 1) {
        alert('upload only 1 image');
    }
    if (e.dataTransfer.items) {
        if (e.dataTransfer.items[0].kind === 'file') {
            transferFile = e.dataTransfer.items[0].getAsFile();
            console.log('...file name = ' + transferFile.name);
        }
    }
    document.getElementById("drop-image").style.display = "none";
    document.getElementById("select-image").style.display = "none";
    document.getElementById("modal-next").style.display = "block";

    fileURL = window.URL.createObjectURL(transferFile);
    uploadArea.style.backgroundImage = "url(" + fileURL + ")";
    uploadArea.style.backgroundSize = "cover";
    uploadArea.style.backgroundRepeat = "no-repeat";
    uploadArea.style.backgroundPosition = "center";
}

uploadArea.ondragover = function (e) {
    console.log('file(s) in drop zone');
    e.stopPropagation();
    e.preventDefault();
}

//second modal open
document.getElementById("modal-next").onclick = function () {
    firstModal.style.display = "none";
    secondModal.style.display = "flex";

    let writeImg = document.getElementById("write-img");

    if (fileURL) {
        writeImg.style.backgroundImage = "url(" + fileURL + ")";
        writeImg.style.backgroundSize = "cover";
        writeImg.style.backgroundRepeat = "no-repeat";
        writeImg.style.backgroundPosition = "center";
    }
}

//textarea word count
document.getElementById("write-content").onkeyup = function(){
    document.getElementById("wordCount").innerHTML = this.value.length.toLocaleString('en-US');
}

//second modal- back button
document.getElementById("back").onclick = function(){
        firstModal.style.display = "flex";
    secondModal.style.display = "none";
}
