import { photoInstance } from "./htttp-comon";

const baseUrl = "/face-recognition";
const http = photoInstance;

class FaceRecognition {
  async recognizeFace(photo) {
    return await http.post(`${baseUrl}/`, photo);
  }
}

export default new FaceRecognition();