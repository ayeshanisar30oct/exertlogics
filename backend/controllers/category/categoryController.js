import { categorySchema } from "backend/utils/schemas";
import { Category } from "../../models";
import updateFactory,{getFactory} from "backend/utils/factory/updateFactory";


// Get Header data
export const getCategory = getFactory(Category);

// Create or update Category data
export const updateCategory = updateFactory(Category,categorySchema)
