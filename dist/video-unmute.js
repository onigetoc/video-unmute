// POSSIBLE OPTIONS TO ADD?
// BUTTON LEFT RIGHT TOP BOTTOM - BUTTON COLOR WHITE OR BLACK -

// LANGAGE TRANSLATE JSON
const translate = {
  en: "UNMUTE",
  zh: "激活声音",
  hi: "ध्वनि सक्रिय करें",
  es: "ACTIVAR SONIDO",
  fr: "ACTIVER LE SON",
  ar: "تنشيط الصوت",
  bn: "নিঃশব্দ",
  ru: "ВКЛЮЧИТЬ ЗВУК",
  pt: "ATIVAR SOM",
  de: "TON AKTIVIEREN",
  id: "AKTIFKAN SUARA"
};

// GET USER BROWSER LANGAGE
let lang = window.navigator.languages ? window.navigator.languages[0] : null;
lang =
  lang ||
  window.navigator.language ||
  window.navigator.browserLanguage ||
  window.navigator.userLanguage;

// lang = "de"; // TEST

if (typeof lang === "undefined" || lang === null) lang = "us-en";

let shortLang = lang;
if (shortLang.indexOf("-") !== -1) shortLang = shortLang.split("-")[0];
if (shortLang.indexOf("_") !== -1) shortLang = shortLang.split("_")[0];

console.log(lang, shortLang);

if (typeof translate[shortLang] === "undefined") {
  console.log('Variable "shortLang" is undefined.');
  translated = "UNMUTE";
} else {
  console.log('Variable "shortLang": ' + translate[shortLang]);
  translated = translate[shortLang];
}

/*************** PLAY VIDEO ON VIEWPORT FUNCTION ****************/
function playPauseVideo() {
    let videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        // We can only control playback without insteraction if video is mute
        video.muted = true;
        // Play is a promise so we need to check we have it
        let playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {
                let observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (
                                entry.intersectionRatio !== 1 &&
                                !video.paused
                            ) {
                                video.pause();
                            } else if (video.paused) {
                                video.play();
                              video.muted = false;
                            }
                        });
                    },
                    { threshold: 0.2 }
                );
                observer.observe(video);
            });
        }
    });
}

// And you would kick this off where appropriate with:
playPauseVideo();