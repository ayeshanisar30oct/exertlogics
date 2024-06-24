import { categorySchema } from "backend/utils/schemas";
import { Category } from "../../models";
import updateFactory,{getFactory} from "backend/utils/factory/updateFactory";


// Get Header data
export const getCategory = getFactory(Category,'projects');// pass second argument to populate

// Create or update Category data
export const updateCategory = updateFactory(Category,categorySchema,true) // pass third arg as true if collection can have multiple docs
