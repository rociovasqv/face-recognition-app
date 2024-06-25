import { useState } from "react";
import UserService from "../api/user";

const createEmployeeHooks = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  const submitCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ error: false, message: "" });

    try {
      const formData = new FormData();
      const data = { firstName, lastName, email, dni, role };
      formData.append("image", image);
      formData.append("data", JSON.stringify(data));

      const response = await UserService.createUser(formData);
      if (response.data) {
      }
    } catch (err) {
      console.log(err);
      setError({
        error: true,
        message: err.response?.data?.message || "Error al crear usuario",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    dni,
    setDni,
    role,
    setRole,
    image,
    setImage,
    loading,
    setLoading,
    error,
    setError,
    submitCreate,
  };
};

export default createEmployeeHooks;