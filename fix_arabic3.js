const fs = require('fs');

let doc = fs.readFileSync('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\doctors-en.html', 'utf8');
doc = doc.replace(/فريقنا من أمهر أطباء الأسنان في Riyadh — خريجو أفضل الجامعات في بريطانيا وأمريكا وألمانيا،/g, '                    Our team consists of the most skilled dentists in Riyadh — graduates from the best universities in the UK, USA, and Germany,');
doc = doc.replace(/بخبرة مشتركة تتجاوز <strong>٨٠ عاماً<\\/strong > وأكثر من < strong >١٠,٠٠٠ حالة ناجحة <\\/strong>\\./g, '                    with a combined experience exceeding <strong>80 years</strong> and over <strong>10,000 successful cases</strong>.');
doc = doc.replace(/كل طبيب لدينا متخصص في مجاله ومحترف في التعامل الإنساني\\./g, '                    Each of our doctors is a specialist in their field and a professional in human interaction.');

doc = doc.replace(/أكثر من ١٥ عاماً من الخبرة في Dental Implants وOral & Maxillofacial Surgery\\. أجرى أكثر من ٣,٠٠٠/g, '                                Over 15 years of experience in Dental Implants and Oral & Maxillofacial Surgery. He has performed more than 3,000');
doc = doc.replace(/عملية زراعة ناجحة بنسبة نجاح تتجاوز ٩٨٪\\. يُعرف بين مرضاه بدقته المتناهية وأسلوبه الهادئ/g, '                                successful implant surgeries with a success rate exceeding 98%. He is known among his patients for his meticulous precision and calm,');
doc = doc.replace(/المُطمئن الذي يجعل حتى المرضى الأكثر قلقاً يشعرون بالراحة والأمان\\./g, '                                reassuring demeanor that makes even the most anxious patients feel comfortable and safe.');

doc = doc.replace(/متخصصة في Orthodontics بأحدث التقنيات الرقمية\\. خبرة 10 years في تصحيح مشاكل إطباق/g, '                                Specialized in Orthodontics with the latest digital technologies. 10 years of experience in correcting bite');
doc = doc.replace(/الأسنان والفكين للبالغين والأطفال\\. معتمدة كمقدم Invisalign من المستوى الماسي — وهو أعلى/g, '                                and jaw problems for adults and children. Certified as a Diamond Level Invisalign provider — the highest');
doc = doc.replace(/تصنيف يُمنح لأخصائيي التقويم\\. تؤمن بأن كل مريض يستحق ابتسامة مستقيمة وجميلة بأقل فترة/g, '                                classification given to orthodontists. She believes every patient deserves a straight, beautiful smile in the shortest');
doc = doc.replace(/علاج ممكنة\\./g, '                                possible treatment time.');

doc = doc.replace(/\"سويت Hollywood Smile مع الدكتور خالد وصراحة النتيجة فاقت توقعاتي بمراحل\\. الشي/g, '                                    \"I did a Hollywood Smile with Dr. Khalid and honestly, the result far exceeded my expectations. What');
doc = doc.replace(/اللي عجبني إنه وراني الشكل النهائي على الكمبيوتر قبل لا يبدأ، فكنت متأكد من/g, '                                    I liked is that he showed me the final look on the computer before he started, so I was sure of');
doc = doc.replace(/النتيجة\\. أسناني الحين طبيعية ومتناسقة\\. كل اللي يشوفوني يسألوني وين سويتها!\"/g, '                                    the result. My teeth are now natural and well-proportioned. Everyone who sees me asks where I got them!\"');

doc = doc.replace(/Our team is ready to welcome you\\. احجز موعدك مع طبيبك المفضل اليوم واحصل على Free Consultation شاملة مع خطة/g, '                    Our team is ready to welcome you. Book your appointment with your favorite doctor today and get a comprehensive Free Consultation with a');
doc = doc.replace(/علاج مخصصة\\./g, '                    customized treatment plan.');

fs.writeFileSync('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\doctors-en.html', doc, 'utf8');

let con = fs.readFileSync('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\contact-en.html', 'utf8');
con = con.replace(/Every day delayed is a day without the smile you deserve\\. Our team is ready to welcome you — الFree Consultation والنتائج/g, '                    Every day delayed is a day without the smile you deserve. Our team is ready to welcome you — the Free Consultation and results');
con = con.replace(/مضمونة\\./g, '                    are guaranteed.');
fs.writeFileSync('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\contact-en.html', con, 'utf8');

console.log('done3');
