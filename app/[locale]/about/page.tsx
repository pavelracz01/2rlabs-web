import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs/promises';
import path from 'path';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

async function getCompanyStory(locale: string) {
  const fileName = `company-story-${locale}.mdx`;
  const filePath = path.join(process.cwd(), 'content', 'about', fileName);

  try {
    const source = await fs.readFile(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });

    return { content, frontmatter };
  } catch (error) {
    console.error(`Error loading company story for locale ${locale}:`, error);
    return null;
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AboutPage');

  const storyData = await getCompanyStory(locale);

  if (!storyData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Company Story Section */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-16">
          {storyData.content}
        </section>

        {/* Team Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">{t('team.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Team members would be mapped here */}
            <div className="p-6 border rounded-lg">
              <p className="text-muted-foreground">{t('team.comingSoon')}</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">{t('values.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Values would be mapped here from translations */}
            <div className="p-6 border rounded-lg">
              <p className="text-muted-foreground">{t('values.description')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
