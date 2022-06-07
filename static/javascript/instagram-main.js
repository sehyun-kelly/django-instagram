let firstModal = document.getElementById("firstModal");
let secondModal = document.getElementById("secondModal");
let main = document.body;
let uploadArea = document.getElementById("upload");
let transferFile;
let fileURL;

//open modal for upload
document.getElementById("nav-add").onclick = function () {
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
    if (e.target === firstModal) {
        e.target.files = null;
        firstModal.style.display = "none";
        main.style.overflow = "scroll";
    }

    if (e.target === secondModal) {
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


$('#modal-share').click(function() {
    let file = transferFile;
    let image = transferFile.name;
    let content = document.getElementById("write-content").value;
    let user_id = 'sehyun.kelly';
    let profile_img = 'https://www.skillshare.com/blog/wp-content/uploads/2020/11/BANNER_228129.png';

    let fd = new FormData();

    fd.append('file', file);
    fd.append('image', image);
    fd.append('content', content);
    fd.append('user_id', user_id);
    fd.append('profile_img', profile_img);

    $.ajax({
        url: "/content/upload",
        data: fd,
        method: "POST",
        processData: false,
        contentType: false,
        success: function (data) {
            console.log('success');
        },
        error: function(request, status, error){
            console.log('error');
        },
        complete: function(){
            console.log('complete');
            location.replace("/main");
        }
    });
});

let comment = document.querySelectorAll('.comment');
let commentSubmit = document.querySelectorAll('.comment-submit');

for(let i = 0; i < comment.length; i++){
    comment[i].onkeydown = function(){
        commentSubmit[i].style.color = '#0095F7';
    }
}

for(let i = 0; i < commentSubmit.length; i++){
    commentSubmit[i].onclick = function(e){
    let feed_id = e.target.getAttribute('feed_id');
    let reply_id = 'reply_' + feed_id;
    let user_id = 'sehyun_kelly';
    console.log(reply_id);
    let reply_content = document.getElementById(reply_id).value;
    console.log(reply_content);

    if(reply_content.length <= 0){
        alert('No comment entered');
        return 0;
    }

    $.ajax({
            url: "/content/reply",
            data: {
                feed_id: feed_id,
                user_id: user_id,
                reply_content: reply_content
            },
            method: "POST",
            success: function (data) {
                console.log("success");
                $('#comment-section-' + feed_id).append('<div class="post-content-box">' + '<span><strong>' + user_id + ' </strong></span>' +
                    '<span>' + reply_content + '</span></div>')
            },
            error: function (request, status, error) {
                console.log("error");
            },
            complete: function () {
                console.log("complete");
                $('#' + reply_id).val('');
            }
        });


}
}
