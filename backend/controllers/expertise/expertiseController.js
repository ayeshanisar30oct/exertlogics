import { expertiseSchema } from "backend/utils/schemas";
import { Expertise } from "../../models";
import updateFactory,{getFactory} from "backend/utils/factory/updateFactory";


// Get Expertise data
export const getExpertise = () => getFactory(Expertise);

// Create or update Expertise data
export const updateExpertise = updateFactory(Expertise,expertiseSchema)
