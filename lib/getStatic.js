import { serverSideTranslations as ssgTranslate } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../next-i18next.config';
import { fetchContactData, fetchMenus, fetchLogoData, fetchHomeData, fetchAboutData, fetchServicesData, fetchExpertiseData, fetchCategories, fetchFooterData } from 'utils';

export const getI18nPaths = () => i18nextConfig.i18n.locales.map((lng) => ({
  params: {
    locale: lng,
  },
}));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getI18nProps = async (ctx, ns = ['common', 'agency-landing']) => {
  const locale = ctx?.params?.locale;
  const props = {
    ...(await ssgTranslate(locale, ns)),
  };
  return props;
};



// export const makeStaticProps = (ns = []) => async (ctx) => ({
//   props: await getI18nProps(ctx, ns),
// });

export const makeStaticProps = (ns = []) => async (ctx) => {
  const i18nProps = await getI18nProps(ctx, ns);

 const [
   contactProps,
   menuProps,
   logoProps,
   homeProps,
   aboutProps,
   serviceProps,
   expertiseProps,
   categoriesProps,
   footerProps,
 ] = await Promise.all([
   fetchContactData(),
   fetchMenus(),
   fetchLogoData(),
   fetchHomeData(),
   fetchAboutData(),
   fetchServicesData(),
   fetchExpertiseData(),
   fetchCategories(),
   fetchFooterData(),
 ]);

  return {
    props: {
      ...i18nProps,
      ...contactProps,
      ...menuProps,
      ...logoProps,
      ...homeProps,
      ...aboutProps,
      ...serviceProps,
      ...expertiseProps,
      ...categoriesProps,
      ...footerProps
    },
    revalidate: 2, // Revalidate the data every 10 seconds
  };
};