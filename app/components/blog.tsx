import { useTranslation } from "react-i18next";

export function Blog({ index }: { index: number }) {
    const { t } = useTranslation();
    return (
        <div style={{ background: 'linear-gradient(to right, #DF9D9D 0%, #9868A1 52%, #725E9C 100%)' }} className="p-6 rounded-lg shadow-lg">
            <h4 className="h4 text-red">{t(`experience.items.${index}.date`)}</h4>
            <h3 className="h3 text-white" dangerouslySetInnerHTML={{ __html: t(`experience.items.${index}.role`).replace('@', '<br/>@') }}></h3>
            <p className="text-white mt-2">{t(`experience.items.${index}.desc`)}</p>
        </div>
    )
}