const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bcrypt = require("bcrypt");

const PORT = 5001;
const PETS_FILE = "./server/pets.json";
const APPLICATIONS_FILE = "./server/adoptionApplications.json";
const CONTACT_US_FILE = "./server/contact_us.json";
const USERS_FILE = "./server/users.json";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Ensure all necessary JSON files exist
if (!fs.existsSync(PETS_FILE)) {
  fs.writeFileSync(PETS_FILE, "[]");
}
if (!fs.existsSync(APPLICATIONS_FILE)) {
  fs.writeFileSync(APPLICATIONS_FILE, "[]");
}
if (!fs.existsSync(CONTACT_US_FILE)) {
  fs.writeFileSync(CONTACT_US_FILE, "[]");
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, "[]");
}

// Predefined admin credentials
const ADMIN_EMAIL = "nakul@gmail.com";
const ADMIN_PASSWORD = "nakul123";

// Helper functions
const getUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Signup API
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL) {
    return res.status(400).json({ message: "Cannot register as admin!" });
  }

  const users = getUsers();
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    saveUsers(users);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Login successful!", role: "admin" });
  }

  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    res.status(200).json({ message: "Login successful!", role: "user" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Post new pet
app.post("/api/pets", (req, res) => {
  try {
    const pets = JSON.parse(fs.readFileSync(PETS_FILE));
    pets.push(req.body);
    fs.writeFileSync(PETS_FILE, JSON.stringify(pets, null, 2));
    res.status(201).json({ message: "Pet posted successfully!" });
  } catch (err) {
    console.error("Post pet error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all pets
app.get("/api/pets", (req, res) => {
  try {
    const pets = JSON.parse(fs.readFileSync(PETS_FILE));
    res.json(pets);
  } catch (err) {
    console.error("Fetch pets error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get pending applications
app.get("/api/pending", (req, res) => {
  try {
    const applications = JSON.parse(fs.readFileSync(APPLICATIONS_FILE));
    res.json(applications);
  } catch (err) {
    console.error("Fetch pending applications error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // Approve application
// app.post("/api/approve", (req, res) => {
//   try {
//     const { petId, applicantEmail } = req.body;
//     let applications = JSON.parse(fs.readFileSync(APPLICATIONS_FILE));
//     const index = applications.findIndex(app => app.petId === petId && app.applicantEmail === applicantEmail);

//     if (index === -1) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     applications.splice(index, 1);
//     fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));

//     let pets = JSON.parse(fs.readFileSync(PETS_FILE));
//     const petIndex = pets.findIndex((pet) => pet.id === petId);
//     if (petIndex !== -1) {
//       pets[petIndex].status = "adopted";
//       fs.writeFileSync(PETS_FILE, JSON.stringify(pets, null, 2));
//     }

//     res.status(200).json({ message: "Application approved and pet marked as adopted" });
//   } catch (err) {
//     console.error("Approve application error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Reject application
// app.post("/api/reject", (req, res) => {
//   try {
//     const { petId, applicantEmail } = req.body;
//     let applications = JSON.parse(fs.readFileSync(APPLICATIONS_FILE));
//     const index = applications.findIndex(app => app.petId === petId && app.applicantEmail === applicantEmail);

//     if (index === -1) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     applications.splice(index, 1);
//     fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));

//     res.status(200).json({ message: "Application rejected and removed from pending list" });
//   } catch (err) {
//     console.error("Reject application error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.post("/api/approve", (req, res) => {
  try {
    const { petId, applicantEmail } = req.body;

    let applications = JSON.parse(fs.readFileSync(APPLICATIONS_FILE));

    const index = applications.findIndex(app =>
      app.petDetails &&
      app.petDetails.petName.toLowerCase() === petId.split("-")[0].toLowerCase() &&
      app.petDetails.petType.toLowerCase() === petId.split("-")[1].toLowerCase() &&
      app.petDetails.age === petId.split("-")[2] &&
      app.petDetails.area.toLowerCase() === petId.split("-")[3].toLowerCase() &&
      app.userEmail === applicantEmail
    );

    if (index === -1) {
      return res.status(404).json({ message: "Application not found" });
    }

    const approvedApplication = applications.splice(index, 1)[0];
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));

    let pets = JSON.parse(fs.readFileSync(PETS_FILE));
    const petIndex = pets.findIndex((pet) =>
      pet.petName.toLowerCase() === petId.split("-")[0].toLowerCase() &&
      pet.petType.toLowerCase() === petId.split("-")[1].toLowerCase() &&
      pet.age === petId.split("-")[2] &&
      pet.area.toLowerCase() === petId.split("-")[3].toLowerCase()
    );

    if (petIndex !== -1) {
      pets[petIndex].status = "adopted";
      fs.writeFileSync(PETS_FILE, JSON.stringify(pets, null, 2));
    }

    res.status(200).json({ message: "Application approved and pet marked as adopted" });
  } catch (err) {
    console.error("Approve application error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Reject application
app.post("/api/reject", (req, res) => {
  try {
    const { petId, applicantEmail } = req.body;

    let applications = JSON.parse(fs.readFileSync(APPLICATIONS_FILE));

    const index = applications.findIndex(app =>
      app.petDetails &&
      app.petDetails.petName.toLowerCase() === petId.split("-")[0].toLowerCase() &&
      app.petDetails.petType.toLowerCase() === petId.split("-")[1].toLowerCase() &&
      app.petDetails.age === petId.split("-")[2] &&
      app.petDetails.area.toLowerCase() === petId.split("-")[3].toLowerCase() &&
      app.userEmail === applicantEmail
    );

    if (index === -1) {
      return res.status(404).json({ message: "Application not found" });
    }

    applications.splice(index, 1);
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));

    res.status(200).json({ message: "Application rejected and removed from pending list" });
  } catch (err) {
    console.error("Reject application error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Submit application
app.post("/api/adoption", (req, res) => {
  try {
    const applications = JSON.parse(fs.readFileSync(APPLICATIONS_FILE));
    applications.push(req.body);
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));
    res.status(201).json({ message: "Application submitted!" });
  } catch (err) {
    console.error("Adoption error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Submit contact form
app.post("/api/contact", (req, res) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(CONTACT_US_FILE));
    contacts.push(req.body);
    fs.writeFileSync(CONTACT_US_FILE, JSON.stringify(contacts, null, 2));
    res.status(201).json({ message: "Contact form submitted!" });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});