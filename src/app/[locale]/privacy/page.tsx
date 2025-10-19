import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('privacy');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
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
                {t('introduction.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('introduction.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('dataCollection.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('dataCollection.content')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('dataCollection.types.usage')}</li>
                <li>{t('dataCollection.types.analytics')}</li>
                <li>{t('dataCollection.types.cookies')}</li>
                <li>{t('dataCollection.types.ads')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('cookies.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('cookies.content')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t('cookies.types.title')}
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>{t('cookies.types.essential')}</li>
                  <li>{t('cookies.types.analytics')}</li>
                  <li>{t('cookies.types.advertising')}</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('googleServices.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('googleServices.content')}
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Google Analytics
                  </h3>
                  <p className="text-blue-700 text-sm">
                    {t('googleServices.analytics')}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Google AdSense
                  </h3>
                  <p className="text-green-700 text-sm">
                    {t('googleServices.adsense')}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('dataRights.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('dataRights.content')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('dataRights.rights.access')}</li>
                <li>{t('dataRights.rights.rectification')}</li>
                <li>{t('dataRights.rights.erasure')}</li>
                <li>{t('dataRights.rights.portability')}</li>
                <li>{t('dataRights.rights.objection')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('dataSecurity.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('dataSecurity.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('contact.content')}
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
