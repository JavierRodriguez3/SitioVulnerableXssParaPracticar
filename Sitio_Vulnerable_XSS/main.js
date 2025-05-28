document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("commentForm");
    const commentsList = document.getElementById("commentsList");
    const clearCommentsButton = document.getElementById("clearCommentsButton");
    
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        commentsList.innerHTML = "";
        comments.forEach(comment => {
            const commentItem = document.createElement("li");
            commentItem.innerHTML = `<p><strong>${comment.userName}:</strong> ${comment.userComment}</p>`;
            commentsList.appendChild(commentItem);
        });
    }

    loadComments();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const userName = document.getElementById("userName").value;
        const userComment = document.getElementById("userComment").value;

        if (userName.trim() === "" || userComment.trim() === "") {
            alert("Porfavor, rellenar todos los campos");
            return;
        }

        const commentItem = document.createElement("li");

        commentItem.innerHTML = `<p><strong>${userName}:</strong> ${userComment}</p>`;
        commentsList.appendChild(commentItem);
        //Vulnerable

        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push({ userName, userComment });
        localStorage.setItem("comments", JSON.stringify(comments));

        form.reset();

    });

    clearCommentsButton.addEventListener("click", function () {

        commentsList.innerHTML = "";

        localStorage.removeItem("comments");
    
    });

});


