import trantu1 from '../asset/images/trantu-1.jpg';
import trantu2 from '../asset/images/trantu-2.jpg';
import trantu4 from '../asset/images/trantu-4.jpg';

export function Slide() {
    const images = [trantu1, trantu4, trantu2];

    return (
        <div className="w-full relative">
            {images.map((img, index) => (
                <div key={index} className="w-full h-auto pb-[15vh] md:pb-0 md:h-screen flex flex-col justify-start pt-4 md:pt-32 sticky top-0">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl border-[5px] border-black relative">
                        <img src={img} alt={`Tran Tu ${index + 1}`} className="w-full h-full object-cover absolute inset-0" loading="lazy" />
                    </div>
                </div>
            ))}
        </div>
    );
}