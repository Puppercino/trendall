"use client";

import Image from "next/image";

export default function HomePage() {
	return (
		<div className="ml-2">

			<h1>Welcome</h1>
			<p className="mb-10">
				The Trendall Center at La Trobe University houses an archive of 40,000 images of ancient South Italian vases from the 4th century BCE,
				offering insights into ancient Greek life and pottery production. In collaboration with La Trobe's Department of Computer Science and
				the Beazley Archive at Oxford University, this database is dedicated to pairing these images with textual information on their subject
				matter, creator, and provenance. This text was extracted through OCR scanning of publications by Dale Trendall.
			</p>

			<div className="flex flex-row mb-10">
				<Image src={"/home_images/home_vase.png"} alt={"Trendall Center image"} height={300} width={300}></Image>
				<div className="flex flex-col ml-5">
					<h1>Trendall Research Centre</h1>
					<p>
						The Trendall Research Centre at La Trobe University is dedicated to promoting research in Ancient Mediterranean studies, particularly
						in the archaeology of South Italy and Sicily during the Classical period.
					</p>
				</div>
			</div>

			<div className="flex flex-row mb-10">
				<Image src={"/home_images/home_trendall.png"} alt={"Trendall avatar image"} height={180} width={180}></Image>
				<div className="flex flex-col ml-5">
					<h1>About A.D. Trendall</h1>
					<p>
						Arthur Dale Trendall was a renowned historian of Greek art and a leading authority on red-figure vases from South Italy and Sicily during
						the 5th and 4th centuries BCE. He held significant academic positions at the University of Sydney and the Australian National University
						before becoming a Resident Fellow at La Trobe University. His work primarily focused on distinguishing various local red-figure styles and
						attributing vases to individual painters through meticulous analysis.
					</p>
				</div>
			</div>

		</div>
	)
}