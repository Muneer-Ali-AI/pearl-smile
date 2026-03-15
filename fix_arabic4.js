const fs = require('fs');

function fixDoctors(path) {
    let lines = fs.readFileSync(path, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('فريقنا من أمهر أطباء')) lines[i] = '                    Our team consists of the most skilled dentists in Riyadh — graduates from the best universities in the UK, USA, and Germany,\\r';
        if (lines[i].includes('بخبرة مشتركة تتجاوز')) lines[i] = '                    with a combined experience exceeding <strong>80 years</strong> and over <strong>10,000 successful cases</strong>.\\r';
        if (lines[i].includes('كل طبيب لدينا متخصص في مجاله')) lines[i] = '                    Each of our doctors is a specialist in their field and a professional in human interaction.\\r';
        
        if (lines[i].includes('أكثر من ١٥ عاماً من الخبرة في Dental Implants')) lines[i] = '                                Over 15 years of experience in Dental Implants and Oral & Maxillofacial Surgery. He has performed more than 3,000\\r';
        if (lines[i].includes('عملية زراعة ناجحة بنسبة نجاح تتجاوز ٩٨٪')) lines[i] = '                                successful implant surgeries with a success rate exceeding 98%. He is known among his patients for his meticulous precision and calm,\\r';
        if (lines[i].includes('المُطمئن الذي يجعل حتى المرضى الأكثر قلقاً')) lines[i] = '                                reassuring demeanor that makes even the most anxious patients feel comfortable and safe.\\r';
        
        if (lines[i].includes('متخصصة في Orthodontics بأحدث التقنيات الرقمية. خبرة 10 years')) lines[i] = '                                Specialized in Orthodontics with the latest digital technologies. 10 years of experience in correcting bite\\r';
        if (lines[i].includes('الأسنان والفكين للبالغين والأطفال. معتمدة كمقدم')) lines[i] = '                                and jaw problems for adults and children. Certified as a Diamond Level Invisalign provider — the highest\\r';
        if (lines[i].includes('تصنيف يُمنح لأخصائيي التقويم. تؤمن بأن كل مريض')) lines[i] = '                                classification given to orthodontists. She believes every patient deserves a straight, beautiful smile in the shortest\\r';
        if (lines[i].includes('علاج ممكنة.')) lines[i] = '                                possible treatment time.\\r';
        
        if (lines[i].includes('"سويت Hollywood Smile مع الدكتور خالد')) lines[i] = '                                    "I did a Hollywood Smile with Dr. Khalid and honestly, the result far exceeded my expectations. What\\r';
        if (lines[i].includes('اللي عجبني إنه وراني الشكل النهائي')) lines[i] = '                                    I liked is that he showed me the final look on the computer before he started, so I was sure of\\r';
        if (lines[i].includes('النتيجة. أسناني الحين طبيعية ومتناسقة')) lines[i] = '                                    the result. My teeth are now natural and well-proportioned. Everyone who sees me asks where I got them!"\\r';

        if (lines[i].includes('Our team is ready to welcome you. احجز موعدك')) lines[i] = '                    Our team is ready to welcome you. Book your appointment with your favorite doctor today and get a comprehensive Free Consultation with a\\r';
        if (lines[i].includes('علاج مخصصة.')) lines[i] = '                    customized treatment plan.\\r';
    }
    fs.writeFileSync(path, lines.join('\n'), 'utf8');
}

function fixContact(path) {
    let lines = fs.readFileSync(path, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Every day delayed is a day without the smile')) lines[i] = '                    Every day delayed is a day without the smile you deserve. Our team is ready to welcome you — the Free Consultation and results\\r';
        if (lines[i].includes('مضمونة.')) lines[i] = '                    are guaranteed.\\r';
    }
    fs.writeFileSync(path, lines.join('\n'), 'utf8');
}

fixDoctors('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\doctors-en.html');
fixContact('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\contact-en.html');
console.log('done4');
