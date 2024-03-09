import { useContext, createContext, useState, ReactNode } from "react";
import { AdminClientsDetails } from "../types";

interface AdminProviderProps {
    children: ReactNode,
}

interface AdminContextProps {
    clientDetails: AdminClientsDetails[],
    setClientDetails: (clientArray: AdminClientsDetails[]) => void,
}

const AdminContext = createContext<AdminContextProps | undefined> (undefined) 

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
    const [clientDetails, setClientDetails] = useState<AdminClientsDetails[]>([]);

    const contextData: AdminContextProps= {
        clientDetails, 
        setClientDetails,
    };

    return(
        <AdminContext.Provider value={contextData}>{children}</AdminContext.Provider>
    );
}

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if(!context){
        throw new Error("useAdminContext must be used within an AdminProvider");
    }
    return context;
}