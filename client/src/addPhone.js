import React, { useState } from 'react';
import axios from 'axios';

function PhoneForm() {
  // Set initial state that matches your phone schema structure
  const [phone, setPhone] = useState({
    brand: '',
    model: '',
    specs: {
      ram: '',
      storage: '',
      battery: '',
      screensize: '',
    },

  });

  // handleChange for nested state
  const handleChange = e => {
    const { name, value } = e.target;
    if (name in phone.specs) {
      setPhone(prevPhone => ({
        ...prevPhone,
        specs: {
          ...prevPhone.specs,
          [name]: value,
        },
      }));
    } else {
      setPhone(prevPhone => ({
        ...prevPhone,
        [name]: value,
      }));
    }
  };

  // handleSubmit function for submitting the form
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:21667/phones', phone);
      console.log(response.data); // Log response data from the server
      alert('Phone added successfully!');
      setPhone({
        brand: '',
        model: '',
        specs: {
          ram: '',
          storage: '',
          battery: '',
          screensize: '',
        },
      });
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <>
      {/* Adding a header section with a title and app name */}
      <header>
        <h1>SpecMyPhone</h1> 
        <h2>Add Phone</h2> 
      </header>

      {/* The form for adding a new phone */}
      <form onSubmit={handleSubmit}>
        {/* Input for brand */}
        <input
          type="text"
          name="brand"
          value={phone.brand}
          onChange={handleChange}
          placeholder="Brand"
        />
        {/* Input for model */}
        <input
          type="text"
          name="model"
          value={phone.model}
          onChange={handleChange}
          placeholder="Model"
        />
        {/* Input fields for specs */}
        <input
          type="text"
          name="ram"
          value={phone.specs.ram}
          onChange={handleChange}
          placeholder="RAM"
        />
        <input
          type="text"
          name="storage"
          value={phone.specs.storage}
          onChange={handleChange}
          placeholder="Storage"
        />
        <input
          type="text"
          name="battery"
          value={phone.specs.battery}
          onChange={handleChange}
          placeholder="Battery"
        />
        <input
          type="text"
          name="screensize"
          value={phone.specs.screensize}
          onChange={handleChange}
          placeholder="Screen Size"
        />
        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PhoneForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// function LoginPage() {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prevCredentials => ({
//       ...prevCredentials,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Replace with your API endpoint
//       const response = await axios.post('http://localhost:21667/login', credentials);
//       console.log(response.data);
//       // Handle login success (e.g., saving the token, redirecting the user)
//       alert('Login successful!');
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={credentials.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={credentials.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;
