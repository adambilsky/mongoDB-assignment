$(document).ready(function () {

    // When user clicks "Scrape", 
    // grab articles & store as a json
    $("#scrape").on("click", function () {
        console.log("The 'scrape' button has been clicked");
    $.getJSON("/articles", function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#articles").append(`<p data-id= ${data[i]._id}>${i + 1}.
                <a href="https://old.reddit.com/${data[i].link}" target="_blank">${data[i].title}</p>`);
            }
        });
    });

    // When user clicks in the area around the link
    // this is a bit awkward - if the user clicks the link,
    // the link opens in a new tab - refactor maybe with style 
    // to indicate where to click or add a button instead of the <tag>
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
                console.log("This is the displayed data:", data);

                // article title
                $("#notes").append(`<h4> ${data.title} </h4>`);
                // $("#notes").append("<h2>" + data.title + "</h2>");

                // new note input
                $("#notes").append(`<textarea id='bodyinput' name='body'></textarea>`);

                // submit note button
                $("#notes").append(`<button data-id=${data._id} id='saveNote'>Save Note</button>`);

                // If the article has a note 
                if (data.note) {
                    // title & body action
                    $("#titleinput").val(data.note.title);
                    $("#bodyinput").val(data.note.body);
                }
            });
    });

    // When the user clicks "Save Note"
    $("#saveNote").on("click", function () {
        // get article id from "submit" button
        console.log("The 'Save Note' button has been clicked");
        var thisId = $(this).attr("data-id");
        // make AJAX POST request to change note
        $.ajax({
            method: "POST",
            url: `/articles/ + ${thisId}`,
            data: {
                body: $("#bodyinput").val(),
                saved: true
            }
        })
            // then (".then") log to console and clear out the notes
            .then(function (data) {
                console.log("This is the saved data: ", data);
                // And, clear input & textarea values
                // $("#notes").empty();
            });
        // remove entered input values for title and body
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });
})
