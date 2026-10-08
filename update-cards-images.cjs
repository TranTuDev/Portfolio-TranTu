const fs = require('fs');
let code = fs.readFileSync('app/components/card.tsx', 'utf8');

// Add imports if not present
if (!code.includes('capitaland.jpg')) {
    const importsToAdd = `
import capitalandImg from '../asset/images/capitaland.jpg';
import vingroupImg from '../asset/images/vingroup.webp';
import tanHoangMinhImg from '../asset/images/tan-hoang-minh.jpg';
import icmsImg from '../asset/images/ICMS.webp';
`;
    code = code.replace("import templateImg from '../asset/images/templates.jpg';", "import templateImg from '../asset/images/templates.jpg';" + importsToAdd);
}

// Update getWordPressCard signature and img tag
code = code.replace(
    /const getWordPressCard = \(keyName: string, title: string, titleHref: string, demoHref: string, desc: string, techStack: string\[\]\) => \(/,
    'const getWordPressCard = (keyName: string, title: string, titleHref: string, demoHref: string, desc: string, techStack: string[], imgSrc: any) => ('
);

code = code.replace(
    /src="https:\/\/lh3\.googleusercontent\.com[^"]+"/,
    'src={imgSrc?.src || imgSrc || ""}'
);

// Update wp1, wp2, wp3, wp4 calls
code = code.replace(
    /const wp1 = \(key: string\) => getWordPressCard\(key, 'CapitaOne loyaly membership programme', 'https:\/\/www\.capitaland\.com\/vn\/vi\.html\?viewmode=mapview', 'https:\/\/capitaone\.com\.vn\/', 'A loyalty membership programme by CapitaLand, a major real estate company\.', \['WordPress', 'PHP', 'ACF'\]\);/,
    "const wp1 = (key: string) => getWordPressCard(key, 'CapitaOne loyaly membership programme', 'https://www.capitaland.com/vn/vi.html?viewmode=mapview', 'https://capitaone.com.vn/', 'A loyalty membership programme by CapitaLand, a major real estate company.', ['WordPress', 'PHP', 'ACF'], capitalandImg);"
);

code = code.replace(
    /const wp2 = \(key: string\) => getWordPressCard\(key, 'Quỹ vì tương lai xanh', 'https:\/\/vingroup\.net\/', 'https:\/\/foundationforgreenfuture\.com\/', 'Dự án tương lai xanh của tập đoàn Vingroup\.', \['WordPress', 'PHP', 'ACF'\]\);/,
    "const wp2 = (key: string) => getWordPressCard(key, 'Quỹ vì tương lai xanh', 'https://vingroup.net/', 'https://foundationforgreenfuture.com/', 'Dự án tương lai xanh của tập đoàn Vingroup.', ['WordPress', 'PHP', 'ACF'], vingroupImg);"
);

code = code.replace(
    /const wp3 = \(key: string\) => getWordPressCard\(key, 'D\\'\. Diamant Bleu - A Diamond Crafted From The Sky', 'https:\/\/tanhoangminh\.com\.vn\/', 'https:\/\/ddiamantbleu\.vn\/', 'Dự án bất động sản cao cấp của tập đoàn Tân Hoàng Minh\.', \['WordPress', 'PHP', 'ACF'\]\);/,
    "const wp3 = (key: string) => getWordPressCard(key, 'D\\'. Diamant Bleu - A Diamond Crafted From The Sky', 'https://tanhoangminh.com.vn/', 'https://ddiamantbleu.vn/', 'Dự án bất động sản cao cấp của tập đoàn Tân Hoàng Minh.', ['WordPress', 'PHP', 'ACF'], tanHoangMinhImg);"
);

code = code.replace(
    /const wp4 = \(key: string\) => getWordPressCard\(key, 'ICMS Cyber Solution - インシデント対応サービス', 'https:\/\/icmscyber\.com\/', 'https:\/\/forensics\.icmscyber\.com\/', 'インシデントの実態を解明し、再発を防ぐ。デジタルフォレンジック・インシデント対応サービス～現地での解析調査から、セキュリティ提案・対策支援まで～不正アクセス・マルウェア感染・退職者のデータ持ち出し・メール不正利用など、あらゆるサイバーインシデントに対応。', \['WordPress', 'PHP', 'ACF'\]\);/,
    "const wp4 = (key: string) => getWordPressCard(key, 'ICMS Cyber Solution - インシデント対応サービス', 'https://icmscyber.com/', 'https://forensics.icmscyber.com/', 'インシデントの実態を解明し、再発を防ぐ。デジタルフォレンジック・インシデント対応サービス～現地での解析調査から、セキュリティ提案・対策支援まで～不正アクセス・マルウェア感染・退職者のデータ持ち出し・メール不正利用など、あらゆるサイバーインシデントに対応。', ['WordPress', 'PHP', 'ACF'], icmsImg);"
);

fs.writeFileSync('app/components/card.tsx', code, 'utf8');

