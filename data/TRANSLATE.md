# Translation brief

Source: data.json (scraped from Jabatan Pertanian Sabah Smart Tani pest library). Each pest has
`name.ms`, `name.en`, `desc.ms`, `desc.en`, and `symptoms[i].text.ms/en`, `symptoms[i].steps[j].text.ms/en`.

**Bahasa Melayu (ms) is the master text.** The site's English (en) is often shorter, older, or machine-like
("The fruit will be reputable and rotten"). Write NEW English and Simplified Chinese translations of the ms
text so all three languages say the same thing. Use the site's en only as a terminology hint.

Audience: smallholder farmers in Sabah, Malaysia. Plain, clear words. Chinese: Simplified, Malaysian Chinese
farming usage where it differs (e.g. 黄梨 for pineapple, 榴莲, 椰子, 稻米/稻田, 农药, 杀虫剂, 杀菌剂, 除草剂,
综合虫害管理 (IPM), 良好农业规范 (APB/GAP)). Keep pesticide active-ingredient names in English/Latin in all
languages (e.g. Deltamethrin, Mancozeb), optionally with a Chinese name in brackets if well-known
(e.g. 溴氰菊酯 Deltamethrin). Keep numbers, rates and units exactly.

HTML: input contains only <p>, <ul>, <ol>, <li>, <strong>, <em>, <br>, <sub>, <sup>. Keep the SAME structure
(same lists, same bold headings, italics on Latin names). Output the same tags only. Fix obvious typos in
the ms source silently in translations, but do not change meaning or add advice that is not in the source.
If ms is empty but en exists, translate from en. If both empty, output "".

Names: produce a clean structured name for each pest:
- `name.ms`: Malay common name only, e.g. "Pengorek Biji Durian" (from the ms title; no Latin, no English in brackets).
  If the ms title has only English (e.g. "Root Knot Nematode"), give a proper Malay name (e.g. "Nematod Puru Akar").
- `name.en`: English common name, e.g. "Durian Seed Borer".
- `name.zh`: Chinese common name used in Malaysia/China, e.g. "榴莲种子螟" — use the standard Chinese name for the
  species/disease when one exists (e.g. Nilaparvata lugens 褐飞虱, Brontispa longissima 椰心叶甲,
  Oryctes rhinoceros 椰子犀角金龟, Rhynchophorus 红棕象甲, Hypothenemus hampei 咖啡果小蠹, Hemileia vastatrix 咖啡锈病,
  Phytophthora palmivora 棕榈疫霉/榴莲疫病, Xanthomonas oryzae 水稻白叶枯病, Pyricularia 稻瘟病).
- `sci`: scientific name as HTML with genus/species in <em>, author outside, e.g. "<em>Mudaria magniplaga</em> Walker".
  Fix spelling errors in Latin names if clearly wrong (e.g. "Phytopthora" -> "Phytophthora",
  "Colletothricum" -> "Colletotrichum", "Planococcus pacifus" -> "Planococcus pacificus") — be careful, only when certain.

Also classify each pest:
- `kind`: exactly one of insect, mite, mollusc, bird, mammal, fungus, oomycete (Phytophthora, Pythium), bacteria, virus,
  nematode, alga, lichen, weed.
- `ai`: list of the pesticide/control active ingredients the source text names, in English, Title case, e.g.
  ["Deltamethrin", "Lambda-cyhalothrin", "Thiamethoxam", "Copper"]. Brand names (e.g. Colam ZC, Prevathon) are not
  active ingredients: give the active ingredient if the source states it, otherwise skip it. [] if none.

Output: ONE JSON file per batch, an array of objects, one per pest id, exactly:
{"id": 112, "kind": "insect", "ai": ["Cypermethrin", "Deltamethrin", "Dimethoate"],
 "name": {"ms": "...", "en": "...", "zh": "..."},
 "sci": "<em>...</em> ...",
 "desc": {"en": "<html>", "zh": "<html>"},
 "symptoms": [ {"en": "<html>", "zh": "<html>", "steps": [ {"en": "...", "zh": "..."} ] } ] }
`symptoms` must have the same length and order as in data.json, and each `steps` the same length and order.
Write valid UTF-8 JSON (ensure_ascii false). Validate it loads with python3 -c "import json;json.load(open(F))"
and that lengths match, before finishing.
