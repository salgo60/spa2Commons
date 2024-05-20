// This script adds a new "SPA Import" button to categories or ???
// pages (whichever is associated about Swedish people born before 1880 and after 1700).

// The code for this script is based on GitHub (https://github.com/kaldari/iNaturalist2Commons)
// * github.com/salgo60/spa2Commons
// Licens Creative Commons Attribution-ShareAlike License.

//<nowiki>

console.log("spa2commons4");
//debugger;
// Make sure we are on a Category page and in view mode.
if ( ( mw.config.get( 'wgNamespaceNumber' ) === 0 || mw.config.get( 'wgNamespaceNumber' ) === 14 ) && mw.config.get( 'wgAction' ) === 'view' ) {

    // Load Codex styles and scripts
    mw.loader.load( 'https://commons.wikimedia.org/w/index.php?title=User:salgo60/spa2commons.css&action=raw&ctype=text/css', 'text/css' );
    mw.loader.load( 'path/to/codex.css', 'text/css' ); // Update with the actual path to Codex CSS
    mw.loader.load( 'path/to/codex.js', 'text/javascript' ); // Update with the actual path to Codex JS

    // Initialize global spaID variable
    spaId = null;
    spaSearchAll = null;

    // Script depends on Codex modules
    mw.loader.using( ['mediawiki.user', 'mediawiki.api', 'mediawiki.ForeignApi'], function() {
        // Construct object (to prevent namespace conflicts)
        spa2commons = {

            displayProgress: function( message ) {
                $( '#import-dialog div' ).remove(); // remove everything else from the dialog box
                $( '#import-dialog' ).append ( $( '<div class="import-progress" style="text-align:center;margin:1.8em 0;"></div>' ).html( message+'<br/><br/><img src="//upload.wikimedia.org/wikipedia/commons/4/42/Loading.gif" />' ) );
            },

            displayMessage: function( message ) {
                $( '#import-dialog div' ).remove(); // remove everything else from the dialog box
                $( '#import-dialog' ).append ( $( '<div class="import-message"></div>' ).html( message ) );
            },

            displayError: function( error ) {
                $( '#import-dialog div' ).remove(); // remove everything else from the dialog box
                $( '#import-dialog' ).append ( $( '<div class="import-error" style="color:#990000;"></div>' ).html( 'Error: '+error ) );
            },

            launchPreview: function( uploadParams ) {
                console.log("uploadParams: ",uploadParams)
                var imageExtension = uploadParams.thumbUrl.split('.').pop();
                uploadParams.mediumUrl =  uploadParams.thumbUrl.replace('/square', '/medium');
                $previewInterface = $( '<div></div>', {
                    id: "preview-dialog",
                    style: "position: relative; text-align: center; min-height: 500px;",
                    html: "<p><img src='" + uploadParams.mediumUrl + "' /><\p>" + 
                        uploadParams.name + " " + uploadParams.birthdate + " - " +
                        "<a target=_blank href='https://portrattarkiv.se/details/" + uploadParams.spaid + "'>SPA</a> - " +
                        "<a target=_blank href='https://www.google.com/search?q=" + uploadParams.name + "+site%3Awikidata.org'>search WD</a>"
                } ).codexDialog({ // Use Codex dialog
                    width: 700,
                    autoOpen: false,
                    title: 'Preview',
                    modal: false,
                    position: { my: "top", at: "top+150", of: "body" },
                    buttons: [
                        {
                            text: "Upload image",
                            classes: "spa-upload-button",
                            click: function() {
                                uploadParams.originalUrl =  uploadParams.thumbUrl.replace('/square', '/original');
                                uploadParams.spaid =  uploadParams.thumbUrl;

                                $previewInterface.codexDialog( 'close' ); // Use Codex dialog close
                                spa2commons.launchUpload( uploadParams );
                            }
                        }
                    ]
                });
                $previewInterface.codexDialog( 'open' ); // Use Codex dialog open
            },

             launchUpload: function( uploadParams ) {
                var href = '';
                var uploadPage = 'https://commons.wikimedia.org/wiki/Special:Upload';
                var license = '';
                var description = "uploaded from Portrattarkiv.se picture of " + uploadParams.name;
                var descriptionsv = "uppladdat från Portrattarkiv.se bild av " + uploadParams.name;
                var targetName = `${uploadParams.name}_SPA.jpg`;
                var sourceSPA = uploadParams.originalUrl.replace("endpoints/file.php?id=","details/");
                var original = uploadParams.originalUrl; 
                var summary = `{{Information
|description={{sv|${descriptionsv}}}{{en|${description}}}
|source=${sourceSPA}
|author={{sv|okänd}}{{en|Unknown}}
|permission=
|other versions=
}}

[[Category:${uploadParams.category}]]
[[Category:Uploaded with spa2Commons]]
[[Category:Swedish_Portrait_Archive]]
`;

            // Choose the appropriate license
            license = 'cc-by-4.0'; // Set this to the appropriate license for your use case
            // Construct the upload URL
            href = `${uploadPage}?wpUploadDescription=${encodeURIComponent(summary)}&wpLicense=${license}&wpDestFile=${targetName}&wpSourceType=url&wpUploadFileURL=${original}`;

            // Open the upload page in a new window/tab
            window.open(href, "uploadWindow");
        },
            
            launchDialog: function() {
                var SPAApi = 'https://portrattarkiv.se/endpoints/latest.php';
                SPAApi = 'https://portrattarkiv.se/endpoints/search.php';
                var uri = new mw.Uri();
                var maxImages = 100;
                var spaparams = { 'from':'0',
                                'limit': '50'
                };
                try{
                    spaparams.all = uri.path.split(":")[1].replace("_"," ").replace("_"," ");
                }
                catch (error) {
                    console.log(error);
                    console.log(uri);
                    uri = new mw.Uri();
                    console.log(uri);
                    spaparams.all = uri.path.split("/")[-1].replace("_"," ").replace("_"," ");
                    console.log("spaParams ", spaparams.all );
                }
                if ( typeof uri.query.spalimit !== 'undefined' ) {
                    maxImages = parseInt( uri.query.spalimit );
                }
                spaparams.limit = maxImages - 20; // Some observations have multiple images

                spa2commons.displayProgress( 'Loading images...');
                $importInterface.codexDialog( 'open' ); // Use Codex dialog open
                $.post(SPAApi,JSON.stringify(spaparams))
                    .done( function( data ) {
                        if ( data.hits.hits[0] === undefined ) {
                            spa2commons.displayMessage( 'No pictures found');
                        } else {
                            var x = 0;
                            urlbasePic = "https://portrattarkiv.se/endpoints/file.php?id=";
                            $( '#import-dialog div' ).remove();
                            $( '#import-dialog' ).append( $( '<div id="import-images"></div>' ).
                                html( 'Select an image to preview:  | Search. box | ID. box <br/>' ).append ( $( '<ol></ol>' ) ) );
                            data.hits.hits.forEach( function( hit ) {
                                spaname = hit._source.FirstName + " " + hit._source.LastName;
                                birthdate = hit._source.BirthDate || ""; 
                                debugger;
                                var uploadParams = {
                                    spaid: hit._id,
                                    thumbUrl: urlbasePic + hit._id,
                                    category: mw.config.get( 'wgTitle' ),
                                    name: spaname,
                                    birthdate: birthdate
                                };
                                $( '#import-dialog ol' ).append ( $( '<li></li>' )
                                    .html( '<img data-photo-id="' + hit._id + 
                                    '" src="' + urlbasePic +  hit._id + 
                                    '" height="200" /><br>' + spaname + "<br>" + birthdate + "<br>")
                                    .on( 'click', function() {
                                        console.log("uploadParams: ",uploadParams)
                                        spa2commons.launchPreview( uploadParams );
                                    } )
                                );
                                x++;
                            } );
                        }
                    } )
                    .fail( function() {
                        spa2commons.displayError( 'Loading images failed. If you are using a privacy plug-in like Privacy Badger, you may need to adjust your settings.' );
                    } );
            },

            initialize: function() {
                console.log("initialize. spa2commons");
                $importInterface = $('<div id="import-dialog" style="position:relative;"></div>')
                    .codexDialog({ // Use Codex dialog
                        width: 924,
                        autoOpen: false,
                        title: 'Import images from SPA - version 4.05',
                        modal: true,
                        position: { my: "top", at: "top+100", of: "body" },
                    });
                $$button = $('<button>')
                .attr('style', 'margin: 0 0.5em 0.5em 0.5em; text-decoration: none; font-size: 15px;')
                .append(
                    $('<span>')
                        .attr('id', 'spa2commons-buttontextwrapper')
                        .append($('<span>')
                            .attr('id', 'spa2commons-buttontext')
                            .text('SPA import version 4.05'))
                )
                .on('click', function () {
                    spa2commons.launchDialog();
                    return false;
                })
                .button();

            // Check user rights and get the spa ID
            $(document).ready(function () {
                var wikidataId = mw.config.get('wgWikibaseItemId');
                var wikidataApi = new mw.ForeignApi('//www.wikidata.org/w/api.php');
                var params = { 'action': 'wbgetentities', 'props': 'claims' };
                debugger;
                mw.user.getRights().then(function (rights) {
                    // Make sure the user has the 'upload_by_url' right
                    if (rights.indexOf('upload_by_url') > -1) {
                        // Try getting the SPA ID from the Wikidata infobox
                        $('#firstHeading').append($button);
                    }
                });
            });

} // close initialize function
