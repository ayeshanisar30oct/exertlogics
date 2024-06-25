import { homeSchema } from "backend/utils/schemas";
import { Home } from "../../models";
import updateFactory, { getFactory } from "backend/utils/factory/updateFactory";


// Get home data
export const getHome = () => getFactory(Home);

// Create or update home data
export const updateHome = updateFactory(Home,homeSchema);