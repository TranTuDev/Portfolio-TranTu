const fs = require('fs');
let c = fs.readFileSync('d:/porfolio-v2/app/components/card.tsx', 'utf8');

c = c.split('className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"').join(
  'className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.06] transition-all duration-500 ease-[cubic-bezier(0,0,0.44,1.18)]"'
);

c = c.split('<div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>').join(
  '<div className="absolute top-1/2 left-1/2 w-[200%] h-0 bg-white/30 -translate-x-1/2 -translate-y-1/2 -rotate-45 z-[1] group-hover:h-[250%] group-hover:bg-transparent transition-all duration-500 ease-linear pointer-events-none"></div>\n                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"></div>'
);

fs.writeFileSync('d:/porfolio-v2/app/components/card.tsx', c);

