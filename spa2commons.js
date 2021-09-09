// This script adds a new "SPA Import" button to categories or ???
// pages (whichever is associated about Swedish people born before 1880 and after 1700).

// The code for this script is based on GitHub (https://github.com/kaldari/iNaturalist2Commons)
// * github.com/salgo60/spa2Commons
// Licens Creative Commons Attribution-ShareAlike License.

//<nowiki>

console.log("spa2commons");
//debugger;
// Make sure we are on a Category page and in view mode.
if ( ( mw.config.get( 'wgNamespaceNumber' ) === 0 || mw.config.get( 'wgNamespaceNumber' ) === 14 ) && mw.config.get( 'wgAction' ) === 'view' ) {

	// Move this out when converting to gadget
	mw.loader.load( 'https://commons.wikimedia.org/w/index.php?title=User:salgo60/spa2commons.css&action=raw&ctype=text/css', 'text/css' );

	// Initialize global spaID variable
	spaId = null;

	// Script depends on jQuery UI dialog and jQuery UI selectable modules
	mw.loader.using( ['mediawiki.user', 'mediawiki.api', 'mediawiki.ForeignApi', 'jquery.ui'], function() {
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
				var imageExtension = uploadParams.thumbUrl.split('.').pop();
				uploadParams.mediumUrl =  uploadParams.thumbUrl.replace('/square', '/medium');
				$previewInterface = $( '<div></div>', {
					id: "preview-dialog",
					style: "position: relative; text-align: center; min-height: 500px;",
					html: "<p><img src='" + uploadParams.mediumUrl + "' /><\p>" + 
					    uploadParams.name + " " + uploadParams.birthdate + " - " +
					    "<a target=_blank href='https://portrattarkiv.se/details/" + uploadParams.spaid + "'>SPA</a>"
				} )
				.dialog({
					width: 600,
					autoOpen: false,
					title: 'Preview',
					modal: false,
					position: { my: "top", at: "top+150", of: "body" },
					buttons: [
						{
							text: "Upload image",
							classes: "inaturalist-upload-button",
							click: function() {
								uploadParams.originalUrl =  uploadParams.thumbUrl.replace('/square', '/original');
								$previewInterface.dialog( 'close' );
								spa2commons.launchUpload( uploadParams );
							}
						}
					]
				});
				$previewInterface.dialog( 'open' );
			},
			
			launchUpload: function( uploadParams ) {
				var href = '';
				var uploadPage = 'https://commons.wikimedia.org/wiki/Special:Upload';
				var license = '';
				var description = '';
				description = "uploaded from Portrattarkiv.se";
				var ext = uploadParams.thumbUrl.split( '?' )[0].split('.').slice( -1 );
				var targetName = `${uploadParams.spaid}.jpg`;
                var original = uploadParams.originalUrl;
				var summary = `{{Information
|description={{en|${description}}}
|source=https://portrattarkiv.se/details/${uploadParams.spaid}
|author=Unknown
|permission=
|other versions=
}}

[[Category:${uploadParams.category}]]
[[Category:Uploaded with spa2Commons]]
`;
            license = 'cc-by-4.0';
			debugger;

    		//TODO
			var href = `${uploadPage}?wpUploadDescription=${encodeURIComponent(summary)}&wpLicense=${license}&wpDestFile=${targetName}&wpSourceType=url&wpUploadFileURL=${original}`;
			debugger;
			
			window.open( href, "uploadWindow" );
			},

			launchDialog: function() {
				var SPAApi = 'https://portrattarkiv.se/endpoints/latest.php';
				var uri = new mw.Uri();
				var maxImages = 104;
				var params = { 'limit': '100' };

				// Allow overriding with an observation ID
				// For example '?spaid=73898408'
				debugger;
				if ( typeof uri.query.spaid !== 'undefined' ) {
					params.id = uri.query.spaid;
				}
				
				// Allow overriding number of images with a query string parameter
				if ( typeof uri.query.spalimit !== 'undefined' ) {
					maxImages = parseInt( uri.query.spalimit );
				}
				params.limit = maxImages - 20; // Some observations have multiple images

				// Restore dialog to original state
				spa2commons.displayProgress( 'Loading images...');
				// Open the dialog box
				$importInterface.dialog( 'open' );
				// Retrieve images
				$.getJSON( SPAApi, params )
					.done( function( data ) {
						debugger;
						if ( data.hits.hits[0] === undefined ) {
							spa2commons.displayMessage( 'No pictures found');
						} else {
							var x = 0;
							urlbasePic = "https://portrattarkiv.se/endpoints/file.php?id="
							debugger;
							
							$( '#import-dialog div' ).remove();
							$( '#import-dialog' ).append( $( '<div id="import-images"></div>' ).html( 'Select an image to preview:<br/>' ).append ( $( '<ol></ol>' ) ) );
							data.hits.hits.forEach( function( hit ) {
								// Go through each photo
								name = hit._source.FirstName + " " + hit._source.LastName
								birthdate = hit._source.BirthDate 
								var uploadParams = {
									spaid: hit._id,
									thumbUrl: urlbasePic + hit._id,
									category: mw.config.get( 'wgTitle' ),
									name: name,
									birthdate: birthdate
								};
								$( '#import-dialog ol' ).append ( $( '<li></li>' )
									.html( '<img data-photo-id="' + hit._id + 
									'" src="' + urlbasePic +  hit._id + 
									'" height="75" width="75"/><br>' + name + "<br><br>")
									.on( 'click', function() {
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

			tryFallbackQueries: function( params, wikidataApi ) {
				// Try getting the data associated with the main namespace page of the same title
				params.sites = 'commonswiki';
				params.titles = mw.config.get( 'wgTitle' );
				delete params.ids;
				// Make API call to Wikidata
				wikidataApi.get( params ).done( function ( data2 ) {
					// Get the Wikidata item ID
					wikidataId = Object.keys( data2.entities )[0];
					// Wikidata returns "-1" for undefined
					console.log("tryFallbackQueries. spaId; ", data2);
					if ( wikidataId !== "-1" && data2.entities[wikidataId].claims.P4819 !== undefined && data2.entities[wikidataId].claims.P4819[0].mainsnak.datavalue.value !== undefined ) {
						// Get the SPA ID (P4819)
						spaId = data2.entities[wikidataId].claims.P4819[0].mainsnak.datavalue.value;
						// Insert import button into page interface
						$( '#firstHeading' ).append( $button );
					} else {
						// Last resort: Try getting the data associated with the Swedish Wikipedia article
						//DELETE
						params.sites = 'svwiki';
						wikidataApi.get( params ).done( function ( data3 ) {
							wikidataId = Object.keys( data3.entities )[0];
							if ( wikidataId !== "-1" && data3.entities[wikidataId].claims.P4819 !== undefined && data3.entities[wikidataId].claims.PP4819[0].mainsnak.datavalue.value !== undefined ) {
								// Get the SPA ID (P4819)
								spaId = data3.entities[wikidataId].claims.P4819[0].mainsnak.datavalue.value;
								// Insert import button into page interface
								$( '#firstHeading' ).append( $button );
							}
						});
					}
				});
			},

			initialize: function() {
				// Define importing interface
				console.log("initialize. spa2commons");
				$importInterface = $('<div id="import-dialog" style="position:relative;"></div>')
					.dialog({
						width: 724,
						autoOpen: false,
						title: 'Import images from SPA',
						modal: true,
						position: { my: "top", at: "top+100", of: "body" },
					});
				// Define the import button
				$button = $( '<button>' )
					.attr( 'style', 'margin: 0 0.5em 0.5em 0.5em; text-decoration: none; font-size: 15px;' )
					.append(
						$( '<span>' )
							.attr( 'id', 'spa2commons-buttontextwrapper' )
							.append( $( '<span>' )
								.attr( 'id', 'spa2commons-buttontext' )
								.text( 'SPA import' ) )
					)
					.on( 'click', function () {
						spa2commons.launchDialog();
						return false;
					} )
					.button();

				// Check user rights and get the spa ID
				$( document ).ready( function() {
					var wikidataId = mw.config.get( 'wgWikibaseItemId' );
					var wikidataApi = new mw.ForeignApi('//www.wikidata.org/w/api.php');
					var params = { 'action': 'wbgetentities', 'props': 'claims' };

					mw.user.getRights().then( function ( rights ) {
						// Make sure the user has the 'upload_by_url' right
						if ( rights.indexOf( 'upload_by_url' ) > -1 ) {
							// Try getting the SPA ID from the Wikidata infobox
							if ( !spaId ) {
								// If the Category page has an associated Wikidata ID, try that first
								// DELETE
								if ( wikidataId ) {
									//debugger;
									console.log("initialize. wikidataId");
									params.ids = wikidataId;
									console.log("initialize. wikidataId; ", wikidataId);
									// Make API call to Wikidata
									wikidataApi.get( params ).done( function ( data ) {
										if ( data.entities[wikidataId].claims.P4819 !== undefined && data.entities[wikidataId].claims.P4819[0].mainsnak.datavalue.value !== undefined ) {
											// Get the SPA ID (P4819)
											debugger;
											spaId = data.entities[wikidataId].claims.P4819[0].mainsnak.datavalue.value;
											console.log("initialize. spaId; ", spaId);
											// Insert import button into page interface
											$( '#firstHeading' ).append( $button );
										} else {
											spa2commons.tryFallbackQueries( params, wikidataApi );
										}
									});
								} else {
									spa2commons.tryFallbackQueries( params, wikidataApi );
								}
							}
						}
					} );
				});

			} // close initialize function

		} // close spa2commons object
		spa2commons.initialize();
	}) // close mw.loader
} // close if
//</nowiki>
