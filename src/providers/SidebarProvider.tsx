import { createContext, useContext, useState } from "react";

type SidebarContextType = {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarState = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebarState must be used within SidebarProvider");
    }
    return context;
};
