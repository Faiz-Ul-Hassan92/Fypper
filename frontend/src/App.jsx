import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({ members: [] }); // initialize as an empty array for members

  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data); // make sure this returns an object with "members" key
        console.log(data);
      })
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  return (
    <div>
      {typeof data.members === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => <p key={i}>{member}</p>)
      )}
    </div>
  );
}

export default App;
