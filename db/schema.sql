CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY,
  user_email varchar(255),
  user_password varchar(255)
);

CREATE TABLE username_matching (
  id FOREIGN KEY REFERENCES users(id),
  username varchar(255) PRIMARY KEY,
  points INT,
);

CREATE TABLE posts (
  post_id INT NOT NULL PRIMARY KEY,
  post_title varchar(255),
  post_body varchar(255) NOT NULL,
  points INT NOT NULL,
  page_id FOREIGN KEY REFERENCES pages(page_id)
  creation_time date NOT NULL,
  comment_count int NOT NULL,
  username FOREIGN KEY REFERENCES username_matching(username)
);

CREATE TABLE pages (
  page_id INT NOT NULL PRIMARY KEY,
  page_title varchar(255),
  parent_page boolean,
  page_parent_id INT
);

CREATE TABLE comments (
  comment_id INT NOT NULL PRIMARY KEY,
  username FOREIGN KEY REFERENCES username_matching(username)
  comment varchar(255),
  parent_exists boolean,
  parent_id INT,
  post_id FOREIGN KEY REFERENCES posts(post_id)
  creation_time date NOT NULL
);