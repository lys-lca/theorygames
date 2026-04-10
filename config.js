/* -------------------------------------------------------
   CONFIG.JS — Subject Registry
   To add a new subject:
   1. Create a data-<subject>.js file
   2. Add a line here
   3. Add the <script> tag to both HTML files
------------------------------------------------------- */

const SUBJECTS = [
    { name: "ICT",        data: () => dataICT        },
    { name: "Economics",  data: () => dataEconomics   },
    // { name: "Biology",   data: () => dataBiology   },  // add when ready
];


/* -------------------------------------------------------
   getAllEntries(subjectName)
   Returns all entries for a subject, or all subjects if
   subjectName is "ALL"
------------------------------------------------------- */
function getAllEntries(subjectName) {
    if (subjectName === "ALL") {
        return SUBJECTS.flatMap(s => s.data() || []);
    }
    const subject = SUBJECTS.find(s => s.name === subjectName);
    if (!subject) return [];
    return subject.data() || [];
}


/* -------------------------------------------------------
   getAcronymEntries(subjectName)
   Returns only entries flagged as acronyms — used by
   the match game
------------------------------------------------------- */
function getAcronymEntries(subjectName) {
    return getAllEntries(subjectName).filter(e => e.isAcronym === true);
}


/* -------------------------------------------------------
   getCategories(subjectName)
   Returns a sorted unique list of category strings
   for building dropdown menus
------------------------------------------------------- */
function getCategories(subjectName) {
    const entries = getAllEntries(subjectName);
    const cats = [...new Set(entries.map(e => e.category))];
    return cats.sort();
}


/* -------------------------------------------------------
   shuffle(array) — Fisher-Yates, returns a new array
------------------------------------------------------- */
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
