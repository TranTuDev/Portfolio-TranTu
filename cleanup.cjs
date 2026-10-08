const fs = require('fs');
let c = fs.readFileSync('app/components/card.tsx', 'utf8');

c = c.replace(/}\s+<div className="relative/g, '<div className="relative');
c = c.replace(/}\s+<div className="relative/g, '<div className="relative');

fs.writeFileSync('app/components/card.tsx', c);
console.log('Cleaned up stray }');

