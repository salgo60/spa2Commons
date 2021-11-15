# SPA Wikidata
* SPA has 2 API:s get [latest](https://portrattarkiv.se/endpoints/latest.php) and [search](https://portrattarkiv.se/endpoints/search.php) but no documentation
* [spa2commons](https://commons.wikimedia.org/wiki/User:Salgo60/spa2commons3.js) is a javascript running in Wikicommons to make it easy to find pictures in SPA and upload them to Wikicommons 
  * more than [4000 pictures uploaded first weeks](https://commons.wikimedia.org/wiki/Category:Uploaded_with_spa2Commons) / [sorted](https://petscan.wmflabs.org/?psid=20485153)
     * [candidates for uploading pictures](https://sv.wikipedia.org/wiki/Anv%C3%A4ndare:Salgo60/Listeria/SvensktPortr%C3%A4ttarkiv/utanbild)  
  * see also [video](https://youtu.be/aCPzWF0aYmw) (english) / [swedish](https://www.youtube.com/watch?v=dQuoJOC3eSY) [swedish video2](https://www.youtube.com/watch?v=8hngWUoNXhE)
* notebooks are used to check if people in Wikidata on e.g. a cemetery has good candidates in SPA
* as SPA set _same as_ Wikipedia we use the API to find those records and update Wikidata see [Notebook SPA links Wikipedia](https://github.com/salgo60/spa2Commons/blob/main/Notebook/SPA%20links%20Wikipedia.ipynb) and [video how to use OpenRefine for cleaning data and upload](https://www.youtube.com/watch?v=bTWtG3NA0uo)
  * [list in Wikidata with objects connected to SPA but have no picture in Wikidata](https://sv.wikipedia.org/wiki/Anv%C3%A4ndare:Salgo60/Listeria/SvensktPortr%C3%A4ttarkiv/utanbild)
# spa2Commons
javascript that find scanned pictures in [SPA](https://portrattarkiv.se/about) and upload it to Wikicommons. The script is based on https://github.com/kaldari/iNaturalist2Commons 
* javascript **spa2Commons3** current in development see [User:Salgo60/spa2commons3.js](https://commons.wikimedia.org/wiki/User:Salgo60/spa2commons3.js) 
  * install it in your [Special:MyPage/common.js](https://commons.wikimedia.org/wiki/Special:MyPage/common.js) on Wikicommons see my [common,js](https://commons.wikimedia.org/wiki/User:Salgo60/common.js) add the following line
> importScript( 'User:Salgo60/spa2commons3.js' );  

![](https://github.com/salgo60/spa2Commons/blob/main/image/spa2commons_image1.png)
* [video in Swedish uploading data](https://www.youtube.com/watch?v=1MVvSvLjAOk)
# Notebooks
* Using Notebooks and SPARQL to find objects in Wikidata and check if we have good candidates in SPA
 * example Notebooks see folder [Notebook](https://github.com/salgo60/spa2Commons/tree/main/Notebook)
 * SPARQL examples
   * find all people on the Northern cemetery missing SPA [Property:P4819](https://www.wikidata.org/wiki/Property:P4819) [SPARQL](https://w.wiki/4H7d) / [Notebook](https://github.com/salgo60/spa2Commons/blob/main/Notebook/SPA%20test.ipynb)
   * find people connected to the Litteraturbank missing SPA [Property:P4819](https://www.wikidata.org/wiki/Property:P4819) [SPARQL](https://w.wiki/4H7h) / [Notebook](https://github.com/salgo60/spa2Commons/blob/main/Notebook/SPA%20Litteraturbanken.ipynb)
   * find all people related to [Q20720200 --> defaultView:Graph](https://w.wiki/4GNX) , I change this query and filter it for beeing used with SPA
      *  -> get but just people related to Sweden and born < 1880 se [SPARQL](https://w.wiki/4H7a), [Notebook](https://github.com/salgo60/spa2Commons/blob/main/Notebook/SPA%20Johan%20Emanuel%20Wikstr%C3%B6m.ipynb)
   * [SDC_set_from_SPACategories](https://github.com/salgo60/spa2Commons/blob/main/Notebook/SDC_set_from_SPACategories.ipynb) - Notebook that creates a csv file containing depicts for a picture. This csv is loaded to Openrefine and a Quickstatement fil is created that updates Wikicommons. Example csv file [SPACategories_Mid_WD.txt](https://github.com/salgo60/spa2Commons/blob/main/Notebook/SPACategories_Mid_WD.txt)
### PAWS Notebooks et all
Because the environment is set up I have used PAWS for
* [Traverse category to find SPA id](https://public.paws.wmcloud.org/User:Salgo60/Traverse%20category%20to%20find%20SPA%20id%20.ipynb)
  * quick and dirty that checks all files in [categoryspa2commons](https://commons.wikimedia.org/wiki/Category:Uploaded_with_spa2Commons) and check for the spource partameter point at SPA --> a csv file is created that is used in Open Refine to create a quickstatement file to set SDC in Wikicommons
## Dataroundtriping
* TBD SPA -> Wikidata
  *  we have a restriction n retrieving 10 000 objects see  
* Wikidata -> SPA
  * Find files in WIkicommons with SPA set and depicts Wikidata object
     * 2021-11-03 [1436 files](https://wcqs-beta.wmflabs.org/embed.html#SELECT%20%3Fitem%20%3FSPAid%20%3FdepictsWD%20%3FitemLabel%20%3FSPA%20%3FdepictsWDLabel%20WHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP4819%20%3FSPAid.%0A%20%20OPTIONAL%20%7B%3Fitem%20wdt%3AP180%20%3FdepictsWD%7D%0A%20%20BIND%28URI%28CONCAT%28%22https%3A%2F%2Fportrattarkiv.se%2Fdetails%2F%22%2C%3FSPAid%29%29%20AS%20%3FSPA%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22sv%2Cen%22.%20%7D%0A%7D%20order%20by%20%3FitemLabel), SPA and WD depict [1010 files](https://wcqs-beta.wmflabs.org/embed.html#SELECT%20%3Fitem%20%3FSPAid%20%3FdepictsWD%20%3FitemLabel%20%3FSPA%20%3FdepictsWDLabel%20WHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP4819%20%3FSPAid.%0A%20%20%3Fitem%20wdt%3AP180%20%3FdepictsWD.%0A%20%20BIND%28URI%28CONCAT%28%22https%3A%2F%2Fportrattarkiv.se%2Fdetails%2F%22%2C%3FSPAid%29%29%20AS%20%3FSPA%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22sv%2Cen%22.%20%7D%0A%7D%20order%20by%20%3FitemLabel), Wikidata <-> SPA [5290 WD objects ](https://w.wiki/4L7x)
     * 2021-11-06 [1485 files](https://wcqs-beta.wmflabs.org/embed.html#SELECT%20%28count%28%3Fitem%29%20as%20%3FTotalSPAID%29%20WHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP4819%20%3FSPAid.%0A%20%20OPTIONAL%20%7B%3Fitem%20wdt%3AP180%20%3FdepictsWD%7D%0A%20%20BIND%28URI%28CONCAT%28%22https%3A%2F%2Fportrattarkiv.se%2Fdetails%2F%22%2C%3FSPAid%29%29%20AS%20%3FSPA%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22sv%2Cen%22.%20%7D%0A%7D%20order%20by%20%3FitemLabel), SPA and WD depict [1478 files](https://wcqs-beta.wmflabs.org/embed.html#SELECT%20%28count%28%3Fitem%29%20as%20%3FTotalSPAidAndDepict%29%20WHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP4819%20%3FSPAid.%0A%20%20%3Fitem%20wdt%3AP180%20%3FdepictsWD.%0A%20%20BIND%28URI%28CONCAT%28%22https%3A%2F%2Fportrattarkiv.se%2Fdetails%2F%22%2C%3FSPAid%29%29%20AS%20%3FSPA%29%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22sv%2Cen%22.%20%7D%0A%7D%20order%20by%20%3FitemLabel), Wikidata <-> SPA [5339 WD objects ](https://w.wiki/4LqQ)
  * Wikicommons SDC solution is in Beta and updated weekly see [wlatest update](https://tinyurl.com/y4ncctxc) SPA and depicts = 
 
# Find SPA same as Wikipedia
some pictures in SPA have same as Wikipedia. We use the API to find those pictures and checks if in Wikidata [Property:P4819](https://www.wikidata.org/wiki/Property:P4819) is set see [list of Wikidata persons with Property:P4819 set but no pictures](https://sv.wikipedia.org/wiki/Anv%C3%A4ndare:Salgo60/Listeria/SvensktPortr%C3%A4ttarkiv/utanbild)
  * limitations is we can just retrieve 10 000 records from SPA 
  * [video how to use OpenRefine for cleaning data and upload](https://www.youtube.com/watch?v=bTWtG3NA0uo)
  * [list in Wikidata with objects connected to SPA using WD property but have no picture in Wikidata](https://sv.wikipedia.org/wiki/Anv%C3%A4ndare:Salgo60/Listeria/SvensktPortr%C3%A4ttarkiv/utanbild)

## More ##
* video in english [how the API works](https://youtu.be/z9RQqvuwT_g) 
* use [Wikidata:Entity_Explosion](https://www.wikidata.org/wiki/Wikidata:Entity_Explosion) to better see API etc. see [video](https://www.youtube.com/watch?v=D4MB6xX6Mig&feature=youtu.be) 
* video use [Wikidata/FamilyTree](https://youtu.be/mtRW3qkjaOw) se [mallen](https://www.wikidata.org/wiki/Template:Wikidata/FamilyTree)
* [Mix-and Match 4837](https://mix-n-match.toolforge.org/#/catalog/4837 ) - catalog for m atchiung SPA with Wikidata 
# Todo #

* [X] need to be in the whitelist for uploading see [T290581](https://phabricator.wikimedia.org/T290581)
   * [X] looks this is the way forward [Commons:Upload_tools/wgCopyUploadsDomains](https://commons.wikimedia.org/wiki/Commons:Upload_tools/wgCopyUploadsDomains)
* [X] get test pilots
  * [X] announce it on [sv;Wikipedia Bybrunnen](https://sv.wikipedia.org/wiki/Wikipedia:Bybrunnen#Enklare_h%C3%A4mta_bilder_till_Wikicommons_p%C3%A5_personer_f%C3%B6dda_p%C3%A5_1800-talet_fr%C3%A5n_Svenskt_Portr%C3%A4ttarkiv_(SPA))
* [ ] add structured data to Wikicommons as automatic as possible
* [ ] start from Wikidata 
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
