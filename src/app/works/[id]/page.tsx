"use client"
import WorkPageHeader from "@/app/components/WorkPageHeader";
import { works } from "@/app/projects-data";
import { useParams } from "next/navigation";

function WorkPage() {
    const params = useParams();
    const id = params.id;

    const targetWork = works.find((work) => work.id === id);

    if (!targetWork) {
        return <div>Work not found</div>;
    }

    return (
        <div className="page">
            <WorkPageHeader {...targetWork} />
        </div>
    );
}

export default WorkPage;