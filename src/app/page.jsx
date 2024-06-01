/*
Authors: Jordan Lyall, Trong Vinh Luu
*/

import Link from "next/link";

export default function HomePage() {
	return (
		<div className="ml-2">

			<video autoPlay loop muted style={{
				position: "absolute",
				width: "100%",
				left: "50%",
				top: "50%",
				height: "100%",
				objectFit: "cover",
				transform: "translate(-50%, -50%)",
				zIndex: "-1"
			}}>
				<source src="/home_media/home_vid.mp4" type="video/mp4" />
			</video>

			<div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
				<h1 className="mb-4 text-4xl text-white" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>Welcome</h1>
				<p className="mb-10 text-5xl text-white">The Red-Figured Vases of Paestum Database</p>
				<Link
					href={"/about"}
					className="m-2 h-20 w-40 rounded border border-white bg-transparent px-6 py-3 font-bold text-white hover:bg-black hover:text-white">
					About
				</Link>
				<Link
					href={"/search"}
					className="m-2 h-20 w-40 rounded border border-white bg-transparent px-6 py-3 font-bold text-white hover:bg-black hover:text-white">
					Browse
				</Link>
			</div>

		</div>
	)
}