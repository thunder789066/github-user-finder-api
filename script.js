function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)

    //removes spaces in names
    var origname = user.split(' ').join('');

    fetch("https://api.github.com/users/"+origname)
        .then((result) => {
            //if the response is successful show the user's details

            if (result.status == 200) {
                var userResult = result.json();
                userResult.then((data) => showUser(data));

                //else display suitable message
            } else {
                noSuchUser(username);
            }
        });
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in
    // the div '#profile' with the user content

    /* displays: name of user, user ID, Profile img, link to users github */
    $("#userName").text(user.name);
    $("#userImg").css("background-image", "url(" + user.avatar_url + ")");
    $("#userUserID").text("User ID: " + user.id);
    $("#userLink").text("User URL: " + user.html_url);
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed

    /* sets h2 tag to 'No Such User' & the rest to blank */
    $("#userName").text("No Such User");
    $("#userImg").css("background-image", "url()");
    $("#userUserID").text("");
    $("#userLink").text("");
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
        }
    })
});
