// Textbook
// 2017
// Grosser
//
// thx to maddie for beta testing

// undo of the injected CSS
var notbcss = 'div[role="img"], img,	._4ay8, ._6ks,  ._9--, .img,  ._2n_9, ._3j7l, ._51mq, ._5nxw, button._q52, .uiMediaThumbImg, .UFILikeLink::before, .comment_link::before, .share_action_link::before, ._qk8, .webMessengerMessageGroup img._50dv { opacity:1; } img._3chq,  ._1445, video._ox1, ._3x-2 video { opacity:1; } ._4n1w, ._4m1w { opacity:1; background-position:0px, 0x !important; } ._1oxj ._3j7l,  ._1gr3 i.img,   ._6m3, ._3u17 i { opacity:1; } ._jfc { background-color:#ccc; } .stage img { opacity:1; } .uiMediaThumbImg, .albumThumbLink img, .fbPhotoStarGridElement img, .fbPhotoStarGridElement i, .fbPhotoSnowLiftContainer img, .fbPhotoSnowLiftContainer i { opacity:1; } ._52kr, .webMessengerMessageGroup img, .conversation img, #webMessengerRecentMessages img, #wmMasterViewThreadlist img, ._4-of img, ._4-of i { opacity:1; } ._2md { opacity:1; } video._4jhq { opacity:1; }';


$(document).ready(function() { 

    // listen for messages from the extension control popup, adj as directed
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {

        // hide images
        if(request.on) { $('#notextbook').remove();  }

        // show images
        else { $('head').  append('<style type="text/css" id="notextbook">'+notbcss+'</style>'); }

        sendResponse({farewell: "msg rcvd"});
    });

    console.log("Textbook (2017), ver. 1.0.2 -- by Ben Grosser");

    // on first load, grab all saved data and respond
    chrome.storage.local.get("on", function(data) {
        if(chrome.runtime.lastError) {
            chrome.storage.local.set({"on":true}, function() {
            });
        } else {
            if(data.on || data.on == undefined) {
                console.log("Textbook: hide images is ON.");
                $('#notextbook').remove();

            } else {
                console.log("Textbook: hide images is OFF.");
                $('head').append('<style type="text/css" id="notextbook">'+notbcss+'</style>');
            }
        }
    });


    // videos/gifs/etc are tricky. lots to hide. need to listen for clicks 
    // on videos (and their parents) and then reveal several elements
    // to make a video show up
    waitForKeyElements("video._ox1", function(jn) {
      var c = jn.closest('._1dwg');
      c.click(function() {
        $(this).
          find('i, video, img._3chq, img._1445').
          css('opacity','1')
        ;
      });
    }, false);
});


