"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RemoveBtn from "@/app/components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

export function RecordItem(props) {

    const router = useRouter();
    // const editPermission = router && router.pathname.startsWith('/record'); // TODO: add condition only admin can edit records

    let curr_coll = props.curr_coll ? props.curr_coll : 'N/A';
    let prev_coll = props.prev_coll ? props.prev_coll : 'N/A';

    return (
        <div className="my-2 flex justify-between flex-row gap-x-2 rounded border border-stone-200">
            <div className="flex">
                <Image className={"rounded-l mr-4"} src={"/vase_placeholder.png"} alt={"Vase image"} height={100} width={100}></Image>
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

            <div className="flex flex-col justify-center mr-4">
                <RemoveBtn id={props.id} />
                <Link href={`/edit_record/${props.id}`}>
                    <HiPencilAlt size={24} />
                </Link>
            </div>

        </div>
    )
}
