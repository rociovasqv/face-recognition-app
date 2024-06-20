import saveCapturedModel from "../models/saveCaptured.model";

//Guardar la imagen en MongoDB
const saveCaptured = async (req, res) => {
  const { image } = req.body;

  // Convertir la imagen base64 a Buffer
  const imageBuffer = Buffer.from(image.split(",")[1], 'base64');

  //Guardar la imagen convertida en buffer
  const newSaveCaptured = new saveCapturedModel({
    image: imageBuffer,
    timestamp: new Date(),
  });

  try {
    await newSaveCaptured.save();
    res.status(200).json({ message: 'Image saved successfully' });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default saveCaptured;

