export type Work={
    id: string;
    headingTitle: string;
    title: string;
    client: string;
    year: string;
    headerImage: string;
    headerImageIntersicSize:{
         width: number;
         height: number;
    }
    href: string;
    subTitle: string;
    hasDecsenders?: boolean;

    workinfo:{
        agency:string[],
        role:string[],
        project:string[],
        team:string[],
        featured:string[],
        work:string[]
    }
}