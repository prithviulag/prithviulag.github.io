/* import cssVars from 'css-vars-ponyfill';

cssVars({
    // Targets
    rootElement   : document,
    shadowDOM     : false,
  
    // Sources
    include       : 'link[rel=stylesheet],style',
    exclude       : '',
    variables     : {},
  
    // Options
    onlyLegacy    : true,
    preserveStatic: true,
    preserveVars  : false,
    silent        : false,
    updateDOM     : true,
    updateURLs    : true,
    watch         : false,
  
    // Callbacks
    onBeforeSend: function(xhr, elm, url) {
      // ...
    },
    onError: function(message, elm, xhr, url) {
      // ...
    },
    onWarning: function(message) {
      // ...
    },
    onSuccess: function(cssText, elm, url) {
      // ...
    },
    onComplete: function(cssText, styleElms, cssVariables, benchmark) {
      // ...
    },
    onFinally: function(hasChanged, hasNativeSupport, benchmark) {
      // ...
    }
  });

  */

//Dropdown togglers

var collections = { //USE "_" AS FILLER FOR NON-EXISTENT PAINTINGS (this is what the program knows to avoid)
    "General_Keywords": [
        "art", "painting", "paint", "arts", "artist", "Shanthi", "Manickam", "Shan", "Gallery", "Collection", "Galleries", "Collections"
    ],
    "Collections": [
        {
            "name": "Flowers",
            "directory": "images/Flowers/", 
            "contents": [
                {
                    "name": "Magnolia Blossoms",
                    "src": "IMG_5466.jpg",
                    "tags": ["Spring", "Blooms", "Petals"]
                },
                {
                    "name": "Full Bloom",
                    "src": "IMG_5500.jpg",
                    "tags": ["Petals", "Purple", "Cosmos"]
                }
            ]
        },
        {
            "name": "Landscapes",
            "directory": "images/Landscapes/",
            "contents": [
                {
                    "name": "Winter Trees",
                    "src": "IMG_5589.jpg",
                    "tags": ["Snow", "Outdoors"]
                },
                {
                    "name": "Yard and Snowy Bush",
                    "src": "IMG_7963.jpg",
                    "tags": ["Snow", "Outdoors", "Winter"]
                },
                {
                    "name": "Busch Gardens",
                    "src": "IMG_7964.jpg",
                    "tags": ["Water", "Outdoors", "Trees", "Green", "River"]
                },
                {
                    "name": "Thomas Meeting",
                    "src": "IMG_7965.jpg",
                    "tags": ["Snow", "Snowy", "House", "Townhome", "Building", "Winter"]
                },
                {
                    "name": "Snow Bush",
                    "src": "IMG_7966.jpg",
                    "tags": ["Snow", "Snowy", "Outdoors", "Winter"]
                }
            ]
        },
        {
            "name": "Plein_Air",
            "directory": "images/Plein_Air/",
            "contents": [
                {
                    "name": "_",
                    "src": "_",
                    "tags": []
                }
            ]
        },
        {
            "name": "Portraits",
            "directory": "images/Portraits/",
            "contents": [
                {
                    "name": "Quaint Smile",
                    "src": "IMG_0036.jpg",
                    "tags": ["Woman", "Person"]
                },
                {
                    "name": "White Dog",
                    "src": "IMG_7967.jpg",
                    "tags": ["Animal", "Fluffy"]
                }
            ]
        },
        {
            "name": "Still_Life",
            "directory": "images/Still_Life/",
            "contents": [
                {
                    "name": "Frog",
                    "src": "IMG_7016.jpg",
                    "tags": ["Bird", "Vase", "Animal"]
                }
            ]
        }
    ]
};

var primary = "#396622";
var secondary = "#ebebeb";
var gray = "#4e3024";
var silver = "#ccaa88";
var gray2 = "#595959";
var primary2 = "#418d20";

const mediaQuery = window.matchMedia("(max-width: 700px)");
var mobileView = false;

let openables = [[document.getElementById("dropA"), "dropdownA"], [document.getElementById("dropB"), "dropdownB"]];
let openArr = [];

function changeScreenSize(e) {
    if (e.matches) {
        mobileView = true;
        document.getElementById("search").style.display="none";
        if (openArr.length > 0){
            document.getElementById("header").style.width="40%";
        }
    } else {
        mobileView = false;
        document.getElementById("search").style.display="inline";
        document.getElementById("header").style.width="15%";
    }
}

try {
    mediaQuery.addEventListener("change", changeScreenSize);
} catch (error) {
    mediaQuery.addListener(changeScreenSize);
}

changeScreenSize(mediaQuery);

function initOpenables(e, dropdown){ //currently not working, figure out what's the issue
    console.log("check");
    openables.push([e, dropdown]);
}

function dropdown(dropID, dropClick) {
    if (document.getElementById(dropID).style.display=="none") {
        if (mobileView == true) {
            document.getElementById("header").style.width="40%";
        }
        document.getElementById(dropClick).style.backgroundColor=secondary;
        document.getElementById(dropClick).style.color=gray;
        document.getElementById(dropID).style.display="block";

        openArr.push(dropID); //adds it to open list
    } else {
        document.getElementById("header").style.width="15%";

        ind = openArr.indexOf(dropID);
        if (ind != -1) {
            openArr.splice(ind, 1); //PROBLEMATIC STATEMENT!!!
        }

        document.getElementById(dropClick).style.backgroundColor=primary;
        document.getElementById(dropClick).style.color="white";
        document.getElementById(dropID).style.display="none";
        document.getElementById(dropClick).style.marginBottom="5%";
    }
}

function menuHover(e) {
    e.style.backgroundColor = secondary;
    e.style.color = gray;
    e.style.cursor = "pointer";
}

function menuUnHover(e, dropID) {
    if (!openArr.includes(dropID)) {
        e.style.backgroundColor = primary;
        e.style.color = "white";
        e.style.cursor = "default";
    }
}

document.getElementById("dropA").addEventListener("click", function() {dropdown("dropdownA", "dropA")});
document.getElementById("dropB").addEventListener("click", function() {dropdown("dropdownB", "dropB")});


//Dropdown closers

function closeChecker(e) { //checks and filters external window taps to figure out what to close, also opens browsebar
    var anyOpen = false;
    openables.forEach(function(subArr) {
        if ((e.target != document.getElementById(subArr[1])) & (e.target != subArr[0])) {
            subArr[0].style.backgroundColor=primary;
            subArr[0].style.color="white";
            subArr[0].style.marginBottom="5%";
            document.getElementById(subArr[1]).style.display="none";
            ind = openArr.indexOf(subArr[1]);
            if (ind != -1) {
                openArr.splice(ind, 1); //PROBLEMATIC STATEMENT!!!
            }
        } else {
            anyOpen = true;
        }
    })
    if (((e.target == document.getElementById("browsebar")) || (e.target == document.getElementById("search"))) & (mobileView == true)) {
        openArr.push("browsebar");
        document.getElementById("header").style.width="40%";
        anyOpen = true;
        document.getElementById("search").style.display="inline";
    } else {
        if (mobileView == true) {
            document.getElementById("search").style.display="none";
        }
        ind = openArr.indexOf("browsebar");
        if (ind != -1) {
            openArr.splice(ind, 1);
        }
    }
    if (!anyOpen) {
        document.getElementById("header").style.width="15%";
    }
    if (e.target == document.getElementById("popup")) {
        closeLarger();
    }
}

window.addEventListener("click", function(e) {
    closeChecker(e);
    
    /* let arrA = [];
    let arrB = [];
    for (let i = 0; i < document.getElementById("dropdownA").children[0].children.length; i++) {
        arrA.push(e.target != document.getElementById("dropdownA").children[0].children[i]);
    }
    for (let i = 0; i < document.getElementById("dropdownB").children[0].children.length; i++) {
        arrB.push(e.target != document.getElementById("dropdownB").children[0].children[i]);
    }

    console.log(e.target.className)

    - too complicated, simplified below

    */

    //simplified method commented out, as links still open, and it is better to have dropdowns close upon click
}) 

function gotolink(link) {
    window.open(link, "_self");
}

function togGroup(groupID) {
    if (document.getElementById(groupID + "-box").innerHTML == "-") {
        document.getElementById(groupID).style.display="none";
        document.getElementById(groupID + "-box").innerHTML = "+";
    } else {
        document.getElementById(groupID).style.display="block";
        document.getElementById(groupID + "-box").innerHTML = "-";
    }
}

//Search/browse below
    // ADD SUPPORT FOR ALL PUNCTUATION (like apost) LATER
function browse() {
    var browseQuery = document.getElementById("browsebar").value.replace(/ /g, '_');
    browseQuery = browseQuery.replace(/'/g, '');
    browseQuery = browseQuery.replace(/"/g, '');
    if (browseQuery != "") {
        window.open("browse.html" + "?index=" + browseQuery, "_self");
    } else {
        document.getElementById("browsebar").placeholder = "Type something in...";
    }

    document.getElementById("browsebar").value = ""; //reset browse bar to empty
}

function browseSite() {
    var ind = document.URL.indexOf("?index=") + 7;
    var browseQuery = document.URL.slice(ind,document.URL.length).replace(/_/g, ' ').replace(/-/g, ' ');
    document.getElementById("toptext").innerHTML = browseQuery;

    //below is prototype, extremely basic search THROUGH INDIVIDUAL PAINTINGS

    //first is accounting for words in the title
    //splitting allows for word-word comparison
    
    browseQuery = browseQuery.toLowerCase();
    var browseQuerArr = browseQuery.split(" ");
    
    //next, account for plurals by adding a pluralized or non pluralized version to the array

    browseQuerArr.forEach(function(browseQuerElement) {
        if (browseQuerElement[browseQuerElement.length-1] == "s") {
            browseQuerArr.push(browseQuerElement.slice(0,-1));
        } else {
            browseQuerArr.push(browseQuerElement + "s");
        }
    });

    //console.log(browseQuerArr);

    res = []; 
    for (let i=0; i < collections.Collections.length; i++) {
        contentArr = collections.Collections[i].contents;
        contentArr.forEach(function(artwork) { //loops through each painting in database

            elementsplit = artwork.name.split(" "); //checks for painting name matches
            matchScore = 0;
            elementsplit.forEach(function(nameWords) {
                if (browseQuerArr.indexOf(nameWords.toLowerCase()) != -1) {
                    matchScore += 3; //name matches highest priority, get double points
                }
            });

            if (artwork.tags.length > 0) {
                artwork.tags.forEach(function(artworkTags) {
                    if (browseQuerArr.indexOf(artworkTags.toLowerCase()) != -1) {
                        matchScore += 2; //collection title in same priority class as tags
                    }
                });
            }

            collectionWords = collections.Collections[i].name.split("_"); //checks for collection title matches
            collectionWords.forEach(function(collectionWord) {
                if (browseQuerArr.indexOf(collectionWord.toLowerCase()) != -1) {
                    matchScore += 2; //collection title in same priority class as tags
                }
            });

            collections.General_Keywords.forEach(function(genKeyword) { //checks for general keyword matches
                if (browseQuerArr.indexOf(genKeyword.toLowerCase()) != -1) {
                    matchScore++; //general keywords lowest priority
                }
            });

            if ((matchScore > 0) && (artwork.src != "_")) {
                res.push([matchScore, artwork.src, collections.Collections[i].directory, artwork.name, artwork.tags]);
            }
        });
        //THIS SORTING NOW WORKS WITHIN A COLLECTION; for example, "cherry full bloom" works sorted, but not "cherry quaint smile"
        
        res = res.sort().reverse();
    } //end of match-searching process and scoring
    
    if (res.length == 0 || res[0][3].length == 0) { //makes sure it isn't empty or has an empty string
        document.getElementById("noResAlert").style.display = "block";
    } else {
        ind = 0;
        res.forEach(function(artworkArr) {
            resImg = document.createElement("img");
            resImg.classList.add("resImg");
            resImg.id = "resImg" + ind;
            resImg.src = artworkArr[2] + artworkArr[1];
            
            element4Str = "[]";
            if (artworkArr[4].length > 0){ //to parse the tag array into a str with apost. to put into "onmousedown"
                element4Str = "[";
                artworkArr[4].forEach(function(artTag) {
                    element4Str += "'" + artTag + "',";
                });
                element4Str = element4Str.slice(0,-1);
                element4Str += "]";
            }
            
            resImg.setAttribute("onmousedown", "largerMod(this, '" + artworkArr[2].slice(7,-1) + "','" + artworkArr[3] + "'," + element4Str + ")");
            document.getElementById("content").appendChild(resImg);
            ind++;
        });
    }  
}

//below is the code to search when the user hits enter while clicked into the search bar
document.getElementById("browsebar").addEventListener("keypress", function(e) {
    if (e.key == "Enter"){
        browse();
    }
})

//Gallery stuff below

function highlight(i) {
    i.children[0].style.background="linear-gradient(90deg, #000000ff, #000000aa)";
}

function unlight(img) {
    img.children[0].style.background="linear-gradient(90deg, #000000dd, #000000aa)";
}

function larger(img, category) { //for home page
    var useimage = img.style.backgroundImage.slice(5,-2);
    var usetitle = img.children[0].innerHTML;

    //below: populating the popup window
    document.getElementById("popup").style.display="block";
    document.getElementById("popupimg").src = useimage;
    document.getElementById("imgtitle").innerHTML = usetitle + " |";
    document.getElementById("incat").href = "galleries/" + category + ".html";
    document.getElementById("incat").innerHTML = "in " + category.replace(/_/g, ' ');
}

function largerMod(img, category, title, tagArr) { //for search results, galleries
    var useimage = img.src.slice(img.src.indexOf("images/"),img.src.length);
    var usetitle = title;

    //below: populating the popup window
    document.getElementById("popup").style.display="block";
    document.getElementById("popupimg").src = useimage;
    document.getElementById("imgtitle").innerHTML = usetitle + " |";
    document.getElementById("incat").href = "galleries/" + category + ".html";
    document.getElementById("incat").innerHTML = "in " + category.replace(/_/g, ' ');

    //below: creating tags
    if (tagArr.length >0) {
        document.getElementById("tagDisplay").style.display = "flex";
        tagInd = 0;
        console.log(tagArr);
        tagArr.forEach(function(element) {
            tagBox = document.createElement("a");
            tagBox.id = "tagBox" + tagInd;
            tagBox.classList.add("tagBoxes");
            tagBox.innerHTML = element;
            tagBox.setAttribute("onmousedown", "tagBrowse('" + element + "')");
            document.getElementById("tagDisplay").appendChild(tagBox);
            tagInd++
        });
    } else {
        document.getElementById("tagDisplay").style.display = "none";
    }
}

function closeLarger() {
    document.getElementById("popup").style.display="none";
    document.getElementById("tagDisplay").innerHTML = "Tags: ";
}

function tagBrowse(searchTag) { //for clicking on a tag in a popup
    window.open("browse.html" + "?index=" + searchTag, "_self");
}