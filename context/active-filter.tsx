import React, { useState } from "react"
import { createContext } from "vm";


type ActiveFilterContextProviderProps = {
    children: React.ReactNode;
}

type ActiveFilterContextType = {
    activeFilter: ActiveFilter;
}

type ActiveFilter = "all" | "active" | "completed";

// const ActiveFilterContext = createContext<

// export default function ActiveFilterContextProvider({ children }: ActiveFilterContextProviderProps) {
//     const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
    
//     const switchActiveFilter = (filterType: ActiveFilter) => {
//         switch (filterType) {
//             case "active":
                
//                 break;
        
//             default:
//                 break;
//         }
//     }

//     return (

//     )

// }




