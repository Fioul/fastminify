import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('legal');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function LegalPage() {
  const t = useTranslations('legal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {t('title')}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8 text-center">
              {t('lastUpdated')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('publisher.title')}
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>{t('publisher.name')}:</strong> FastMinify
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>{t('publisher.website')}:</strong> https://fastminify.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>{t('publisher.email')}:</strong> contact@fastminify.com
                </p>
                <p className="text-gray-700">
                  <strong>{t('publisher.country')}:</strong> France
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('hosting.title')}
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>{t('hosting.provider')}:</strong> Render.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>{t('hosting.address')}:</strong> 625 Market Street, San Francisco, CA 94105, USA
                </p>
                <p className="text-gray-700">
                  <strong>{t('hosting.website')}:</strong> https://render.com
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('service.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('service.description')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('service.features.minification')}</li>
                <li>{t('service.features.beautification')}</li>
                <li>{t('service.features.concatenation')}</li>
                <li>{t('service.features.phpSerialization')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('intellectualProperty.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('intellectualProperty.content')}
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>{t('intellectualProperty.warning')}</strong>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('liability.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('liability.content')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('liability.limitations.accuracy')}</li>
                <li>{t('liability.limitations.availability')}</li>
                <li>{t('liability.limitations.damages')}</li>
                <li>{t('liability.limitations.thirdParty')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('cookies.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('cookies.content')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('cookies.moreInfo')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('governingLaw.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('governingLaw.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('modifications.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('modifications.content')}
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                {t('footer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
