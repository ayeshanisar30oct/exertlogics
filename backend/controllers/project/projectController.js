import { projectSchema } from "backend/utils/schemas";
import { Project } from "../../models";
import updateFactory, { getFactory } from "backend/utils/factory/updateFactory";
import { isEmptyObject } from "backend/utils/helpers";
import { fileUpload } from "backend/utils/fileUpload";
import catchAsync from "backend/utils/catchAsync";
import connectDB from 'backend/db/connectDB';


// Get home data
export const getProject = getFactory(Project);

// Create or update Project data
export const updateProjectLogos = catchAsync(async (req, res) => {
    let project;
    const id = req.query?.id;
    let filter = id ? { _id: id } : {};
    console.log("Filter and Query :", id, filter);

    const { fileUrl, err } = await fileUpload(req, res);
    if(err) return res.status(500).json({status:'fail',message:'File upload failed!'})

    const isFilterEmpty = isEmptyObject(filter);
  
    // Connect to the database
    await connectDB();

    if (!isFilterEmpty) {
        project = await Project.findById(filter);
      } else {
        project = new model();
      }
 
    if (fileUrl && project) {
      Object.assign(project, fileUrl);
      await project.save();
    }
    res.status(200).json({ status: 'success', message: "File uploaded successfully", path: fileUrl });
  });

// Create or update Project data
export const updateProject = updateFactory(Project,projectSchema,true);
  