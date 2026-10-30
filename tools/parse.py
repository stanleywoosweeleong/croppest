# Parse downloaded Smart Tani HTML into data.json (ms + en). Keeps only simple inline HTML.
import os, re, sys, json, glob, html
D = sys.argv[1]
def rd(lang, path):
    fn = D + "/raw/%s/%s.html" % (lang, re.sub(r"[^A-Za-z0-9]+", "_", path).strip("_"))
    return open(fn, encoding="utf-8").read() if os.path.exists(fn) else None
def main(t): return t.split('id="Main-Content"', 1)[1].split('id="Footer"', 1)[0]
def clean(h):
    h = h.replace("&nbsp;", " ").replace("&emsp;", " ")
    h = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", h, flags=re.S)
    h = re.sub(r"<br\s*/?>", "<br>", h, flags=re.I)
    h = re.sub(r"<(/?)b>", r"<\1strong>", h, flags=re.I)
    h = re.sub(r"<(/?)i>", r"<\1em>", h, flags=re.I)
    h = re.sub(r"<(/?)(div|p|h\d)[^>]*>", lambda m: "</p>" if m.group(1) else "<p>", h, flags=re.I)
    h = re.sub(r"<(?!/?(p|ul|ol|li|strong|em|br|sub|sup)\b)[^>]*>", "", h, flags=re.I)
    h = re.sub(r"<(p|ul|ol|li|strong|em|sub|sup)\s[^>]*>", r"<\1>", h)
    h = re.sub(r"\s+", " ", h)
    for _ in range(4):
        h = re.sub(r"<p>\s*<p>", "<p>", h); h = re.sub(r"</p>\s*</p>", "</p>", h)
        h = re.sub(r"<p>\s*(<br>\s*)*</p>", "", h); h = re.sub(r"<(strong|em)>\s*</\1>", "", h)
    h = re.sub(r"</p>\s*<p>", "</p><p>", h)
    # unwrap a lone outer <p> around lists
    h = re.sub(r"<p>\s*(<ul>.*?</ul>)\s*</p>", r"\1", h, flags=re.S)
    h = h.strip()
    if h.count("<p>") == 1 and h.startswith("<p>") and h.endswith("</p>"): h = h[3:-4].strip()
    return h
def text(h): return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h))).strip()
out = {"source": "https://smarttani.sabah.gov.my/ALUS/Pest/", "crops": [], "parts": {}, "pests": []}
for L in ("ms", "en"):
    m = main(rd(L, "/ALUS/Pest/library/crop/"))
    rows = re.findall(r"<td>([^<]+)</td>\s*<td[^>]*><a href=\"[^\"]*CropCode=([A-Z]+)\"", m)
    for i, (n, c) in enumerate(rows):
        if L == "ms": out["crops"].append({"code": c, "name": {"ms": n.strip()}, "pests": []})
        else: next(x for x in out["crops"] if x["code"] == c)["name"]["en"] = n.strip()
for cr in out["crops"]:
    m = main(rd("ms", "/ALUS/Pest/library/pest/?CropCode=" + cr["code"]))
    cr["pests"] = [int(x) for x in re.findall(r"/ALUS/Pest/library/pest/detail/(\d+)/view/", m)]
listed = {p for c in out["crops"] for p in c["pests"]} | {int(x) for x in re.findall(r"detail/(\d+)/view/", rd("ms", "/ALUS/Pest/library/pest/"))}
# every detail page that was downloaded, including those the site's lists leave out
ids = sorted({int(m.group(1)) for f in glob.glob(D + "/raw/ms/ALUS_Pest_library_pest_detail_*_view.html")
              for m in [re.search(r"detail_(\d+)_view", f)] if os.path.exists(f.replace("/raw/ms/", "/raw/en/"))})
for pid in ids:
    P = {"id": pid, "listed": pid in listed, "crops": [c["code"] for c in out["crops"] if pid in c["pests"]], "name": {}, "affected": {}, "desc": {}, "symptoms": []}
    for L in ("ms", "en"):
        m = main(rd(L, "/ALUS/Pest/library/pest/detail/%d/view/" % pid))
        P["name"][L] = clean(re.search(r"<h2>(.*?)</h2>", m, re.S).group(1))
        dm = re.search(r'id="PestDescription"\s*>(.*?)<div id="PestSymptom">', m, re.S).group(1)
        hs = re.findall(r"<h3>(.*?)</h3>", dm, re.S)
        P["affected"][L] = text(hs[0].split(":", 1)[1]) if hs and ":" in hs[0] else ""
        body = re.split(r"</h3>", dm)[-1]
        body = body.rsplit("</div>", 1)[0]
        P["desc"][L] = clean(body)
        sm = m.split('id="PestSymptom"', 1)[1]
        rows = re.findall(r"<tr>\s*<td id=\"Image-Block\">(.*?)</td>\s*<td>(.*?)</td>\s*<td>(.*?)</td>\s*<td class=\"FauxButton\"[^>]*><a href=\"([^\"]*)\"", sm, re.S)
        for i, (im, part, desc, link) in enumerate(rows):
            code = re.search(r"/symptom/detail/([^/]+)/diagnosis/", link).group(1)
            img = re.search(r"src=\"([^\"]+)\"", im); img = os.path.basename(img.group(1)).replace(".TH.", ".") if img else None
            if L == "ms": P["symptoms"].append({"part": code, "img": img, "text": {}, "steps": []})
            S = P["symptoms"][i]; assert S["part"] == code
            S["text"][L] = clean(desc)
            out["parts"].setdefault(code, {})[L] = text(part)
            dt = rd(L, link)
            if not dt: continue
            dm2 = main(dt)
            steps = re.findall(r"<tr>\s*<td>(\d+)</td>\s*(?:<td id=\"Image-Block\">(.*?)</td>)?\s*<td>(.*?)</td>\s*</tr>", dm2, re.S)
            for j, (n, sim, st) in enumerate(steps):
                si = re.search(r"src=\"([^\"]+)\"", sim or ""); si = os.path.basename(si.group(1)).replace(".TH.", ".") if si else None
                if L == "ms": S["steps"].append({"img": si, "text": {}})
                S["steps"][j]["text"][L] = clean(st)
    dup = next((q for q in out["pests"] if q["name"]["ms"] == P["name"]["ms"] and q["desc"]["ms"] == P["desc"]["ms"]), None)
    if dup: print("duplicate of", dup["id"], ":", pid); continue
    out["pests"].append(P)
json.dump(out, open(D + "/data.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(out["crops"]), "crops", len(out["pests"]), "pests", sum(len(p["symptoms"]) for p in out["pests"]), "symptoms", sum(len(s["steps"]) for p in out["pests"] for s in p["symptoms"]), "steps")
print(out["parts"])
