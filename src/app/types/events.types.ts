export const CustomEventsMap = {
    "cursor:update": "cursor:update",
    "projectinfo:hide": "projectinfo:hide",
    "projectinfo:show": "projectinfo:show",
};

export type CustomEventsPayloads={
    "cursor:update": {
        show: boolean,
        pointer: boolean,
    },
    "projectinfo:hide": {
        projectId: string,
    },
    "projectinfo:show": {
        projectId: string,
    },
}

