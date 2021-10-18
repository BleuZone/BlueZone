CREATE DATABASE

CREATE TABLE users (
  id INT NOT NULL,
  user_email varchar(255),
  user_password varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE username_matching (
  id INT,
  username varchar(255),
  points INT,
  FOREIGN KEY (id) REFERENCES users(id),
  PRIMARY KEY (username)
);

CREATE TABLE posts (
  post_id INT NOT NULL,
  post_title varchar(255),
  post_body varchar(255) NOT NULL,
  points INT NOT NULL,
  page_id INT,
  creation_time TIMESTAMP NOT NULL,
  comment_count int NOT NULL,
  username varchar(255),
  FOREIGN KEY (username) REFERENCES username_matching(username),
  FOREIGN KEY (page_id) REFERENCES pages(page_id),
  PRIMARY KEY (post_id)
);

CREATE TABLE pages (
  page_id INT NOT NULL,
  page_title varchar(255),
  parent_page boolean,
  page_parent_id INT,
  post_count INT,
  PRIMARY KEY (page_id)
);

CREATE TABLE comments (
  comment_id INT NOT NULL,
  username varchar(255),
  comment varchar(255),
  parent_exists boolean,
  parent_id INT,
  post_id INT,
  creation_time TIMESTAMP NOT NULL,
  FOREIGN KEY (username) REFERENCES username_matching(username),
  FOREIGN KEY (post_id) REFERENCES posts(post_id),
  PRIMARY KEY (comment_id)
);