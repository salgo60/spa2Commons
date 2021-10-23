# spa2Commons
find scanned pictures in [SPA](https://portrattarkiv.se/about) and upload on Wikicommons script based on https://github.com/kaldari/iNaturalist2Commons 
* current in development see [User:Salgo60/spa2commons.js](https://commons.wikimedia.org/wiki/User:Salgo60/spa2commons.js) 
* see also [video](https://youtu.be/aCPzWF0aYmw) (english) / [swedish](https://www.youtube.com/watch?v=dQuoJOC3eSY)

![](https://github.com/salgo60/spa2Commons/blob/main/image/spa2commons_image1.png)

## More ##
* use [Wikidata:Entity_Explosion](https://www.wikidata.org/wiki/Wikidata:Entity_Explosion) to better see API etc. see [video](https://www.youtube.com/watch?v=D4MB6xX6Mig&feature=youtu.be) 
# Todo #

* [X] need to be in the whitelist for uploading see [T290581](https://phabricator.wikimedia.org/T290581)
   * [X] looks this is the way forward [Commons:Upload_tools/wgCopyUploadsDomains](https://commons.wikimedia.org/wiki/Commons:Upload_tools/wgCopyUploadsDomains)
* [ ] do a simple search from a Wikicommons category page, display a list of picture, select one, get proposed metadata
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
