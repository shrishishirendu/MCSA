import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type Feature = {
  title: string;
  description: string;
  meta?: ReactNode;
};

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <Card key={feature.title}>
          {feature.meta ? (
            <div className="mb-4 text-sm font-semibold text-lotus-700">
              {feature.meta}
            </div>
          ) : null}
          <h2 className="text-lg font-bold text-indigoInk">{feature.title}</h2>
          <p className="mt-2 text-sm leading-6 text-indigoInk/70">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
