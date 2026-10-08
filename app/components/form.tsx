import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Form() {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // Thay YOUR_ACCESS_KEY bằng key thật của bạn từ https://web3forms.com
        formData.append("access_key", "894e3cce-f2f7-4f83-b819-a6797c71b0b8");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 rounded-lg bg-[#f9f9f9] border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-4xl font-bold text-black mb-8 text-center">{t('form.title')}</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="name"
                        placeholder={t('form.name')}
                        className="w-full p-4 bg-white border border-transparent focus:border-red-500 focus:outline-none rounded text-gray-700 placeholder-gray-400 shadow-sm"
                        required
                        minLength={2}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={t('form.email')}
                        className="w-full p-4 bg-white border border-transparent focus:border-red-500 focus:outline-none rounded text-gray-700 placeholder-gray-400 shadow-sm"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder={t('form.phone')}
                        className="w-full p-4 bg-white border border-transparent focus:border-red-500 focus:outline-none rounded text-gray-700 placeholder-gray-400 shadow-sm"
                        required
                        pattern="[0-9\+\-\s]+"
                    />
                    <input
                        type="url"
                        name="website"
                        placeholder={t('form.website')}
                        className="w-full p-4 bg-white border border-transparent focus:border-red-500 focus:outline-none rounded text-gray-700 placeholder-gray-400 shadow-sm"
                    />
                </div>

                <textarea
                    name="message"
                    placeholder={t('form.message')}
                    rows={6}
                    className="w-full p-4 bg-white border border-transparent focus:border-red-500 focus:outline-none rounded text-gray-700 placeholder-gray-400 shadow-sm resize-none"
                    required
                    minLength={10}
                ></textarea>

                <div className="flex items-center justify-center gap-3 mt-6">
                    <label className="relative flex items-center justify-center cursor-pointer">
                        <input type="checkbox" name="save_info" className="peer sr-only" />
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:bg-[#b80000] peer-checked:border-[#b80000] flex items-center justify-center transition-colors">
                            <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </label>
                    <span className="text-gray-500 text-sm">{t('form.save')}</span>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 text-center font-medium">
                        {t('form.success')}
                    </div>
                )}
                {status === 'error' && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center font-medium">
                        {t('form.error')}
                    </div>
                )}

                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn-submit-animate ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? '...' : t('form.submit')}
                    </button>
                </div>
            </form>
        </div>
    )
}