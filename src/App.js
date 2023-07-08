import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";

const AnimalModel = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath, true);
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y += 0.01; // Adjust the rotation speed as desired
  });

  return (
    <group ref={groupRef} scale={[2, 2, 2]} position={[0, -2, 0]}>
      {/* Increase the scale as desired */}
      <primitive object={scene} />
    </group>
  );
};

const RotatingAnimal = ({ modelPath }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <AnimalModel modelPath={modelPath} />
      </Canvas>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual form submission logic or API call
    console.log("Form data:", formData);
    // Clear form fields
    setFormData({ name: "", email: "", message: "" });
  };

  const styles = {
    // submitButtonContainer: {
    //   display: "flex",
    //   justifyContent: "center",
    //   marginTop: "20px",
    // },
    submitButton: {
      height: "40px",
      width: "105%",
      backgroundColor: "#333",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      fontWeight: "bold",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "'Roboto', sans-serif",
      overflow: "hidden", // Hide the scroll
    },
    title: {
      fontSize: "48px",
      fontWeight: "700",
      color: "#333",
      marginBottom: "30px",
      marginTop: "20px", // Adjust the marginTop to move the form higher
    },
    form: {
      width: "400px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
    },
    input: {
      height: "45px",
      width: "100%",
      padding: "10px",
      fontSize: "18px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#F2F2F2",
      color: "#333",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#F2F2F2",
      color: "#333",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      resize: "vertical",
      minHeight: "100px",
    },
    credit: {
      color: "#666",
      fontSize: "12px",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Say Hello</h2>
      <RotatingAnimal modelPath="/363_mailbox.glb" />
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">
            Name:
          </label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="message">
            Message:
          </label>
          <textarea
            style={styles.textarea}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.submitButtonContainer}>
          <button style={styles.submitButton} type="submit">
            Submit
          </button>
        </div>
      </form>
      <div style={styles.credit}>Presented by KB STUDIO</div>
    </div>
  );
};

export default ContactForm;
