import { getAxiosInstance } from "./htttp-comon";

const baseUrl = "/face-recognition";
const http = getAxiosInstance(true);

class FaceRecognition {
  async recognizeFace(photo) {
    return await http.post(`${baseUrl}/`, photo);
  }
}

export default new FaceRecognition();