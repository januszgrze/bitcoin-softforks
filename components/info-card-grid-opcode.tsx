import InfoCardOpcode from "./info-card-opcode";
import { BitcoinIcon, HandCoinsIcon, Pickaxe, Code } from "lucide-react";

export default function InfoCardGridOpcode() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCardOpcode
                title="Node runners"
                subtitle="Review how proposals"
                description="affect your business"
                href="https://github.com/sCrypt-Inc/awesome-op-cat"
                icon={HandCoinsIcon}
            />
            <InfoCardOpcode
                title="Miners"
                subtitle="Review how proposals"
                description="with other layer enjoyers"
                href="https://github.com/sCrypt-Inc/awesome-op-cat"
                isExternal
                icon={Pickaxe}
            />
            <InfoCardOpcode
                title="Developers"
                subtitle="Review how proposals"
                description="impact the application layer"
                href="https://github.com/sCrypt-Inc/awesome-op-cat"
                isExternal
                icon={Code}
            />
        </div>
    );
}