const fs = require('fs');
let content = fs.readFileSync('d:/porfolio-v2/app/components/card.tsx', 'utf8');

// The block ends with:
//            </div>
//        </div>
// </React.Fragment>);
// So replace the last two </div> before </React.Fragment> with just one </div>
content = content.replace(/<\/div>\s*<\/div>\s*<\/React\.Fragment>\);/g, '</div>\n</React.Fragment>);');

fs.writeFileSync('d:/porfolio-v2/app/components/card.tsx', content);
