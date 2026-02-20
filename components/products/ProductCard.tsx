import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ProductFrontmatter } from '@/lib/products';

interface ProductCardProps {
  product: ProductFrontmatter;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {product.image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl">{product.title}</CardTitle>
          {product.featured && (
            <Badge variant="secondary" className="shrink-0">Featured</Badge>
          )}
        </div>
        <CardDescription>{product.tagline}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {product.description}
        </p>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Link href={`/${locale}/products/${product.slug}`}>
          <Button variant="default" className="w-full bg-brand-600 hover:bg-brand-700">
            Learn More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
