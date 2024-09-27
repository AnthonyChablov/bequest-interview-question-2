import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setData(result.data);
      setHash(result.hash); // Set hash from the backend response
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async () => {
    setLoading(true);
    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await getData(); // Refresh data after updating
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/verify`, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Show success message
      } else {
        alert(result.message); // Show error message
      }
    } catch (error) {
      console.error("Error verifying data:", error);
      alert("An error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  const recoverData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/recover`, {
        method: "POST",
      });
      const result = await response.json();
      if (response.ok) {
        setData(result.data);
        setHash(result.hash);
        alert(result.message);
      } else {
        alert(result.message || "Failed to recover data");
      }
    } catch (error) {
      console.error("Error recovering data:", error);
      alert("Failed to recover data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      {loading ? (
        <div style={{ fontSize: "30px" }}>Loading...</div>
      ) : (
        <>
          <div>Saved Data</div>
          <input
            style={{ fontSize: "30px" }}
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{ fontSize: "20px" }} onClick={updateData}>
              Update Data
            </button>
            <button style={{ fontSize: "20px" }} onClick={verifyData}>
              Verify Data
            </button>
          </div>
          <button style={{ fontSize: "20px" }} onClick={recoverData}>
            Recover Data
          </button>
          <div className="">{}</div>
        </>
      )}
    </div>
  );
}

export default App;
