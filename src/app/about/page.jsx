import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="ml-2 text-xl">

            <h1>Our Project</h1>
            <p className="mb-10">
                The Trendall Center at La Trobe University houses an archive of 40,000 images of ancient South Italian vases from the 4th century BCE,
                offering insights into ancient Greek life and pottery production. In collaboration with La Trobe&apos;s Department of Computer Science and
                the Beazley Archive at Oxford University, this database is dedicated to pairing these images with textual information on their subject
                matter, creator, and provenance. This text was extracted through OCR scanning of publications by Dale Trendall.
            </p>

            <h1 className="mb-2">Trendall Research Centre</h1>
            <div className="mb-10 flex flex-row">
                <Image src={"/home_media/home_vase.png"} alt={"Trendall Center image"} height={400} width={400}></Image>
                <p className="ml-5">
                    <a href="https://www.latrobe.edu.au/research/centres/trendall" className="underline text-blue-500">
                        A.D. Trendall Research Centre for Ancient Mediterranean Studies
                    </a>{" "}
                    at La Trobe University is dedicated to promoting research in Ancient Mediterranean studies, particularly
                    in the archaeology of South Italy and Sicily during the Classical period.
                </p>
            </div>

            <h1 className="mb-2">A.D. Trendall</h1>
            <div className="mb-10 flex flex-row">
                <Image src={"/home_media/home_trendall.png"} alt={"Trendall avatar image"} height={200} width={200}></Image>
                <p className="ml-5">
                    <a href="https://adb.anu.edu.au/biography/trendall-arthur-dale-976" className="underline text-blue-500">
                        Arthur Dale Trendall
                    </a>{" "}
                    was a renowned historian of Greek art and a leading authority on red-figure vases from South Italy and Sicily during
                    the 5th and 4th centuries BCE. He held significant academic positions at the University of Sydney and the Australian National University
                    before becoming a Resident Fellow at La Trobe University. His work primarily focused on distinguishing various local red-figure styles and
                    attributing vases to individual painters through meticulous analysis.
                </p>
            </div>

        </div>
    )
}