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

			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
				<h1 className="text-4xl mb-4 text-white" style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}>Welcome</h1>
				<p className="text-5xl mb-10 text-white">The Red-Figured Vases of Paestum Database</p>
				<Link
					href={"/about"}
					className="border border-white text-white font-bold py-3 px-6 rounded m-2 bg-transparent hover:bg-black hover:text-white w-40 h-20">
					About
				</Link>
				<Link
					href={"/search"}
					className="border border-white text-white font-bold py-3 px-6 rounded m-2 bg-transparent hover:bg-black hover:text-white w-40 h-20">
					Browse
				</Link>
			</div>

		</div>
	)
}