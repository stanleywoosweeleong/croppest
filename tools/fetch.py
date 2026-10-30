# Download raw HTML (BM + EN) and images from Smart Tani pest library.
import os, re, sys, time, urllib.request, http.cookiejar
B = "https://smarttani.sabah.gov.my"
OUT = sys.argv[1]
os.makedirs(OUT + "/raw/ms", exist_ok=True); os.makedirs(OUT + "/raw/en", exist_ok=True); os.makedirs(OUT + "/img", exist_ok=True)
def opener():
    j = http.cookiejar.CookieJar()
    return urllib.request.build_opener(urllib.request.HTTPCookieProcessor(j))
O = {"ms": opener(), "en": opener()}
O["en"].open(B + "/ALUS/Pest/set_language/EN/", timeout=60).read()
def get(lang, path):
    fn = OUT + "/raw/%s/%s.html" % (lang, re.sub(r"[^A-Za-z0-9]+", "_", path).strip("_"))
    if os.path.exists(fn): return open(fn, encoding="utf-8").read()
    for i in range(4):
        try:
            t = O[lang].open(B + path, timeout=60).read().decode("utf-8", "replace"); break
        except Exception as e:
            print("retry", path, e); time.sleep(2 ** i)
    else: raise SystemExit("failed " + path)
    open(fn, "w", encoding="utf-8").write(t); return t
def img(path):
    fn = OUT + "/img/" + os.path.basename(path)
    if os.path.exists(fn): return
    for i in range(4):
        try:
            open(fn, "wb").write(O["ms"].open(B + urllib.parse.quote(path), timeout=60).read()); return
        except Exception as e:
            print("img retry", path, e); time.sleep(2 ** i)
    print("IMG FAILED", path)
import urllib.parse
crops = get("ms", "/ALUS/Pest/library/crop/"); get("en", "/ALUS/Pest/library/crop/")
codes = re.findall(r"CropCode=([A-Z]+)", crops)
pests = set()
for c in codes:
    for L in ("ms", "en"):
        t = get(L, "/ALUS/Pest/library/pest/?CropCode=" + c)
        pests |= set(re.findall(r"/ALUS/Pest/library/pest/detail/(\d+)/view/", t))
for L in ("ms", "en"):
    t = get(L, "/ALUS/Pest/library/pest/")
    pests |= set(re.findall(r"/ALUS/Pest/library/pest/detail/(\d+)/view/", t))
print(len(codes), "crops", len(pests), "pests")
for p in sorted(pests, key=int):
    for L in ("ms", "en"):
        t = get(L, "/ALUS/Pest/library/pest/detail/%s/view/" % p)
        for d in set(re.findall(r"(/ALUS/Pest/library/pest/detail/\d+/symptom/detail/[^\"']+/diagnosis/)", t)):
            dt = get(L, d)
            for im in re.findall(r"src=\"(/ALUS/images/[^\"]+)\"", dt): img(im); img(im.replace(".TH.", "."))
        for im in re.findall(r"src=\"(/ALUS/images/[^\"]+)\"", t): img(im); img(im.replace(".TH.", "."))
print("done")
