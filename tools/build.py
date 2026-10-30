# Merge data.json + translations (tr/*.json) into the app's data.js and convert photos to small JPEGs.
import json, os, re, sys, glob
from PIL import Image, ImageOps
D, APP = sys.argv[1], sys.argv[2]
data = json.load(open(D + "/data.json", encoding="utf-8"))
tr = {}
for f in glob.glob(D + "/tr/*.json"):
    for x in (lambda j: j if isinstance(j, list) else [j])(json.load(open(f, encoding="utf-8"))): tr[x["id"]] = x
PARTS = {  # crop-part labels; ms/en from the site, zh added here
 "LEAF": "叶子", "STEM": "茎/树干", "FR": "果实", "PLANT": "整株", "PEST": "虫体（害虫本身）", "MORFOLOGI": "形态特征",
 "ROOT": "根部", "TREE": "树", "BEAN": "咖啡豆", "F": "椰叶", "LC": "生活史", "CORM": "球茎", "T": "卵", "RUMPAI": "杂草", "FLOWER": "花", "PANICLE": "稻穗", "SEED": "种子", "SHOOT": "嫩梢", "BUNCH": "果串", "TILLER": "分蘖"}
CROPZH = {"BUAH": "牛油果", "DURIAN": "榴莲", "COCONUT": "椰子", "KOPI": "咖啡", "PINEAPPLE": "黄梨（菠萝）", "JACKFRUIT": "菠萝蜜", "PADDY": "稻米", "BANANA": "香蕉"}
os.makedirs(APP + "/img/t", exist_ok=True)
def conv(name):
    if not name: return None
    src = D + "/img/" + name
    if not os.path.exists(src) or os.path.getsize(src) == 0: print("missing image", name); return None
    out = re.sub(r"\.[A-Za-z]+$", "", name)
    out = re.sub(r"[^A-Za-z0-9_-]+", "_", out) + ".jpg"
    if not os.path.exists(APP + "/img/" + out):
        im = Image.open(src); im = ImageOps.exif_transpose(im)
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA"); bg = Image.new("RGB", im.size, (255, 255, 255)); bg.paste(im, mask=im.split()[3]); im = bg
        else: im = im.convert("RGB")
        f = im.copy(); f.thumbnail((1100, 1100), Image.LANCZOS); f.save(APP + "/img/" + out, "JPEG", quality=72, optimize=True, progressive=True)
        t = im.copy(); t.thumbnail((360, 360), Image.LANCZOS); t.save(APP + "/img/t/" + out, "JPEG", quality=70, optimize=True)
    return out
missing = []
for p in data["pests"]:
    T = tr.get(p["id"])
    if not T: missing.append(p["id"]); T = {}
    p["name"] = T.get("name") or {"ms": p["name"]["ms"], "en": p["name"].get("en", "")}
    p["sci"] = T.get("sci", "")
    if re.fullmatch(r"[\s\-–—?.]*", re.sub(r"<[^>]+>", "", p["desc"]["ms"])): p["desc"]["ms"] = ""  # site placeholder "--"
    p["desc"] = {"ms": p["desc"]["ms"], "en": T.get("desc", {}).get("en", p["desc"].get("en", "")) if p["desc"]["ms"] else "", "zh": T.get("desc", {}).get("zh", "") if p["desc"]["ms"] else ""}
    for i, s in enumerate(p["symptoms"]):
        ts = (T.get("symptoms") or [{}] * len(p["symptoms"]))[i] if i < len(T.get("symptoms") or []) else {}
        s["text"] = {"ms": s["text"]["ms"], "en": ts.get("en", s["text"].get("en", "")), "zh": ts.get("zh", "")}
        s["img"] = conv(s["img"])
        for j, st in enumerate(s["steps"]):
            tst = (ts.get("steps") or [])[j] if j < len(ts.get("steps") or []) else {}
            st["text"] = {"ms": st["text"]["ms"], "en": tst.get("en", st["text"].get("en", "")), "zh": tst.get("zh", "")}
            st["img"] = conv(st["img"])
EXTRA_ZH = {"Halia": "姜", "Betik": "木瓜", "Jagung": "玉米", "Sitrus": "柑橘", "Mangga": "芒果", "Kobis": "包菜",
            "Brokoli": "西兰花", "Cili": "辣椒", "Terung": "茄子", "Sawi": "菜心（芥菜）", "Tomato": "番茄", "Bawang": "葱蒜类",
            "Kacang Buncis": "四季豆", "Rambutan": "红毛丹", "Petola": "丝瓜", "Lada Benggala Hijau": "青椒（甜椒）", "Keladi": "芋头",
            "Rumpai": "杂草"}
for p in data["pests"]:  # pests the site lists without a crop page: group them under their affected crop
    if not p["crops"] and p.get("affected", {}).get("ms"):
        a = dict(p["affected"]); a["en"] = re.sub(r"\s*\(.*?\)\s*", "", a["en"]).strip()  # "Broccoli (Brassica ...)" -> "Broccoli"
        code = re.sub(r"[^A-Z]", "", a["en"].upper())
        c = next((x for x in data["crops"] if x["code"] == code or x["name"]["ms"].lower() == a["ms"].strip().lower()), None)
        if not c:
            c = {"code": code, "name": {"ms": a["ms"].strip(), "en": a["en"].strip()}, "pests": [], "extra": True}; data["crops"].append(c)
            CROPZH[code] = EXTRA_ZH.get(a["ms"].strip(), a["ms"].strip())
        c["pests"].append(p["id"]); p["crops"] = [c["code"]]
for c in data["crops"]:
    c["name"]["zh"] = CROPZH.get(c["code"], c["name"]["ms"])
    c["pests"] = [i for i in c["pests"] if any(p["id"] == i for p in data["pests"])]
    first = next((s["img"] for i in c["pests"] for p in data["pests"] if p["id"] == i for s in p["symptoms"] if s["img"]), None)
    c["img"] = first
KIND = {  # what kind of organism causes it: decides which control works
 "bacteria": [1, 38, 71, 79, 97, 159, 288],
 "fungus": [2, 4, 20, 22, 29, 41, 42, 43, 44, 47, 90, 92, 100, 102, 128, 129, 182, 183, 283],
 "oomycete": [16, 132, 171], "virus": [45], "nematode": [3, 286, 290], "alga": [25, 27, 126], "lichen": [26],
 "insect": [104, 105, 106, 109, 110, 112, 117, 118, 120, 122, 124, 125, 127, 131, 134, 156, 157, 173, 310],
 "mammal": [309]}
for p in data["pests"]:
    p["kind"] = next((k for k, ids in KIND.items() if p["id"] in ids), None) or tr.get(p["id"], {}).get("kind")
    if not p["kind"]: print("no kind for", p["id"])
# active ingredients named in the control advice (names are kept in English in all three languages)
AI = ["Abamectin", "Acephate", "Azadirachtin", "Bacillus thuringiensis", "Beauveria bassiana", "Benomyl", "Bordeaux mixture", "Buprofezin",
 "Captan", "Carbendazim", "Carbosulfan", "Cartap hydrochloride", "Chlorantraniliprole", "Copper", "Cypermethrin", "Deltamethrin",
 "Diafenthiuron", "Dimethoate", "Dinotefuran", "Emamectin benzoate", "Fenobucarb", "Fenthion", "Fipronil", "Gamma-cyhalothrin",
 "Imidacloprid", "Isoprothiolane", "Lambda-cyhalothrin", "Malathion", "Mancozeb", "Maneb", "Metarhizium anisopliae", "Methamidophos", "Methyl eugenol",
 "Naphthalene", "Neem", "Phosphonate", "Pymetrozine", "Spinosad", "Tebuconazole", "Thiram", "Tricyclazole", "Tridemorph", "White oil", "Wood vinegar"]
for p in data["pests"]:
    txt = re.sub(r"<[^>]+>", " ", p["desc"]["en"] + " " + " ".join(x["text"]["en"] for x in p["symptoms"])).lower()
    txt = txt.replace("phosphorous acid", "phosphonate").replace("copper-based", "copper").replace("copper oxychloride", "copper")
    found = [a for a in AI if re.search(r"(?<![a-z-])" + re.escape(a.lower()) + r"(?![a-z])", txt)]
    extra = [a[:1].upper() + a[1:] for a in tr.get(p["id"], {}).get("ai", []) if a.lower() not in {x.lower() for x in found}]
    SAME = {"glufosinate ammonium": "Glufosinate-ammonium", "glyphosate isopropylamine": "Glyphosate", "glyphosate potassium": "Glyphosate",
            "2,4-d amine": "2,4-D", "fosetyl": "Fosetyl-aluminium", "copper hydroxide": "Copper", "copper oxychloride": "Copper",
            "copper oxide": "Copper", "mineral oil": "White oil"}  # one name per ingredient
    p["ai"] = sorted({SAME.get(a.lower(), a) for a in found + extra}, key=str.lower)
    if "Gamma-cyhalothrin" in p["ai"] or "Lambda-cyhalothrin" in p["ai"]: pass
for p in data["pests"]: p.pop("affected", None)
for k, v in data["parts"].items(): v["zh"] = PARTS.get(k, v.get("en", k))
# only pests attached to some crop are reachable; keep the rest too (search finds them)
for p in data["pests"]:
    if not p["crops"]: print("pest without crop", p["id"], p["name"].get("ms"))
js = "/* Generated by tools/build.py from Jabatan Pertanian Sabah Smart Tani pest library. Do not edit by hand: edit data/tr/*.json and rebuild. */\nconst DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
open(APP + "/data.js", "w", encoding="utf-8").write(js)
print("pests", len(data["pests"]), "untranslated", missing, "data.js", len(js) // 1024, "KB")
