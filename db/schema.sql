CREATE DATABASE

CREATE TABLE users (
  id INT NOT NULL,
  user_email varchar(255),
  user_password varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE username_matching (
  FOREIGN KEY (id) REFERENCES users(id),
  username varchar(255),
  points INT,
  PRIMARY KEY (username)
);

CREATE TABLE posts (
  post_id INT NOT NULL,
  post_title varchar(255),
  post_body varchar(255) NOT NULL,
  points INT NOT NULL,
  FOREIGN KEY page_id REFERENCES pages(page_id)
  creation_time date NOT NULL,
  comment_count int NOT NULL,
  FOREIGN KEY (username)  REFERENCES username_matching(username),
  PRIMARY KEY (post_id)
);

CREATE TABLE pages (
  page_id INT NOT NULL,
  page_title varchar(255),
  parent_page boolean,
  page_parent_id INT,
  PRIMARY KEY (page_id)
);

CREATE TABLE comments (
  comment_id INT NOT NULL,
  FOREIGN KEY (username) REFERENCES username_matching(username)
  comment varchar(255),
  parent_exists boolean,
  parent_id INT,
  FOREIGN KEY (post_id) REFERENCES posts(post_id)
  creation_time date NOT NULL
  PRIMARY KEY (comment_id)
);