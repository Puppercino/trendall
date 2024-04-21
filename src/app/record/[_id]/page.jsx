import { getOneRecord } from "@/app/api/db/controller/record_controller";
import { RecordItem } from "@/app/components/RecordItem";

export default async function RecordPage({ params }) {

    // const record = await getOneRecord(params._id);

    return (
        <div>
            <h1>Record Reference {params._id}</h1>
            {/* <RecordItem
                id={params._id}
                ref_no={params.ref_no}
                shape={params.shape}
                curr_coll={params.curr_coll}
                prev_coll={params.prev_coll}
                provenance={params.provenance}
                height={params.height}
                diameter={params.diameter}
                plate={params.plate}
                publication={params.publication}
                description={params.description}
            /> */}
        </div>
    );
}