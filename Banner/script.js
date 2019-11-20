var startIframe = "<iframe class='petersteele-banner' src='@X@EmbeddedFile.requestUrlStub@X@bbcswebdav/xid-17564762_1?s=";

var endIframe = "&mode=advanced' width='100%' height='116' frameborder='0' seamless='seamless' scrolling='no'></iframe>";

//SCEM
var SoCDMS = "School%20of%20Computer,%20Data,%20and%20Mathematical%20Sciences";
var SoEn = "School%20of%20Engineering";
var SoBE = "School%20of%20Built%20Environment";
var SoSC = "School%20of%20Science";

//HCA
var SoHCA = "School%20of%20Humanities%20and%20Communication%20Arts";
var SoL = "School%20of%20Law";
var SoBUS = "School%20of%20Business";
var SoED = "School%20of%20Education";
var SoSS = "School%20of%20Social%20Sciences";

//Health and Medicine
var SoHS = "School%20of%20Health%20Sciences";
var SoM = "School%20of%20Medicine";
var SoNM = "School%20of%20Nursing%20and%20Midwifery";
var SoP = "School%20of%20Psycology";

//Graduate school
var GRS = "Graduate%20Research%20School";




document.getElementById("SoCDMS").addEventListener("click", function () {
    textToClipboard("SoCDMS");
});
document.getElementById("SoBE").addEventListener("click", function () {
    textToClipboard("SoBE");
});
document.getElementById("SoEN").addEventListener("click", function () {
    textToClipboard("SoEN");
});
document.getElementById("SoSC").addEventListener("click", function () {
    textToClipboard("SoSC");
});


document.getElementById("SoHCA").addEventListener("click", function () {
    textToClipboard("SoHCA");
});
document.getElementById("SoL").addEventListener("click", function () {
    textToClipboard("SoL");
});
document.getElementById("SoBUS").addEventListener("click", function () {
    textToClipboard("SoBUS");
});
document.getElementById("SoED").addEventListener("click", function () {
    textToClipboard("SoED");
});
document.getElementById("SoSS").addEventListener("click", function () {
    textToClipboard("SoSS");
});

document.getElementById("SoHS").addEventListener("click", function () {
    textToClipboard("SoHS");
});
document.getElementById("SoM").addEventListener("click", function () {
    textToClipboard("SoM");
});
document.getElementById("SoNM").addEventListener("click", function () {
    textToClipboard("SoNM");
});
document.getElementById("SoP").addEventListener("click", function () {
    textToClipboard("SoP");
});

document.getElementById("GRS").addEventListener("click", function () {
    textToClipboard("GRS");
});


function textToClipboard(schoolName) {
    var school = "";
    switch (schoolName) {

        case "SoCDMS":
            school = SoCDMS;
            break;

        case "SoEn":
            school = SoEn;
            break;

        case "SoBE":
            school = SoBE;
            break;

        case "SoSC":
            school = SoSC;
            break;

        case "SoHCA":
            school = SoHCA;
            break;

        case "SoL":
            school = SoL;
            break;

        case "SoBUS":
            school = SoBUS;
            break;

        case "SoED":
            school = SoED;
            break;

        case "SoSS":
            school = SoSS;
            break;

        case "SoHS":
            school = SoHS;
            break;

        case "SoM":
            school = SoM;
            break;

        case "SoNM":
            school = SoNM;
            break;

        case "SoP":
            school = SoP;
            break;

        case "GRS":
            school = GRS;
            break;
    }

    var banner = startIframe + school + endIframe;
    console.log(banner);

    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = banner;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}