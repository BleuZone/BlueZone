CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY,
  user_email varchar(255),
  password varchar(255)
);

CREATE TABLE username_matching (
  id INT NOT NULL PRIMARY KEY,
  username varchar(255),
  points INT NOT NULL
);

CREATE TABLE posts (
  post_id INT NOT NULL PRIMARY KEY,
  post_title varchar(255),
  post_body varchar(255) NOT NULL,
  points INT NOT NULL,
  page_id INT NOT NULL,
  creation_time date NOT NULL,
  comment_count int NOT NULL,
  username varchar(255)
)

CREATE TABLE pages(
  page_id INT NOT NULL PRIMARY KEY,
  page_title varchar(255),
  parent_page boolean,
  page_parent_id INT
)

CREATE TABLE comments(
  comment_id INT NOT NULL PRIMARY KEY,
  username varchar(255),
  comment varchar(255)
  parent_exists boolean,
  parent_id INT,
  post_id INT,
  creation_time date NOT NULL
)