CREATE TABLE IF NOT EXISTS users (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(60) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	address VARCHAR(400),
	role ENUM('admin','user','owner') NOT NULL
);

CREATE TABLE IF NOT EXISTS stores (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE,
	address VARCHAR(400),
	owner_id INT,
	FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ratings (
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	store_id INT,
	rating INT,
	CONSTRAINT ratings_rating_check CHECK (rating BETWEEN 1 AND 5),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
	UNIQUE KEY uniq_user_store (user_id, store_id)
);
