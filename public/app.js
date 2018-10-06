// Grab articles & store as a json
$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append(`<p data-id= ${data[i]._id}>${i+1}.
        <br>Title: ${data[i].title}<br> 
        link: <a href="https://old.reddit.com/${data[i].link}">
        https://old.reddit.com/${data[i].link}</p>`);
    }
});
// Capture <p> tag clicks
$(document).on("click", "p", function () {
    // Clear the notes section
    $("#notes").empty();

    // Save the p tag id
    var thisId = $(this).attr("data-id");

    // Then make AJAX call
    $.ajax({
        method: "GET",
        url: "articles/" + thisId
    })
        // Then (".then") add the note info to the page
        .then(function (data) {
            console.log(data);

            // article title
            $("#notes").append(`<h2> ${data.title} </h2>`);
            // $("#notes").append("<h2>" + data.title + "</h2>");

            // new title input
            $("#notes").append(`<button data-id= ${data._id} id='save-article' name='save'>Save</button>`);

            // new note input
            $("#notes").append(`<textarea id='body-input' name='body'></textarea>`);

            // submit note button
            $("#notes").append(`<button data-id= ${data._id} id='save-note'>Save Note</button>`);

            // If the article has a note 
            if (data.note) {
                // title & body action
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

// Capture "save note" clicks
$(document).on("click", "#savenote", function () {
    // get article id from "submit" button
    var thisId = $(this).attr("data-id");
    // make AJAX POST request to change note
    $.ajax({
        method: "POST",
        url: `/articles/${this.id}`,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        // then (".then") log to console and clear out the notes
        .then(function (data) {
            console.log(data);
            // And, clear input & textarea values
            $("#notes").empty();
        });
        // remove entered input values for title and body
        $("#titleinput").val("");
        $("#bodyinput").val("");
});

