import { footerSchema } from "backend/utils/schemas";
import { Footer } from "../../models";
import updateFactory, { getFactory } from "backend/utils/factory/updateFactory";

// Get footer data
export const getFooter = () => getFactory(Footer);

// Create or update Header data
export const updateFooter = updateFactory(Footer,footerSchema)

