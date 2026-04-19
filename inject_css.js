const fs = require('fs');
const path = require('path');
const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
for (const f of files) {
    const fullPath = path.join(dir, f);
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('css/chatbot-widget.css')) {
        content = content.replace('</head>', '    <link rel="stylesheet" href="css/chatbot-widget.css">\n</head>');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${f}`);
    }
}
