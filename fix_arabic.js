const fs = require('fs');

const idxPath = 'd:\\\\تطبيقات anyigravity\\\\Project 5\\\\index-en.html';
let idx = fs.readFileSync(idxPath, 'utf8');
idx = idx.replace('>عربي</a>', '>Arabic</a>');
idx = idx.replace('alt=\"بعد Teeth Whitening\"', 'alt=\"After Teeth Whitening\"');
idx = idx.replace('alt=\"قبل Teeth Whitening\"', 'alt=\"Before Teeth Whitening\"');
idx = idx.replace('alt=\"بعد Hollywood Smile\"', 'alt=\"After Hollywood Smile\"');
idx = idx.replace('alt=\"قبل Hollywood Smile\"', 'alt=\"Before Hollywood Smile\"');
idx = idx.replace('فحص شامل', 'Comprehensive Examination');
idx = idx.replace('فحص شامل', 'Comprehensive Examination');
idx = idx.replace('تنظيف احترافي', 'Professional Cleaning');
idx = idx.replace('تبييض بالليزر', 'Laser Whitening');
idx = idx.replace('فحص + أشعة بانوراما', 'Examination + Panoramic X-ray');
idx = idx.replace('زراعة سويسرية', 'Swiss Implants');
idx = idx.replace('تاج خزفي', 'Ceramic Crown');
idx = idx.replace('تنظيف لكل أفراد العائلة', 'Cleaning for the Whole Family');
idx = idx.replace('(حتى ٤ أشخاص)', '(Up to 4 people)');
fs.writeFileSync(idxPath, idx, 'utf8');

const docPath = 'd:\\\\تطبيقات anyigravity\\\\Project 5\\\\doctors-en.html';
let doc = fs.readFileSync(docPath, 'utf8');
doc = doc.replace(/فريقنا من أمهر أطباء الأسنان في Riyadh — خريجو أفضل الجامعات في بريطانيا وأمريكا وألمانيا،\\s*بخبرة مشتركة تتجاوز <strong>٨٠ عاماً<\/strong> وأكثر من <strong>١٠,٠٠٠ حالة ناجحة<\/strong>\.\\s*كل طبيب لدينا متخصص في مجاله ومحترف في التعامل الإنساني./,
    'Our team consists of the most skilled dentists in Riyadh — graduates from the best universities in the UK, USA, and Germany,\\n                    with a combined experience exceeding <strong>80 years</strong> and over <strong>10,000 successful cases</strong>.\\n                    Each of our doctors is a specialist in their field and a professional in human interaction.');

doc = doc.replace(/أكثر من ١٥ عاماً من الخبرة في Dental Implants وOral & Maxillofacial Surgery\. أجرى أكثر من ٣,٠٠٠\\s*عملية زراعة ناجحة بنسبة نجاح تتجاوز ٩٨٪\. يُعرف بين مرضاه بدقته المتناهية وأسلوبه الهادئ\\s*المُطمئن الذي يجعل حتى المرضى الأكثر قلقاً يشعرون بالراحة والأمان\./,
    'Over 15 years of experience in Dental Implants and Oral & Maxillofacial Surgery. He has performed more than 3,000\\n                                successful implant surgeries with a success rate exceeding 98%. He is known among his patients for his meticulous precision and calm,\\n                                reassuring demeanor that makes even the most anxious patients feel comfortable and safe.');

doc = doc.replace(/متخصصة في Orthodontics بأحدث التقنيات الرقمية\. خبرة 10 years في تصحيح مشاكل إطباق\\s*الأسنان والفكين للبالغين والأطفال\. معتمدة كمقدم Invisalign من المستوى الماسي — وهو أعلى\\s*تصنيف يُمنح لأخصائيي التقويم\. تؤمن بأن كل مريض يستحق ابتسامة مستقيمة وجميلة بأقل فترة\\s*علاج ممكنة\./,
    'Specialized in Orthodontics with the latest digital technologies. 10 years of experience in correcting bite\\n                                and jaw problems for adults and children. Certified as a Diamond Level Invisalign provider — the highest\\n                                classification given to orthodontists. She believes every patient deserves a straight, beautiful smile in the shortest\\n                                possible treatment time.');

doc = doc.replace('مقدم Invisalign معتمد — المستوى الماسي', 'Certified Invisalign Provider — Diamond Level');
doc = doc.replace('عضو الجمعية البريطانية لOrthodontics', 'Member of the British Orthodontic Society');

doc = doc.replace(/\"سويت Hollywood Smile مع الدكتور خالد وصراحة النتيجة فاقت توقعاتي بمراحل\. الشي\\s*اللي عجبني إنه وراني الشكل النهائي على الكمبيوتر قبل لا يبدأ، فكنت متأكد من\\s*النتيجة\. أسناني الحين طبيعية ومتناسقة\. كل اللي يشوفوني يسألوني وين سويتها!\"/,
    '\"I did a Hollywood Smile with Dr. Khalid and honestly, the result far exceeded my expectations. What\\n                                    I liked is that he showed me the final look on the computer before he started, so I was sure of\\n                                    the result. My teeth are now natural and well-proportioned. Everyone who sees me asks where I got them!\"');

doc = doc.replace(/احجز موعدك مع طبيبك المفضل اليوم واحصل على Free Consultation شاملة مع خطة\\s*علاج مخصصة\./,
    'Book your appointment with your favorite doctor today and get a comprehensive Free Consultation with a\\n                    customized treatment plan.');
fs.writeFileSync(docPath, doc, 'utf8');

const conPath = 'd:\\\\تطبيقات anyigravity\\\\Project 5\\\\contact-en.html';
let con = fs.readFileSync(conPath, 'utf8');
con = con.replace('>عربي</a>', '>Arabic</a>');
con = con.split('أرغب%20في%20حجز%20موعد%20في%20عيادة%20بيرل%20سمايل').join('I%20would%20like%20to%20book%20an%20appointment%20at%20Pearl%20Smile%20Clinic');
con = con.replace(/الFree Consultation والنتائج\\s*مضمونة\./, 'the Free Consultation and results\\n                    are guaranteed.');
fs.writeFileSync(conPath, con, 'utf8');

const blgPath = 'd:\\\\تطبيقات anyigravity\\\\Project 5\\\\blog-en.html';
let blg = fs.readFileSync(blgPath, 'utf8');
blg = blg.replace('>عربي</a>', '>Arabic</a>');
fs.writeFileSync(blgPath, blg, 'utf8');

const bpiPath = 'd:\\\\تطبيقات anyigravity\\\\Project 5\\\\blog-post-implants-en.html';
let bpi = fs.readFileSync(bpiPath, 'utf8');
bpi = bpi.replace('>عربي</a>', '>Arabic</a>');
bpi = bpi.replace('العملية نفسها تستغرق ١٥-٣٠ دقيقة فقط', 'The procedure itself takes only 15-30 minutes');
fs.writeFileSync(bpiPath, bpi, 'utf8');

const srvPath = 'd:\\\\تطبيقات anyigravity\\\\Project 5\\\\services-en.html';
let srv = fs.readFileSync(srvPath, 'utf8');
srv = srv.replace('>عربي</a>', '>Arabic</a>');
fs.writeFileSync(srvPath, srv, 'utf8');

const abtPath = 'd:\\\\تطبيقات anyigravity\\\\Project 5\\\\about-en.html';
let abt = fs.readFileSync(abtPath, 'utf8');
abt = abt.replace('>عربي</a>', '>Arabic</a>');
fs.writeFileSync(abtPath, abt, 'utf8');

console.log('done');
