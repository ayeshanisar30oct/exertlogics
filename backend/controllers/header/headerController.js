import { headerSchema } from "backend/utils/schemas";
import { Header } from "../../models";
import updateFactory,{getFactory} from "backend/utils/factory/updateFactory";


// Get Header data
export const getHeader = getFactory(Header);

// Create or update Header data
export const updateHeader = updateFactory(Header,headerSchema)
