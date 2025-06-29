import type { FC, ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import ImageWithFallback from "./image-with-fallback";

export interface NetworkInfo {
  slug: string;
  title: string;
  description: string;
}

export interface SupportNetworksModalProps {
  networks: NetworkInfo[];
  children: ReactNode;
}

const SupportNetworksModal: FC<SupportNetworksModalProps> = ({ networks, children }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-96 p-4">
        <div className="space-y-4">
          <div className="text-lg font-semibold text-foreground">
            Supported Alt Rollup Networks
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {networks.map((network) => (
              <div key={network.slug} className="flex items-center gap-3">
                <ImageWithFallback slug={network.slug} folder="logos" altText={`${network.title} logo`} width={24} height={24} />
                <div>
                  <div className="font-semibold text-sm text-foreground">{network.title}</div>
                  <div className="text-xs text-muted-foreground">{network.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default SupportNetworksModal; 