import asyncHandler from "../middlewares/asyncHandler.js";
import Header from "../models/headerModel.js";

const addHeader = asyncHandler(async (req, res) => {
    try {
      const { title, description } = req.fields;
  
     // Validation
      switch (true) {
        case !title:
          return res.json({ error: "Title is required" });
        case !description:
          return res.json({ error: "Description is required" });
      }
  
      const header = new Header({ ...req.fields });
      await header.save();
      res.json(header);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
});
  
const updateHeader = asyncHandler(async (req, res) => {
try {
    const { title, description} = req.fields;

    // Validation
    switch (true) {
    case !title:
        return res.json({ error: "Name is required" });
    case !description:
        return res.json({ error: "Price is required" });
    }

    const header = await Header.findByIdAndUpdate(
    req.params.id,
    { ...req.fields },
    { new: true }
    );

    await header.save();

    res.json(header);
} catch (error) {
    console.error(error);
    res.status(400).json(error.message);
}
});
  
const removeHeader = asyncHandler(async (req, res) => {
    try {
        const header = await Header.findByIdAndDelete(req.params.id);
        res.json(header);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchAllHeader = asyncHandler(async (req, res) => {
    try {
        const headers = await Header.find({});
        res.json(headers);
      } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
      }
});
// fetch a single product
const fetchHeaderById = asyncHandler(async (req, res) => {
  try {
    const header = await Header.findById(req.params.id);
    if (header) {
      return res.json(header);
    } else {
      res.status(404);
      throw new Error("Header not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Header not found" });
  }
});

export { addHeader, updateHeader, removeHeader, fetchAllHeader, fetchHeaderById };