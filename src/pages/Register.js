import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/register.css";
import { showErrorToast, showSuccessToast } from "../utils/notification";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);

    try {
      await register(formData);
      showSuccessToast("Kayıt İşlemi Başarılı!")
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      showErrorToast("Kayıt İşlemi Başarırısız!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Hesap Oluştur</h1>
        {success && <p className="register-message-success">{success}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Kullanıcı adını girin"
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email adresinizi girin"
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Şifrenizi girin"
              required
            />
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
