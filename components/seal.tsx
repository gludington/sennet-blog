import Image from "next/image";
    
export default function Seal({ width = 75, height = 75, ...props }: HTMLImageElement) {
    return (
        <>
            <p className="cachet">
                <Image src="/seal.png" width={width} height={height} alt="All For Me, One for Me" className="w-2" />
            </p>
            <div id="signature">Kryn&apos;s Greatest Hero<br />Sennet</div>
        </>
    )
}