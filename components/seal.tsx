import Image from "next/image";
    
export default function Seal() {
    return (
        <>
            <p className="cachet">
                <Image src="/seal.png" width={75} height={75} alt="All For Me, One for Me" className="w-2" />
            </p>
            <div id="signature">Kryn&apos;s Greatest Hero<br />Sennet</div>
        </>
    )
}