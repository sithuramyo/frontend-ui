import { LucideIcon } from "lucide-react"

declare global {
    interface ApiRequest<T> {
        request: T
    }

    interface ApiResponse<T> {
        isSuccess: boolean
        message: string
        data?: T
        statusCode: number
        errors: string[]
    }

    interface NoRequest { }
    interface NoResponse { }

    type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE'

    interface MutationPayload<TReq> {
        endpoint: string
        method?: HttpMethod
        body?: ApiRequest<TReq>
    }

    interface SidebarMenuItem {
        id: number;
        label: string;
        icon: LucideIcon;
        isDropdown?: boolean;
        path?: string;
        children?: ChildSidebarMenuItem[];
    }

    interface ChildSidebarMenuItem {
        id: number;
        label: string;
        path: string;
    }

    interface NavbarMenuItem {
        id: number;
        label: string;
        isDropdown?: boolean;
        path?: string;
        children?: ChildNavbarMenuItem[];
    }

    interface ChildNavbarMenuItem {
        id: number;
        label: string;
        path: string;
    }

    interface IdProps {
        id: string;
    }

    interface DeleteProps {
        label: string;
        apiUrl: string;
        queryKey: string[] | string;
    }

    interface Option {
        label: string;
        value: string;
      };

    interface Centre{
        centreCode: string;
        centreName: string;
    }

    interface State{
        id: number;
        name: string;
    }

    interface Township{
        id: number;
        name: string;
    }

    interface PatientNoProps{
        patientNo: string;
    }

    interface FollowUpProps{
        VisitDate?: Date;
        PatientNo?: string;
        isFollow?: boolean;
    }
}

export { }