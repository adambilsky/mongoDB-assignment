// Grab articles & store as a json
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++ {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "br />" + data[i].link + "</p>");
    }
});
// Capture <p> tag clicks
$(document).on("click", "p", function() {
    // Clear the notes section
    $("#notes").empty();

    // Save the p tag id
    var thisId = $(this).attr("data-id");
})
    // Then make AJAX call
    $.ajax({
        method: "GET",
        url: "articles/" + thisId
    })
    // Then (".then") add the note info to the page
        .then(function(data) {
            console.log(data);
            
            // article title
            $("#notes").append(`<h2> ${data.title} </h2>`);
            // $("#notes").append("<h2>" + data.title + "</h2>");

            // new title input
            $("#notes").append("<input id='title-input' name='title' >");

            // new note input
            $("#notes").append("textarea id='body-input' name='body'></textarea>");

            // submit note button
            $("#notes").append(`button data-id= ${data._id} id='save-note'>Save Note</button>`);

        })
    // If the article has a note 

        // title & body action
    
// Capture "save note" clicks
    // get article id from "submit" button

    // make AJAX POST request to change note
    // then (".then") log to console and clear out the notes

    // And, clear input & textarea values
    