/* Learning guide: the kinds of organism behind crop problems, and key terms used in the pest pages.
   Written for this app (not from Smart Tani). Keep ms, en and zh in step. */
const KINDS = {
  insect: {
    color: 'insect',
    name: { ms: 'Serangga', en: 'Insect', zh: '昆虫' },
    what: {
      ms: 'Haiwan kecil berkaki enam: kumbang, ulat (larva rama-rama), bena, koya, lalat buah, kutu psilid. Ada yang memakan daun dan buah, ada yang mengorek batang, ada yang menghisap cecair tanaman.',
      en: 'Small six-legged animals: beetles, caterpillars (moth larvae), hoppers, mealybugs, fruit flies, psyllids. Some chew leaves and fruit, some bore into stems, some suck the plant\'s sap.',
      zh: '六只脚的小动物：甲虫、毛虫（蛾的幼虫）、飞虱叶蝉、粉蚧、果蝇、木虱。有的啃食叶片和果实，有的钻蛀茎干，有的吸食汁液。'
    },
    sign: {
      ms: 'Cari serangga itu sendiri, telur, kulit salinan, lubang gerekan, fras (najis serangga) atau embun madu.',
      en: 'Look for the insect itself, eggs, shed skins, bore holes, frass (insect droppings) or honeydew.',
      zh: '找虫体、虫卵、蜕皮、蛀孔、虫粪或蜜露。'
    },
    control: {
      ms: 'Pantau kerap, kutip dan musnahkan bahagian diserang, bungkus buah, guna perangkap dan musuh semula jadi. Racun serangga hanya jika perlu.',
      en: 'Scout often, remove and destroy attacked parts, bag fruit, use traps and natural enemies. Insecticide only when needed.',
      zh: '勤巡园，摘除并销毁被害部位，果实套袋，使用诱捕器和天敌。必要时才用杀虫剂。'
    }
  },
  fungus: {
    color: 'fungus',
    name: { ms: 'Kulat', en: 'Fungus', zh: '真菌' },
    what: {
      ms: 'Organisma halus yang membiak dengan spora. Spora dibawa angin, percikan air hujan dan alat. Suka keadaan lembap dan kebun yang rimbun.',
      en: 'Tiny organisms that spread by spores, carried by wind, rain splash and tools. They thrive in wet weather and crowded, shady orchards.',
      zh: '靠孢子繁殖的微小生物，孢子随风、雨水飞溅和工具传播。潮湿天气和过密荫蔽的园子最易发病。'
    },
    sign: {
      ms: 'Tompok atau bintik dengan tepi jelas, gelang berwarna, serbuk (karat, putih, hitam) atau benang kulat (miselium) pada permukaan.',
      en: 'Spots with clear edges, coloured rings, powder (rust, white or black) or fungal threads (mycelium) on the surface.',
      zh: '边缘清楚的病斑、有色轮纹、粉状物（锈色、白色或黑色）或表面的菌丝。'
    },
    control: {
      ms: 'Buang dan musnahkan bahagian berpenyakit, cantas supaya udara bergerak, elak air bertakung. Racun kulat lebih berkesan sebagai pencegahan.',
      en: 'Remove and destroy diseased parts, prune for airflow, avoid standing water. Fungicide works best as prevention.',
      zh: '清除并销毁病部，修剪通风，避免积水。杀菌剂以预防为主效果最好。'
    }
  },
  oomycete: {
    color: 'fungus',
    name: { ms: 'Kulapuk air (oomiset)', en: 'Water mould (oomycete)', zh: '卵菌（水霉）' },
    what: {
      ms: 'Kelihatan seperti kulat tetapi bukan kulat sebenar. Phytophthora dan Pythium berenang dalam air tanah dengan zoospora, jadi ia merebak cepat di tanah becak.',
      en: 'Looks like a fungus but is not a true fungus. Phytophthora and Pythium swim through soil water as zoospores, so they spread fast in waterlogged soil.',
      zh: '看起来像真菌，其实不是真正的真菌。疫霉和腐霉以游动孢子在土壤水中游动，所以在积水的土壤里扩散很快。'
    },
    sign: {
      ms: 'Reput akar dan pangkal batang, kulit kayu berdamar, daun layu atau gugur, buah reput berbau.',
      en: 'Rotting roots and trunk base, bark oozing sap, wilting or falling leaves, rotting smelly fruit.',
      zh: '根部和树头腐烂，树皮流胶，叶片萎蔫或脱落，果实腐烂发臭。'
    },
    control: {
      ms: 'Saliran yang baik paling penting. Elak luka pada pangkal pokok. Banyak racun kulat biasa tidak berkesan; guna bahan yang disyorkan khusus untuk Phytophthora.',
      en: 'Good drainage matters most. Avoid wounding the trunk base. Many ordinary fungicides do not work; use products recommended for Phytophthora.',
      zh: '排水最重要。避免伤到树头。很多普通杀菌剂无效，要用专门针对疫霉的药剂。'
    }
  },
  bacteria: {
    color: 'bacteria',
    name: { ms: 'Bakteria', en: 'Bacteria', zh: '细菌' },
    what: {
      ms: 'Organisma sel tunggal yang masuk melalui luka dan liang semula jadi, merebak melalui air, tanah, alat dan bahan tanaman yang dijangkiti.',
      en: 'Single-celled organisms that enter through wounds and natural openings and spread through water, soil, tools and infected planting material.',
      zh: '单细胞生物，从伤口和自然孔口侵入，经水、土壤、工具和带病种苗传播。'
    },
    sign: {
      ms: 'Layu mendadak walaupun tanah lembap, kesan basah berair, lendir atau cecair keruh apabila batang dipotong.',
      en: 'Sudden wilting even in moist soil, water-soaked patches, slime or cloudy ooze when the stem is cut.',
      zh: '土壤湿润却突然萎蔫，水渍状病斑，切开茎干有菌脓或混浊汁液流出。'
    },
    control: {
      ms: 'Tiada racun yang menyembuhkan. Cabut dan musnahkan pokok sakit, cuci alat, guna benih dan anak pokok bersih, giliran tanaman.',
      en: 'No spray cures it. Uproot and destroy sick plants, clean tools, use clean seed and seedlings, rotate crops.',
      zh: '没有农药能治好。拔除并销毁病株，消毒工具，使用健康种子和种苗，轮作。'
    }
  },
  virus: {
    color: 'virus',
    name: { ms: 'Virus', en: 'Virus', zh: '病毒' },
    what: {
      ms: 'Terlalu kecil untuk dilihat. Biasanya dibawa oleh serangga penghisap (vektor) seperti bena hijau dan koya.',
      en: 'Too small to see. Usually carried by sap-sucking insects (vectors) such as green leafhoppers and mealybugs.',
      zh: '小到看不见。通常由刺吸式昆虫（传毒媒介）如叶蝉、粉蚧传播。'
    },
    sign: {
      ms: 'Daun kuning atau jingga, corak belang (mozek), pokok kerdil, pertumbuhan terencat.',
      en: 'Yellow or orange leaves, mottled (mosaic) patterns, stunted plants, slow growth.',
      zh: '叶片发黄或橙黄，花叶斑驳，植株矮化，生长停滞。'
    },
    control: {
      ms: 'Tiada ubat. Kawal serangga vektor, cabut pokok bergejala, tanam varieti rintang dan serentak.',
      en: 'No cure. Control the insect vector, remove plants with symptoms, plant resistant varieties at the same time as neighbours.',
      zh: '无药可治。防治传毒昆虫，拔除病株，种植抗病品种并与邻田同期种植。'
    }
  },
  nematode: {
    color: 'nematode',
    name: { ms: 'Nematod', en: 'Nematode', zh: '线虫' },
    what: {
      ms: 'Cacing halus dalam tanah yang menyerang akar. Pokok kelihatan kurang air atau kurang baja walaupun dijaga.',
      en: 'Microscopic worms in the soil that attack roots. Plants look short of water or fertiliser even when cared for.',
      zh: '土壤里肉眼难见的小虫，危害根部。即使照顾得好，植株看起来也像缺水缺肥。'
    },
    sign: {
      ms: 'Gali dan lihat akar: bonggol (puru), luka hitam atau akar reput. Pokok mudah tumbang.',
      en: 'Dig and look at the roots: knots (galls), black lesions or rotten roots. Plants topple easily.',
      zh: '挖开看根：根结（瘤）、黑色伤斑或烂根。植株容易倒伏。'
    },
    control: {
      ms: 'Guna anak pokok bebas nematod, tambah bahan organik ke tanah, giliran tanaman, buang akar yang dijangkiti.',
      en: 'Plant nematode-free suckers and seedlings, add organic matter to the soil, rotate crops, remove infected roots.',
      zh: '使用无线虫的种苗，增施有机质，轮作，清除病根。'
    }
  },
  alga: {
    color: 'alga',
    name: { ms: 'Alga', en: 'Alga', zh: '藻类' },
    what: {
      ms: 'Alga hidup di permukaan daun dan kulit kayu dalam keadaan lembap dan teduh. Ada yang hanya menumpang, ada (Cephaleuros) yang merosakkan tisu.',
      en: 'Algae live on leaf and bark surfaces in damp, shady places. Some just sit there; others (Cephaleuros) damage the tissue.',
      zh: '藻类生长在潮湿荫蔽处的叶面和树皮上。有的只是附生，有的（头孢藻）会破坏组织。'
    },
    sign: {
      ms: 'Tompok baldu jingga, karat atau hijau kelabu pada daun dan batang.',
      en: 'Velvety orange, rusty or grey-green patches on leaves and stems.',
      zh: '叶片和枝干上出现绒状橙色、锈色或灰绿色斑块。'
    },
    control: {
      ms: 'Cantas supaya cahaya dan udara masuk, kurangkan kelembapan. Racun kulat berasaskan kuprum jika serangan teruk.',
      en: 'Prune to let in light and air, reduce humidity. Copper fungicide if the attack is severe.',
      zh: '修剪让阳光和空气进入，降低湿度。严重时用铜制剂杀菌剂。'
    }
  },
  lichen: {
    color: 'alga',
    name: { ms: 'Liken', en: 'Lichen', zh: '地衣' },
    what: {
      ms: 'Gabungan kulat dan alga yang tumbuh di kulit kayu. Biasanya tidak menyerang pokok, tetapi menandakan dahan yang lemah dan teduh.',
      en: 'A partnership of a fungus and an alga growing on bark. It usually does not attack the tree, but signals weak, shaded branches.',
      zh: '真菌和藻类共生体，长在树皮上。一般不侵害树木，但说明枝条衰弱、过于荫蔽。'
    },
    sign: {
      ms: 'Kepingan kelabu kehijauan seperti kertas pada batang dan dahan.',
      en: 'Grey-green, papery crusts on trunks and branches.',
      zh: '枝干上灰绿色、纸片状的附着物。'
    },
    control: {
      ms: 'Cantas dahan mati, tambah cahaya, jaga kesuburan pokok.',
      en: 'Prune dead branches, let in light, keep the tree well fed.',
      zh: '剪除枯枝，增加光照，保持树势。'
    }
  },
  mammal: {
    color: 'mammal',
    name: { ms: 'Haiwan (mamalia)', en: 'Animal (mammal)', zh: '动物（哺乳类）' },
    what: {
      ms: 'Tupai, tikus dan haiwan lain yang menggigit buah dan batang.',
      en: 'Squirrels, rats and other animals that gnaw fruit and stems.',
      zh: '松鼠、老鼠等啃食果实和茎干的动物。'
    },
    sign: {
      ms: 'Kesan gigitan gigi, buah berlubang besar, sisa makanan di bawah pokok.',
      en: 'Tooth marks, large holes in fruit, food scraps under the plant.',
      zh: '牙齿啃痕、果实上的大洞、植株下的残渣。'
    },
    control: {
      ms: 'Perangkap, halangan fizikal, kebersihan kebun, tuai pada masanya.',
      en: 'Traps, physical barriers, a clean farm, harvesting on time.',
      zh: '诱捕、物理阻隔、保持园区清洁、及时采收。'
    }
  },
  mite: {
    color: 'insect',
    name: { ms: 'Hama (mit)', en: 'Mite', zh: '螨类' },
    what: {
      ms: 'Haiwan sangat kecil berkaki lapan, saudara labah-labah, contohnya hama merah. Ia menghisap cecair sel daun dan membiak cepat dalam cuaca panas dan kering.',
      en: 'Tiny eight-legged animals related to spiders, such as red spider mites. They suck the contents of leaf cells and multiply fast in hot, dry weather.',
      zh: '八只脚的微小动物，与蜘蛛同类，例如红蜘蛛。吸食叶片细胞汁液，炎热干燥时繁殖很快。'
    },
    sign: {
      ms: 'Bintik halus kekuningan atau keperangan pada daun, sarang halus seperti sutera, titik merah kecil yang bergerak di bawah daun.',
      en: 'Fine yellowish or bronze speckling on leaves, fine silky webbing, tiny moving red dots under the leaf.',
      zh: '叶面出现细密的黄色或铜褐色斑点，有细丝网，叶背有会动的小红点。'
    },
    control: {
      ms: 'Pantau bahagian bawah daun, jaga kelembapan, lindungi pemangsa semula jadi. Racun serangga biasa selalunya tidak berkesan; guna akarisid (racun hama) yang disyorkan.',
      en: 'Check leaf undersides, keep plants watered, protect natural predators. Ordinary insecticides often fail; use a recommended acaricide (miticide).',
      zh: '检查叶背，保持水分，保护天敌。普通杀虫剂往往无效，要用推荐的杀螨剂。'
    }
  },
  mollusc: {
    color: 'nematode',
    name: { ms: 'Siput', en: 'Snail', zh: '螺类' },
    what: {
      ms: 'Siput gondang emas memakan anak padi muda di sawah yang bertakung air, terutama dalam dua minggu pertama selepas menanam.',
      en: 'Golden apple snails eat young rice seedlings in flooded fields, especially in the first two weeks after planting.',
      zh: '福寿螺在积水稻田中啃食幼嫩秧苗，插秧后头两周危害最重。'
    },
    sign: {
      ms: 'Anak padi hilang atau terpotong di paras air, telur merah jambu terang pada batang dan tebing.',
      en: 'Seedlings missing or cut at water level, bright pink egg clusters on stems and bunds.',
      zh: '秧苗在水面处被咬断或消失，茎秆和田埂上有鲜粉红色卵块。'
    },
    control: {
      ms: 'Kutip siput dan telur, pasang penapis di saluran air masuk, keringkan sawah sekejap selepas menanam, guna itik di sawah.',
      en: 'Hand-pick snails and eggs, screen water inlets, drain the field briefly after planting, use ducks in the field.',
      zh: '人工捡螺和卵块，在进水口装滤网，插秧后短暂排干田水，稻田放鸭。'
    }
  },
  bird: {
    color: 'mammal',
    name: { ms: 'Burung', en: 'Bird', zh: '鸟类' },
    what: {
      ms: 'Burung pipit dan burung lain memakan bijirin padi yang sedang masak.',
      en: 'Munias and other birds eat ripening rice grain.',
      zh: '文鸟等鸟类啄食即将成熟的稻谷。'
    },
    sign: {
      ms: 'Tangkai padi kosong atau patah, kumpulan burung di sawah pada waktu pagi dan petang.',
      en: 'Empty or broken panicles, flocks in the field in the morning and evening.',
      zh: '稻穗空瘪或折断，早晚有成群的鸟在田里。'
    },
    control: {
      ms: 'Tanam serentak dengan jiran, halau burung, guna jaring atau pita pemantul, bersihkan tempat bersarang.',
      en: 'Plant at the same time as neighbours, scare birds, use nets or reflective tape, clear nesting sites.',
      zh: '与邻田同期种植，驱赶鸟群，使用防鸟网或反光带，清除筑巢处。'
    }
  },
  weed: {
    color: 'alga',
    name: { ms: 'Rumpai', en: 'Weed', zh: '杂草' },
    what: {
      ms: 'Tumbuhan yang tumbuh di tempat yang tidak dikehendaki dan bersaing dengan tanaman untuk air, nutrien dan cahaya. Ada yang menjadi perumah perosak.',
      en: 'Plants growing where they are not wanted, competing with the crop for water, nutrients and light. Some also host pests.',
      zh: '长在不该长的地方，与作物争夺水分、养分和阳光的植物，有些还是病虫的寄主。'
    },
    sign: {
      ms: 'Kenal pasti dari daun, batang dan bunga. Rumput (daun panjang sempit), rumpai daun lebar, atau rusiga (batang segi tiga).',
      en: 'Identify by leaf, stem and flower: grasses (long narrow leaves), broadleaf weeds, or sedges (triangular stems).',
      zh: '从叶、茎、花辨认：禾草（叶狭长）、阔叶杂草，或莎草（茎呈三角形）。'
    },
    control: {
      ms: 'Kawal sebelum berbunga, potong atau tutup tanah dengan sungkupan atau tanaman penutup bumi. Racun rumpai hanya mengikut label.',
      en: 'Control before flowering; cut, or cover the ground with mulch or a cover crop. Herbicide only according to the label.',
      zh: '在开花前防治；割草，或用覆盖物、覆盖作物遮住地面。除草剂须按标签使用。'
    }
  }
};
const GLOSSARY = [
  { t: { ms: 'Fras', en: 'Frass', zh: '虫粪' },
    d: { ms: 'Najis dan serbuk kayu yang ditinggalkan serangga pengorek di lubang gerekan. Fras basah bermakna larva masih hidup di dalam.',
         en: 'Droppings and wood dust left by boring insects at their holes. Wet frass means the larva is still alive inside.',
         zh: '钻蛀性害虫在蛀孔留下的粪便和木屑。湿的虫粪说明幼虫还在里面活着。' } },
  { t: { ms: 'Lesion (luka)', en: 'Lesion', zh: '病斑' },
    d: { ms: 'Kawasan tisu yang rosak atau mati akibat penyakit, biasanya tompok berwarna perang atau hitam.',
         en: 'An area of damaged or dead tissue caused by disease, usually a brown or black spot.',
         zh: '病害造成的受损或坏死组织，通常是褐色或黑色斑点。' } },
  { t: { ms: 'Miselium', en: 'Mycelium', zh: '菌丝体' },
    d: { ms: 'Benang halus kulat, kelihatan seperti kapas putih atau sarang labah-labah pada bahagian yang dijangkiti.',
         en: 'The fine threads of a fungus, seen as white cotton or cobweb on infected parts.',
         zh: '真菌的细丝，在病部看起来像白色棉絮或蜘蛛网。' } },
  { t: { ms: 'Spora', en: 'Spore', zh: '孢子' },
    d: { ms: '"Benih" kulat yang sangat halus, dibawa angin dan air untuk memulakan jangkitan baharu.',
         en: 'A fungus\'s tiny "seed", carried by wind and water to start new infections.',
         zh: '真菌极小的"种子"，随风和水传播，引起新的感染。' } },
  { t: { ms: 'Zoospora', en: 'Zoospore', zh: '游动孢子' },
    d: { ms: 'Spora yang boleh berenang dalam air, dihasilkan oleh Phytophthora dan Pythium. Sebab itu tanah becak berbahaya.',
         en: 'A spore that can swim in water, made by Phytophthora and Pythium. That is why waterlogged soil is dangerous.',
         zh: '能在水中游动的孢子，由疫霉和腐霉产生。所以积水的土壤很危险。' } },
  { t: { ms: 'Larva', en: 'Larva', zh: '幼虫' },
    d: { ms: 'Peringkat muda serangga selepas menetas, contohnya ulat. Peringkat inilah yang biasanya paling banyak makan.',
         en: 'The young stage of an insect after hatching, such as a caterpillar or grub. This is usually the stage that eats the most.',
         zh: '昆虫孵化后的幼期，比如毛虫或蛴螬。通常这个阶段吃得最多。' } },
  { t: { ms: 'Pupa (kepompong)', en: 'Pupa', zh: '蛹' },
    d: { ms: 'Peringkat rehat antara larva dan dewasa. Serangga tidak makan pada peringkat ini.',
         en: 'The resting stage between larva and adult. The insect does not feed at this stage.',
         zh: '幼虫和成虫之间的静止阶段，这时不取食。' } },
  { t: { ms: 'Nimfa', en: 'Nymph', zh: '若虫' },
    d: { ms: 'Serangga muda yang rupanya seperti dewasa tetapi kecil dan tanpa sayap, contohnya anak bena dan kesing.',
         en: 'A young insect that looks like a small wingless adult, such as young planthoppers and ear bugs.',
         zh: '外形像缩小版、无翅成虫的幼期昆虫，如飞虱和稻缘蝽的若虫。' } },
  { t: { ms: 'Embun madu', en: 'Honeydew', zh: '蜜露' },
    d: { ms: 'Cecair manis yang dikeluarkan serangga penghisap seperti koya dan psilid. Ia menarik semut dan menyebabkan kulapuk hitam.',
         en: 'A sweet liquid given off by sap-sucking insects such as mealybugs and psyllids. It attracts ants and leads to sooty mould.',
         zh: '粉蚧、木虱等刺吸式昆虫排出的甜液，会招来蚂蚁并引发煤烟病。' } },
  { t: { ms: 'Kulapuk hitam', en: 'Sooty mould', zh: '煤烟病' },
    d: { ms: 'Lapisan hitam seperti jelaga yang tumbuh atas embun madu. Ia menghalang cahaya; punca sebenar ialah serangga penghisap.',
         en: 'A black, soot-like layer that grows on honeydew. It blocks light; the real cause is the sap-sucking insect.',
         zh: '长在蜜露上的黑色煤灰状霉层，会遮挡阳光；真正的元凶是刺吸式害虫。' } },
  { t: { ms: 'Vektor', en: 'Vector', zh: '传毒媒介' },
    d: { ms: 'Serangga yang membawa penyakit dari pokok ke pokok, contohnya bena hijau membawa virus tungro.',
         en: 'An insect that carries a disease from plant to plant, e.g. the green leafhopper carries tungro virus.',
         zh: '把病害从一株带到另一株的昆虫，例如黑尾叶蝉传播东格鲁病毒。' } },
  { t: { ms: 'Patogen', en: 'Pathogen', zh: '病原体' },
    d: { ms: 'Organisma yang menyebabkan penyakit: kulat, bakteria, virus atau nematod.',
         en: 'An organism that causes disease: a fungus, bacterium, virus or nematode.',
         zh: '引起病害的生物：真菌、细菌、病毒或线虫。' } },
  { t: { ms: 'Perumah', en: 'Host', zh: '寄主' },
    d: { ms: 'Tanaman yang diserang atau menjadi tempat hidup perosak. Rumpai juga boleh menjadi perumah.',
         en: 'The plant a pest attacks or lives on. Weeds can be hosts too.',
         zh: '害虫或病菌侵害、寄居的植物。杂草也可能是寄主。' } },
  { t: { ms: 'Klorosis', en: 'Chlorosis', zh: '黄化' },
    d: { ms: 'Daun menjadi kuning kerana kurang klorofil. Boleh disebabkan penyakit, akar rosak atau kekurangan nutrien.',
         en: 'Leaves turning yellow from lack of chlorophyll. Can come from disease, damaged roots or nutrient shortage.',
         zh: '叶片因叶绿素不足而发黄，可能由病害、根系受损或缺素引起。' } },
  { t: { ms: 'Nekrosis', en: 'Necrosis', zh: '坏死' },
    d: { ms: 'Tisu yang mati, biasanya bertukar perang atau hitam dan kering.',
         en: 'Dead tissue, usually turning brown or black and dry.',
         zh: '组织死亡，通常变成褐色或黑色并干枯。' } },
  { t: { ms: 'IPM (Pengurusan Perosak Bersepadu)', en: 'IPM (Integrated Pest Management)', zh: 'IPM（综合虫害管理）' },
    d: { ms: 'Gabungan cara: pemantauan, kebersihan kebun, musuh semula jadi, perangkap, dan racun hanya bila perlu.',
         en: 'Combining methods: monitoring, farm hygiene, natural enemies, traps, and pesticide only when needed.',
         zh: '多种方法结合：监测、田园卫生、天敌、诱捕，必要时才用农药。' } },
  { t: { ms: 'APB (Amalan Pertanian Baik)', en: 'GAP (Good Agricultural Practice)', zh: '良好农业规范（GAP）' },
    d: { ms: 'Cara bertani yang selamat dan bersih, termasuk penggunaan racun yang betul. Di Malaysia dikenali sebagai myGAP.',
         en: 'Safe, clean farming practice, including correct pesticide use. In Malaysia certified as myGAP.',
         zh: '安全、清洁的耕作方式，包括正确使用农药。马来西亚的认证叫 myGAP。' } },
  { t: { ms: 'Tempoh pra-tuai', en: 'Pre-harvest interval', zh: '安全间隔期' },
    d: { ms: 'Bilangan hari minimum antara semburan terakhir dan menuai. Tertera pada label racun.',
         en: 'The minimum number of days between the last spray and harvest. It is printed on the pesticide label.',
         zh: '最后一次喷药到采收之间必须间隔的最少天数，标示在农药标签上。' } },
  { t: { ms: 'Sistemik', en: 'Systemic', zh: '内吸性' },
    d: { ms: 'Racun yang diserap dan bergerak di dalam tanaman, jadi ia sampai ke perosak yang tersembunyi.',
         en: 'A pesticide absorbed and moved inside the plant, so it reaches pests that are hidden.',
         zh: '能被植物吸收并在体内传导的农药，可以作用到躲藏的害虫或病菌。' } },
  { t: { ms: 'Sanitasi ladang', en: 'Field sanitation', zh: '田园清洁' },
    d: { ms: 'Membuang dan memusnahkan bahagian tanaman yang berpenyakit, buah gugur dan sisa supaya perosak tidak membiak.',
         en: 'Removing and destroying diseased plant parts, fallen fruit and debris so pests cannot breed.',
         zh: '清除并销毁病残体、落果和杂物，不让病虫繁殖。' } }
];
