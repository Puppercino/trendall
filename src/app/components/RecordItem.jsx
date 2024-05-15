"use client";

import Image from "next/image";
import Link from "next/link";

export function RecordItem(props) {

    let curr_coll = props.curr_coll ? props.curr_coll : 'N/A';
    let prev_coll = props.prev_coll ? props.prev_coll : 'N/A';
    let image = props.image ? `/images/${props.image}` : "/vase_placeholder.png";

    return (
        <Link href={`/record/${props.id}`}>
            <div className="my-2 flex justify-between flex-row gap-x-2 rounded border border-stone-200">
                <div className="flex">
                    <Image
                        className={"rounded-l mr-4"}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '0.5rem 0 0 0.5rem',
                            marginRight: '1rem',
                            height: '100px',
                            width: '100px',
                        }}
                        src={image}
                        // src={"/vase_placeholder.png"}
                        alt={"Vase image"}
                        height={100}
                        width={100}
                    />
                    <div className={"py-2"} style={{ minWidth: '0' }}>

                        <p className="text-lg">
                            Shape: <b>{props.shape}</b>
                        </p>

                        <p style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            Current collection: <b>{curr_coll}</b>
                        </p>

                        <p style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            Previously in: <b>{prev_coll}</b>
                        </p>

                    </div>
                </div>

            </div>
        </Link>
    )
}
