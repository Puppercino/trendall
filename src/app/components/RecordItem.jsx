import Image from "next/image";

export function RecordItem(props) {
    let prev_coll = '';

    if (props.prev_coll) {
        prev_coll = ', Previously in ' + props.prev_coll;
    }

    return (
        <div className="my-2 flex flex-row gap-x-2 rounded border border-stone-200">
            <Image className={"rounded-l"} src={"/vase_placeholder.png"} alt={"Vase image"} height={100} width={100}></Image>
            <div className={"py-2"}>
                <p className="font-mono text-sm opacity-50">
                    {props.id}
                </p>
                <p className="text-lg">
                    Ref: <b>{props.ref_no}</b>
                </p>
                <p>
                    {props.shape}, Height: {props.height}, Diameter: {props.diameter}
                </p>
                <p>
                    Collection: <b>{props.curr_coll}</b>{prev_coll}
                </p>
            </div>
        </div>
    )
}
