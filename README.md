# spa2Commons
find scanned pictures in [SPA](https://portrattarkiv.se/about) and upload on Wikicommons script based on https://github.com/kaldari/iNaturalist2Commons 
* current in development see [User:Salgo60/spa2commons.js](https://commons.wikimedia.org/wiki/User:Salgo60/spa2commons.js) 
  * more than [2500 pictures uploaded](https://commons.wikimedia.org/wiki/Category:Uploaded_with_spa2Commons)
* see also [video](https://youtu.be/aCPzWF0aYmw) (english) / [swedish](https://www.youtube.com/watch?v=dQuoJOC3eSY) [swedish video2](https://www.youtube.com/watch?v=8hngWUoNXhE)

![](https://github.com/salgo60/spa2Commons/blob/main/image/spa2commons_image1.png)

## More ##
* video in english [how the API works](https://youtu.be/z9RQqvuwT_g) 
* use [Wikidata:Entity_Explosion](https://www.wikidata.org/wiki/Wikidata:Entity_Explosion) to better see API etc. see [video](https://www.youtube.com/watch?v=D4MB6xX6Mig&feature=youtu.be) 
* video use [Wikidata/FamilyTree](https://youtu.be/mtRW3qkjaOw) se [mallen](https://www.wikidata.org/wiki/Template:Wikidata/FamilyTree)
# Todo #

* [X] need to be in the whitelist for uploading see [T290581](https://phabricator.wikimedia.org/T290581)
   * [X] looks this is the way forward [Commons:Upload_tools/wgCopyUploadsDomains](https://commons.wikimedia.org/wiki/Commons:Upload_tools/wgCopyUploadsDomains)
* [X] get test pilots
  * [X] announce it in Bybrunnen
* [ ] add structured data to Wikicommons as autinatc as possible
* [ ] from Wikidata 
  * [ ] do a search in SPA
  * [ ] find pictures related to the current Wikidataobject
  * [ ] get a button if the wikidata oibject is a person, born before 1900, country Sweden and scoure > 25
    * [ ] clicking on the button
      * [ ] a search is done in SPA 
      * [ ] a picture is selected
      * [ ] metadata is set and categories
      * [ ] ??!?!?!
  * [ ] from a Wikipedia article to the above
* [ ] more options
   * [ ] create a category if noone is there
   * [ ] ?!?!?!  
