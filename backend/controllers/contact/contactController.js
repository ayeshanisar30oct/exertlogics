import { contactSchema } from "backend/utils/schemas";
import { Contact } from "../../models";
import updateFactory,{getFactory} from "backend/utils/factory/updateFactory";


// Get Header data
export const getContact = getFactory(Contact);// pass second argument to populate

// Create or update Contact data
export const updateContact = updateFactory(Contact,contactSchema) // pass third arg as true if collection can have multiple docs
