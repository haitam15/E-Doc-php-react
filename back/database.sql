-- CREATE TABLE Patient (
--     Pid INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50),
--     cin VARCHAR(10) NOT NULL UNIQUE,
--     email VARCHAR(50) NOT NULL UNIQUE,
--     password VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE Medecin (
--     Mid INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50),
--     email VARCHAR(50) NOT NULL UNIQUE,
--     password VARCHAR(50) NOT NULL,
--     specialite VARCHAR(50)
-- );

-- CREATE TABLE Secretaire (
--     Sid INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50),
--     email VARCHAR(50) NOT NULL UNIQUE,
--     password VARCHAR(50) NOT NULL
-- );

CREATE TABLE Patient (
    Pid INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    CIN VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
<<<<<<< HEAD
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Medecin (
    Name VARCHAR(50),
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Secretaire (
    Name VARCHAR(50),
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE PlageHoraire (
    jourD INT NOT NULL,
    jourF INT NOT NULL,
    heureMatinD VARCHAR(5) NOT NULL,
    heureMatinF VARCHAR(5) NOT NULL,
    heureSoireD VARCHAR(5) NOT NULL,
    heureSoireF VARCHAR(5) NOT NULL,
    dureeRDV INT PRIMARY KEY DEFAULT 30
);

CREATE TABLE RendezVous (
    Rid INT PRIMARY KEY AUTO_INCREMENT,
    Pid INT,
    jour DATE NOT NULL,
    M_S VARCHAR(1) NOT NULL,
    ordre INT NOT NULL,
    FOREIGN KEY (Pid) REFERENCES Patient(Pid) ON DELETE CASCADE
);
=======
    password VARCHAR(50) NOT NULL
)

CREATE TABLE Medecin (
    Mid INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
)

CREATE TABLE Secretaire (
    Sid INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
)
>>>>>>> db625169567067763e21144e9c9f121f54d646af

CREATE TABLE Consultation (
    Cid INT PRIMARY KEY AUTO_INCREMENT,
    Pid INT,
    DateConsultation DATE NOT NULL,
    Motif Text,
    Diagnostic Text ,
    ExamenClinique Text,
    ExamenLabo Text,
    Prescription Text,
    FOREIGN KEY (Pid) REFERENCES Patient(Pid) ON DELETE CASCADE
);