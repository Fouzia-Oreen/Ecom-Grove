// import SubCategory from "../models/subCategoryModel.js";
// import asyncHandler from "../middlewares/asyncHandler.js";

// const createSubCategory = asyncHandler(async (req, res) => {
//     try {
//       const { name } = req.body;
  
//       if (!name) {
//         return res.json({ error: "Name is required" });
//       }
  
//       const existingSubCategory = await SubCategory.findOne({ name });
  
//       if (existingSubCategory) {
//         return res.json({ error: "Already exists" });
//       }
  
//       const subCategory = await new SubCategory({ name }).save();
//       res.json(subCategory);
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json(error);
//     }
// });

// const updateSubCategory = asyncHandler(async (req, res) => {
//     try {
//       const { name } = req.body;
//       const { subCategoryId } = req.params;
  
//       const subCategory = await SubCategory.findOne({ _id: subCategoryId });
  
//       if (!subCategory) {
//         return res.status(404).json({ error: "SubCategory not found" });
//       }
  
//       subCategory.name = name;
  
//       const updatedSubCategory = await subCategory.save();
//       res.json(updatedSubCategory);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
// });
  
// const removeSubCategory = asyncHandler(async (req, res) => {
//     try {
//         const removed = await SubCategory.findByIdAndDelete(req.params.subCategoryId);
//         res.json(removed);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
  
// const listSubCategory = asyncHandler(async (req, res) => {
//     try {
//         const all = await SubCategory.find({});
//         res.json(all);
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(error.message);
//     }
// });
  
// const readSubCategory = asyncHandler(async (req, res) => {
//     try {
//         const subCategory = await subCategory.findOne({ _id: req.params.id });
//         res.json(subCategory);
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(error.message);
//     }
// });
  
// export {
//         createSubCategory,
//         updateSubCategory,
//         removeSubCategory,
//         listSubCategory,
//         readSubCategory,
//         };  
// export default createSubCategory