# SPA Wikidata
* SPA has 2 API:s get [latest](https://portrattarkiv.se/endpoints/latest.php) and [search](https://portrattarkiv.se/endpoints/search.php)
* spa2commons is a javascript running un Wikicommons to make it easy to find pictyres in SPA and upload to Wikicommons 
  * more than [2500 pictures uploaded](https://commons.wikimedia.org/wiki/Category:Uploaded_with_spa2Commons) / [sorted](https://petscan.wmflabs.org/?psid=20485153)
  * see also [video](https://youtu.be/aCPzWF0aYmw) (english) / [swedish](https://www.youtube.com/watch?v=dQuoJOC3eSY) [swedish video2](https://www.youtube.com/watch?v=8hngWUoNXhE)
* notebooks are used to check if in Wikidata has good candidates in SPA
* find SPA same as Wikipedia see [Notebook SPA links Wikipedia](https://github.com/salgo60/spa2Commons/blob/main/Notebook/SPA%20links%20Wikipedia.ipynb) 

# spa2Commons
javascript that find scanned pictures in [SPA](https://portrattarkiv.se/about) and upload it to Wikicommons. The script is based on https://github.com/kaldari/iNaturalist2Commons 
* javascript **spa2Commons3** current in development see [User:Salgo60/spa2commons3.js](https://commons.wikimedia.org/wiki/User:Salgo60/spa2commons3.js) 
  * install it in your [Special:MyPage/common.js](https://commons.wikimedia.org/wiki/Special:MyPage/common.js) on Wikicommons see my [common,js](https://commons.wikimedia.org/wiki/User:Salgo60/common.js) 
    * folder with [uploaded pictures]()
> importScript( 'User:Salgo60/spa2commons3.js' );  

![](https://github.com/salgo60/spa2Commons/blob/main/image/spa2commons_image1.png)

# Notebooks
* Using Notebooks and SPARQL to find objects in Wikidata and check if we have good candidates in SPA
 * example Notebooks see folder [Notebook](https://github.com/salgo60/spa2Commons/tree/main/Notebook)
# Find SPA same as Wikipedia
some pictures in SPA have same as Wikipedia. We use the API to find those pictures and checks if in Wikidata [Property:P4819](https://www.wikidata.org/wiki/Property:P4819) is set see [list of Wikidata persons with Property:P4819 set but no pictures](https://sv.wikipedia.org/wiki/Anv%C3%A4ndare:Salgo60/Listeria/SvensktPortr%C3%A4ttarkiv/utanbild)
  * limitations is we can just retrieve 10 000 records from SPA 

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
