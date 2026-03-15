const fs = require('fs');

let doc = fs.readFileSync('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\doctors-en.html', 'utf8');
let lines = doc.split(/\\r?\\n/);
lines[182] = '                    Our team consists of the most skilled dentists in Riyadh — graduates from the best universities in the UK, USA, and Germany,';
lines[183] = '                    with a combined experience exceeding <strong>80 years</strong> and over <strong>10,000 successful cases</strong>.';
lines[184] = '                    Each of our doctors is a specialist in their field and a professional in human interaction.';

lines[324] = '                                Over 15 years of experience in Dental Implants and Oral & Maxillofacial Surgery. He has performed more than 3,000';
lines[325] = '                                successful implant surgeries with a success rate exceeding 98%. He is known among his patients for his meticulous precision and calm,';
lines[326] = '                                reassuring demeanor that makes even the most anxious patients feel comfortable and safe.';

lines[394] = '                                Specialized in Orthodontics with the latest digital technologies. 10 years of experience in correcting bite';
lines[395] = '                                and jaw problems for adults and children. Certified as a Diamond Level Invisalign provider — the highest';
lines[396] = '                                classification given to orthodontists. She believes every patient deserves a straight, beautiful smile in the shortest';
lines[397] = '                                possible treatment time.';

lines[641] = '                                    \"I did a Hollywood Smile with Dr. Khalid and honestly, the result far exceeded my expectations. What';
lines[642] = '                                    I liked is that he showed me the final look on the computer before he started, so I was sure of';
lines[643] = '                                    the result. My teeth are now natural and well-proportioned. Everyone who sees me asks where I got them!\"';

lines[817] = '                    Our team is ready to welcome you. Book your appointment with your favorite doctor today and get a comprehensive Free Consultation with a';
lines[818] = '                    customized treatment plan.';

fs.writeFileSync('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\doctors-en.html', lines.join('\\r\\n'), 'utf8');

let con = fs.readFileSync('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\contact-en.html', 'utf8');
let clines = con.split(/\\r?\\n/);
clines[562] = '                    Every day delayed is a day without the smile you deserve. Our team is ready to welcome you — the Free Consultation and results';
clines[563] = '                    are guaranteed.';
fs.writeFileSync('d:\\\\تطبيقات anyigravity\\\\Project 5\\\\contact-en.html', clines.join('\\r\\n'), 'utf8');

console.log('done2');
